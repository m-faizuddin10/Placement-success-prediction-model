
import React, { useState } from 'react';
import { 
  GraduationCap, Code, Briefcase, Brain, Trophy, BriefcaseBusiness,
  ChevronRight, ChevronLeft, Plus, X 
} from 'lucide-react';
import { StudentProfile, Skill } from '../types';
import GlassCard from './GlassCard';

interface InputFormProps {
  initialData: StudentProfile;
  onSubmit: (data: StudentProfile) => void;
}

const InputForm: React.FC<InputFormProps> = ({ initialData, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<StudentProfile>(initialData);

  const steps = [
    { id: 1, label: 'Academic', icon: <GraduationCap size={20} /> },
    { id: 2, label: 'Technical', icon: <Code size={20} /> },
    { id: 3, label: 'Exposure', icon: <Briefcase size={20} /> },
    { id: 4, label: 'Cognitive', icon: <Brain size={20} /> },
    { id: 5, label: 'Achievements', icon: <Trophy size={20} /> },
    { id: 6, label: 'Goals', icon: <BriefcaseBusiness size={20} /> },
  ];

  const updateField = (field: keyof StudentProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    const name = prompt('Skill name?');
    if (name) {
      updateField('skills', [...profile.skills, { name, proficiency: 'Intermediate', category: 'Domain' }]);
    }
  };

  const removeSkill = (index: number) => {
    updateField('skills', profile.skills.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (step < steps.length) setStep(s => s + 1);
    else onSubmit(profile);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-10 overflow-x-auto pb-4 gap-4 no-scrollbar">
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center min-w-[80px]">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              step >= s.id ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-slate-800 text-slate-500'
            }`}>
              {s.icon}
            </div>
            <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${
              step === s.id ? 'text-cyan-400' : 'text-slate-500'
            }`}>{s.label}</span>
          </div>
        ))}
      </div>

      <GlassCard className="min-h-[400px] flex flex-col justify-between">
        <div className="space-y-6">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                <input type="text" value={profile.name} onChange={e => updateField('name', e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Degree</label>
                <input type="text" value={profile.degree} onChange={e => updateField('degree', e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Current CGPA</label>
                <input type="number" step="0.1" value={profile.cgpa} onChange={e => updateField('cgpa', parseFloat(e.target.value))} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Academic Consistency (%)</label>
                <input type="number" value={profile.consistencyScore} onChange={e => updateField('consistencyScore', parseInt(e.target.value))} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-cyan-400">Technical Skills Stack</h4>
                <button onClick={addSkill} className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm flex items-center gap-2 transition-all">
                  <Plus size={16} /> Add Skill
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {profile.skills.map((skill, idx) => (
                  <div key={idx} className="bg-slate-900/40 p-3 rounded-xl border border-slate-700 flex flex-col gap-2 relative group">
                    <button onClick={() => removeSkill(idx)} className="absolute top-2 right-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                    <span className="font-medium text-sm">{skill.name}</span>
                    <select 
                      value={skill.proficiency} 
                      onChange={(e) => {
                        const newSkills = [...profile.skills];
                        newSkills[idx].proficiency = e.target.value as any;
                        updateField('skills', newSkills);
                      }}
                      className="bg-transparent text-[10px] text-cyan-400 outline-none uppercase font-bold cursor-pointer"
                    >
                      <option className="bg-slate-900" value="Beginner">Beginner</option>
                      <option className="bg-slate-900" value="Intermediate">Intermediate</option>
                      <option className="bg-slate-900" value="Advanced">Advanced</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Internships Completed</label>
                <input type="number" value={profile.internships} onChange={e => updateField('internships', parseInt(e.target.value))} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Key Projects Count</label>
                <input type="number" value={profile.projects} onChange={e => updateField('projects', parseInt(e.target.value))} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={profile.openSource} onChange={e => updateField('openSource', e.target.checked)} className="w-5 h-5 accent-cyan-500" />
                <label className="text-sm font-medium text-slate-400">Has Open Source Contributions?</label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Aptitude & Reasoning (0-100)</label>
                <input type="range" min="0" max="100" value={profile.aptitudeScore} onChange={e => updateField('aptitudeScore', parseInt(e.target.value))} className="w-full accent-cyan-500" />
                <div className="text-right text-xs text-cyan-400 font-bold">{profile.aptitudeScore}%</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Communication Rating (1-5)</label>
                <input type="range" min="1" max="5" value={profile.communicationRating} onChange={e => updateField('communicationRating', parseInt(e.target.value))} className="w-full accent-indigo-500" />
                <div className="text-right text-xs text-indigo-400 font-bold">{profile.communicationRating}/5</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Leadership Indicator (1-5)</label>
                <input type="range" min="1" max="5" value={profile.leadershipRating} onChange={e => updateField('leadershipRating', parseInt(e.target.value))} className="w-full accent-purple-500" />
                <div className="text-right text-xs text-purple-400 font-bold">{profile.leadershipRating}/5</div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Hackathons Won/Participated</label>
                <input type="number" value={profile.hackathons} onChange={e => updateField('hackathons', parseInt(e.target.value))} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Coding Contest Wins</label>
                <input type="number" value={profile.codingContests} onChange={e => updateField('codingContests', parseInt(e.target.value))} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Target Job Role</label>
                <input type="text" value={profile.preferredRole} onChange={e => updateField('preferredRole', e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Desired CTC (Annual INR)</label>
                <input type="number" value={profile.salaryExpectation} onChange={e => updateField('salaryExpectation', parseInt(e.target.value))} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Preferred Company Type</label>
                <select value={profile.preferredCompanyType} onChange={e => updateField('preferredCompanyType', e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500">
                  <option value="Product-Based">Product-Based (Big Tech)</option>
                  <option value="Service-Based">Service-Based (MNC)</option>
                  <option value="Startup">Early-Stage Startup</option>
                  <option value="Fintech">Fintech/Banking</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-10 pt-6 border-t border-slate-800">
          <button 
            disabled={step === 1}
            onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white disabled:opacity-30 transition-all"
          >
            <ChevronLeft size={20} /> Back
          </button>
          <button 
            onClick={handleNext}
            className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold py-2 px-8 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            {step === steps.length ? 'Generate Intelligence Report' : 'Continue'} <ChevronRight size={20} />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default InputForm;
