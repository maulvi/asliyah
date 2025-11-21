import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getStylingAdvice = async (
  userMessage: string, 
  currentProductContext?: string
): Promise<string> => {
  if (!apiKey) {
    return "I'm currently offline (API Key missing). Please check back later!";
  }

  try {
    const systemInstruction = `
      You are Aura, a high-end, sophisticated personal stylist and beauty consultant for a luxury ecommerce brand.
      Your tone is chic, concise, warm, and professional. You are an expert in fashion trends, skincare ingredients, and color theory.
      
      Goal: Help the customer find the perfect product or answer their questions to encourage a purchase (convert).
      
      Guidelines:
      1. Keep responses short (under 3 sentences) unless asked for a detailed routine.
      2. If a product context is provided, refer to it specifically.
      3. Use human psychology: Compliment their taste, create a sense of exclusivity, or mention "trending" aspects.
      4. Do not hallucinate products not in the catalog (assume general advice if product unknown).
    `;

    const prompt = currentProductContext 
      ? `Context: User is looking at product "${currentProductContext}". User asks: ${userMessage}`
      : `User asks: ${userMessage}`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having a moment of reflection. Could you ask that again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the fashion network right now. Please try again.";
  }
};