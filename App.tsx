import React, { useState } from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { TeamView } from './components/TeamView';
import { ComparativeView } from './components/ComparativeView';
import { VoiceAssistant } from './components/VoiceAssistant';
import { SIMULATION_DATA } from './constants';
import { Users, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const renderContent = () => {
    if (activeTab === 'team' && selectedTeamId) {
      const team = SIMULATION_DATA.teams.find(t => t.team_id === selectedTeamId);
      if (team) return <TeamView team={team} />;
      return <div>Team not found</div>;
    }

    if (activeTab === 'comparative') {
      return <ComparativeView />;
    }

    // Default: Overview
    return (
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                 <Users size={24} />
              </div>
              <div>
                <h4 className="text-slate-500 text-xs font-bold uppercase">Active Teams</h4>
                <p className="text-2xl font-bold text-slate-800">{SIMULATION_DATA.teams.length}</p>
              </div>
           </div>
           
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h4 className="text-slate-500 text-xs font-bold uppercase">Decisions Logged</h4>
                <p className="text-2xl font-bold text-slate-800">
                  {SIMULATION_DATA.teams.reduce((acc, t) => acc + t.decisions.length, 0)}
                </p>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                 <AlertTriangle size={24} />
              </div>
              <div>
                <h4 className="text-slate-500 text-xs font-bold uppercase">Transversal Risks</h4>
                <p className="text-2xl font-bold text-slate-800">
                  {SIMULATION_DATA.teams_comparative.transversal_risks.length}
                </p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg text-slate-800 mb-4">Facilitator Notes</h3>
              <p className="text-slate-600 text-sm mb-4">
                 Common patterns across teams suggest a strong preference for "alignment over consensus". 
                 Team B and Team D show the strongest decision-making clarity (RAPID).
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                 <h4 className="text-sm font-bold text-yellow-800 mb-1">Attention Needed</h4>
                 <p className="text-xs text-yellow-700">Team A is struggling with metric interpretation. Consider a targeted intervention to explain the dashboard drivers.</p>
              </div>
           </div>

           <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
              <h3 className="font-bold text-lg mb-2 relative z-10">AI Co-Pilot Ready</h3>
              <p className="text-slate-300 text-sm mb-6 relative z-10 max-w-xs">
                 Use the microphone button below to start a voice-to-voice session. Ask about team dynamics, specific evidence, or comparative risks.
              </p>
              <button 
                onClick={() => document.querySelector<HTMLButtonElement>('button[title="Open Chat"]')?.click()}
                className="text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium transition-colors relative z-10"
              >
                Learn More
              </button>
           </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      selectedTeamId={selectedTeamId}
      setSelectedTeamId={setSelectedTeamId}
    >
      {renderContent()}
      <VoiceAssistant />
    </DashboardLayout>
  );
};

export default App;