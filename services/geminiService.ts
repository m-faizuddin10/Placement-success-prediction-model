
import { GoogleGenAI, Type } from "@google/genai";
import { StudentProfile, ImprovementAction } from "../types";

// Always use the latest instance for fresh key access as per SDK guidelines.
// Removed the global instance to comply with "Create a new GoogleGenAI instance right before making an API call".

export const getAIGuidance = async (profile: StudentProfile): Promise<ImprovementAction[]> => {
  // Use named parameter and direct environment variable access
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a prioritized career improvement action plan for a student with the following profile: ${JSON.stringify(profile)}. Provide actionable steps.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ['category', 'priority', 'title', 'description']
          }
        }
      }
    });

    // Directly access the .text property (not a method) as per guidelines.
    if (response.text) {
      return JSON.parse(response.text);
    }
  } catch (error) {
    console.error("Gemini Error:", error);
  }
  
  // Fallback data
  return [
    { category: 'Technical Skills', priority: 'High', title: 'Master System Design', description: 'Focus on scalability, load balancing, and database sharding.' },
    { category: 'Aptitude', priority: 'Medium', title: 'Quantitative Reasoning', description: 'Practice competitive math and logic puzzles daily for 30 mins.' },
    { category: 'Experience', priority: 'High', title: 'Full-stack Portfolio', description: 'Deploy a production-ready MERN application with CI/CD pipelines.' }
  ];
};
