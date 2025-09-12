/**
 * @file This file contains all the static content for the Arabic learning exercises.
 * It provides the data for letters, words, sentences, games, and other activities.
 */

// FIX: Import the new CrosswordClue type and other missing types.
import {
  LetterQuestion,
  WordQuestion,
  MatchingPair,
  ScrambleQuestion,
  SentenceQuestion,
  WhoAmIQuestion,
  ListenQuestion,
  CrosswordClue,
  FlashWordQuestion,
  StoryWord,
  StoryLogicQuestion,
  OppositesPair,
  DaysOfWeekExercise,
  DaysOfWeekExerciseType,
  OppositesExercise,
  OppositesExerciseType,
} from '../types';

// Data for "Complete the Letter" exercise. (Expanded to 42 questions)
export const letterQuestions: LetterQuestion[] = [
  { id: 1, wordHint: 'قِـ_', correctLetter: 'طٌّ', options: ['طٌّ', 'فٌ', 'لٌ'], vocalizedWord: 'قِطٌّ' },
  { id: 2, wordHint: 'أَرْنَـ_', correctLetter: 'بٌ', options: ['بٌ', 'دٌ', 'رٌ'], vocalizedWord: 'أَرْنَبٌ' },
  { id: 3, wordHint: 'شَمْـ_', correctLetter: 'سٌ', options: ['سٌ', 'شٌ', 'صٌ'], vocalizedWord: 'شَمْسٌ' },
  { id: 4, wordHint: 'كِتَا_', correctLetter: 'بٌ', options: ['دٌ', 'بٌ', 'تٌ'], vocalizedWord: 'كِتَابٌ' },
  { id: 5, wordHint: 'فِـ_', correctLetter: 'يلٌ', options: ['يلٌ', 'مٌ', 'نٌ'], vocalizedWord: 'فِيلٌ' },
  { id: 6, wordHint: 'بَـ_ـرَةٌ', correctLetter: 'قَ', options: ['قَ', 'فَ', 'عَ'], vocalizedWord: 'بَقَرَةٌ' },
  { id: 7, wordHint: 'شُـ_ـَاكٌ', correctLetter: 'بَّ', options: ['بَّ', 'تَّ', 'ثَّ'], vocalizedWord: 'شُبَّاكٌ' },
  { id: 8, wordHint: 'مِفْتَا_', correctLetter: 'حٌ', options: ['حٌ', 'خٌ', 'جٌ'], vocalizedWord: 'مِفْتَاحٌ' },
  { id: 9, wordHint: 'زَرَافَـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'تُ', 'هِ'], vocalizedWord: 'زَرَافَةٌ' },
  { id: 10, wordHint: 'عُصْفُو_', correctLetter: 'رٌ', options: ['رٌ', 'زٌ', 'دٌ'], vocalizedWord: 'عُصْفُورٌ' },
  { id: 11, wordHint: 'خُـ_ـزٌ', correctLetter: 'بْ', options: ['بْ', 'ضْ', 'صْ'], vocalizedWord: 'خُبْزٌ' },
  { id: 12, wordHint: 'نَـ_ـلَةٌ', correctLetter: 'مْ', options: ['مْ', 'خْ', 'حْ'], vocalizedWord: 'نَمْلَةٌ' },
  { id: 13, wordHint: 'بُرْتُقَا_', correctLetter: 'لٌ', options: ['لٌ', 'نٌ', 'مٌ'], vocalizedWord: 'بُرْتُقَالٌ' },
  { id: 14, wordHint: 'سَمَـ_ـةٌ', correctLetter: 'كَ', options: ['كَ', 'قَ', 'غَ'], vocalizedWord: 'سَمَكَةٌ' },
  { id: 15, wordHint: 'حِصَا_', correctLetter: 'نٌ', options: ['نٌ', 'مٌ', 'بٌ'], vocalizedWord: 'حِصَانٌ' },
  { id: 16, wordHint: 'دَجَا_ـةٌ', correctLetter: 'جَ', options: ['جَ', 'حَ', 'خَ'], vocalizedWord: 'دَجَاجَةٌ' },
  { id: 17, wordHint: 'كُرْ_ـيٌّ', correctLetter: 'سِ', options: ['سِ', 'صِ', 'شِ'], vocalizedWord: 'كُرْسِيٌّ' },
  { id: 18, wordHint: 'مَوْ_', correctLetter: 'زٌ', options: ['زٌ', 'رٌ', 'سٌ'], vocalizedWord: 'مَوْزٌ' },
  { id: 19, wordHint: 'طَائِـ_ـةٌ', correctLetter: 'رَ', options: ['رَ', 'دَ', 'ذَ'], vocalizedWord: 'طَائِرَةٌ' },
  { id: 20, wordHint: 'وَرْ_ـةٌ', correctLetter: 'دَ', options: ['دَ', 'ذَ', 'زَ'], vocalizedWord: 'وَرْدَةٌ' },
  { id: 21, wordHint: 'بِـ_ـيخٌ', correctLetter: 'طِّي', options: ['طِّي', 'تِّي', 'ثِّي'], vocalizedWord: 'بِطِّيخٌ' },
  { id: 22, wordHint: 'عِنَـ_', correctLetter: 'بٌ', options: ['بٌ', 'تٌ', 'ثٌ'], vocalizedWord: 'عِنَبٌ' },
  { id: 23, wordHint: 'غَـ_ـالٌ', correctLetter: 'زَا', options: ['زَا', 'رَا', 'سَا'], vocalizedWord: 'غَزَالٌ' },
  { id: 24, wordHint: 'قَلَـ_', correctLetter: 'مٌ', options: ['مٌ', 'نٌ', 'لٌ'], vocalizedWord: 'قَلَمٌ' },
  { id: 25, wordHint: 'ضِفْـ_ـعٌ', correctLetter: 'دَ', options: ['دَ', 'طَ', 'ظَ'], vocalizedWord: 'ضِفْدَعٌ' },
  { id: 26, wordHint: 'هِـ_ـالٌ', correctLetter: 'لَا', options: ['لَا', 'مَا', 'نَا'], vocalizedWord: 'هِلَالٌ' },
  { id: 27, wordHint: 'ثَـ_ـلَبٌ', correctLetter: 'عْ', options: ['عْ', 'غْ', 'فْ'], vocalizedWord: 'ثَعْلَبٌ' },
  { id: 28, wordHint: 'يَـ_', correctLetter: 'دٌ', options: ['دٌ', 'ذٌ', 'رٌ'], vocalizedWord: 'يَدٌ' },
  { id: 29, wordHint: 'سَاعَـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'تُ', 'هِ'], vocalizedWord: 'سَاعَةٌ' },
  { id: 30, wordHint: 'بَـ_ـرٌ', correctLetter: 'حْ', options: ['حْ', 'خْ', 'جْ'], vocalizedWord: 'بَحْرٌ' },
  { id: 31, wordHint: 'دُ_', correctLetter: 'بٌّ', options: ['بٌّ', 'تٌّ', 'ثٌّ'], vocalizedWord: 'دُبٌّ' },
  { id: 32, wordHint: 'نَـ_ـرٌ', correctLetter: 'مِ', options: ['مَ', 'مِ', 'مُ'], vocalizedWord: 'نَمِرٌ' },
  { id: 33, wordHint: 'خُفَّا_', correctLetter: 'شٌ', options: ['شٌ', 'سٌ', 'صٌ'], vocalizedWord: 'خُفَّاشٌ' },
  { id: 34, wordHint: 'جَـ_ـَلٌ', correctLetter: 'مَ', options: ['مَ', 'نَ', 'لَ'], vocalizedWord: 'جَمَلٌ' },
  { id: 35, wordHint: 'مَطَـ_', correctLetter: 'رٌ', options: ['رٌ', 'زٌ', 'دٌ'], vocalizedWord: 'مَطَرٌ' },
  { id: 36, wordHint: 'نَـ_ـمَةٌ', correctLetter: 'جْ', options: ['جْ', 'حْ', 'خْ'], vocalizedWord: 'نَجْمَةٌ' },
  { id: 37, wordHint: 'سَفِينَـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'تٌ', 'هُ'], vocalizedWord: 'سَفِينَةٌ' },
  { id: 38, wordHint: 'حَقِيـ_ـةٌ', correctLetter: 'بَ', options: ['بَ', 'تَ', 'ثَ'], vocalizedWord: 'حَقِيبَةٌ' },
  { id: 39, wordHint: 'طَاوِلَـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'تٌ', 'هُ'], vocalizedWord: 'طَاوِلَةٌ' },
  { id: 40, wordHint: 'مُعَلِّـ_', correctLetter: 'مٌ', options: ['مٌ', 'نٌ', 'لٌ'], vocalizedWord: 'مُعَلِّمٌ' },
  { id: 41, wordHint: 'فَرَاشَـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'تٌ', 'هُ'], vocalizedWord: 'فَرَاشَةٌ' },
  { id: 42, wordHint: 'مَـ_ـتَبٌ', correctLetter: 'كْ', options: ['كْ', 'قْ', 'غْ'], vocalizedWord: 'مَكْتَبٌ' }
];

// Data for "Complete the Word" exercise. (Expanded to 42 questions)
export const wordQuestions: WordQuestion[] = [
  { id: 1, sentenceHint: 'الْوَلَدُ يَشْرَبُ ___', correctWord: 'الْحَلِيبَ', options: ['الْحَلِيبَ', 'الْكِتَابَ', 'السَّيَّارَةَ'] },
  { id: 2, sentenceHint: 'تَطِيرُ ___ فِي السَّمَاءِ', correctWord: 'الطَّائِرَةُ', options: ['السَّمَكَةُ', 'الطَّائِرَةُ', 'الْقِطَّةُ'] },
  { id: 3, sentenceHint: 'أَنَا أَذْهَبُ إِلَى ___', correctWord: 'الْمَدْرَسَةِ', options: ['الْمَطْبَخِ', 'الْحَدِيقَةِ', 'الْمَدْرَسَةِ'] },
  { id: 4, sentenceHint: 'أَنَا أَجْلِسُ عَلَى ___', correctWord: 'الْكُرْسِيِّ', options: ['الطَّاوِلَةِ', 'الْكُرْسِيِّ', 'السَّرِيرِ'] },
  { id: 5, sentenceHint: 'الْقِطُّ يَأْكُلُ ___', correctWord: 'السَّمَكَ', options: ['السَّمَكَ', 'التُّفَّاحَ', 'الْجَزَرَ'] },
  { id: 6, sentenceHint: 'فِي الشِّتَاءِ، الْجَوُّ ___', correctWord: 'بَارِدٌ', options: ['حَارٌّ', 'مُعْتَدِلٌ', 'بَارِدٌ'] },
  { id: 7, sentenceHint: 'لَوْنُ الْمَوْزِ ___', correctWord: 'أَصْفَرُ', options: ['أَحْمَرُ', 'أَصْفَرُ', 'أَزْرَقُ'] },
  { id: 8, sentenceHint: 'نَحْنُ نَكْتُبُ بِـ ___', correctWord: 'الْقَلَمِ', options: ['الْقَلَمِ', 'الْمِلْعَقَةِ', 'الْمِفْتَاحِ'] },
  { id: 9, sentenceHint: 'الطَّبِيبُ يَعْمَلُ فِي ___', correctWord: 'الْمُسْتَشْفَى', options: ['الْمَدْرَسَةِ', 'الْمُسْتَشْفَى', 'الْمَصْنَعِ'] },
  { id: 10, sentenceHint: 'الْفِيلُ حَيَوَانٌ ___', correctWord: 'ضَخْمٌ', options: ['صَغِيرٌ', 'سَرِيعٌ', 'ضَخْمٌ'] },
  { id: 11, sentenceHint: 'نَرَى النُّجُومَ فِي ___', correctWord: 'اللَّيْلِ', options: ['النَّهَارِ', 'اللَّيْلِ', 'الْعَصْرِ'] },
  { id: 12, sentenceHint: 'الْعَسَلُ يَأْتِي مِنَ ___', correctWord: 'النَّحْلَةِ', options: ['الدَّجَاجَةِ', 'النَّحْلَةِ', 'الْبَقَرَةِ'] },
  { id: 13, sentenceHint: 'أَنَا أَرْتَدِي ___ فِي قَدَمَيَّ', correctWord: 'الْحِذَاءَ', options: ['الْقُبَّعَةَ', 'الْحِذَاءَ', 'الْقَمِيصَ'] },
  { id: 14, sentenceHint: 'الْقَمَرُ يَظْهَرُ فِي ___', correctWord: 'السَّمَاءِ', options: ['الْأَرْضِ', 'الْبَحْرِ', 'السَّمَاءِ'] },
  { id: 15, sentenceHint: 'صَوْتُ الْأَسَدِ ___', correctWord: 'زَئِيرٌ', options: ['مُوَاءٌ', 'نُبَاحٌ', 'زَئِيرٌ'] },
  { id: 16, sentenceHint: 'نَذْهَبُ لِلسِّبَاحَةِ فِي ___', correctWord: 'الْمَسْبَحِ', options: ['الْمَلْعَبِ', 'الْمَسْبَحِ', 'الْمَكْتَبَةِ'] },
  { id: 17, sentenceHint: 'الْجَمَلُ يَعِيشُ فِي ___', correctWord: 'الصَّحْرَاءِ', options: ['الْغَابَةِ', 'الصَّحْرَاءِ', 'الْبَحْرِ'] },
  { id: 18, sentenceHint: 'أَنَا أَغْسِلُ يَدَيَّ بِالْمَاءِ وَ ___', correctWord: 'الصَّابُونِ', options: ['الرَّمْلِ', 'الصَّابُونِ', 'الْعَصِيرِ'] },
  { id: 19, sentenceHint: 'الْجَزَرُ يُقَوِِّي ___', correctWord: 'النَّظَرَ', options: ['السَّمْعَ', 'النَّظَرَ', 'الشَّمَّ'] },
  { id: 20, sentenceHint: 'الْخُبْزُ يُصْنَعُ مِنَ ___', correctWord: 'الْقَمْحِ', options: ['الْقَمْحِ', 'الْأَرُزِّ', 'الذُّرَةِ'] },
  { id: 21, sentenceHint: 'الشَّجَرَةُ لَهَا جُذُورٌ وَ ___', correctWord: 'أَغْصَانٌ', options: ['أَجْنِحَةٌ', 'أَغْصَانٌ', 'عَجَلَاتٌ'] },
  { id: 22, sentenceHint: 'فِي الرَّبِيعِ، تَتَفَتَّحُ ___', correctWord: 'الْأَزْهَارُ', options: ['الْأَشْجَارُ', 'الثِّمَارُ', 'الْأَزْهَارُ'] },
  { id: 23, sentenceHint: 'الْكِتَابُ صَدِيقٌ ___', correctWord: 'وَفِيٌّ', options: ['جَدِيدٌ', 'وَفِيٌّ', 'كَبِيرٌ'] },
  { id: 24, sentenceHint: 'الْأَرْنَبُ يُحِبُّ أَكْلَ ___', correctWord: 'الْجَزَرِ', options: ['اللَّحْمِ', 'الْجَزَرِ', 'الْخُبْزِ'] },
  { id: 25, sentenceHint: 'الْعُصْفُورُ يَبْنِي ___', correctWord: 'عُشَّهُ', options: ['بَيْتَهُ', 'عُشَّهُ', 'جُحْرَهُ'] },
  { id: 26, sentenceHint: 'عِنْدَمَا أَكُونُ مَرِيضًا، أَذْهَبُ إِلَى ___', correctWord: 'الطَّبِيبِ', options: ['الْمُهَنْدِسِ', 'الطَّبِيبِ', 'الْمُعَلِّمِ'] },
  { id: 27, sentenceHint: 'السُّلَحْفَاةُ حَيَوَانٌ ___', correctWord: 'بَطِيءٌ', options: ['سَرِيعٌ', 'بَطِيءٌ', 'طَائِرٌ'] },
  { id: 28, sentenceHint: 'نَحْنُ نَتَعَلَّمُ فِي ___', correctWord: 'الْمَدْرَسَةِ', options: ['السُّوقِ', 'الْمَدْرَسَةِ', 'الْمَطْعَمِ'] },
  { id: 29, sentenceHint: 'الْفَرَاشَةُ حَشَرَةٌ ___', correctWord: 'جَمِيلَةٌ', options: ['قَبِيحَةٌ', 'جَمِيلَةٌ', 'كَبِيرَةٌ'] },
  { id: 30, sentenceHint: 'فِي الْخَرِيفِ، تَتَسَاقَطُ ___ الشَّجَرِ', correctWord: 'أَوْرَاقُ', options: ['أَزْهَارُ', 'أَوْرَاقُ', 'ثِمَارُ'] },
  { id: 31, sentenceHint: 'الْمُهَنْدِسُ يَبْنِي ___', correctWord: 'الْبُيُوتَ', options: ['الْأَدْوِيَةَ', 'الْبُيُوتَ', 'الطَّعَامَ'] },
  { id: 32, sentenceHint: 'الْقِطَارُ يَسِيرُ عَلَى ___', correctWord: 'قُضْبَانٍ', options: ['طَرِيقٍ', 'قُضْبَانٍ', 'مَاءٍ'] },
  { id: 33, sentenceHint: 'نَحْنُ نَشْعُرُ بِالْبَرْدِ فِي فَصْلِ ___', correctWord: 'الشِّتَاءِ', options: ['الصَّيْفِ', 'الشِّتَاءِ', 'الرَّبِيعِ'] },
  { id: 34, sentenceHint: 'الزَّيْتُ يُسْتَخْرَجُ مِنَ ___', correctWord: 'الزَّيْتُونِ', options: ['التُّفَّاحِ', 'الزَّيْتُونِ', 'الْعِنَبِ'] },
  { id: 35, sentenceHint: 'الذِّئْبُ حَيَوَانٌ ___', correctWord: 'مُفْتَرِسٌ', options: ['أَلِيفٌ', 'مُفْتَرِسٌ', 'عَاشِبٌ'] },
  { id: 36, sentenceHint: 'نَحْنُ نَرَى بِـ ___', correctWord: 'أَعْيُنِنَا', options: ['آذَانِنَا', 'أُنُوفِنَا', 'أَعْyُنِنَا'] },
  { id: 37, sentenceHint: 'الْخَبَّازُ يَصْنَعُ ___', correctWord: 'الْخُبْزَ', options: ['الْجُبْنَ', 'الْخُبْزَ', 'الْعَسَلَ'] },
  { id: 38, sentenceHint: 'الْفَلَّاحُ يَزْرَعُ ___', correctWord: 'النَّبَاتَاتِ', options: ['الْأَسْمَاكَ', 'النَّبَاتَاتِ', 'الْبُيُوتَ'] },
  { id: 39, sentenceHint: 'أَنَا أَنَامُ فِي ___', correctWord: 'السَّرِيرِ', options: ['الْمَطْبَخِ', 'الْكُرْسِيِّ', 'السَّرِيرِ'] },
  { id: 40, sentenceHint: 'الشَّجَرَةُ تُعْطِينَا ___', correctWord: 'الظِّلَّ', options: ['الْمَاءَ', 'النُّورَ', 'الظِّلَّ'] },
  { id: 41, sentenceHint: 'الْمُعَلِّمَةُ تَشْرَحُ ___', correctWord: 'الدَّرْسَ', options: ['الْقِصَّةَ', 'الدَّرْسَ', 'الطَّعَامَ'] },
  { id: 42, sentenceHint: 'الْغُيُومُ فِي السَّمَاءِ لَوْنُهَا ___', correctWord: 'أَبْيَضُ', options: ['أَزْرَقُ', 'أَخْضَرُ', 'أَبْيَضُ'] }
];

// Re-structured data for "Matching Game" to support multiple exercises per level.
const allMatchingPairs: MatchingPair[] = [
  { id: 1, word: 'أَسَدٌ', emoji: '🦁' }, { id: 2, word: 'بَيْتٌ', emoji: '🏠' },
  { id: 3, word: 'تُفَّاحَةٌ', emoji: '🍎' }, { id: 4, word: 'ثَوْبٌ', emoji: '👕' },
  { id: 5, word: 'جَمَلٌ', emoji: '🐪' }, { id: 6, word: 'حِصَانٌ', emoji: '🐎' },
  { id: 7, word: 'خَرُوفٌ', emoji: '🐑' }, { id: 8, word: 'دِيكٌ', emoji: '🐓' },
  { id: 9, word: 'ذِئْبٌ', emoji: '🐺' }, { id: 10, word: 'رَجُلٌ', emoji: '👨' },
  { id: 11, word: 'زَهْرَةٌ', emoji: '🌸' }, { id: 12, word: 'سَيَّارَةٌ', emoji: '🚗' },
  { id: 13, word: 'شَجَرَةٌ', emoji: '🌳' }, { id: 14, word: 'صَقْرٌ', emoji: '🦅' },
  { id: 15, word: 'ضِفْدَعٌ', emoji: '🐸' }, { id: 16, word: 'طَاوُوسٌ', emoji: '🦚' },
  { id: 17, word: 'ظَبْيٌ', emoji: '🦌' }, { id: 18, word: 'عَيْنٌ', emoji: '👁️' },
  { id: 19, word: 'غُرَابٌ', emoji: '🐦‍⬛' }, { id: 20, word: 'فَرَاشَةٌ', emoji: '🦋' },
  { id: 21, word: 'قَلَمٌ', emoji: '✏️' }, { id: 22, word: 'كُرَةٌ', emoji: '⚽' },
  { id: 23, word: 'لَيْمُونٌ', emoji: '🍋' }, { id: 24, word: 'مِفْتَاحٌ', emoji: '🔑' },
  { id: 25, word: 'نَجْمَةٌ', emoji: '⭐' }, { id: 26, word: 'هِلالٌ', emoji: '🌙' },
  { id: 27, word: 'وَرْدَةٌ', emoji: '🌹' }, { id: 28, word: 'يَدٌ', emoji: '🖐️' },
  { id: 29, word: 'بَابٌ', emoji: '🚪' }, { id: 30, word: 'سَاعَةٌ', emoji: '⏰' },
  { id: 31, word: 'مَدْرَسَةٌ', emoji: '🏫' }, { id: 32, word: 'طَبِيبٌ', emoji: '👨‍⚕️' },
  { id: 33, word: 'مُسْتَشْفَى', emoji: '🏥' }, { id: 34, word: 'دَفْتَرٌ', emoji: '📓' },
  { id: 35, word: 'مِمْحَاةٌ', emoji: '📝' }, { id: 36, word: 'شُرْطِيّ', emoji: '👮' },
  { id: 37, word: 'مُمَرِّضَةٌ', emoji: '👩‍⚕️' }, { id: 38, word: 'مَطَرٌ', emoji: '🌧️' },
  { id: 39, word: 'شَمْسٌ', emoji: '☀️' }, { id: 40, word: 'قَلْبٌ', emoji: '❤️' },
  { id: 41, word: 'هَاتِفٌ', emoji: '📱' }, { id: 42, word: 'كِتَابٌ', emoji: '📖' }
];

export interface MatchingLevel {
  level: number;
  label: string;
  pairs: number;
  studyTime: number;
  gridCols: string;
  exercises: MatchingPair[][];
}

export const matchingLevels: MatchingLevel[] = [
  {
    level: 1, label: 'سَهْلٌ', pairs: 4, studyTime: 5, gridCols: 'grid-cols-4',
    exercises: [
      allMatchingPairs.slice(0, 4),
      allMatchingPairs.slice(4, 8),
      allMatchingPairs.slice(8, 12),
    ]
  },
  {
    level: 2, label: 'مُتَوَسِّطٌ', pairs: 8, studyTime: 8, gridCols: 'grid-cols-4',
    exercises: [
      allMatchingPairs.slice(12, 20),
      allMatchingPairs.slice(20, 28),
    ]
  },
  {
    level: 3, label: 'صَعْبٌ', pairs: 14, studyTime: 12, gridCols: 'grid-cols-7',
    exercises: [
      allMatchingPairs.slice(28, 42),
    ]
  },
];


// Data for "Word Scramble" exercise. (Expanded to 42 questions)
export const scrambleQuestions: ScrambleQuestion[] = [
  { id: 1, word: 'مَدْرَسَةٌ', scrambledLetters: ['ةٌ', 'سَ', 'مَ', 'رَ', 'دْ'], hint: 'نَتَعَلَّمُ فِيهَا' },
  { id: 2, word: 'سَيَّارَةٌ', scrambledLetters: ['رَ', 'ةٌ', 'سَ', 'يَّا'], hint: 'نَرْكَبُهَا لِنَسَافِرَ' },
  { id: 3, word: 'حَدِيقَةٌ', scrambledLetters: ['قَ', 'حَ', 'ةٌ', 'دِي'], hint: 'مَكَانٌ فِيهِ أَزْهَارٌ' },
  { id: 4, word: 'كُرْسِيٌّ', scrambledLetters: ['يٌّ', 'سِ', 'كُ', 'رْ'], hint: 'نَجْلِسُ عَلَيْهِ' },
  { id: 5, word: 'هَاتِفٌ', scrambledLetters: ['فٌ', 'هَا', 'تِ'], hint: 'نَتَكَلَّمُ بِهِ' },
  { id: 6, word: 'مِفْتَاحٌ', scrambledLetters: ['حٌ', 'تَا', 'مِ', 'فْ'], hint: 'نَفْتَحُ بِهِ الْبَابَ' },
  { id: 7, word: 'طَبِيبٌ', scrambledLetters: ['بٌ', 'طَ', 'بِي'], hint: 'يُعَالِجُ الْمَرْضَى' },
  { id: 8, word: 'شُرْطِيٌّ', scrambledLetters: ['طِ', 'شُ', 'يٌّ', 'رْ'], hint: 'يُحَافِظُ عَلَى الْأَمْنِ' },
  { id: 9, word: 'كِتَابٌ', scrambledLetters: ['بٌ', 'كِ', 'تَا'], hint: 'نَقْرَأُ فِيهِ' },
  { id: 10, word: 'شَمْسٌ', scrambledLetters: ['سٌ', 'شَ', 'مْ'], hint: 'تُضِيءُ فِي النَّهَارِ' },
  { id: 11, word: 'قَمَرٌ', scrambledLetters: ['رٌ', 'قَ', 'مَ'], hint: 'يَظْهَرُ فِي اللَّيْلِ' },
  { id: 12, word: 'بَيْتٌ', scrambledLetters: ['تٌ', 'بَ', 'يْ'], hint: 'نَسْكُنُ فِيهِ' },
  { id: 13, word: 'قِطَارٌ', scrambledLetters: ['رٌ', 'قِ', 'طَا'], hint: 'يَسِيرُ عَلَى قُضْبَانٍ' },
  { id: 14, word: 'طَائِرَةٌ', scrambledLetters: ['ةٌ', 'رَ', 'طَا', 'ئِ'], hint: 'تَطِيرُ فِي السَّمَاءِ' },
  { id: 15, word: 'قَلَمٌ', scrambledLetters: ['مٌ', 'قَ', 'لَ'], hint: 'نَكْتُبُ بِهِ' },
  { id: 16, word: 'مَوْزٌ', scrambledLetters: ['زٌ', 'مَ', 'وْ'], hint: 'فَاكِهَةٌ صَفْرَاءُ' },
  { id: 17, word: 'بَحْرٌ', scrambledLetters: ['رٌ', 'بَ', 'حْ'], hint: 'مَاءٌ مَالِحٌ وَوَاسِعٌ' },
  { id: 18, word: 'نَهْرٌ', scrambledLetters: ['رٌ', 'نَ', 'هْ'], hint: 'مَاءٌ عَذْبٌ يَجْرِي' },
  { id: 19, word: 'شَجَرَةٌ', scrambledLetters: ['ةٌ', 'رَ', 'شَ', 'جَ'], hint: 'لَهَا جِذْعٌ وَأَغْصَانٌ' },
  { id: 20, word: 'زَهْرَةٌ', scrambledLetters: ['ةٌ', 'رَ', 'زَ', 'هْ'], hint: 'لَهَا رَائِحَةٌ جَمِيلَةٌ' },
  { id: 21, word: 'سَحَابٌ', scrambledLetters: ['بٌ', 'سَ', 'حَا'], hint: 'يَتَكَوَّنُ فِي السَّمَاءِ' },
  { id: 22, word: 'مَطَرٌ', scrambledLetters: ['رٌ', 'مَ', 'طَ'], hint: 'يَنْزِلُ مِنَ السَّحَابِ' },
  { id: 23, word: 'ثَلْجٌ', scrambledLetters: ['جٌ', 'ثَ', 'لْ'], hint: 'مَاءٌ مُتَجَمِّدٌ أَبْيَضُ' },
  { id: 24, word: 'نَارٌ', scrambledLetters: ['رٌ', 'نَا'], hint: 'تُعْطِي حَرَارَةً وَضَوْءًا' },
  { id: 25, word: 'ضَوْءٌ', scrambledLetters: ['ءٌ', 'ضَ', 'وْ'], hint: 'عَكْسُ الظَّلَامِ' },
  { id: 26, word: 'لَيْلٌ', scrambledLetters: ['لٌ', 'لَ', 'يْ'], hint: 'الْوَقْتُ الَّذِي نَنَامُ فِيهِ' },
  { id: 27, word: 'صَبَاحٌ', scrambledLetters: ['حٌ', 'صَ', 'بَا'], hint: 'بِدَايَةُ الْيَوْمِ' },
  { id: 28, word: 'غُصْنٌ', scrambledLetters: ['نٌ', 'غُ', 'صْ'], hint: 'فَرْعُ الشَّجَرَةِ' },
  { id: 29, word: 'مَلْعَبٌ', scrambledLetters: ['بٌ', 'عَ', 'مَ', 'لْ'], hint: 'نَلْعَبُ فِيهِ الْكُرَةَ' },
  { id: 30, word: 'مَطْبَخٌ', scrambledLetters: ['خٌ', 'بَ', 'مَ', 'طْ'], hint: 'نُحَضِّرُ فِيهِ الطَّعَامَ' },
  { id: 31, word: 'طَاوِلَةٌ', scrambledLetters: ['ةٌ', 'لَ', 'طَا', 'وِ'], hint: 'نَضَعُ عَلَيْهَا الْأَشْيَاءَ' },
  { id: 32, word: 'شُبَّاكٌ', scrambledLetters: ['كٌ', 'شُ', 'بَّا'], hint: 'نَنْظُرُ مِنْهُ إِلَى الْخَارِجِ' },
  { id: 33, word: 'حَقِيبَةٌ', scrambledLetters: ['ةٌ', 'بَ', 'حَ', 'قِي'], hint: 'نَحْمِلُ فِيهَا الْكُتُبَ' },
  { id: 34, word: 'مُعَلِّمٌ', scrambledLetters: ['مٌ', 'لِّ', 'مُ', 'عَ'], hint: 'يُدَرِّسُنَا فِي الْمَدْرَسَةِ' },
  { id: 35, word: 'تِلْمِيذٌ', scrambledLetters: ['ذٌ', 'مِي', 'تِ', 'لْ'], hint: 'يَتَعَلَّمُ فِي الْمَدْرَسَةِ' },
  { id: 36, word: 'مُسْتَشْفَى', scrambledLetters: ['فَى', 'تَ', 'مُ', 'شْ', 'سْ'], hint: 'يُعَالِجُ فِيهِ الطَّبِيبُ الْمَرْضَى' },
  { id: 37, word: 'مِظَلَّةٌ', scrambledLetters: ['ةٌ', 'لَّ', 'مِ', 'ظَ'], hint: 'تَحْمِينَا مِنَ الْمَطَرِ' },
  { id: 38, word: 'دَرَّاجَةٌ', scrambledLetters: ['ةٌ', 'جَ', 'دَ', 'رَّا'], hint: 'لَهَا عَجَلَتَانِ' },
  { id: 39, word: 'مَكْتَبَةٌ', scrambledLetters: ['ةٌ', 'بَ', 'مَ', 'تَ', 'كْ'], hint: 'نَقْرَأُ فِيهَا الْكُتُبَ' },
  // FIX: Added missing 'word' property to the object.
  { id: 40, word: 'أَرْنَبٌ', scrambledLetters: ['بٌ', 'نَ', 'أَ', 'رْ'], hint: 'يُحِبُّ الْجَزَرَ' },
  { id: 41, word: 'بَقَرَةٌ', scrambledLetters: ['ةٌ', 'رَ', 'بَ', 'قَ'], hint: 'تُعْطِينَا الْحَلِيبَ' },
  { id: 42, word: 'فِيلٌ', scrambledLetters: ['لٌ', 'فِي'], hint: 'لَهُ خُرْطُومٌ طَوِيلٌ' }
];

// Data for "Sentence Builder" exercise. (Expanded to 42 questions)
export const sentenceQuestions: SentenceQuestion[] = [
  { id: 1, correctSentence: 'الْوَلَدُ يَلْعَبُ بِالْكُرَةِ', scrambledWords: ['بِالْكُرَةِ', 'يَلْعَبُ', 'الْوَلَدُ'] },
  { id: 2, correctSentence: 'السَّمَاءُ زَرْقَاءُ', scrambledWords: ['زَرْقَاءُ', 'السَّمَاءُ'] },
  { id: 3, correctSentence: 'أَنَا أُحِبُّ أُمِّي', scrambledWords: ['أُمِّي', 'أُحِبُّ', 'أَنَا'] },
  { id: 4, correctSentence: 'الشَّمْسُ تُشْرِقُ صَبَاحًا', scrambledWords: ['صَبَاحًا', 'الشَّمْسُ', 'تُشْرِقُ'] },
  { id: 5, correctSentence: 'الْقِطُّ يَشْرَبُ الْحَلِيبَ', scrambledWords: ['الْحَلِيبَ', 'الْقِطُّ', 'يَشْرَبُ'] },
  { id: 6, correctSentence: 'الْكِتَابُ صَدِيقٌ وَفِيٌّ', scrambledWords: ['صَدِيقٌ', 'الْكِتَابُ', 'وَفِيٌّ'] },
  { id: 7, correctSentence: 'التُّفَّاحَةُ لَذِيذَةٌ', scrambledWords: ['لَذِيذَةٌ', 'التُّفَّاحَةُ'] },
  { id: 8, correctSentence: 'الْمُعَلِّمُ يَشْرَحُ الدَّرْسَ', scrambledWords: ['الدَّرْسَ', 'يَشْرَحُ', 'الْمُعَلِّمُ'] },
  { id: 9, correctSentence: 'تَذْهَبُ الْبِنْتُ إِلَى الْمَدْرَسَةِ', scrambledWords: ['إِلَى', 'الْمَدْرَسَةِ', 'تَذْهَبُ', 'الْبِنْتُ'] },
  { id: 10, correctSentence: 'الْأَسَدُ مَلِكُ الْغَابَةِ', scrambledWords: ['الْغَابَةِ', 'مَلِكُ', 'الْأَسَدُ'] },
  { id: 11, correctSentence: 'أَنَا أَكْتُبُ الْوَاجِبَ', scrambledWords: ['الْوَاجِبَ', 'أَنَا', 'أَكْتُBُ'] },
  { id: 12, correctSentence: 'السَّيَّارَةُ سَرِيعَةٌ جِدًّا', scrambledWords: ['سَرِيعَةٌ', 'جِدًّا', 'السَّيَّارَةُ'] },
  { id: 13, correctSentence: 'الْوَرْدَةُ حَمْرَاءُ', scrambledWords: ['حَمْرَاءُ', 'الْوَرْدَةُ'] },
  { id: 14, correctSentence: 'الطَّائِرُ يُغَرِّدُ فَوْقَ الشَّجَرَةِ', scrambledWords: ['الشَّجَرَةِ', 'يُغَرِّدُ', 'فَوْقَ', 'الطَّائِرُ'] },
  { id: 15, correctSentence: 'الْفِيلُ كَبِيرُ الْحَجْمِ', scrambledWords: ['الْحَجْمِ', 'كَبِيرُ', 'الْفِيلُ'] },
  { id: 16, correctSentence: 'أَنَا أَرْسُمُ صُورَةً جَمِيلَةً', scrambledWords: ['جَمِيلَةً', 'أَرْسُمُ', 'صُورَةً', 'أَنَا'] },
  { id: 17, correctSentence: 'الْقَمَرُ يُنِيرُ اللَّيْلَ', scrambledWords: ['اللَّيْلَ', 'يُنِيرُ', 'الْقَمَرُ'] },
  { id: 18, correctSentence: 'نَحْنُ نَلْعَبُ فِي الْحَدِيقَةِ', scrambledWords: ['فِي', 'نَلْعَبُ', 'الْحَدِيقَةِ', 'نَحْنُ'] },
  { id: 19, correctSentence: 'الطَّعَامُ شَهِيٌّ', scrambledWords: ['شَهِيٌّ', 'الطَّعَامُ'] },
  { id: 20, correctSentence: 'الْمَاءُ ضَرُورِيٌّ لِلْحَيَاةِ', scrambledWords: ['لِلْحَيَاةِ', 'الْمَاءُ', 'ضَرُورِيٌّ'] },
  { id: 21, correctSentence: 'الْأَرْنَبُ يَأْكُلُ الْجَزَرَ', scrambledWords: ['الْجَزَرَ', 'يَأْكُلُ', 'الْأَرْنَبُ'] },
  { id: 22, correctSentence: 'أَبِي يَقْرَأُ الْجَرِيدَةَ', scrambledWords: ['الْجَرِيدَةَ', 'أَبِي', 'يَقْرَأُ'] },
  { id: 23, correctSentence: 'السَّمَكَةُ تَسْبَحُ فِي الْمَاءِ', scrambledWords: ['فِي', 'السَّمَكَةُ', 'الْمَاءِ', 'تَسْبَحُ'] },
  { id: 24, correctSentence: 'الْعِلْمُ نُورٌ', scrambledWords: ['نُورٌ', 'الْعِلْمُ'] },
  { id: 25, correctSentence: 'النَّحْلَةُ تَصْنَعُ الْعَسَلَ', scrambledWords: ['الْعَسَلَ', 'النَّحْلَةُ', 'تَصْنَعُ'] },
  { id: 26, correctSentence: 'الْجَمَلُ سَفِينَةُ الصَّحْرَاءِ', scrambledWords: ['الصَّحْرَاءِ', 'سَفِينَةُ', 'الْجَمَلُ'] },
  { id: 27, correctSentence: 'الْفَرَاشَةُ تَطِيرُ بَيْنَ الْأَزْهَارِ', scrambledWords: ['بَيْنَ', 'الْأَزْهَارِ', 'تَطِيرُ', 'الْفَرَاشَةُ'] },
  { id: 28, correctSentence: 'أَنَا أُسَاعِدُ أَصْدِقَائِي', scrambledWords: ['أَصْدِقَائِي', 'أُسَاعِدُ', 'أَنَا'] },
  { id: 29, correctSentence: 'الْخَرُوفُ يَأْكُلُ الْعُشْبَ', scrambledWords: ['الْعُشْبَ', 'يَأْكُلُ', 'الْخَرُوفُ'] },
  { id: 30, correctSentence: 'الطَّبِيبُ يُعَالِجُ الْمَرْضَى', scrambledWords: ['الْمَرْضَى', 'الطَّبِيبُ', 'يُعَالِجُ'] },
  { id: 31, correctSentence: 'الْقِرْدُ يُحِبُّ الْمَوْزَ', scrambledWords: ['الْمَوْزَ', 'يُحِبُّ', 'الْقِرْدُ'] },
  { id: 32, correctSentence: 'الْكَلْبُ صَدِيقٌ وَفِيٌّ', scrambledWords: ['صَدِيقٌ', 'الْكَلْبُ', 'وَفِيٌّ'] },
  { id: 33, correctSentence: 'أَنَا أَغْسِلُ أَسْنَانِي', scrambledWords: ['أَسْنَانِي', 'أَنَا', 'أَغْسِلُ'] },
  { id: 34, correctSentence: 'الدِّيكُ يَصِيحُ فِي الصَّبَاحِ', scrambledWords: ['الصَّبَاحِ', 'فِي', 'يَصِيحُ', 'الدِّيكُ'] },
  { id: 35, correctSentence: 'السُّلَحْفَاةُ بَطِيئَةٌ', scrambledWords: ['بَطِيئَةٌ', 'السُّلَحْفَاةُ'] },
  { id: 36, correctSentence: 'الْمُهَنْدِسُ يَبْنِي الْبُيُوتَ', scrambledWords: ['الْبُيُوتَ', 'الْمُهَنْدِسُ', 'يَبْنِي'] },
  { id: 37, correctSentence: 'الشُّرْطِيُّ يُنَظِّمُ الْمُرُورَ', scrambledWords: ['الْمُرُورَ', 'يُنَظِّمُ', 'الشُّرْطِيُّ'] },
  { id: 38, correctSentence: 'أَنَا أَحْتَرِمُ الْكِبَارَ', scrambledWords: ['الْكِبَارَ', 'أَحْتَرِمُ', 'أَنَا'] },
  { id: 39, correctSentence: 'الْفَلَّاحُ يَزْرَعُ الْأَرْضَ', scrambledWords: ['الْأَرْضَ', 'يَزْرَعُ', 'الْفَلَّاحُ'] },
  { id: 40, correctSentence: 'أُصَلِّي فِي الْمَسْجِدِ', scrambledWords: ['الْمَسْجِدِ', 'فِي', 'أُصَلِّي'] },
  { id: 41, correctSentence: 'الْخَبَّازُ يَصْنَعُ الْخُبْزَ', scrambledWords: ['الْخُبْزَ', 'يَصْنَعُ', 'الْخَبَّازُ'] },
  { id: 42, correctSentence: 'الْمَطَرُ يَنْزِلُ مِنَ السَّمَاءِ', scrambledWords: ['السَّمَاءِ', 'مِنَ', 'يَنْزِلُ', 'الْمَطَرُ'] }
];

// Data for "Who Am I?" exercise.
export const whoAmIQuestions: WhoAmIQuestion[] = [
  { id: 1, riddle: 'أَنَا مَلِكُ الْغَابَةِ وَصَوْتِي زَئِيرٌ. مَنْ أَكُونُ؟', answer: 'أَسَدٌ', options: ['أَسَدٌ', 'نَمِرٌ', 'قِطٌّ'] },
  { id: 2, riddle: 'أَطِيرُ فِي السَّمَاءِ وَلِي أَجْنِحَةٌ. مَنْ أَكُونُ؟', answer: 'طَائِرٌ', options: ['سَمَكَةٌ', 'طَائِرٌ', 'أَرْنَبٌ'] },
  { id: 3, riddle: 'أَعِيشُ فِي الْبَحْرِ وَأَسْبَحُ بِزَعَانِفِي. مَنْ أَكُونُ؟', answer: 'سَمَكَةٌ', options: ['سَمَكَةٌ', 'قِرْدٌ', 'دُبٌّ'] },
  { id: 4, riddle: 'لِي خُرْطُومٌ طَوِيلٌ وَأَنَا ضَخْمٌ جِدًّا. مَنْ أَكُونُ؟', answer: 'فِيلٌ', options: ['فِيلٌ', 'زَرَافَةٌ', 'حِصَانٌ'] },
  { id: 5, riddle: 'أُعْطِيكُمُ الْعَسَلَ اللَّذِيذَ. مَنْ أَكُونُ؟', answer: 'نَحْلَةٌ', options: ['فَرَاشَةٌ', 'نَمْلَةٌ', 'نَحْلَةٌ'] },
  { id: 6, riddle: 'أَنَا أَحْمَرُ وَمُدَوَّرٌ وَأَنْمُو عَلَى الشَّجَرَةِ. مَنْ أَكُونُ؟', answer: 'تُفَّاحَةٌ', options: ['بُرْتُقَالَةٌ', 'مَوْزَةٌ', 'تُفَّاحَةٌ'] },
  { id: 7, riddle: 'أُضِيءُ فِي اللَّيْلِ وَأَظْهَرُ مَعَ النُّجُومِ. مَنْ أَكُونُ؟', answer: 'قَمَرٌ', options: ['شَمْسٌ', 'قَمَرٌ', 'غَيْمَةٌ'] },
  { id: 8, riddle: 'نَرْكَبُنِي لِنَنْتَقِلَ مِنْ مَكَانٍ لِآخَرَ. مَنْ أَكُونُ؟', answer: 'سَيَّارَةٌ', options: ['سَيَّارَةٌ', 'طَاوِلَةٌ', 'بَيْتٌ'] },
  { id: 9, riddle: 'يُعَالِجُ الْمَرْضَى وَيَعْمَلُ فِي الْمُسْتَشْفَى. مَنْ هُوَ؟', answer: 'طَبِيبٌ', options: ['مُعَلِّمٌ', 'طَبِيبٌ', 'مُهَنْدِسٌ'] },
  { id: 10, riddle: 'نَقْرَأُ فِيهِ الْقِصَصَ وَالْمَعْلُومَاتِ. مَا هُوَ؟', answer: 'كِتَابٌ', options: ['دَفْتَرٌ', 'قَلَمٌ', 'كِتَابٌ'] },
];

// Data for the Crossword Exercise
export const crosswordData = {
    size: 10,
    clues: [
        { number: 1, clue: 'نَأْكُلُهُ فِي الصَّبَاحِ', answer: 'خُبْزٌ', direction: 'across', row: 0, col: 6 },
        { number: 2, clue: 'عَاصِمَةُ مِصْرَ', answer: 'قَاهِرَةٌ', direction: 'across', row: 2, col: 0 },
        { number: 3, clue: 'مَكَانُ التَّعَلُُّمِ', answer: 'مَدْرَسَةٌ', direction: 'across', row: 5, col: 4 },
        { number: 4, clue: 'لَوْنُ السَّمَاءِ', answer: 'أَزْرَقُ', direction: 'down', row: 0, col: 8 },
        { number: 5, clue: 'حَيَوَانٌ أَلِيفٌ يَقُولُ "مواء"', answer: 'قِطٌّ', direction: 'down', row: 2, col: 0 },
        { number: 6, clue: 'نَكْتُبُ بِهِ', answer: 'قَلَمٌ', direction: 'down', row: 4, col: 5 },
    ] as CrosswordClue[]
};

// Data for "Flash Word" exercise.
export const flashWordQuestions: FlashWordQuestion[] = [
    { id: 1, word: 'شَمْسٌ', emoji: '☀️', options: ['شَمْسٌ', 'أَمْسٌ', 'خَمْسٌ', 'لَمْسٌ'] },
    { id: 2, word: 'قَمَرٌ', emoji: '🌙', options: ['قَمَرٌ', 'أَمَرٌ', 'عُمَرُ', 'قَدَرٌ'] },
    { id: 3, word: 'بَيْتٌ', emoji: '🏠', options: ['بَيْتٌ', 'زَيْتٌ', 'بِنْتٌ', 'لَيْتٌ'] },
    { id: 4, word: 'كِتَابٌ', emoji: '📖', options: ['كِتَابٌ', 'حِسَابٌ', 'عِقَابٌ', 'سَحَابٌ'] },
    { id: 5, word: 'مَاءٌ', emoji: '💧', options: ['مَاءٌ', 'دَاءٌ', 'جَاءَ', 'سَاءَ'] },
    { id: 6, word: 'أَسَدٌ', emoji: '🦁', options: ['أَسَدٌ', 'أَحَدٌ', 'أَبَدٌ', 'أَسَفٌ'] },
    { id: 7, word: 'سَمَكَةٌ', emoji: '🐟', options: ['سَمَكَةٌ', 'مَلَكَةٌ', 'بَرَكَةٌ', 'سَكَنَةٌ'] },
    { id: 8, word: 'قَلَمٌ', emoji: '✏️', options: ['قَلَمٌ', 'عَلَمٌ', 'أَلَمٌ', 'حَلَمَ'] },
    { id: 9, word: 'شَجَرَةٌ', emoji: '🌳', options: ['شَجَرَةٌ', 'حَجَرَةٌ', 'فَجَرَةٌ', 'شَذَرَةٌ'] },
    { id: 10, word: 'كُرَةٌ', emoji: '⚽', options: ['كُرَةٌ', 'قُرَّةٌ', 'مَرَّةٌ', 'كَرَّةٌ'] },
    { id: 11, word: 'طَائِرَةٌ', emoji: '✈️', options: ['طَائِرَةٌ', 'دَائِرَةٌ', 'سَائِرَةٌ', 'حَائِرَةٌ'] },
    { id: 12, word: 'حِصَانٌ', emoji: '🐎', options: ['حِصَانٌ', 'لِسَانٌ', 'إِحْسَانٌ', 'بُسْتَانٌ'] },
    { id: 13, word: 'زَهْرَةٌ', emoji: '🌸', options: ['زَهْرَةٌ', 'قَهْرَةٌ', 'نَهْرَةٌ', 'مَهَرَةٌ'] },
    { id: 14, word: 'مَدْرَسَةٌ', emoji: '🏫', options: ['مَدْرَسَةٌ', 'مُدَرِّسَةٌ', 'هَنْدَسَةٌ', 'مُفْتَرَسَةٌ'] },
    { id: 15, word: 'طَعَامٌ', emoji: '🍔', options: ['طَعَامٌ', 'ظَلَامٌ', 'مَقَامٌ', 'سَلَامٌ'] },
    { id: 16, word: 'بَحْرٌ', emoji: '🌊', options: ['بَحْرٌ', 'سِحْرٌ', 'شِعْرٌ', 'نَحْرٌ'] },
    { id: 17, word: 'نَجْمَةٌ', emoji: '⭐', options: ['نَجْمَةٌ', 'نَغْمَةٌ', 'نِعْمَةٌ', 'نَقْمَةٌ'] },
    { id: 18, word: 'وَرْدَةٌ', emoji: '🌹', options: ['وَرْدَةٌ', 'بَرْدَةٌ', 'رِدَّةٌ', 'وَرْطَةٌ'] },
    { id: 19, word: 'هَاتِفٌ', emoji: '📱', options: ['هَاتِفٌ', 'هَادِفٌ', 'نَاحِفٌ', 'عَاطِفٌ'] },
    { id: 20, word: 'سَيَّارَةٌ', emoji: '🚗', options: ['سَيَّارَةٌ', 'طَيَّارَةٌ', 'حَيَّارَةٌ', 'زَيَّارَةٌ'] },
];

// Data for "Listen and Choose" exercise.
export const listenQuestions: ListenQuestion[] = [
  { id: 1, correctWord: 'عَيْنٌ', options: ['عَيْنٌ', 'أَيْنَ', 'عَن'] },
  { id: 2, correctWord: 'كَلْبٌ', options: ['كَلْبٌ', 'قَلْبٌ', 'كُلُّ'] },
  { id: 3, correctWord: 'سَارَ', options: ['سَارَ', 'صَارَ', 'سُرَّ'] },
  { id: 4, correctWord: 'تِينٌ', options: ['تِينٌ', 'طِينٌ', 'مَتِينٌ'] },
  { id: 5, correctWord: 'خَالٌ', options: ['خَالٌ', 'حَالٌ', 'قَالَ'] },
];

// New data for Word Hunter, with multiple exercises per level.
export const wordHunterLevels: string[][][] = [
  // Level 1: 3x3 grid
  [ ['ماء', 'يد'], ['فم', 'أب'], ['دم', 'أخ'] ],
  // Level 2: 5x5 grid
  [ ['شمس', 'قمر', 'بحر'], ['نجم', 'ليل', 'نور'], ['سماء', 'غيم', 'ريح'] ],
  // Level 3: 6x6 grid
  [ ['بيت', 'باب', 'قلم', 'اسد'], ['نمر', 'جمل', 'فيل', 'كلب'], ['كرسي', 'طاولة', 'مكتب'] ],
  // Level 4: 7x7 grid
  [ ['قطار', 'طائرة', 'سيارة'], ['مدرسة', 'كتاب', 'دفتر'], ['طبيب', 'ممرضة', 'مشفى'] ],
];

// Base Arabic letters for the Word Hunter grid, without diacritics.
export const arabicLetters: string[] = [
    'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص',
    'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ء'
];

// Data for the Story Spark generator.
export const storyWords: StoryWord[] = [
    { id: 1, word: 'قَمَرٌ', emoji: '🌙' },
    { id: 2, word: 'سَفِينَةٌ', emoji: '⛵' },
    { id: 3, word: 'كَنْزٌ', emoji: '💎' },
    { id: 4, word: 'أَمِيرَةٌ', emoji: '👸' },
    { id: 5, word: 'تِنِّينٌ', emoji: '🐉' },
    { id: 6, word: 'قَلْعَةٌ', emoji: '🏰' },
    { id: 7, word: 'سَاحِرٌ', emoji: '🧙' },
    { id: 8, word: 'غَابَةٌ', emoji: '🌲' },
];

// FIX: Add data for the StoryLogicExercise component.
export const storyLogicQuestions: StoryLogicQuestion[] = [
  { id: 1, emojis: ['🌳', '🌱', '🍎'], correctOrder: ['🌱', '🌳', '🍎'], storySentence: 'زَرَعَ الْوَلَدُ بَذْرَةً، فَكَبُرَتْ لِتُصْبِحَ شَجَرَةً، ثُمَّ أَثْمَرَتْ تُفَّاحًا.' },
  { id: 2, emojis: ['🐣', '🥚', '🐓'], correctOrder: ['🥚', '🐣', '🐓'], storySentence: 'كَانَتْ هُنَاكَ بَيْضَةٌ، فَفَقَسَتْ وَخَرَجَ مِنْهَا صُوصٌ، ثُمَّ كَبُرَ لِيُصْبِحَ دَجَاجَةً.' },
  { id: 3, emojis: ['👨', '👶', '👦'], correctOrder: ['👶', '👦', '👨'], storySentence: 'كَانَ طِفْلًا رَضِيعًا، ثُمَّ أَصْبَحَ وَلَدًا، ثُمَّ كَبُرَ لِيُصْبِحَ رَجُلًا.' },
  { id: 4, emojis: ['📖', '✏️', '🤔'], correctOrder: ['🤔', '✏️', '📖'], storySentence: 'فَكَّرَ فِي فِكْرَةٍ، فَكَتَبَهَا بِالْقَلَمِ، ثُمَّ تَحَوَّلَتْ إِلَى كِتَابٍ.' },
  { id: 5, emojis: ['😴', '☀️', '🌙'], correctOrder: ['☀️', '🌙', '😴'], storySentence: 'أَشْرَقَتِ الشَّمْسُ فِي النَّهَارِ، ثُمَّ ظَهَرَ الْقَمَرُ فِي اللَّيْلِ، وَحَانَ وَقْتُ النَّوْمِ.' },
];

// --- New Data for New Games ---

// Data for "Days of the Week" challenge. The week now starts on Monday.
export const daysOfWeek: string[] = [
  'الْاِثْنَيْنِ', 'الثُّلَاثَاءُ', 'الْأَرْبِعَاءُ', 'الْخَمِيسُ', 'الْجُمُعَةُ', 'السَّبْتُ', 'الْأَحَدُ'
];

// Exercises updated to reflect Monday as the start of the week.
export const daysOfWeekExercises: DaysOfWeekExercise[] = [
  { id: 1, type: DaysOfWeekExerciseType.ORDER_DRAG_DROP },
  { id: 2, type: DaysOfWeekExerciseType.MULTIPLE_CHOICE, prompt: 'مَا هُوَ الْيَوْمُ الَّذِي يَأْتِي بَعْدَ يَوْمِ الْاِثْنَيْنِ؟', correctAnswer: 'الثُّلَاثَاءُ', options: ['الثُّلَاثَاءُ', 'الْأَحَدُ', 'الْأَرْبِعَاءُ'] },
  { id: 3, type: DaysOfWeekExerciseType.MULTIPLE_CHOICE, prompt: 'مَا هُوَ الْيَوْمُ الَّذِي يَأْتِي قَبْلَ يَوْمِ الْجُمُعَةِ؟', correctAnswer: 'الْخَمِيسُ', options: ['الْأَرْبِعَاءُ', 'السَّبْتُ', 'الْخَمِيسُ'] },
  { id: 4, type: DaysOfWeekExerciseType.MULTIPLE_CHOICE, prompt: 'إِذَا كَانَ الْيَوْمُ هُوَ الثُّلَاثَاءُ، فَمَاذَا سَيَكُونُ الْغَدُ؟', correctAnswer: 'الْأَرْبِعَاءُ', options: ['الْأَرْبِعَاءُ', 'الْخَمِيسُ', 'الْاِثْنَيْنِ'] },
  { id: 5, type: DaysOfWeekExerciseType.ORDER_DRAG_DROP },
  { id: 6, type: DaysOfWeekExerciseType.MULTIPLE_CHOICE, prompt: 'مَا هُوَ الْيَوْمُ الَّذِي يَأْتِي بَعْدَ يَوْمِ الْخَمِيسِ؟', correctAnswer: 'الْجُمُعَةُ', options: ['السَّبْتُ', 'الْأَرْبِعَاءُ', 'الْجُمُعَةُ'] },
  { id: 7, type: DaysOfWeekExerciseType.MULTIPLE_CHOICE, prompt: 'مَا هُوَ أَوَّلُ أَيَّامِ الْأُسْبُوعِ؟', correctAnswer: 'الْاِثْنَيْنِ', options: ['الْاِثْنَيْنِ', 'الْجُمُعَةُ', 'الْأَحَدُ'] },
  { id: 8, type: DaysOfWeekExerciseType.MULTIPLE_CHOICE, prompt: 'مَا هُوَ آخِرُ أَيَّامِ الْأُسْبُوعِ؟', correctAnswer: 'الْأَحَدُ', options: ['الْخَمِيسُ', 'السَّبْتُ', 'الْأَحَدُ'] },
];


// Data for "Opposites Match" game, structured into multiple exercises.
const allOpposites: OppositesPair[] = [
  { id: 1, word1: 'كَبِيرٌ', word2: 'صَغِيرٌ' }, { id: 2, word1: 'طَوِيلٌ', word2: 'قَصِيرٌ' },
  { id: 3, word1: 'حَارٌّ', word2: 'بَارِدٌ' }, { id: 4, word1: 'لَيْلٌ', word2: 'نَهَارٌ' },
  { id: 5, word1: 'فَوْقَ', word2: 'تَحْتَ' }, { id: 6, word1: 'سَرِيعٌ', word2: 'بَطِيءٌ' },
  { id: 7, word1: 'نَظِيفٌ', word2: 'مُتَّسِخٌ' }, { id: 8, word1: 'سَعِيدٌ', word2: 'حَزِينٌ' },
  { id: 9, word1: 'يَمِينٌ', word2: 'يَسَارٌ' }, { id: 10, word1: 'مُمْتَلِئٌ', word2: 'فَارِغٌ' },
  { id: 11, word1: 'جَدِيدٌ', word2: 'قَدِيمٌ' }, { id: 12, word1: 'أَبْيَضُ', word2: 'أَسْوَدُ' },
];

export const oppositesExercises: OppositesExercise[] = [
  { id: 1, type: OppositesExerciseType.CONNECT_WORDS, pairs: allOpposites.slice(0, 5) },
  { id: 2, type: OppositesExerciseType.MULTIPLE_CHOICE, promptWord: 'سَرِيعٌ', correctAnswer: 'بَطِيءٌ', options: ['بَطِيءٌ', 'كَبِيرٌ', 'حَارٌّ'] },
  { id: 3, type: OppositesExerciseType.FILL_IN_THE_BLANK, sentenceHint: 'الشَّمْسُ تَظْهَرُ فِي النَّهَارِ، وَالْقَمَرُ يَظْهَرُ فِي ___', correctAnswer: 'اللَّيْلِ', options: ['اللَّيْلِ', 'الصَّبَاحِ', 'الْغَابَةِ'] },
  { id: 4, type: OppositesExerciseType.CONNECT_WORDS, pairs: allOpposites.slice(5, 10) },
  { id: 5, type: OppositesExerciseType.MULTIPLE_CHOICE, promptWord: 'نَظِيفٌ', correctAnswer: 'مُتَّسِخٌ', options: ['جَدِيدٌ', 'فَارِغٌ', 'مُتَّسِخٌ'] },
  { id: 6, type: OppositesExerciseType.FILL_IN_THE_BLANK, sentenceHint: 'الْفِيلُ كَبِيرٌ، لَكِنَّ الْفَأْرَ ___', correctAnswer: 'صَغِيرٌ', options: ['قَصِيرٌ', 'صَغِيرٌ', 'بَطِيءٌ'] },
  { id: 7, type: OppositesExerciseType.CONNECT_WORDS, pairs: [allOpposites[10], allOpposites[11], allOpposites[0], allOpposites[7], allOpposites[8]] },
  { id: 8, type: OppositesExerciseType.MULTIPLE_CHOICE, promptWord: 'فَوْقَ', correctAnswer: 'تَحْتَ', options: ['يَمِينٌ', 'تَحْتَ', 'يَسَارٌ'] },
];