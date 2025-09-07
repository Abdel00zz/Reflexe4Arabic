/**
 * @file This service handled interactions with the Google Gemini API.
 * It has been disabled to create a fully offline version of the application.
 */

// All AI functionality has been removed to ensure the app is 100% offline.
// FIX: Add mock function to resolve import error in StorySpark component.
export const generateStory = async (words: string[]): Promise<string> => {
    return `هذه قصة رائعة عن ${words.join(' و ')}. (تم تعطيل الذكاء الاصطناعي لهذه النسخة)`;
};
