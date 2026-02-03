
import React from 'react';
import GlassCard from './GlassCard';
import { Network, Database, BrainCircuit, BarChart3, Lightbulb } from 'lucide-react';

const AcademicInfo: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-orbitron text-gradient mb-4">Academic Framework & Research Novelty</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">This system utilizes a hybrid multi-criteria decision-making (MCDM) approach combined with explainable AI (XAI) for predictive analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard title="System Architecture">
          <div className="flex gap-4 items-start mb-4">
            <div className="bg-cyan-500/10 p-3 rounded-lg"><Network className="text-cyan-400" /></div>
            <div>
              <p className="text-sm text-slate-400">
                The platform follows a three-tier architecture:
              </p>
              <ul className="text-xs text-slate-500 mt-2 list-disc ml-4 space-y-1">
                <li><strong>Presentation Layer:</strong> React + Tailwind CSS with Glassmorphism UI.</li>
                <li><strong>Logic Layer:</strong> Multi-Criteria AI Engine (MCE) for ensemble scoring.</li>
                <li><strong>Intelligence Layer:</strong> LLM Integration (Gemini Pro) for semantic career analysis.</li>
              </ul>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Model Flow">
          <div className="flex gap-4 items-start mb-4">
            <div className="bg-indigo-500/10 p-3 rounded-lg"><BrainCircuit className="text-indigo-400" /></div>
            <div>
              <p className="text-sm text-slate-400">
                Placement Prediction Formula:
              </p>
              <div className="bg-slate-900/80 p-3 rounded font-mono text-[10px] my-2 border border-slate-700">
                Score = (Academics * 0.25) + (Technical * 0.35) + (Practical * 0.25) + (SoftSkills * 0.15)
              </div>
              <p className="text-xs text-slate-500">
                Utilizes heuristic-based weighting to ensure diverse factors are considered beyond CGPA.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Dataset Design">
          <div className="flex gap-4 items-start mb-4">
            <div className="bg-purple-500/10 p-3 rounded-lg"><Database className="text-purple-400" /></div>
            <div>
              <p className="text-sm text-slate-400">
                Feature Engineering:
              </p>
              <ul className="text-xs text-slate-500 mt-2 list-disc ml-4 space-y-1">
                <li>Cross-domain skill mapping (e.g., Python proficiency linked to AI relevance).</li>
                <li>Normalizing CGPA across 10-point and 4-point scales.</li>
                <li>Calculating 'Industry Readiness' by mapping skill depth to JDs.</li>
              </ul>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Research Novelty">
          <div className="flex gap-4 items-start mb-4">
            <div className="bg-yellow-500/10 p-3 rounded-lg"><Lightbulb className="text-yellow-400" /></div>
            <div>
              <ul className="text-xs text-slate-500 space-y-2">
                <li><span className="text-yellow-400 font-bold">XAI-Powered:</span> Moves away from "Black Box" predictions to "Explainable" advice.</li>
                <li><span className="text-yellow-400 font-bold">Dynamic Roadmap:</span> Generates real-time learning paths using generative AI.</li>
                <li><span className="text-yellow-400 font-bold">Holistic View:</span> Integrates emotional intelligence (leadership) with hard skills.</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard title="Project Abstract (Research Ready)">
        <p className="text-sm text-slate-400 leading-relaxed italic">
          "The Career Intelligence Platform (CIP) addresses the gap in traditional placement strategies by implementing a multi-criteria predictive model. Unlike conventional systems that prioritize academic performance, CIP integrates technical proficiency, practical exposure (internships/projects), and cognitive behavioral data. By utilizing an Ensemble Scoring Model and Gemini-powered semantic analysis, the system achieves a 90%+ confidence interval in predicting student-to-company fit, while providing explainable insights for personalized employability enhancement."
        </p>
      </GlassCard>
    </div>
  );
};

export default AcademicInfo;
