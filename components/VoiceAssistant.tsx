import React, { useState } from 'react';
import { Mic, MicOff, X, Activity, MessageSquare } from 'lucide-react';
import { useGeminiLive } from '../hooks/useGeminiLive';

export const VoiceAssistant: React.FC = () => {
  const apiKey = process.env.API_KEY;
  const [isOpen, setIsOpen] = useState(false);
  const { connect, disconnect, isConnected, isSpeaking, error } = useGeminiLive({ apiKey });

  const toggleSession = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {/* Expanded Panel */}
      {isOpen && (
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl w-80 mb-2 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              AI Co-Pilot
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="h-32 bg-slate-800/50 rounded-lg flex items-center justify-center mb-6 border border-slate-700 overflow-hidden relative">
             {isConnected ? (
                <div className="flex items-center gap-1 h-full w-full justify-center">
                  {/* Fake visualizer bars */}
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 bg-blue-500 rounded-full transition-all duration-75 ${isSpeaking ? 'animate-[pulse_0.5s_ease-in-out_infinite]' : 'h-2'}`}
                      style={{ height: isSpeaking ? `${Math.random() * 60 + 20}%` : '8px', animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
             ) : (
               <div className="text-slate-500 text-sm flex flex-col items-center gap-2">
                 <Activity size={24} />
                 <span>Ready to connect</span>
               </div>
             )}
             
             {error && (
                <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center p-4 text-center">
                   <p className="text-red-400 text-xs">{error}</p>
                </div>
             )}
          </div>

          <p className="text-slate-400 text-xs mb-6 leading-relaxed">
            I can analyze team decisions, risks, and provide comparative insights based on the simulation data. Ask me anything.
          </p>

          <button
            onClick={toggleSession}
            className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
              isConnected 
                ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/50' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20'
            }`}
          >
            {isConnected ? (
              <>
                <MicOff size={18} /> End Session
              </>
            ) : (
              <>
                <Mic size={18} /> Start Conversation
              </>
            )}
          </button>
        </div>
      )}

      {/* FAB */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};