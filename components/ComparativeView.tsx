import React from 'react';
import { SIMULATION_DATA } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ComparativeView: React.FC = () => {
  const data = SIMULATION_DATA.teams.map(team => {
    const rec = team.plan_alternatives.recommendation;
    const scores = team.plan_alternatives.options.find(o => o.name === rec)?.scores;
    return {
      name: team.team_id,
      ROI: scores?.ROI || 0,
      Risk: scores?.Risk || 0,
      Time: scores?.Time || 0,
      Cost: scores?.Cost || 0,
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <h3 className="font-bold text-lg text-slate-800 mb-2">Strategic Profile Comparison</h3>
           <p className="text-sm text-slate-500 mb-6">Comparing the recommended plan scores for each team.</p>
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend />
                  <Bar dataKey="ROI" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Risk" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
         </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Patterns & Insights</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Common Patterns</h4>
                <p className="text-sm text-slate-600">{SIMULATION_DATA.teams_comparative.common_patterns}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Key Differences</h4>
                <p className="text-sm text-slate-600">{SIMULATION_DATA.teams_comparative.key_differences}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 mt-2">
                 <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Transversal Risks</h4>
                 <ul className="list-disc list-inside text-sm text-red-600/80">
                    {SIMULATION_DATA.teams_comparative.transversal_risks.map((risk, i) => (
                      <li key={i}>{risk}</li>
                    ))}
                 </ul>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};