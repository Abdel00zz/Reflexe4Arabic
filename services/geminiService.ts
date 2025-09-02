/**
 * @file This service handles all interactions with the Google Gemini API.
 * It is responsible for sending prompts and receiving generated content.
 */

import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available, otherwise throw an error.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

// Initialize the GoogleGenAI client with the API key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a short, two-sentence story for a 5-year-old child using specified words.
 * @param words - An array of Arabic words to be included in the story.
 * @returns A promise that resolves to the generated story string.
 */
export const generateStory = async (words: string[]): Promise<string> => {
  try {
    // Construct a detailed prompt for the AI model.
    // It specifies the persona (talented children's story writer), task (write a short story),
    // constraints (two sentences, for a 5-year-old, fully vocalized Arabic), and required words.
    const prompt = `أَنْتَ كَاتِبُ قِصَصِ أَطْفَالٍ مَوْهُوبٌ. اُكْتُبْ قِصَّةً قَصِيرَةً جِدًّا مِنْ جُمْلَتَيْنِ فَقَطْ بِاللُّغَةِ الْعَرَبِيَّةِ لِطِفْلٍ عُمْرُهُ 5 سَنَوَاتٍ. يَجِبُ أَنْ تَكُونَ الْقِصَّةُ بَسِيطَةً وَمُمْتِعَةً وَمَشْكُولَةً بِالْكَامِلِ (بِالْحَرَكَاتِ)، وَأَنْ تَحْتَوِيَ عَلَى هَذِهِ الْكَلِمَاتِ: ${words.join('، ')}.`;
    
    // Call the Gemini API to generate content.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8, // Controls randomness, higher is more creative.
        maxOutputTokens: 100, // Limits the length of the response.
        thinkingConfig: { thinkingBudget: 50 }, // Reserves tokens for model thinking.
      }
    });

    // Return the generated text.
    return response.text;
  } catch (error) {
    // Log the error and return a user-friendly error message in Arabic.
    console.error("Error generating story with Gemini API:", error);
    return "عَفْوًا، لَمْ أَتَمَكَّنْ مِنْ تَأْلِيفِ قِصَّةٍ الْآنَ. حَاوِلْ مَرَّةً أُخْرَى!";
  }
};