import { GoogleGenAI, Content } from "@google/genai";
import { SolarTerm } from '../types';

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    // NOTE: In a real production app, ensure process.env.API_KEY is defined.
    // For this demo, we assume the environment is set up correctly.
    if (process.env.API_KEY) {
        aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
  }
  return aiClient;
};

export const explainSolarTerm = async (term: SolarTerm, question?: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "API Key not configured. Please check your environment settings.";

  const prompt = question 
    ? `Regarding the Chinese Solar Term "${term.name}" (${term.enName}): ${question}. Answer concisely in Chinese within 100 words.`
    : `Explain the cultural significance, phenology (biology), and farming activities related to the Chinese Solar Term "${term.name}" (${term.enName}). Keep it poetic yet scientific, suitable for a futuristic data interface. Max 100 words in Chinese.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error retrieving data from the cosmos link.";
  }
};

export const streamGeminiChat = async (history: Content[], message: string) => {
    const ai = getAiClient();
    if (!ai) throw new Error("API Key not configured");
    
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: history,
        config: {
            systemInstruction: "You are a virtual guide for the 'Solar Term Cosmos', a futuristic encyclopedia of the 24 Chinese Solar Terms. Your tone is knowledgeable, poetic, and scientific. You help users understand the fusion of ancient wisdom and modern data. Keep answers concise (under 150 words) unless asked for more details. Speak in Chinese by default.",
        }
    });

    return await chat.sendMessageStream({ message });
};