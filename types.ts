/**
 * @file This file defines the core TypeScript types and interfaces used throughout the application.
 * It establishes the data structures for different activities and exercises.
 */

/**
 * Enum representing all possible activity screens in the application.
 */
export enum ActivityType {
  MENU = 'MENU',
  COMPLETE_LETTER = 'COMPLETE_LETTER',
  COMPLETE_WORD = 'COMPLETE_WORD',
  MATCHING_GAME = 'MATCHING_GAME',
  WORD_SCRAMBLE = 'WORD_SCRAMBLE',
  WHO_AM_I = 'WHO_AM_I', // Replaced CROSSWORD
  SENTENCE_BUILDER = 'SENTENCE_BUILDER',
  // New cognitive activities
  WORD_HUNTER = 'WORD_HUNTER',
  FLASH_WORD = 'FLASH_WORD', // Replaced SHADOW_MATCH with a new reading speed game.
  DAYS_OF_WEEK = 'DAYS_OF_WEEK',
  OPPOSITES_MATCH = 'OPPOSITES_MATCH',
}

/**
 * Interface for a question in the "Complete the Letter" exercise.
 */
export interface LetterQuestion {
  id: number;
  wordHint: string; // The word with a blank, e.g., "قِـ_"
  correctLetter: string; // The correct letter to fill the blank.
  options: string[]; // A list of letters to choose from.
  vocalizedWord: string; // The fully formed and vocalized word, e.g., "قِطٌّ"
}

/**
 * Interface for a question in the "Complete the Word" exercise.
 */
export interface WordQuestion {
  id: number;
  sentenceHint: string; // The sentence with a blank, e.g., "الولد يشرب __"
  correctWord: string; // The correct word to fill the blank.
  options: string[]; // A list of words to choose from.
}

/**
 * Interface for a single item in the "Matching Game" (Memory Cards).
 * Now includes an emoji to match with the word.
 */
export interface MatchingPair {
  id: number; // Unique ID for the pair type.
  word: string; // The word on the card.
  emoji: string; // The corresponding emoji.
}

/**
 * Interface for a question in the "Word Scramble" exercise.
 */
export interface ScrambleQuestion {
  id: number;
  word: string; // The correct, unscrambled word.
  // Letters are segmented with their diacritics for correct display.
  scrambledLetters: string[];
  hint?: string; // An optional hint for the word.
}

/**
 * Interface for a question in the "Sentence Builder" exercise.
 */
export interface SentenceQuestion {
  id: number;
  correctSentence: string;
  scrambledWords: string[];
}

/**
 * Interface for a question in the "Who Am I?" riddle exercise.
 */
export interface WhoAmIQuestion {
  id: number;
  riddle: string;
  answer: string;
  options: string[];
}

// FIX: Add missing StoryLogicQuestion interface for the StoryLogicExercise component.
/**
 * Interface for a question in the "Story Logic" exercise.
 */
export interface StoryLogicQuestion {
  id: number;
  emojis: string[];
  correctOrder: string[];
  storySentence: string;
}

// FIX: Add missing CrosswordClue interface for the CrosswordExercise component.
/**
 * Interface for a clue in the Crossword exercise.
 */
export interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
  direction: 'across' | 'down';
  row: number;
  col: number;
}

/**
 * Interface for a question in the "Flash Word" exercise.
 * This tests rapid word recognition.
 */
export interface FlashWordQuestion {
  id: number;
  word: string;
  emoji: string;
  options: string[]; // The correct word plus three distractors.
}


/**
 * Interface for a question in the "Listen and Choose" exercise.
 */
export interface ListenQuestion {
  id: number;
  correctWord: string; // The word to be spoken.
  options: string[]; // List of words to choose from, including the correct one.
}

// FIX: Add missing StoryWord interface for the StorySpark component.
/**
 * Interface for a word used in the Story Spark generator.
 */
export interface StoryWord {
    id: number;
    word: string;
    emoji: string;
}

/**
 * Interface for a pair of opposite words for the Opposites Match game.
 */
export interface OppositesPair {
  id: number;
  word1: string;
  word2: string;
}

/**
 * Interface for tracking results for a single activity.
 */
export interface ActivityResult {
  correct: number;
  incorrect: number;
  score: number;
}

/**
 * Type for storing detailed results for all activities.
 */
export type DetailedResults = {
  [key in ActivityType]?: ActivityResult;
}

// --- New Types for Enhanced Games ---

/**
 * Enum for the different types of challenges in the "Days of the Week" game.
 */
export enum DaysOfWeekExerciseType {
  ORDER_DRAG_DROP = 'ORDER_DRAG_DROP',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

/**
 * Interface for a single exercise in the "Days of the Week" game.
 */
export interface DaysOfWeekExercise {
  id: number;
  type: DaysOfWeekExerciseType;
  prompt?: string; // For MULTIPLE_CHOICE, e.g., "Which day comes after Monday?"
  correctAnswer?: string;
  options?: string[];
}

/**
 * Enum for the different types of challenges in the "Opposites Match" game.
 */
export enum OppositesExerciseType {
  CONNECT_WORDS = 'CONNECT_WORDS',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
}

/**
 * Interface for a single exercise in the "Opposites Match" game.
 */
export interface OppositesExercise {
  id: number;
  type: OppositesExerciseType;
  // For CONNECT_WORDS
  pairs?: OppositesPair[];
  // For MULTIPLE_CHOICE
  promptWord?: string;
  // For FILL_IN_THE_BLANK
  sentenceHint?: string; // e.g., "الفيل كبير، لكن الفأر ___."
  // Common for MCQs and Fill-in-the-blank
  correctAnswer?: string;
  options?: string[];
}