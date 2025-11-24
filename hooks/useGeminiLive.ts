import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createPcmBlob, decodeAudioData, base64ToUint8Array } from '../utils/audioUtils';
import { SIMULATION_DATA } from '../constants';

interface UseGeminiLiveProps {
  apiKey: string | undefined;
}

export const useGeminiLive = ({ apiKey }: UseGeminiLiveProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for audio context and processing
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const disconnect = useCallback(() => {
    // Close session logic would go here if session exposed a close method directly 
    // or if we kept a reference to the session object differently.
    // The current SDK pattern relies on callbacks.
    
    // Stop Microphone
    if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
    }

    // Close Audio Contexts
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }

    // Clear Audio Sources
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    
    setIsConnected(false);
    setIsSpeaking(false);
    sessionPromiseRef.current = null;
  }, []);

  const connect = useCallback(async () => {
    if (!apiKey) {
      setError("API Key is missing");
      return;
    }
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // Initialize Audio Contexts
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const outputNode = outputAudioContextRef.current.createGain();
      outputNode.connect(outputAudioContextRef.current.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `You are an expert Business Simulation Facilitator Assistant. You have deep knowledge of the following simulation results for 4 teams (A, B, C, D). 
          
          Use this JSON data as your knowledge base:
          ${JSON.stringify(SIMULATION_DATA)}
          
          Your goal is to help the facilitator understand team dynamics, key decisions, and risks. 
          Be concise, professional, and insightful. 
          When asked about a specific team, reference their RAPID roles, arguments, and specific evidence quotes.`,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            
            // Setup Input Processing
            if (!inputAudioContextRef.current) return;
            
            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            inputSourceRef.current = source;
            
            const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then(session => {
                  session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio && outputAudioContextRef.current) {
              setIsSpeaking(true);
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBytes = base64ToUint8Array(base64Audio);
              const audioBuffer = await decodeAudioData(audioBytes, ctx);
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) {
                   setIsSpeaking(false);
                }
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
                sourcesRef.current.forEach(s => s.stop());
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
                setIsSpeaking(false);
            }
          },
          onclose: () => {
            setIsConnected(false);
          },
          onerror: (err) => {
            console.error("Gemini Live Error:", err);
            setError("Connection error occurred.");
            disconnect();
          }
        }
      });
      
      sessionPromiseRef.current = sessionPromise;

    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to connect");
      disconnect();
    }
  }, [apiKey, disconnect]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connect,
    disconnect,
    isConnected,
    isSpeaking,
    error
  };
};