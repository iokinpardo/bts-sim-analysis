import React from 'react';
import { TeamData } from '../types';
import { AlertCircle, CheckCircle, Clock, TrendingUp, AlertTriangle, Shield, Target } from 'lucide-react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

interface TeamViewProps {
  team: TeamData;
}

export const TeamView: React.FC<TeamViewProps> = ({ team }) => {
  
  // Format data for Recharts
  const scores = team.plan_alternatives.options.find(o => o.name === team.plan_alternatives.recommendation)?.scores;
  const chartData = scores ? [
    { name: 'ROI', score: scores.ROI, fill: '#3b82f6' },
    { name: 'Risk', score: scores.Risk, fill: '#ef4444' },
    { name: 'Time', score: scores.Time, fill: '#f59e0b' },
    { name: 'Cost', score: scores.Cost, fill: '#10b981' },
  ] : [];

  return (
    <div className="space-y-6">
      
      {/* Top Section: Summary & Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-800">Facilitator Summary</h3>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium uppercase">Observation</span>
           </div>
           <p className="text-slate-600 leading-relaxed text-sm">{team.summary}</p>
           
           <div className="mt-6 flex gap-4">
              {team.biases_and_risks.map((risk, idx) => (
                <div key={idx} className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex-1">
                  <div className="flex items-center gap-2 text-orange-700 mb-1">
                    <AlertTriangle size={16} />
                    <span className="font-semibold text-xs uppercase">{risk.type.replace(/_/g, ' ')}</span>
                  </div>
                  <p className="text-xs text-orange-800">{risk.note}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <h3 className="font-bold text-lg text-slate-800 mb-4">Recommended Strategy</h3>
           <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" barSize={10} data={chartData}>
                    <RadialBar
                      label={{ position: 'insideStart', fill: '#fff' }}
                      background
                      dataKey="score"
                    />
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0, fontSize: '10px' }} />
                    <Tooltip />
                 </RadialBarChart>
              </ResponsiveContainer>
           </div>
           <div className="text-center mt-2">
             <span className="text-sm text-slate-500">Chosen Plan: </span>
             <span className="font-bold text-slate-800">{team.plan_alternatives.recommendation.replace(/_/g, ' ')}</span>
           </div>
        </div>
      </div>

      {/* Decisions Timeline */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-lg text-slate-800 mb-6">Decision Log</h3>
        <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
          {team.decisions.map((decision, idx) => (
            <div key={idx} className="relative pl-8">
              <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${decision.status === 'decided' ? 'bg-green-500 border-white ring-2 ring-green-100' : 'bg-yellow-400 border-white ring-2 ring-yellow-100'}`}></div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800">{decision.title}</h4>
                  <div className="flex gap-2 mt-1">
                     <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${decision.status === 'decided' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                       {decision.status.replace(/_/g, ' ')}
                     </span>
                     <span className="text-xs text-slate-400">RAPID Confidence: {decision.RAPID_roles_approx.confidence}</span>
                  </div>
                </div>
                {/* RAPID Mini-viz */}
                <div className="flex gap-1 text-xs">
                   <div className="flex flex-col items-center">
                     <span className="text-slate-400 text-[10px] mb-0.5">D</span>
                     <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center font-medium text-slate-700">{decision.RAPID_roles_approx.D}</div>
                   </div>
                   <div className="flex flex-col items-center">
                     <span className="text-slate-400 text-[10px] mb-0.5">R</span>
                     <div className="w-6 h-6 rounded bg-slate-50 flex items-center justify-center font-medium text-slate-600">{decision.RAPID_roles_approx.R || '-'}</div>
                   </div>
                </div>
              </div>
              
              {/* Evidence Quotes */}
              <div className="mt-3 bg-slate-50 p-3 rounded-md">
                 {decision.evidence.map((ev, i) => (
                   <div key={i} className="text-xs text-slate-600 italic mb-1 last:mb-0">
                     "{ev.quote}" <span className="not-italic font-semibold text-slate-400 not-sr-only">- {ev.speaker}</span>
                   </div>
                 ))}
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Next Actions */}
       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
             <Clock size={20} className="text-blue-500"/>
             <h3 className="font-bold text-lg text-slate-800">Next Actions</h3>
          </div>
          <div className="grid gap-4">
             {team.next_actions.map((action, i) => (
               <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                     <span className="text-sm font-medium text-slate-700">{action.action}</span>
                  </div>
                  <div className="text-right">
                     <div className="text-xs font-bold text-slate-500">Owner: {action.owner_approx}</div>
                     <div className="text-xs text-slate-400">Due: {action.deadline}</div>
                  </div>
               </div>
             ))}
          </div>
       </div>

    </div>
  );
};