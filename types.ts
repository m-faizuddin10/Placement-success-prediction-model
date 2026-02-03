
export interface Skill {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Language' | 'Domain' | 'Framework';
}

export interface StudentProfile {
  name: string;
  degree: string;
  branch: string;
  cgpa: number;
  consistencyScore: number;
  skills: Skill[];
  internships: number;
  projects: number;
  openSource: boolean;
  aptitudeScore: number;
  communicationRating: number;
  leadershipRating: number;
  hackathons: number;
  codingContests: number;
  certifications: string[];
  preferredRole: string;
  preferredCompanyType: string;
  salaryExpectation: number;
}

export interface PredictionResult {
  overallProbability: number;
  confidenceScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  academicImpact: number;
  skillImpact: number;
  experienceImpact: number;
  softSkillImpact: number;
  explanation: string;
}

export interface CompanyFit {
  name: string;
  logo: string;
  category: 'Safe' | 'Moderate' | 'Dream';
  fitScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  role: string;
}

export interface ImprovementAction {
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
}
