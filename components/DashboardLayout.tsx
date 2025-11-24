import React from 'react';
import { LayoutDashboard, Users, GitGraph, PieChart, Info } from 'lucide-react';
import { SIMULATION_DATA } from '../constants';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTeamId: string | null;
  setSelectedTeamId: (id: string | null) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab,
  selectedTeamId,
  setSelectedTeamId
}) => {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white tracking-wide">SimFacilitator<span className="text-blue-500">.AI</span></h1>
          <p className="text-xs text-slate-500 mt-1">Facilitator Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="mb-4">
             <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main</p>
             <button 
                onClick={() => { setActiveTab('overview'); setSelectedTeamId(null); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
             >
                <LayoutDashboard size={18} />
                <span>Overview</span>
             </button>
             <button 
                onClick={() => { setActiveTab('comparative'); setSelectedTeamId(null); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'comparative' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
             >
                <PieChart size={18} />
                <span>Comparative Analysis</span>
             </button>
          </div>

          <div>
             <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Teams</p>
             {SIMULATION_DATA.teams.map((team) => (
               <button
                 key={team.team_id}
                 onClick={() => { setActiveTab('team'); setSelectedTeamId(team.team_id); }}
                 className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'team' && selectedTeamId === team.team_id ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
               >
                 <Users size={18} />
                 <span>{team.team_id}</span>
               </button>
             ))}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center gap-2 text-xs text-slate-500">
             <Info size={14} />
             <span>Schema v1.0 Loaded</span>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-8 justify-between sticky top-0 z-10 shadow-sm">
           <h2 className="text-lg font-semibold text-slate-800 capitalize">
             {activeTab === 'overview' ? 'Executive Dashboard' : 
              activeTab === 'comparative' ? 'Cross-Team Analysis' :
              `${selectedTeamId} Analysis`}
           </h2>
           <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">Simulation Period: {SIMULATION_DATA.simulation.period}</span>
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                JD
              </div>
           </div>
        </header>
        <div className="p-8 pb-32">
          {children}
        </div>
      </main>
    </div>
  );
};