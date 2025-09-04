/**
 * @file This file contains all the static content for the Arabic learning exercises.
 * It provides the data for letters, words, sentences, games, and other activities.
 */

// FIX: Import the new CrosswordClue type.
import {
  LetterQuestion,
  WordQuestion,
  MatchingPair,
  ScrambleQuestion,
  SentenceQuestion,
  WhoAmIQuestion,
  StoryWord,
  ListenQuestion,
  CrosswordClue
} from '../types';

// Data for "Complete the Letter" exercise.
export const letterQuestions: LetterQuestion[] = [
  { id: 1, wordHint: 'قِـ_', correctLetter: 'طّ', options: ['طّ', 'ف', 'ل'], vocalizedWord: 'قِطٌّ' },
  { id: 2, wordHint: 'أَرْنَـ_', correctLetter: 'ب', options: ['ب', 'د', 'ر'], vocalizedWord: 'أَرْنَبٌ' },
  { id: 3, wordHint: 'شَمْـ_', correctLetter: 'س', options: ['س', 'ش', 'ص'], vocalizedWord: 'شَمْسٌ' },
  { id: 4, wordHint: 'كِتَا_', correctLetter: 'ب', options: ['د', 'ب', 'ت'], vocalizedWord: 'كِتَابٌ' },
  { id: 5, wordHint: 'فِـ_', correctLetter: 'يل', options: ['يل', 'م', 'ن'], vocalizedWord: 'فِيلٌ' },
];

// Data for "Complete the Word" exercise.
export const wordQuestions: WordQuestion[] = [
  { id: 1, sentenceHint: 'الْوَلَدُ يَشْرَبُ ___', correctWord: 'الْحَلِيبَ', options: ['الْحَلِيبَ', 'الْكِتَابَ', 'السَّيَّارَةَ'] },
  { id: 2, sentenceHint: 'تَطِيرُ ___ فِي السَّمَاءِ', correctWord: 'الطَّائِرَةُ', options: ['السَّمَكَةُ', 'الطَّائِرَةُ', 'الْقِطَّةُ'] },
  { id: 3, sentenceHint: 'أَنَا أَذْهَبُ إِلَى ___', correctWord: 'الْمَدْرَسَةِ', options: ['الْمَطْبَخِ', 'الْحَدِيقَةِ', 'الْمَدْرَسَةِ'] },
];

// Data for "Matching Game".
export const matchingPairs: MatchingPair[] = [
  { id: 1, word: 'أَسَدٌ' },
  { id: 2, word: 'بَيْتٌ' },
  { id: 3, word: 'تُفَّاحَةٌ' },
  { id: 4, word: 'ثَوْبٌ' },
  { id: 5, word: 'جَمَلٌ' },
  { id: 6, word: 'حِصَانٌ' },
  { id: 7, word: 'خَرُوفٌ' },
  { id: 8, word: 'دِيكٌ' },
  { id: 9, word: 'ذِئْبٌ' },
  { id: 10, word: 'رَجُلٌ' },
  { id: 11, word: 'زَهْرَةٌ' },
  { id: 12, word: 'سَيَّارَةٌ' },
  { id: 13, word: 'شَجَرَةٌ' },
  { id: 14, word: 'صَقْرٌ' },
];

// Data for "Word Scramble" exercise.
export const scrambleQuestions: ScrambleQuestion[] = [
  { id: 1, word: 'مَدْرَسَةٌ', scrambledLetters: ['ة', 'س', 'ر', 'د', 'م'], hint: 'نَتَعَلَّمُ فِيهَا' },
  { id: 2, word: 'سَيَّارَةٌ', scrambledLetters: ['ة', 'ر', 'ا', 'ي', 'س'], hint: 'نَرْكَبُهَا لِنَسَافِرَ' },
  { id: 3, word: 'حَدِيقَةٌ', scrambledLetters: ['ة', 'ق', 'ي', 'د', 'ح'], hint: 'مَكَانٌ فِيهِ أَزْهَارٌ' },
];

// Data for "Sentence Builder" exercise.
export const sentenceQuestions: SentenceQuestion[] = [
    { id: 1, correctSentence: 'الْوَلَدُ يَلْعَبُ بِالْكُرَةِ', scrambledWords: ['بِالْكُرَةِ', 'يَلْعَبُ', 'الْوَلَدُ'] },
    { id: 2, correctSentence: 'الشَّمْسُ تُشْرِقُ فِي الصَّبَاحِ', scrambledWords: ['فِي', 'تُشْرِقُ', 'الصَّبَاحِ', 'الشَّمْسُ'] },
    { id: 3, correctSentence: 'أَنَا أُحِبُّ أُمِّي وَأَبِي', scrambledWords: ['وَأَبِي', 'أُمِّي', 'أَنَا', 'أُحِبُّ'] },
];

// Data for "Who Am I?" riddle exercise.
export const whoAmIQuestions: WhoAmIQuestion[] = [
  { 
    id: 1, 
    riddle: 'أَنَا مَلِكُ الْغَابَةِ، وَصَوْتِي زَئِيرٌ. مَنْ أَكُونُ؟', 
    answer: 'أَسَدٌ', 
    options: ['قِطٌّ', 'أَسَدٌ', 'نَمِرٌ'],
    image: 'https://images.pexels.com/photos/2220337/pexels-photo-2220337.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 2, 
    riddle: 'أُشْرِقُ فِي الصَّبَاحِ وَأُعْطِي الدِّفْءَ وَالنُّورَ. مَنْ أَكُونُ؟', 
    answer: 'شَمْسٌ', 
    options: ['قَمَرٌ', 'نَجْمَةٌ', 'شَمْسٌ'],
    image: 'https://images.pexels.com/photos/39831/sun-space-solar-system-solar-flare-39831.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 3, 
    riddle: 'لَدَيَّ أَوْرَاقٌ كَثِيرَةٌ لَكِنِّي لَسْتُ شَجَرَةً. أَحْكِي لَكَ الْقِصَصَ. مَنْ أَكُونُ؟', 
    answer: 'كِتَابٌ', 
    options: ['كِتَابٌ', 'دَفْتَرٌ', 'قَلَمٌ'],
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    riddle: 'أَعِيشُ فِي الْمَاءِ وَلَدَيَّ زَعَانِفُ وَخَيَاشِيمُ. مَنْ أَكُونُ؟',
    answer: 'سَمَكَةٌ',
    options: ['سَمَكَةٌ', 'ضِفْدَعٌ', 'حُوتٌ'],
    image: 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    riddle: 'لَدَيَّ وَجْهٌ وَعَقَارِبُ، لَكِنْ لَا أَرَى وَلَا أَلْدَغُ. أُخْبِرُكَ بِالْوَقْتِ. مَنْ أَكُونُ؟',
    answer: 'سَاعَةٌ',
    options: ['مِرْآةٌ', 'سَاعَةٌ', 'مِنَبِّهٌ'],
    image: 'https://images.pexels.com/photos/2105104/pexels-photo-2105104.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

// Data for "Story Spark" AI story generator.
export const storyWords: StoryWord[] = [
    { id: 1, word: "الْقَمَرُ", emoji: "🌙" },
    { id: 2, word: "النَّجْمَةُ", emoji: "⭐" },
    { id: 3, word: "الْغَابَةُ", emoji: "🌳" },
    { id: 4, word: "الْأَرْنَبُ", emoji: "🐰" },
    { id: 5, word: "الْكَنْزُ", emoji: "💎" },
    { id: 6, word: "السَّفِينَةُ", emoji: "⛵" },
];

// Data for "Listen and Choose" exercise.
export const listenQuestions: ListenQuestion[] = [
    { id: 1, correctWord: 'كِتَابٌ', options: ['كِتَابٌ', 'كَلْبٌ', 'كُرْسِيٌّ'] },
    { id: 2, correctWord: 'قَلَمٌ', options: ['عَلَمٌ', 'قَدَمٌ', 'قَلَمٌ'] },
    { id: 3, correctWord: 'بَابٌ', options: ['بَابٌ', 'نَابٌ', 'تَابَ'] },
];

// FIX: Add missing crosswordData for the CrosswordExercise component.
// Data for "Crossword" exercise.
export const crosswordData: { size: number; clues: CrosswordClue[] } = {
  size: 5,
  clues: [
    {
      number: 1,
      clue: 'نَكْتُبُ بِهِ',
      answer: 'قلم',
      direction: 'across',
      row: 1,
      col: 1,
    },
    {
      number: 2,
      clue: 'رَمْزُ الْوَطَنِ',
      answer: 'علم',
      direction: 'down',
      row: 0,
      col: 2,
    },
  ],
};