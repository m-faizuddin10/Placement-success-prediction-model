
import { StudentProfile, PredictionResult, CompanyFit, Skill } from '../types';
import { COMPANY_DATA } from '../constants';

export const calculatePrediction = (profile: StudentProfile): PredictionResult => {
  // Logic Weighting
  const wA = 0.25; // Academics
  const wS = 0.35; // Skills
  const wE = 0.25; // Experience
  const wSS = 0.15; // Soft Skills

  // Academic Score (normalized to 100)
  const sA = (profile.cgpa * 10) * 0.7 + profile.consistencyScore * 0.3;
  
  // Skill Score
  const sS = profile.skills.reduce((acc, s) => {
    let p = 0;
    if (s.proficiency === 'Advanced') p = 100;
    else if (s.proficiency === 'Intermediate') p = 70;
    else p = 40;
    return acc + p;
  }, 0) / (profile.skills.length || 1);

  // Experience Score
  const sE = Math.min(100, (profile.internships * 30) + (profile.projects * 15) + (profile.openSource ? 20 : 0));

  // Soft Skill Score
  const sSS = (profile.aptitudeScore * 0.5) + (profile.communicationRating * 10) + (profile.leadershipRating * 10);

  const total = (sA * wA) + (sS * wS) + (sE * wE) + (sSS * wSS);
  
  return {
    overallProbability: Math.min(98, Math.round(total)),
    confidenceScore: 92,
    riskLevel: total > 80 ? 'Low' : total > 60 ? 'Medium' : 'High',
    academicImpact: Math.round(sA),
    skillImpact: Math.round(sS),
    experienceImpact: Math.round(sE),
    softSkillImpact: Math.round(sSS),
    explanation: `Based on your profile, your primary strength lies in ${sA > sS ? 'Academics' : 'Technical Skills'}. With ${profile.projects} projects and an open-source footprint, you show strong practical alignment. Improvements in ${sSS < 70 ? 'Soft Skills' : 'Domain Depth'} could further boost your dream company prospects.`
  };
};

export const getCompanyMatches = (profile: StudentProfile): CompanyFit[] => {
  return COMPANY_DATA.map((c, idx) => {
    const baseScore = 60 + Math.random() * 30;
    const category = c.category as 'Safe' | 'Moderate' | 'Dream';
    
    // Simple heuristic for demo
    let fit = baseScore;
    if (category === 'Dream') fit -= 10;
    if (category === 'Safe') fit += 10;
    
    return {
      ...c,
      fitScore: Math.round(Math.min(100, fit)),
      matchingSkills: profile.skills.slice(0, 3).map(s => s.name),
      missingSkills: ['System Design', 'Kubernetes'].slice(0, 1),
    } as CompanyFit;
  });
};
