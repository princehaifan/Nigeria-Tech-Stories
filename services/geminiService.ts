import { GoogleGenAI, Type } from "@google/genai";
import type { Story } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getToneDescription = (tone: number): string => {
  if (tone < -0.6) return 'very soft, sweet, and romantic, with minimal tension';
  if (tone < -0.2) return 'gentle and heartwarming';
  if (tone < 0.2) return 'neutral and observational';
  if (tone < 0.6) return 'playful with light-hearted banter';
  return 'very spicy, witty, and full of sharp, flirtatious banter (pepper dem style)';
};

const storySchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A catchy, Lagos-flavored title for the story.",
    },
    text: {
      type: Type.STRING,
      description: "The full text of the micro-story.",
    },
  },
  required: ['title', 'text'],
};

export const generateStory = async (length: number, tone: number): Promise<Story> => {
  const toneDesc = getToneDescription(tone);
  const lengthDesc = `around ${length} words`;

  const systemInstruction = `You are a creative writer specializing in short, humorous, and romantic fiction set in the vibrant tech scene of Lagos, Nigeria.
Your stories capture the unique slang, culture, and dynamics of young professionals in the city. You write in the specific voice of the 'Product Manager & Her Ashawo Shorts Tech Bro' trope.
Your audience wants fast, spicy, shareable fiction. Use authentic Nigerian pidgin and slang where appropriate (e.g., "Omo," "wahala," "sabi," "no wahala," "dey play").
The stories should be relatable, funny, and sometimes a little romantic or suggestive, but never explicit.
Focus on workplace banter, after-work drinks, Lagos traffic shenanigans, and the hilarious clash of personalities in the tech ecosystem.
Always return the story in the specified JSON format.`;

  const prompt = `Generate a micro-story about a Lagos Product Manager and a Tech Bro.
- Story Length: ${lengthDesc}
- Tone: ${toneDesc}
- Ensure the story has a clear, engaging narrative arc, even if it's short.
- Give it a great title.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: storySchema,
        temperature: 0.9 + (tone * 0.1), // Add a bit more creativity for spicier tones
      },
    });

    const jsonString = response.text.trim();
    const parsedStory: { title: string; text: string } = JSON.parse(jsonString);
    
    // Basic validation
    if (!parsedStory.title || !parsedStory.text) {
        throw new Error("Received invalid story format from API.");
    }

    return {
      ...parsedStory,
      length,
      tone,
    };

  } catch (error) {
    console.error("Error generating story:", error);
    if (error instanceof Error && error.message.includes("SAFETY")) {
        return {
            title: "Content Moderated",
            text: "This story idea was flagged by our safety filters. Please try a different approach or adjust the tone to be less spicy.",
            length,
            tone,
        };
    }
    throw new Error("Failed to generate story. The creative juices aren't flowing right now. Please try again.");
  }
};
