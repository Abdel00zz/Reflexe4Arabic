/**
 * @file This utility manages all audio playback for the application.
 * It centralizes the sound effects for correct and incorrect answers.
 * The sound URLs have been updated to more reliable sources to fix playback issues.
 */

// Create reusable Audio objects to potentially improve performance and reliability.
const correctSound = new Audio('https://eleven-public-cdn.elevenlabs.io/payloadcms/9j2oxyp2tse-yayyy-sfx-10.mp3');
const incorrectSound = new Audio('https://eleven-public-cdn.elevenlabs.io/payloadcms/xszkkqyr69e-ohhh-nooo-sfx-1.mp3');

/**
 * Plays a success sound effect.
 * It resets the audio time to allow for rapid replays.
 */
export const playCorrectSound = () => {
  correctSound.currentTime = 0;
  correctSound.play().catch(e => console.error("Error playing correct sound:", e));
};

/**
 * Plays an error/incorrect sound effect.
 * It resets the audio time to allow for rapid replays.
 */
export const playIncorrectSound = () => {
  incorrectSound.currentTime = 0;
  incorrectSound.play().catch(e => console.error("Error playing incorrect sound:", e));
};