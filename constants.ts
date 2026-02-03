
import { CompanyFit, Skill } from './types';

export const COMPANY_DATA: Partial<CompanyFit>[] = [
  { name: 'Google', logo: 'https://picsum.photos/40/40?1', category: 'Dream', role: 'Software Engineer (L3)' },
  { name: 'Microsoft', logo: 'https://picsum.photos/40/40?2', category: 'Dream', role: 'SDE-I' },
  { name: 'Accenture', logo: 'https://picsum.photos/40/40?3', category: 'Safe', role: 'Application Developer' },
  { name: 'TCS', logo: 'https://picsum.photos/40/40?4', category: 'Safe', role: 'System Engineer' },
  { name: 'Zomato', logo: 'https://picsum.photos/40/40?5', category: 'Moderate', role: 'Full Stack Dev' },
  { name: 'Amazon', logo: 'https://picsum.photos/40/40?6', category: 'Dream', role: 'SDE Intern' },
  { name: 'Coinbase', logo: 'https://picsum.photos/40/40?7', category: 'Moderate', role: 'Backend Engineer' },
];

export const BENCHMARK_SKILLS: Skill[] = [
  { name: 'Data Structures', proficiency: 'Advanced', category: 'Domain' },
  { name: 'System Design', proficiency: 'Intermediate', category: 'Domain' },
  { name: 'Python', proficiency: 'Advanced', category: 'Language' },
  { name: 'React', proficiency: 'Advanced', category: 'Framework' },
  { name: 'Cloud Computing', proficiency: 'Intermediate', category: 'Domain' },
];

export const INITIAL_PROFILE: any = {
  name: 'Alex Johnson',
  degree: 'B.Tech',
  branch: 'Computer Science',
  cgpa: 8.5,
  consistencyScore: 90,
  skills: [
    { name: 'JavaScript', proficiency: 'Advanced', category: 'Language' },
    { name: 'React', proficiency: 'Intermediate', category: 'Framework' },
    { name: 'Node.js', proficiency: 'Beginner', category: 'Framework' },
    { name: 'Python', proficiency: 'Intermediate', category: 'Language' },
    { name: 'SQL', proficiency: 'Advanced', category: 'Domain' }
  ],
  internships: 1,
  projects: 3,
  openSource: true,
  aptitudeScore: 85,
  communicationRating: 4,
  leadershipRating: 3,
  hackathons: 2,
  codingContests: 5,
  certifications: ['AWS Cloud Practitioner', 'Google Data Analytics'],
  preferredRole: 'Full Stack Developer',
  preferredCompanyType: 'Product-Based',
  salaryExpectation: 1200000
};
