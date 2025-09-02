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
  CROSSWORD = 'CROSSWORD',
  SENTENCE_BUILDER = 'SENTENCE_BUILDER',
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
 */
export interface MatchingPair {
  id: number; // Unique ID for the pair type.
  word: string; // The word on the card.
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
 * Interface for a single clue in the Crossword puzzle.
 */
export interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
  row: number;
  col: number;
  direction: 'across' | 'down';
}

/**
 * Interface for the entire Crossword puzzle data.
 */
export interface CrosswordData {
  id: number;
  size: number; // The grid size (e.g., 5 for a 5x5 grid).
  clues: CrosswordClue[];
}

// FIX: Add StoryWord interface for StorySpark component.
/**
 * Interface for a word used in the Story Spark component.
 */
export interface StoryWord {
  id: number;
  word: string;
  emoji: string;
}

// FIX: Add ListenQuestion interface for ListenChooseExercise component.
/**
 * Interface for a question in the "Listen and Choose" exercise.
 */
export interface ListenQuestion {
  id: number;
  correctWord: string; // The word to be spoken.
  options: string[]; // List of words to choose from, including the correct one.
}
