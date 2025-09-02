/**
 * @file This file contains all the static data for the learning exercises.
 * It serves as a mini-database for questions and content, making it easy to manage and update.
 * All question sets have been expanded to 28 questions with progressive difficulty.
 */

// FIX: Added StoryWord and ListenQuestion to the import list.
import { LetterQuestion, WordQuestion, MatchingPair, ScrambleQuestion, CrosswordData, SentenceQuestion, StoryWord, ListenQuestion } from '../types';

/**
 * Data for the "Complete the Letter" exercise (28 questions).
 * Difficulty progresses from simple CVC words to longer words with more complex letter forms.
 */
export const letterQuestions: LetterQuestion[] = [
  // Easy (1-10) - Simple words, clear options
  { id: 1, wordHint: 'أَ_', correctLetter: 'بٌ', options: ['بٌ', 'تٌ', 'ثٌ'], vocalizedWord: 'أَبٌ' },
  { id: 2, wordHint: 'أُ_', correctLetter: 'مٌّ', options: ['مٌّ', 'نٌّ', 'لٌّ'], vocalizedWord: 'أُمٌّ' },
  { id: 3, wordHint: 'قِـ_', correctLetter: 'طٌّ', options: ['طٌّ', 'فٌّ', 'لٌّ'], vocalizedWord: 'قِطٌّ' },
  { id: 4, wordHint: 'كَلْـ_', correctLetter: 'بٌ', options: ['بٌ', 'تٌ', 'ثٌ'], vocalizedWord: 'كَلْبٌ' },
  { id: 5, wordHint: 'شَـ_ـسٌ', correctLetter: 'مْ', options: ['مْ', 'نْ', 'بْ'], vocalizedWord: 'شَمْسٌ' },
  { id: 6, wordHint: 'بَيْـ_', correctLetter: 'تٌ', options: ['تٌ', 'رٌ', 'دٌ'], vocalizedWord: 'بَيْتٌ' },
  { id: 7, wordHint: 'وَرْ_َةٌ', correctLetter: 'د', options: ['د', 'ذ', 'ز'], vocalizedWord: 'وَرْدَةٌ' },
  { id: 8, wordHint: '_َرَسٌ', correctLetter: 'ف', options: ['ف', 'ق', 'غ'], vocalizedWord: 'فَرَسٌ' },
  { id: 9, wordHint: 'نَـ_ـرٌ', correctLetter: 'مْ', options: ['مْ', 'هـ', 'بْ'], vocalizedWord: 'نَمِرٌ' },
  { id: 10, wordHint: 'وَلَـ_', correctLetter: 'دٌ', options: ['دٌ', 'رٌ', 'زٌ'], vocalizedWord: 'وَلَدٌ' },
  // Medium (11-20) - Longer words, similar options
  { id: 11, wordHint: 'كِتَا_', correctLetter: 'بٌ', options: ['بٌ', 'نٌ', 'مٌ'], vocalizedWord: 'كِتَابٌ' },
  { id: 12, wordHint: 'مَدْرَسَـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'تُ', 'هٌ'], vocalizedWord: 'مَدْرَسَةٌ' },
  { id: 13, wordHint: 'سَيَّارَ_', correctLetter: 'ةٌ', options: ['ةٌ', 'تُ', 'هٌ'], vocalizedWord: 'سَيَّارَةٌ' },
  { id: 14, wordHint: 'طَبِيـ_', correctLetter: 'بٌ', options: ['بٌ', 'تٌ', 'ثٌ'], vocalizedWord: 'طَبِيبٌ' },
  { id: 15, wordHint: 'تُفَّا_َةٌ', correctLetter: 'ح', options: ['ح', 'خ', 'ج'], vocalizedWord: 'تُفَّاحَةٌ' },
  { id: 16, wordHint: 'دَجَا_َةٌ', correctLetter: 'ج', options: ['ج', 'ح', 'خ'], vocalizedWord: 'دَجَاجَةٌ' },
  { id: 17, wordHint: 'عُـ_ْفُورٌ', correctLetter: 'صْ', options: ['صْ', 'سْ', 'شْ'], vocalizedWord: 'عُصْفُورٌ' },
  { id: 18, wordHint: 'مِفْتَا_', correctLetter: 'حٌ', options: ['حٌ', 'خٌ', 'جٌ'], vocalizedWord: 'مِفْتَاحٌ' },
  { id: 19, wordHint: 'صُنْدُو_', correctLetter: 'قٌ', options: ['قٌ', 'كٌ', 'غٌ'], vocalizedWord: 'صُنْدُوقٌ' },
  { id: 20, wordHint: 'ضَا_ِطٌ', correctLetter: 'ب', options: ['ب', 'بِ', 'بُ'], vocalizedWord: 'ضَابِطٌ' },
  // Hard (21-28) - Complex words, very similar/phonetically close options
  { id: 21, wordHint: 'مُسْتَ_ْفَى', correctLetter: 'شْ', options: ['شْ', 'سْ', 'صْ'], vocalizedWord: 'مُسْتَشْفَى' },
  { id: 22, wordHint: 'مُهَنْدِ_', correctLetter: 'سٌ', options: ['سٌ', 'صٌ', 'ثٌ'], vocalizedWord: 'مُهَنْدِسٌ' },
  { id: 23, wordHint: 'خَضْرَاوَا_', correctLetter: 'تٌ', options: ['تٌ', 'ةٌ', 'طٌ'], vocalizedWord: 'خَضْرَاوَاتٌ' },
  { id: 24, wordHint: 'بُرْتُقَا_', correctLetter: 'لٌ', options: ['لٌ', 'نٌ', 'رٌ'], vocalizedWord: 'بُرْتُقَالٌ' },
  { id: 25, wordHint: 'طَائِـ_َةٌ', correctLetter: 'ر', options: ['ر', 'ز', 'د'], vocalizedWord: 'طَائِرَةٌ' },
  { id: 26, wordHint: 'حَا_ُوبٌ', correctLetter: 'س', options: ['س', 'ص', 'ث'], vocalizedWord: 'حَاسُوبٌ' },
  { id: 27, wordHint: 'مِظَلَّـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'تُ', 'طُ'], vocalizedWord: 'مِظَلَّةٌ' },
  { id: 28, wordHint: 'ذُ_َابَةٌ', correctLetter: 'ب', options: ['ب', 'ت', 'ث'], vocalizedWord: 'ذُبَابَةٌ' },
];

/**
 * Data for the "Complete the Word" (in a sentence) exercise (28 questions).
 * Difficulty progresses from simple sentences with obvious answers to more complex sentences requiring context.
 */
export const wordQuestions: WordQuestion[] = [
    // Easy (1-10)
    { id: 1, sentenceHint: 'لَوْنُ الشَّمْسِ ___', correctWord: 'أَصْفَرُ', options: ['أَصْفَرُ', 'أَزْرَقُ', 'أَحْمَرُ'] },
    { id: 2, sentenceHint: 'الْقِطُّ يَشْرَبُ ___', correctWord: 'الْحَلِيبَ', options: ['الْمَاءَ', 'الْحَلِيبَ', 'الْعَصِيرَ'] },
    { id: 3, sentenceHint: 'أَنَا أَذْهَبُ إِلَى ___', correctWord: 'الْمَدْرَسَةِ', options: ['الْبَيْتِ', 'الْمَدْرَسَةِ', 'السُّوقِ'] },
    { id: 4, sentenceHint: 'الْأَسَدُ ___ الْغَابَةِ', correctWord: 'مَلِكُ', options: ['صَدِيقُ', 'مَلِكُ', 'حَارِسُ'] },
    { id: 5, sentenceHint: 'نَكْتُبُ بِـ ___', correctWord: 'الْقَلَمِ', options: ['الْقَلَمِ', 'الْكِتَابِ', 'الْيَدِ'] },
    { id: 6, sentenceHint: 'فِي الصَّبَاحِ، تَشْرُقُ ___', correctWord: 'الشَّمْسُ', options: ['الْأَرْضُ', 'الشَّمْسُ', 'الْقَمَرُ'] },
    { id: 7, sentenceHint: 'الْبُرْتُقَالُ مِنَ ___', correctWord: 'الْفَوَاكِهِ', options: ['الْخَضْرَاوَاتِ', 'الْفَوَاكِهِ', 'الْحَلَوِيَّاتِ'] },
    { id: 8, sentenceHint: 'نَنَامُ فِي ___', correctWord: 'اللَّيْلِ', options: ['الصَّبَاحِ', 'اللَّيْلِ', 'الظُّهْرِ'] },
    { id: 9, sentenceHint: 'الطَّائِرُ يَطِيرُ فِي ___', correctWord: 'السَّمَاءِ', options: ['الْبَحْرِ', 'الْأَرْضِ', 'السَّمَاءِ'] },
    { id: 10, sentenceHint: 'السَّمَكُ يَعِيشُ فِي ___', correctWord: 'الْمَاءِ', options: ['الْمَاءِ', 'الْهَوَاءِ', 'الرِّمَالِ'] },
    // Medium (11-20)
    { id: 11, sentenceHint: 'الطَّبِيبُ يُعَالِجُ ___', correctWord: 'الْمَرْضَى', options: ['التَّلَامِيذَ', 'الْمَرْضَى', 'الزَّبَائِنَ'] },
    { id: 12, sentenceHint: 'الْمُعَلِّمُ ___ فِي الْمَدْرَسَةِ', correctWord: 'يُعَلِّمُ', options: ['يَلْعَبُ', 'يَنَامُ', 'يُعَلِّمُ'] },
    { id: 13, sentenceHint: 'السُّلَحْفَاةُ حَيَوَانٌ ___', correctWord: 'بَطِيءٌ', options: ['سَرِيعٌ', 'بَطِيءٌ', 'كَبِيرٌ'] },
    { id: 14, sentenceHint: 'نَشْتَرِي الْخُبْزَ مِنَ ___', correctWord: 'الْمَخْبَزِ', options: ['الْمَكْتَبَةِ', 'الْمَخْبَزِ', 'الْمَلْعَبِ'] },
    { id: 15, sentenceHint: 'فِي الشِّتَاءِ، نَلْبَسُ مَلَابِسَ ___', correctWord: 'ثَقِيلَةً', options: ['خَفِيفَةً', 'ثَقِيلَةً', 'قَصِيرَةً'] },
    { id: 16, sentenceHint: 'الْجَمَلُ يَعِيشُ فِي ___', correctWord: 'الصَّحْرَاءِ', options: ['الْغَابَةِ', 'الْبَحْرِ', 'الصَّحْرَاءِ'] },
    { id: 17, sentenceHint: 'الْفَلَّاحُ يَزْرَعُ ___', correctWord: 'الْأَرْضَ', options: ['الْبَيْتَ', 'الْأَرْضَ', 'السَّيَّارَةَ'] },
    { id: 18, sentenceHint: 'الْقَمَرُ يَظْهَرُ فِي ___', correctWord: 'اللَّيْلِ', options: ['النَّهَارِ', 'الْفَجْرِ', 'اللَّيْلِ'] },
    { id: 19, sentenceHint: 'عَاصِمَةُ مِصْرَ هِيَ ___', correctWord: 'الْقَاهِرَةُ', options: ['الرِّيَاضُ', 'الْقَاهِرَةُ', 'بَغْدَادُ'] },
    { id: 20, sentenceHint: 'الْكِتَابُ صَدِيقٌ ___', correctWord: 'وَفِيٌّ', options: ['سَيِّئٌ', 'جَدِيدٌ', 'وَفِيٌّ'] },
    // Hard (21-28)
    { id: 21, sentenceHint: 'الْمُهَنْدِسُ ___ الْبُيُوتَ', correctWord: 'يُصَمِّمُ', options: ['يَبْنِي', 'يُصَمِّمُ', 'يَبِيعُ'] },
    { id: 22, sentenceHint: 'نَسْتَخْدِمُ ___ لِقَطْعِ الْوَرَقِ', correctWord: 'الْمِقَصَّ', options: ['الْقَلَمَ', 'الْمِقَصَّ', 'الْمِسْطَرَةَ'] },
    { id: 23, sentenceHint: '___ الأُمُّ الطَّعَامَ فِي الْمَطْبَخِ', correctWord: 'تَطْبُخُ', options: ['تَغْسِلُ', 'تَأْكُلُ', 'تَطْبُخُ'] },
    { id: 24, sentenceHint: 'الْعُصْفُورُ يَبْنِي ___ فَوْقَ الشَّجَرَةِ', correctWord: 'عُشَّهُ', options: ['بَيْتَهُ', 'قَفَصَهُ', 'عُشَّهُ'] },
    { id: 25, sentenceHint: 'الْكُرَةُ الْأَرْضِيَّةُ ___ حَوْلَ الشَّمْسِ', correctWord: 'تَدُورُ', options: ['تَقِفُ', 'تَدُورُ', 'تَنَامُ'] },
    { id: 26, sentenceHint: 'يَجِبُ أَنْ ___ أَسْنَانَنَا كُلَّ يَوْمٍ', correctWord: 'نُنَظِّفَ', options: ['نَكْسِرَ', 'نُلَوِّنَ', 'نُنَظِّفَ'] },
    { id: 27, sentenceHint: 'الضَّوْءُ الْأَخْضَرُ فِي إِشَارَةِ الْمُرُورِ يَعْنِي ___', correctWord: 'انْطَلِقْ', options: ['قِفْ', 'اسْتَعِدَّ', 'انْطَلِقْ'] },
    { id: 28, sentenceHint: 'نَحْتَفِلُ بِعِيدِ الْفِطْرِ بَعْدَ شَهْرِ ___', correctWord: 'رَمَضَانَ', options: ['شَعْبَانَ', 'رَمَضَانَ', 'شَوَّالَ'] },
];

/**
 * Data for the "Matching Game" (Memory Cards) (14 pairs = 28 cards).
 * Word difficulty progresses from simple to more complex.
 */
export const matchingPairs: MatchingPair[] = [
  { id: 1, word: 'شَمْسٌ' },
  { id: 2, word: 'قَمَرٌ' },
  { id: 3, word: 'بَيْتٌ' },
  { id: 4, word: 'مَاءٌ' },
  { id: 5, word: 'كِتَابٌ' },
  { id: 6, word: 'قَلَمٌ' },
  { id: 7, word: 'كُرَةٌ' },
  { id: 8, word: 'سَيَّارَةٌ' },
  { id: 9, word: 'طَائِرَةٌ' },
  { id: 10, word: 'مَدْرَسَةٌ' },
  { id: 11, word: 'مُعَلِّمٌ' },
  { id: 12, word: 'طَبِيبٌ' },
  { id: 13, word: 'حَقِيبَةٌ' },
  { id: 14, word: 'مُسْتَشْفَى' },
];

/**
 * Data for the "Word Scramble" exercise (28 questions).
 * Difficulty progresses from 3-letter words to 5-7 letter words.
 */
export const scrambleQuestions: ScrambleQuestion[] = [
    // Easy (1-10) - 3 letters
    { id: 1, word: 'أَسَدٌ', scrambledLetters: ['دٌ', 'أَ', 'سَ'] },
    { id: 2, word: 'قَمَرٌ', scrambledLetters: ['رٌ', 'قَ', 'مَ'] },
    { id: 3, word: 'وَلَدٌ', scrambledLetters: ['دٌ', 'وَ', 'لَ'] },
    { id: 4, word: 'بَحْرٌ', scrambledLetters: ['رٌ', 'بَ', 'حْ'] },
    { id: 5, word: 'خُبْزٌ', scrambledLetters: ['زٌ', 'خُ', 'بْ'] },
    { id: 6, word: 'عَيْنٌ', scrambledLetters: ['نٌ', 'عَ', 'يْ'] },
    { id: 7, word: 'أُذُنٌ', scrambledLetters: ['نٌ', 'أُ', 'ذُ'] },
    { id: 8, word: 'فَمٌّ', scrambledLetters: ['مٌّ', 'فَ'] }, // 2 letters but with shadda
    { id: 9, word: 'يَدٌّ', scrambledLetters: ['دٌّ', 'يَ'] },
    { id: 10, word: 'أَبٌ', scrambledLetters: ['بٌ', 'أَ'] },
    // Medium (11-20) - 4-5 letters
    { id: 11, word: 'شَمْسٌ', scrambledLetters: ['سٌ', 'شَ', 'مْ'] },
    { id: 12, word: 'قَلَمٌ', scrambledLetters: ['لَ', 'قَ', 'مٌ'] },
    { id: 13, word: 'بَيْتٌ', scrambledLetters: ['تٌ', 'بَ', 'يْ'] },
    { id: 14, word: 'كُرْسِيٌّ', scrambledLetters: ['يٌّ', 'كُ', 'رْ', 'سِ'] },
    { id: 15, word: 'طِفْلٌ', scrambledLetters: ['لٌ', 'طِ', 'فْ'] },
    { id: 16, word: 'مَوْزَةٌ', scrambledLetters: ['ةٌ', 'مَ', 'وْ', 'زَ'] },
    { id: 17, word: 'سَمَكَةٌ', scrambledLetters: ['كَ', 'ةٌ', 'سَ', 'مَ'] },
    { id: 18, word: 'مِفْتَاحٌ', scrambledLetters: ['حٌ', 'مِ', 'فْ', 'تَا'] },
    { id: 19, word: 'مَدْرَسَةٌ', scrambledLetters: ['سَ', 'ةٌ', 'مَ', 'دْ', 'رَ'] },
    { id: 20, word: 'شَجَرَةٌ', scrambledLetters: ['رَ', 'ةٌ', 'شَ', 'جَ'] },
    // Hard (21-28) - 5-7 letters, more complex
    { id: 21, word: 'حَقِيبَةٌ', scrambledLetters: ['بَةٌ', 'حَ', 'قِي'] },
    { id: 22, word: 'سَيَّارَةٌ', scrambledLetters: ['رَةٌ', 'سَ', 'يَّا'] },
    { id: 23, word: 'بُرْتُقَالٌ', scrambledLetters: ['لٌ', 'بُ', 'رْ', 'تُ', 'قَا'] },
    { id: 24, word: 'مُسْتَشْفَى', scrambledLetters: ['فَى', 'مُ', 'سْ', 'تَ', 'شْ'] },
    { id: 25, word: 'كَمْبِيُوتَرْ', scrambledLetters: ['تَرْ', 'كَ', 'مْ', 'بِيُو'] },
    { id: 26, 'word': 'تِلِفِزْيُونٌ', 'scrambledLetters': ['يُونٌ', 'تِ', 'لِ', 'فِ', 'زْ'] },
    { id: 27, word: 'عُصْفُورٌ', scrambledLetters: ['رٌ', 'عُ', 'صْ', 'فُو'] },
    { id: 28, word: 'هِلالٌ', scrambledLetters: ['لٌ', 'هِ', 'لَا'] },
];

/**
 * Data for the "Sentence Builder" exercise (28 questions).
 * Difficulty progresses from 3-word sentences to 5-6 word sentences with more complex structures.
 */
export const sentenceQuestions: SentenceQuestion[] = [
    // Easy (1-10) - 3 words
    { id: 1, correctSentence: 'الْوَلَدُ يَلْعَبُ بِالْكُرَةِ', scrambledWords: ['بِالْكُرَةِ', 'يَلْعَبُ', 'الْوَلَدُ'] },
    { id: 2, correctSentence: 'السَّمَاءُ لَوْنُهَا أَزْرَقُ', scrambledWords: ['أَزْرَقُ', 'لَوْنُهَا', 'السَّمَاءُ'] },
    { id: 3, correctSentence: 'أَنَا أُحِبُّ أُمِّي', scrambledWords: ['أُمِّي', 'أُحِبُّ', 'أَنَا'] },
    { id: 4, correctSentence: 'الْقِطُّ يَأْكُلُ السَّمَكَ', scrambledWords: ['السَّمَكَ', 'يَأْكُلُ', 'الْقِطُّ'] },
    { id: 5, correctSentence: 'هَذَا كِتَابٌ جَدِيدٌ', scrambledWords: ['جَدِيدٌ', 'كِتَابٌ', 'هَذَا'] },
    { id: 6, correctSentence: 'الشَّمْسُ تُشْرِقُ صَبَاحًا', scrambledWords: ['صَبَاحًا', 'الشَّمْسُ', 'تُشْرِقُ'] },
    { id: 7, correctSentence: 'الطَّائِرُ يُغَرِّدُ فَرَحًا', scrambledWords: ['فَرَحًا', 'يُغَرِّدُ', 'الطَّائِرُ'] },
    { id: 8, correctSentence: 'الْبِنْتُ تَرْتَدِي فُسْتَانًا', scrambledWords: ['فُسْتَانًا', 'تَرْتَدِي', 'الْبِنْتُ'] },
    { id: 9, correctSentence: 'الطَّعَامُ عَلَى الطَّاوِلَةِ', scrambledWords: ['الطَّاوِلَةِ', 'عَلَى', 'الطَّعَامُ'] },
    { id: 10, correctSentence: 'الْوَرْدَةُ رَائِحَتُهَا جَمِيلَةٌ', scrambledWords: ['جَمِילَةٌ', 'رَائِحَتُهَا', 'الْوَرْدَةُ'] },
    // Medium (11-20) - 4 words
    { id: 11, correctSentence: 'أَنَا أَذْهَبُ إِلَى الْمَدْرَسَةِ', scrambledWords: ['الْمَدْرَسَةِ', 'إِلَى', 'أَذْهَبُ', 'أَنَا'] },
    { id: 12, correctSentence: 'الْقِرْدُ يَأْكُلُ الْمَوْزَ اللَّذِيذَ', scrambledWords: ['اللَّذِيذَ', 'يَأْكُلُ', 'الْمَوْزَ', 'الْقِرْدُ'] },
    { id: 13, correctSentence: 'الْفِيلُ حَيَوَانٌ ضَخْمٌ جِدًّا', scrambledWords: ['جِدًّا', 'ضَخْمٌ', 'حَيَوَانٌ', 'الْفِيلُ'] },
    { id: 14, correctSentence: 'نَحْنُ نَلْعَبُ فِي الْحَدِيقَةِ', scrambledWords: ['نَلْعَبُ', 'الْحَدِيقَةِ', 'فِي', 'نَحْنُ'] },
    { id: 15, correctSentence: 'الْمُعَلِّمُ يَشْرَحُ الدَّرْسَ لِلتَّلَامِيذِ', scrambledWords: ['الدَّرْسَ', 'يَشْرَحُ', 'لِلتَّلَامِيذِ', 'الْمُعَلِّمُ'] },
    { id: 16, correctSentence: 'الطَّبِيبُ يَعْمَلُ فِي الْمُسْتَشْفَى', scrambledWords: ['الْمُسْتَشْفَى', 'فِي', 'يَعْمَلُ', 'الطَّبِيبُ'] },
    { id: 17, correctSentence: 'أُحِبُّ قِرَاءَةَ الْقِصَصِ الْمُمْتِعَةِ', scrambledWords: ['الْمُمْتِعَةِ', 'الْقِصَصِ', 'قِرَاءَةَ', 'أُحِبُّ'] },
    { id: 18, correctSentence: 'أَبِي يَقُودُ سَيَّارَةً زَرْقَاءَ', scrambledWords: ['زَرْقَاءَ', 'سَيَّارَةً', 'يَقُودُ', 'أَبِي'] },
    { id: 19, correctSentence: 'أُخْتِي الصَّغِيرَةُ تَبْكِي كَثِيرًا', scrambledWords: ['كَثِيرًا', 'تَبْكِي', 'الصَّغِيرَةُ', 'أُخْتِي'] },
    { id: 20, correctSentence: 'الْجَوُّ مُشْمِسٌ وَجَمِيلٌ الْيَوْمَ', scrambledWords: ['الْيَوْمَ', 'وَجَمِيلٌ', 'مُشْمِسٌ', 'الْجَوُّ'] },
    // Hard (21-28) - 5-6 words
    { id: 21, correctSentence: 'يَجِبُ عَلَيْنَا أَنْ نَحْتَرِمَ الْكِبَارَ', scrambledWords: ['الْكِبَارَ', 'نَحْتَرِمَ', 'أَنْ', 'عَلَيْنَا', 'يَجِبُ'] },
    { id: 22, correctSentence: 'سَافَرَتْ أُسْرَتِي إِلَى الْإِسْكَنْدَرِيَّةِ صَيْفًا', scrambledWords: ['صَيْفًا', 'الْإِسْكَنْدَرِيَّةِ', 'إِلَى', 'أُسْرَتِي', 'سَافَرَتْ'] },
    { id: 23, correctSentence: 'الْعَسَلُ طَعَامٌ مُفِيدٌ يُنْتِجُهُ النَّحْلُ', scrambledWords: ['النَّحْلُ', 'يُنْتِجُهُ', 'مُفِيدٌ', 'طَعَامٌ', 'الْعَسَلُ'] },
    { id: 24, correctSentence: 'يَتَسَاقَطُ وَرَقُ الشَّجَرِ فِي فَصْلِ الْخَرِيفِ', scrambledWords: ['الْخَرِيفِ', 'فَصْلِ', 'فِي', 'الشَّجَرِ', 'وَرَقُ', 'يَتَسَاقَطُ'] },
    { id: 25, correctSentence: 'يُحِبُّ الْأَطْفَالُ الذَّهَابَ إِلَى حَدِيقَةِ الْحَيَوَانِ', scrambledWords: ['الْحَيَوَانِ', 'حَدِيقَةِ', 'إِلَى', 'الذَّهَابَ', 'الْأَطْفَالُ', 'يُحِبُّ'] },
    { id: 26, correctSentence: 'الْحِفَاظُ عَلَى النَّظَافَةِ سُلُوكٌ حَضَارِيٌّ', scrambledWords: ['حَضَارِيٌّ', 'سُلُوكٌ', 'النَّظَافَةِ', 'عَلَى', 'الْحِفَاظُ'] },
    { id: 27, correctSentence: 'يَقُومُ رِجَالُ الْإِطْفَاءِ بِعَمَلٍ شُجَاعٍ', scrambledWords: ['شُجَاعٍ', 'بِعَمَلٍ', 'الْإِطْفَاءِ', 'رِجَالُ', 'يَقُومُ'] },
    { id: 28, correctSentence: 'اِشْتَرَيْتُ قَلَمًا وَدَفْتَرًا مِنَ الْمَكْتَبَةِ', scrambledWords: ['الْمَكْتَبَةِ', 'مِنَ', 'وَدَفْتَرًا', 'قَلَمًا', 'اِشْتَرَيْتُ'] },
];

/**
 * Data for the "Crossword Puzzle" exercise.
 * A simpler 5x5 grid with 4 easy, child-friendly words.
 */
export const crosswordData: CrosswordData = {
    id: 1,
    size: 5, // smaller grid
    clues: [
        // Simpler, more child-friendly clues and answers
        { number: 1, clue: 'مَلِكُ الْغَابَةِ', answer: 'اسد', row: 1, col: 1, direction: 'across' },
        { number: 2, clue: 'حَيَوَانٌ ضَخْمٌ يُحِبُّ الْعَسَلَ', answer: 'دب', row: 0, col: 3, direction: 'down' },
        { number: 3, clue: 'نَدْخُلُ مِنْهُ إِلَى الْبَيْتِ', answer: 'باب', row: 3, col: 2, direction: 'across' },
        { number: 4, clue: 'وَالِدِي', answer: 'اب', row: 3, col: 2, direction: 'down' },
    ]
};

// FIX: Add storyWords data for the StorySpark component.
/**
 * Data for the "Story Spark" component (10 words).
 * A selection of evocative words to inspire AI-generated stories.
 */
export const storyWords: StoryWord[] = [
  { id: 1, word: 'قَمَرٌ', emoji: '🌙' },
  { id: 2, word: 'سَفِينَةٌ', emoji: '⛵' },
  { id: 3, word: 'صَحْرَاءُ', emoji: '🏜️' },
  { id: 4, word: 'أَسَدٌ', emoji: '🦁' },
  { id: 5, word: 'مِفْتَاحٌ', emoji: '🔑' },
  { id: 6, word: 'كَنْزٌ', emoji: '💎' },
  { id: 7, word: 'نَجْمَةٌ', emoji: '⭐' },
  { id: 8, word: 'غَابَةٌ', emoji: '🌳' },
  { id: 9, word: 'تِنِّينٌ', emoji: '🐉' },
  { id: 10, word: 'قَصْرٌ', emoji: '🏰' },
];

// FIX: Add listenQuestions data for the ListenChooseExercise component.
/**
 * Data for the "Listen and Choose" exercise (15 questions).
 * Focuses on distinguishing between phonetically similar or commonly confused words.
 */
export const listenQuestions: ListenQuestion[] = [
  // Easy - Clear differences
  { id: 1, correctWord: 'بَيْتٌ', options: ['بَيْتٌ', 'بِنْتٌ', 'زَيْتٌ'] },
  { id: 2, correctWord: 'قَلَمٌ', options: ['قَلَمٌ', 'عَلَمٌ', 'أَلَمٌ'] },
  { id: 3, correctWord: 'كَلْبٌ', options: ['كَلْبٌ', 'قَلْبٌ', 'حَلْبٌ'] },
  { id: 4, correctWord: 'شَمْسٌ', options: ['شَمْسٌ', 'أَمْسِ', 'هَمْسٌ'] },
  { id: 5, correctWord: 'بَابٌ', options: ['بَابٌ', 'تَابَ', 'نَابٌ'] },
  // Medium - Similar sounds
  { id: 6, correctWord: 'سَيَّارَةٌ', options: ['سَيَّارَةٌ', 'طَيَّارَةٌ', 'حَيَارَى'] },
  { id: 7, correctWord: 'ضَابِطٌ', options: ['ضَابِطٌ', 'ضَابِطُ', 'ضَابِطٍ'] }, // Vowel endings
  { id: 8, correctWord: 'ثَوْرٌ', options: ['ثَوْرٌ', 'سَوْرٌ', 'تَوْرٌ'] }, // ث vs س
  { id: 9, correctWord: 'ذَهَبٌ', options: ['ذَهَبٌ', 'زَهَبٌ', 'دَهَبٌ'] }, // ذ vs ز
  { id: 10, correctWord: 'قِطٌّ', options: ['قِطٌّ', 'كِتٌّ', 'غِطٌّ'] }, // ق vs ك
  // Hard - Subtle differences
  { id: 11, correctWord: 'صَقْرٌ', options: ['صَقْرٌ', 'سَقْرٌ', 'زَقْرٌ'] }, // ص vs س
  { id: 12, correctWord: 'ظَرْفٌ', options: ['ظَرْفٌ', 'ضَرْفٌ', 'زَرْفٌ'] }, // ظ vs ض
  { id: 13, correctWord: 'مَدْرَسَةٌ', options: ['مَدْرَسَةٌ', 'مَدْرَسَةً', 'مَدْرَسَةٍ'] }, // Vowel endings
  { id: 14, correctWord: 'تُفَّاحٌ', options: ['تُفَّاحٌ', 'طُفَّاحٌ', 'دُفَّاحٌ'] }, // ت vs ط
  { id: 15, correctWord: 'حَقِيبَةٌ', options: ['حَقِيبَةٌ', 'هَقِيبَةٌ', 'خَقِيبَةٌ'] }, // ح vs ه vs خ
];