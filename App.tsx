
import React, { useState, useEffect } from 'react';
import { Layout, BarChart3, UserCircle, Rocket, FileText, Settings, LogOut, Github, Linkedin, Mail, Target } from 'lucide-react';
import { StudentProfile, PredictionResult, CompanyFit, ImprovementAction } from './types';
import { INITIAL_PROFILE } from './constants';
import { calculatePrediction, getCompanyMatches } from './services/predictionEngine';
import { getAIGuidance } from './services/geminiService';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import AcademicInfo from './components/AcademicInfo';
import GlassCard from './components/GlassCard';

type View = 'input' | 'dashboard' | 'academic';

const App: React.FC = () => {
  const [view, setView] = useState<View>('input');
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [companies, setCompanies] = useState<CompanyFit[]>([]);
  const [roadmap, setRoadmap] = useState<ImprovementAction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGenerateIntelligence = async (data: StudentProfile) => {
    setIsProcessing(true);
    setProfile(data);
    
    // Simulating heavy processing for UX
    setTimeout(async () => {
      const pred = calculatePrediction(data);
      const matches = getCompanyMatches(data);
      setPrediction(pred);
      setCompanies(matches);
      
      const guide = await getAIGuidance(data);
      setRoadmap(guide);
      
      setIsProcessing(false);
      setView('dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <nav className="glass-dark border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Rocket className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-orbitron font-bold text-xl tracking-tight leading-none">PLACEMENT <span className="text-cyan-400">SUCCESS</span></h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-[0.2em] mt-1">AI-DRIVEN CAREER INTELLIGENCE</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setView('input')} className={`text-sm font-medium transition-colors ${view === 'input' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Assessment</button>
            <button disabled={!prediction} onClick={() => setView('dashboard')} className={`text-sm font-medium transition-colors ${!prediction ? 'opacity-30 cursor-not-allowed' : view === 'dashboard' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Dashboard</button>
            <button onClick={() => setView('academic')} className={`text-sm font-medium transition-colors ${view === 'academic' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Framework</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-white">{profile.name || 'Student'}</span>
              <span className="text-[10px] text-slate-500">Batch of 2025</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 p-0.5 overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} alt="Avatar" className="w-full h-full bg-slate-800" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 pt-10">
        {isProcessing && (
          <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-6">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <BrainCircuit className="absolute inset-0 m-auto text-cyan-400" size={32} />
            </div>
            <h2 className="text-2xl font-orbitron text-white mb-2">Analyzing Profile Dynamics...</h2>
            <p className="text-slate-400 max-w-sm">Aggregating academic data, mapping skills to industry benchmarks, and generating your personalized placement success roadmap.</p>
          </div>
        )}

        {view === 'input' && (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-orbitron mb-4">Initialize Your <span className="text-gradient">Career Engine</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Upload your academic credentials and skill data to generate an AI-powered employability audit.</p>
            </div>
            <InputForm initialData={profile} onSubmit={handleGenerateIntelligence} />
          </div>
        )}

        {view === 'dashboard' && prediction && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-700">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
               <div>
                  <h2 className="text-3xl font-orbitron mb-1">Employability <span className="text-gradient">Intelligence Report</span></h2>
                  <p className="text-slate-500 text-sm">Targeting: {profile.preferredRole} @ {profile.preferredCompanyType}</p>
               </div>
               <div className="flex gap-3">
                  <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all">
                    <FileText size={18} /> Export PDF
                  </button>
                  <button onClick={() => setView('input')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all">
                    Update Profile
                  </button>
               </div>
             </div>
             
             <Dashboard prediction={prediction} profile={profile} companies={companies} />

             {/* Roadmap Module */}
             <div className="mt-12 pb-20">
                <h3 className="text-xl font-orbitron mb-6 flex items-center gap-3">
                  <Target className="text-indigo-400" /> Improvement Action Plan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {roadmap.map((action, i) => (
                    <GlassCard key={i} className={`border-l-4 ${
                      action.priority === 'High' ? 'border-l-red-500' :
                      action.priority === 'Medium' ? 'border-l-yellow-500' : 'border-l-green-500'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] uppercase font-bold text-slate-500">{action.category}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          action.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                          action.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                        }`}>{action.priority} Priority</span>
                      </div>
                      <h4 className="font-bold text-white mb-2">{action.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{action.description}</p>
                    </GlassCard>
                  ))}
                </div>
             </div>
          </div>
        )}

        {view === 'academic' && <AcademicInfo />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-10 bg-slate-950/50">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="text-cyan-400" size={24} />
              <span className="font-orbitron font-bold text-lg">PLACEMENT SUCCESS</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              A comprehensive career intelligence platform utilizing advanced heuristics and generative AI to bridge the gap between academic learning and industry requirements.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="font-bold text-white mb-4">Quick Links</h5>
              <ul className="text-sm text-slate-500 space-y-2">
                <li><button onClick={() => setView('input')} className="hover:text-cyan-400 transition-colors">Start Assessment</button></li>
                <li><button onClick={() => setView('dashboard')} className="hover:text-cyan-400 transition-colors">Dashboard</button></li>
                <li><button onClick={() => setView('academic')} className="hover:text-cyan-400 transition-colors">Framework</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">Resources</h5>
              <ul className="text-sm text-slate-500 space-y-2">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Sample Data</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Research Paper</a></li>
              </ul>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Connect</h5>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500 transition-all"><Github size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500 transition-all"><Linkedin size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500 transition-all"><Mail size={20} /></a>
            </div>
            <p className="text-[10px] text-slate-600 mt-6 uppercase tracking-widest font-medium">Final Year Project - 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Re-defining BrainCircuit for compatibility if Lucide version differs
const BrainCircuit: React.FC<{className?: string, size?: number}> = ({ className, size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 4 4 0 0 0 5.327 3.655A4 4 0 0 0 16 20a4 4 0 0 0 3.655-5.327 4 4 0 0 0-3.655-3.655" />
    <path d="M9 13a3 3 0 1 0 3-3" />
    <path d="M11 10V8" />
    <path d="M13 14v2" />
    <path d="M10 16h2" />
    <path d="M12 12h2" />
  </svg>
);

export default App;
