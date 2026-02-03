
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, AreaChart, Area
} from 'recharts';
import { TrendingUp, Target, ShieldCheck, AlertCircle, Briefcase, Zap, Star } from 'lucide-react';
import { PredictionResult, StudentProfile, CompanyFit } from '../types';
import GlassCard from './GlassCard';

interface DashboardProps {
  prediction: PredictionResult;
  profile: StudentProfile;
  companies: CompanyFit[];
}

const Dashboard: React.FC<DashboardProps> = ({ prediction, profile, companies }) => {
  const radarData = [
    { subject: 'Academic', A: prediction.academicImpact, fullMark: 100 },
    { subject: 'Skills', A: prediction.skillImpact, fullMark: 100 },
    { subject: 'Experience', A: prediction.experienceImpact, fullMark: 100 },
    { subject: 'Soft Skills', A: prediction.softSkillImpact, fullMark: 100 },
    { subject: 'Aptitude', A: profile.aptitudeScore, fullMark: 100 },
  ];

  const skillData = profile.skills.map(s => ({
    name: s.name,
    val: s.proficiency === 'Advanced' ? 100 : s.proficiency === 'Intermediate' ? 70 : 40
  }));

  const getRiskColor = (level: string) => {
    if (level === 'Low') return 'text-green-400';
    if (level === 'Medium') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
      {/* 1. Placement Probability Visualization */}
      <GlassCard className="lg:col-span-4 flex flex-col items-center justify-center text-center">
        <div className="relative w-48 h-48 mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96" cy="96" r="80"
              stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none"
            />
            <circle
              cx="96" cy="96" r="80"
              stroke="url(#gradient)" strokeWidth="12" fill="none"
              strokeDasharray={502}
              strokeDashoffset={502 - (502 * prediction.overallProbability) / 100}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold font-orbitron text-white">{prediction.overallProbability}%</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest">Success Rate</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className={`flex items-center gap-2 font-medium ${getRiskColor(prediction.riskLevel)}`}>
            {prediction.riskLevel === 'Low' ? <ShieldCheck size={18} /> : <AlertCircle size={18} />}
            Risk Level: {prediction.riskLevel}
          </div>
          <p className="text-sm text-gray-400 italic">Confidence: {prediction.confidenceScore}%</p>
        </div>
      </GlassCard>

      {/* 2. Skill Radar Chart */}
      <GlassCard title="Employability Radar" className="lg:col-span-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Radar
                name="Performance"
                dataKey="A"
                stroke="#22d3ee"
                fill="#22d3ee"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* 3. Skill Proficiencies */}
      <GlassCard title="Top Technical Skills" className="lg:col-span-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={80} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ background: '#0f172a', border: '1px solid #1e293b' }}
              />
              <Bar dataKey="val" radius={[0, 4, 4, 0]}>
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#22d3ee' : '#818cf8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* 4. Explainable AI Section */}
      <GlassCard className="lg:col-span-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-cyan-500/10 p-4 rounded-full border border-cyan-500/20">
            <TrendingUp size={32} className="text-cyan-400" />
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" /> AI Insights & Explainability
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-4xl">
              {prediction.explanation}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* 5. Company Matching Engine */}
      <div className="lg:col-span-12">
        <h3 className="text-xl font-orbitron mb-6 flex items-center gap-3">
          <Briefcase className="text-indigo-400" /> Company Match Engine
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {companies.map((company, idx) => (
            <GlassCard key={idx} className="hover:border-cyan-500/30 transition-all cursor-default">
              <div className="flex items-center gap-3 mb-4">
                <img src={company.logo} alt={company.name} className="w-10 h-10 rounded-lg" />
                <div>
                  <h4 className="font-bold text-white">{company.name}</h4>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    company.category === 'Dream' ? 'bg-purple-500/20 text-purple-400' :
                    company.category === 'Safe' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {company.category}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1 flex justify-between">
                  Fit Score <span>{company.fitScore}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      company.fitScore > 85 ? 'bg-cyan-400' : company.fitScore > 70 ? 'bg-indigo-400' : 'bg-slate-600'
                    }`} 
                    style={{ width: `${company.fitScore}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3 line-clamp-1 italic">{company.role}</p>
              <div className="flex flex-wrap gap-1">
                {company.matchingSkills.map((s, i) => (
                  <span key={i} className="text-[10px] bg-slate-800/50 text-slate-400 px-1.5 py-0.5 rounded border border-white/5">
                    {s}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
