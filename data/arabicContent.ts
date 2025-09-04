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

// Data for "Complete the Letter" exercise. (Expanded to 42 questions)
export const letterQuestions: LetterQuestion[] = [
  { id: 1, wordHint: 'قِـ_', correctLetter: 'طّ', options: ['طّ', 'ف', 'ل'], vocalizedWord: 'قِطٌّ' },
  { id: 2, wordHint: 'أَرْنَـ_', correctLetter: 'ب', options: ['ب', 'د', 'ر'], vocalizedWord: 'أَرْنَبٌ' },
  { id: 3, wordHint: 'شَمْـ_', correctLetter: 'س', options: ['س', 'ش', 'ص'], vocalizedWord: 'شَمْسٌ' },
  { id: 4, wordHint: 'كِتَا_', correctLetter: 'ب', options: ['د', 'ب', 'ت'], vocalizedWord: 'كِتَابٌ' },
  { id: 5, wordHint: 'فِـ_', correctLetter: 'يل', options: ['يل', 'م', 'ن'], vocalizedWord: 'فِيلٌ' },
  { id: 6, wordHint: 'بَـ_ـرَةٌ', correctLetter: 'ق', options: ['ق', 'ف', 'ع'], vocalizedWord: 'بَقَرَةٌ' },
  { id: 7, wordHint: 'شُـ_ـَّاكٌ', correctLetter: 'ب', options: ['ب', 'ت', 'ث'], vocalizedWord: 'شُبَّاكٌ' },
  { id: 8, wordHint: 'مِفْتَا_', correctLetter: 'حٌ', options: ['حٌ', 'خٌ', 'جٌ'], vocalizedWord: 'مِفْتَاحٌ' },
  { id: 9, wordHint: 'زَرَافَـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'تُ', 'هِ'], vocalizedWord: 'زَرَافَةٌ' },
  { id: 10, wordHint: 'عُصْفُو_', correctLetter: 'رٌ', options: ['رٌ', 'زٌ', 'دٌ'], vocalizedWord: 'عُصْفُورٌ' },
  { id: 11, wordHint: 'خُـ_ـزٌ', correctLetter: 'ب', options: ['ب', 'ض', 'ص'], vocalizedWord: 'خُبْزٌ' },
  { id: 12, wordHint: 'نَـ_ـلَةٌ', correctLetter: 'م', options: ['م', 'خ', 'ح'], vocalizedWord: 'نَمْلَةٌ' },
  { id: 13, wordHint: 'بُرْتُقَا_', correctLetter: 'لٌ', options: ['لٌ', 'نٌ', 'مٌ'], vocalizedWord: 'بُرْتُقَالٌ' },
  { id: 14, wordHint: 'سَمَـ_ـةٌ', correctLetter: 'ك', options: ['ك', 'ق', 'غ'], vocalizedWord: 'سَمَكَةٌ' },
  { id: 15, wordHint: 'حِصَا_', correctLetter: 'نٌ', options: ['نٌ', 'مٌ', 'بٌ'], vocalizedWord: 'حِصَانٌ' },
  { id: 16, wordHint: 'دَجَا_ـةٌ', correctLetter: 'ج', options: ['ج', 'ح', 'خ'], vocalizedWord: 'دَجَاجَةٌ' },
  { id: 17, wordHint: 'كُرْ_ـيٌّ', correctLetter: 'س', options: ['س', 'ص', 'ش'], vocalizedWord: 'كُرْسِيٌّ' },
  { id: 18, wordHint: 'مَوْ_', correctLetter: 'زٌ', options: ['زٌ', 'رٌ', 'سٌ'], vocalizedWord: 'مَوْزٌ' },
  { id: 19, wordHint: 'طَائـِ_ـةٌ', correctLetter: 'ر', options: ['ر', 'د', 'ذ'], vocalizedWord: 'طَائِرَةٌ' },
  { id: 20, wordHint: 'وَرْ_ـةٌ', correctLetter: 'د', options: ['د', 'ذ', 'ز'], vocalizedWord: 'وَرْدَةٌ' },
  { id: 21, wordHint: 'بِـ_ـيخٌ', correctLetter: 'طّ', options: ['طّ', 'ت', 'ث'], vocalizedWord: 'بِطِّيخٌ' },
  { id: 22, wordHint: 'عِنَـ_', correctLetter: 'بٌ', options: ['بٌ', 'تٌ', 'ثٌ'], vocalizedWord: 'عِنَبٌ' },
  { id: 23, wordHint: 'غَـ_ـالٌ', correctLetter: 'ز', options: ['ز', 'ر', 'س'], vocalizedWord: 'غَزَالٌ' },
  { id: 24, wordHint: 'قَلَـ_', correctLetter: 'مٌ', options: ['مٌ', 'نٌ', 'لٌ'], vocalizedWord: 'قَلَمٌ' },
  { id: 25, wordHint: 'ضِفْـ_ـعٌ', correctLetter: 'د', options: ['د', 'ط', 'ظ'], vocalizedWord: 'ضِفْدَعٌ' },
  { id: 26, wordHint: 'هِـ_ـالٌ', correctLetter: 'ل', options: ['ل', 'م', 'ن'], vocalizedWord: 'هِلَالٌ' },
  { id: 27, wordHint: 'ثَـ_ـلَبٌ', correctLetter: 'ع', options: ['ع', 'غ', 'ف'], vocalizedWord: 'ثَعْلَبٌ' },
  { id: 28, wordHint: 'يَـ_', correctLetter: 'دٌ', options: ['دٌ', 'ذٌ', 'رٌ'], vocalizedWord: 'يَدٌ' },
  { id: 29, wordHint: 'سَاعَـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'تُ', 'هِ'], vocalizedWord: 'سَاعَةٌ' },
  { id: 30, wordHint: 'بَـ_ـرٌ', correctLetter: 'ح', options: ['ح', 'خ', 'ج'], vocalizedWord: 'بَحْرٌ' },
  { id: 31, wordHint: 'دُ_', correctLetter: 'بٌّ', options: ['بٌّ', 'تٌّ', 'ثٌّ'], vocalizedWord: 'دُبٌّ' },
  { id: 32, wordHint: 'نَـ_ـرٌ', correctLetter: 'م', options: ['م', 'مِ', 'مُ'], vocalizedWord: 'نَمِرٌ' },
  { id: 33, wordHint: 'خُفَّا_', correctLetter: 'شٌ', options: ['شٌ', 'سٌ', 'صٌ'], vocalizedWord: 'خُفَّاشٌ' },
  { id: 34, wordHint: 'جَـ_ـَلٌ', correctLetter: 'م', options: ['م', 'ن', 'ل'], vocalizedWord: 'جَمَلٌ' },
  { id: 35, wordHint: 'مَطَـ_', correctLetter: 'رٌ', options: ['رٌ', 'زٌ', 'دٌ'], vocalizedWord: 'مَطَرٌ' },
  { id: 36, wordHint: 'نَـ_ـمَةٌ', correctLetter: 'ج', options: ['ج', 'ح', 'خ'], vocalizedWord: 'نَجْمَةٌ' },
  { id: 37, wordHint: 'سَفِينَـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'ت', 'ه'], vocalizedWord: 'سَفِينَةٌ' },
  { id: 38, wordHint: 'حَقِيـ_ـةٌ', correctLetter: 'ب', options: ['ب', 'ت', 'ث'], vocalizedWord: 'حَقِيبَةٌ' },
  { id: 39, wordHint: 'طَاوِلَـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'ت', 'ه'], vocalizedWord: 'طَاوِلَةٌ' },
  { id: 40, wordHint: 'مُعَلِّـ_', correctLetter: 'مٌ', options: ['مٌ', 'نٌ', 'لٌ'], vocalizedWord: 'مُعَلِّمٌ' },
  { id: 41, wordHint: 'فَرَاشَـ_', correctLetter: 'ةٌ', options: ['ةٌ', 'ت', 'ه'], vocalizedWord: 'فَرَاشَةٌ' },
  { id: 42, wordHint: 'مَـ_ـتَبٌ', correctLetter: 'ك', options: ['ك', 'ق', 'غ'], vocalizedWord: 'مَكْتَبٌ' }
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
  { id: 36, sentenceHint: 'نَحْنُ نَرَى بِـ ___', correctWord: 'أَعْيُنِنَا', options: ['آذَانِنَا', 'أُنُوفِنَا', 'أَعْيُنِنَا'] },
  { id: 37, sentenceHint: 'الْخَبَّازُ يَصْنَعُ ___', correctWord: 'الْخُبْزَ', options: ['الْجُبْنَ', 'الْخُبْزَ', 'الْعَسَلَ'] },
  { id: 38, sentenceHint: 'الْفَلَّاحُ يَزْرَعُ ___', correctWord: 'النَّبَاتَاتِ', options: ['الْأَسْمَاكَ', 'النَّبَاتَاتِ', 'الْبُيُوتَ'] },
  { id: 39, sentenceHint: 'أَنَا أَنَامُ فِي ___', correctWord: 'السَّرِيرِ', options: ['الْمَطْبَخِ', 'الْكُرْسِيِّ', 'السَّرِيرِ'] },
  { id: 40, sentenceHint: 'الشَّجَرَةُ تُعْطِينَا ___', correctWord: 'الظِّلَّ', options: ['الْمَاءَ', 'النُّورَ', 'الظِّلَّ'] },
  { id: 41, sentenceHint: 'الْمُعَلِّمَةُ تَشْرَحُ ___', correctWord: 'الدَّرْسَ', options: ['الْقِصَّةَ', 'الدَّرْسَ', 'الطَّعَامَ'] },
  { id: 42, sentenceHint: 'الْغُيُومُ فِي السَّمَاءِ لَوْنُهَا ___', correctWord: 'أَبْيَضُ', options: ['أَزْرَقُ', 'أَخْضَرُ', 'أَبْيَضُ'] }
];

// Data for "Matching Game". (Expanded to 42 pairs with emojis)
export const matchingPairs: MatchingPair[] = [
  { id: 1, word: 'أَسَدٌ', emoji: '🦁' },
  { id: 2, word: 'بَيْتٌ', emoji: '🏠' },
  { id: 3, word: 'تُفَّاحَةٌ', emoji: '🍎' },
  { id: 4, word: 'ثَوْبٌ', emoji: '👕' },
  { id: 5, word: 'جَمَلٌ', emoji: '🐪' },
  { id: 6, word: 'حِصَانٌ', emoji: '🐎' },
  { id: 7, word: 'خَرُوفٌ', emoji: '🐑' },
  { id: 8, word: 'دِيكٌ', emoji: '🐓' },
  { id: 9, word: 'ذِئْبٌ', emoji: '🐺' },
  { id: 10, word: 'رَجُلٌ', emoji: '👨' },
  { id: 11, word: 'زَهْرَةٌ', emoji: '🌸' },
  { id: 12, word: 'سَيَّارَةٌ', emoji: '🚗' },
  { id: 13, word: 'شَجَرَةٌ', emoji: '🌳' },
  { id: 14, word: 'صَقْرٌ', emoji: '🦅' },
  { id: 15, word: 'ضِفْدَعٌ', emoji: '🐸' },
  { id: 16, word: 'طَاوُوسٌ', emoji: '🦚' },
  { id: 17, word: 'ظَبْيٌ', emoji: '🦌' },
  { id: 18, word: 'عَيْنٌ', emoji: '👁️' },
  { id: 19, word: 'غُرَابٌ', emoji: '🐦‍⬛' },
  { id: 20, word: 'فَرَاشَةٌ', emoji: '🦋' },
  { id: 21, word: 'قَلَمٌ', emoji: '✏️' },
  { id: 22, word: 'كُرَةٌ', emoji: '⚽' },
  { id: 23, word: 'لَيْمُونٌ', emoji: '🍋' },
  { id: 24, word: 'مِفْتَاحٌ', emoji: '🔑' },
  { id: 25, word: 'نَجْمَةٌ', emoji: '⭐' },
  { id: 26, word: 'هِلالٌ', emoji: '🌙' },
  { id: 27, word: 'وَرْدَةٌ', emoji: '🌹' },
  { id: 28, word: 'يَدٌ', emoji: '🖐️' },
  { id: 29, word: 'بَابٌ', emoji: '🚪' },
  { id: 30, word: 'سَاعَةٌ', emoji: '⏰' },
  { id: 31, word: 'مَدْرَسَةٌ', emoji: '🏫' },
  { id: 32, word: 'طَبِيبٌ', emoji: '👨‍⚕️' },
  { id: 33, word: 'مُسْتَشْفَى', emoji: '🏥' },
  { id: 34, word: 'دَفْتَرٌ', emoji: '📓' },
  { id: 35, word: 'مِمْحَاةٌ', emoji: ' Eraser ' },
  { id: 36, word: 'شُرْطِيّ', emoji: '👮' },
  { id: 37, word: 'مُمَرِّضَةٌ', emoji: '👩‍⚕️' },
  { id: 38, word: 'مَطَرٌ', emoji: '🌧️' },
  { id: 39, word: 'شَمْسٌ', emoji: '☀️' },
  { id: 40, word: 'قَلْبٌ', emoji: '❤️' },
  { id: 41, word: 'هَاتِفٌ', emoji: '📱' },
  { id: 42, word: 'كِتَابٌ', emoji: '📖' }
];

// Data for "Word Scramble" exercise. (Expanded to 42 questions)
export const scrambleQuestions: ScrambleQuestion[] = [
  { id: 1, word: 'مَدْرَسَةٌ', scrambledLetters: ['ة', 'س', 'ر', 'د', 'م'], hint: 'نَتَعَلَّمُ فِيهَا' },
  { id: 2, word: 'سَيَّارَةٌ', scrambledLetters: ['ة', 'ر', 'ا', 'ي', 'س'], hint: 'نَرْكَبُهَا لِنَسَافِرَ' },
  { id: 3, word: 'حَدِيقَةٌ', scrambledLetters: ['ة', 'ق', 'ي', 'د', 'ح'], hint: 'مَكَانٌ فِيهِ أَزْهَارٌ' },
  { id: 4, word: 'كُرْسِيٌّ', scrambledLetters: ['ي', 'ّ', 'س', 'ر', 'ك'], hint: 'نَجْلِسُ عَلَيْهِ' },
  { id: 5, word: 'هَاتِفٌ', scrambledLetters: ['ف', 'ت', 'ا', 'ه'], hint: 'نَتَكَلَّمُ بِهِ' },
  { id: 6, word: 'مِفْتَاحٌ', scrambledLetters: ['ح', 'ا', 'ت', 'ف', 'م'], hint: 'نَفْتَحُ بِهِ الْبَابَ' },
  { id: 7, word: 'طَبِيبٌ', scrambledLetters: ['ب', 'ي', 'ب', 'ط'], hint: 'يُعَالِجُ الْمَرْضَى' },
  { id: 8, word: 'شُرْطِيٌّ', scrambledLetters: ['ي', 'ّ', 'ط', 'ر', 'ش'], hint: 'يُحَافِظُ عَلَى الْأَمْنِ' },
  { id: 9, word: 'كِتَابٌ', scrambledLetters: ['ب', 'ا', 'ت', 'ك'], hint: 'نَقْرَأُ فِيهِ' },
  { id: 10, word: 'شَمْسٌ', scrambledLetters: ['س', 'م', 'ش'], hint: 'تُضِيءُ فِي النَّهَارِ' },
  { id: 11, word: 'قَمَرٌ', scrambledLetters: ['ر', 'م', 'ق'], hint: 'يَظْهَرُ فِي اللَّيْلِ' },
  { id: 12, word: 'بَيْتٌ', scrambledLetters: ['ت', 'ي', 'ب'], hint: 'نَسْكُنُ فِيهِ' },
  { id: 13, word: 'قِطَارٌ', scrambledLetters: ['ر', 'ا', 'ط', 'ق'], hint: 'يَسِيرُ عَلَى قُضْبَانٍ' },
  { id: 14, word: 'طَائِرَةٌ', scrambledLetters: ['ة', 'ر', 'ئـ', 'ا', 'ط'], hint: 'تَطِيرُ فِي السَّمَاءِ' },
  { id: 15, word: 'قَلَمٌ', scrambledLetters: ['م', 'ل', 'ق'], hint: 'نَكْتُبُ بِهِ' },
  { id: 16, word: 'مَوْزٌ', scrambledLetters: ['ز', 'و', 'م'], hint: 'فَاكِهَةٌ صَفْرَاءُ' },
  { id: 17, word: 'بَحْرٌ', scrambledLetters: ['ر', 'ح', 'ب'], hint: 'مَاءٌ مَالِحٌ وَوَاسِعٌ' },
  { id: 18, word: 'نَهْرٌ', scrambledLetters: ['ر', 'ه', 'ن'], hint: 'مَاءٌ عَذْبٌ يَجْرِي' },
  { id: 19, word: 'شَجَرَةٌ', scrambledLetters: ['ة', 'ر', 'ج', 'ش'], hint: 'لَهَا جِذْعٌ وَأَغْصَانٌ' },
  { id: 20, word: 'زَهْرَةٌ', scrambledLetters: ['ة', 'ر', 'ه', 'ز'], hint: 'لَهَا رَائِحَةٌ جَمِيلَةٌ' },
  { id: 21, word: 'سَحَابٌ', scrambledLetters: ['ب', 'ا', 'ح', 'س'], hint: 'يَتَكَوَّنُ فِي السَّمَاءِ' },
  { id: 22, word: 'مَطَرٌ', scrambledLetters: ['ر', 'ط', 'م'], hint: 'يَنْزِلُ مِنَ السَّحَابِ' },
  { id: 23, word: 'ثَلْجٌ', scrambledLetters: ['ج', 'ل', 'ث'], hint: 'مَاءٌ مُتَجَمِّدٌ أَبْيَضُ' },
  { id: 24, word: 'نَارٌ', scrambledLetters: ['ر', 'ا', 'ن'], hint: 'تُعْطِي حَرَارَةً وَضَوْءًا' },
  { id: 25, word: 'ضَوْءٌ', scrambledLetters: ['ء', 'و', 'ض'], hint: 'عَكْسُ الظَّلَامِ' },
  { id: 26, word: 'لَيْلٌ', scrambledLetters: ['ل', 'ي', 'ل'], hint: 'الْوَقْتُ الَّذِي نَنَامُ فِيهِ' },
  { id: 27, word: 'صَبَاحٌ', scrambledLetters: ['ح', 'ا', 'ب', 'ص'], hint: 'بِدَايَةُ الْيَوْمِ' },
  { id: 28, word: 'غُصْنٌ', scrambledLetters: ['ن', 'ص', 'غ'], hint: 'فَرْعُ الشَّجَرَةِ' },
  { id: 29, word: 'مَلْعَبٌ', scrambledLetters: ['ب', 'ع', 'ل', 'م'], hint: 'نَلْعَبُ فِيهِ الْكُرَةَ' },
  { id: 30, word: 'مَطْبَخٌ', scrambledLetters: ['خ', 'ب', 'ط', 'م'], hint: 'نُحَضِّرُ فِيهِ الطَّعَامَ' },
  { id: 31, word: 'طَاوِلَةٌ', scrambledLetters: ['ة', 'ل', 'و', 'ا', 'ط'], hint: 'نَضَعُ عَلَيْهَا الْأَشْيَاءَ' },
  { id: 32, word: 'شُبَّاكٌ', scrambledLetters: ['ك', 'ا', 'ب', 'ّ', 'ش'], hint: 'نَنْظُرُ مِنْهُ إِلَى الْخَارِجِ' },
  { id: 33, word: 'حَقِيبَةٌ', scrambledLetters: ['ة', 'ب', 'ي', 'ق', 'ح'], hint: 'نَحْمِلُ فِيهَا الْكُتُبَ' },
  { id: 34, word: 'مُعَلِّمٌ', scrambledLetters: ['م', 'ل', 'ّ', 'ع', 'م'], hint: 'يُدَرِّسُنَا فِي الْمَدْرَسَةِ' },
  { id: 35, word: 'تِلْمِيذٌ', scrambledLetters: ['ذ', 'ي', 'م', 'ل', 'ت'], hint: 'يَتَعَلَّمُ فِي الْمَدْرَسَةِ' },
  { id: 36, word: 'مُسْتَشْفَى', scrambledLetters: ['ى', 'ف', 'ش', 'ت', 'س', 'م'], hint: 'يُعَالِجُ فِيهِ الطَّبِيبُ الْمَرْضَى' },
  { id: 37, word: 'مِظَلَّةٌ', scrambledLetters: ['ة', 'ل', 'ّ', 'ظ', 'م'], hint: 'تَحْمِينَا مِنَ الْمَطَرِ' },
  { id: 38, word: 'دَرَّاجَةٌ', scrambledLetters: ['ة', 'ج', 'ا', 'ر', 'ّ', 'د'], hint: 'لَهَا عَجَلَتَانِ' },
  { id: 39, word: 'مكتبة', scrambledLetters: ['ة', 'ب', 'ت', 'ك', 'م'], hint: 'نَقْرَأُ فِيهَا الْكُتُبَ' },
  { id: 40, word: 'أَرْنَبٌ', scrambledLetters: ['ب', 'ن', 'ر', 'أ'], hint: 'يُحِبُّ الْجَزَرَ' },
  { id: 41, word: 'عُصْفُورٌ', scrambledLetters: ['ر', 'و', 'ف', 'ص', 'ع'], hint: 'طَائِرٌ صَغِيرٌ يُغَرِّدُ' },
  { id: 42, word: 'بُرْتُقَالٌ', scrambledLetters: ['ل', 'ا', 'ق', 'ت', 'ر', 'ب'], hint: 'فَاكِهَةٌ شِتَوِيَّةٌ' }
];

// Data for "Sentence Builder" exercise. (Expanded to 42 questions)
export const sentenceQuestions: SentenceQuestion[] = [
  { id: 1, correctSentence: 'الْوَلَدُ يَلْعَبُ بِالْكُرَةِ', scrambledWords: ['بِالْكُرَةِ', 'يَلْعَبُ', 'الْوَلَدُ'] },
  { id: 2, correctSentence: 'الشَّمْسُ تُشْرِقُ فِي الصَّبَاحِ', scrambledWords: ['فِي', 'تُشْرِقُ', 'الصَّبَاحِ', 'الشَّمْسُ'] },
  { id: 3, correctSentence: 'أَنَا أُحِبُّ أُمِّي وَأَبِي', scrambledWords: ['وَأَبِي', 'أُمِّي', 'أَنَا', 'أُحِبُّ'] },
  { id: 4, correctSentence: 'أَقْرَأُ قِصَّةً قَبْلَ النَّوْمِ', scrambledWords: ['النَّوْمِ', 'قَبْلَ', 'قِصَّةً', 'أَقْرَأُ'] },
  { id: 5, correctSentence: 'الْقَمَرُ يُنِيرُ فِي اللَّيْلِ', scrambledWords: ['فِي', 'يُنِيرُ', 'اللَّيْلِ', 'الْقَمَرُ'] },
  { id: 6, correctSentence: 'الْفِيلُ حَيَوَانٌ ضَخْمٌ', scrambledWords: ['ضَخْمٌ', 'حَيَوَانٌ', 'الْفِيلُ'] },
  { id: 7, correctSentence: 'الطَّائِرُ يُغَرِّدُ فَوْقَ الشَّجَرَةِ', scrambledWords: ['الشَّجَرَةِ', 'فَوْقَ', 'يُغَرِّدُ', 'الطَّائِرُ'] },
  { id: 8, correctSentence: 'أُحِبُّ أَكْلَ الْفَوَاكِهِ الطَّازَجَةِ', scrambledWords: ['الطَّازَجَةِ', 'الْفَوَاكِهِ', 'أَكْلَ', 'أُحِبُّ'] },
  { id: 9, correctSentence: 'السَّمَكُ يَسْبَحُ فِي الْمَاءِ', scrambledWords: ['الْمَاءِ', 'فِي', 'يَسْبَحُ', 'السَّمَكُ'] },
  { id: 10, correctSentence: 'أَذْهَبُ إِلَى الْمَدْرَسَةِ كُلَّ يَوْمٍ', scrambledWords: ['يَوْمٍ', 'كُلَّ', 'الْمَدْرَسَةِ', 'إِلَى', 'أَذْهَبُ'] },
  { id: 11, correctSentence: 'الْقِطَّةُ تَشْرَبُ الْحَلِيبَ', scrambledWords: ['الْحَلِيبَ', 'تَشْرَبُ', 'الْقِطَّةُ'] },
  { id: 12, correctSentence: 'الْأَطْفَالُ يَلْعَبُونَ فِي الْحَدِيقَةِ', scrambledWords: ['الْحَدِيقَةِ', 'فِي', 'يَلْعَبُونَ', 'الْأَطْفَالُ'] },
  { id: 13, correctSentence: 'الْمُعَلِّمُ يَشْرَحُ الدَّرْسَ', scrambledWords: ['الدَّرْسَ', 'يَشْرَحُ', 'الْمُعَلِّمُ'] },
  { id: 14, correctSentence: 'أَنَا أُسَاعِدُ أُمِّي فِي الْمَطْبَخِ', scrambledWords: ['الْمَطْبَخِ', 'فِي', 'أُمِّي', 'أُسَاعِدُ', 'أَنَا'] },
  { id: 15, correctSentence: 'الزَّرَافَةُ لَهَا رَقَبَةٌ طَوِيلَةٌ', scrambledWords: ['طَوِيلَةٌ', 'رَقَبَةٌ', 'لَهَا', 'الزَّرَافَةُ'] },
  { id: 16, correctSentence: 'النَّحْلَةُ تَصْنَعُ الْعَسَلَ', scrambledWords: ['الْعَسَلَ', 'تَصْنَعُ', 'النَّحْلَةُ'] },
  { id: 17, correctSentence: 'الشُّرْطِيُّ يُنَظِّمُ الْمُرُورَ', scrambledWords: ['الْمُرُورَ', 'يُنَظِّمُ', 'الشُّرْطِيُّ'] },
  { id: 18, correctSentence: 'أَنَا أُرَتِّبُ غُرْفَتِي كُلَّ صَبَاحٍ', scrambledWords: ['صَبَاحٍ', 'كُلَّ', 'غُرْفَتِي', 'أُرَتِّبُ', 'أَنَا'] },
  { id: 19, correctSentence: 'الْأَرْنَبُ يَقْفِزُ بِسُرْعَةٍ', scrambledWords: ['بِسُرْعَةٍ', 'يَقْفِزُ', 'الْأَرْنَبُ'] },
  { id: 20, correctSentence: 'نَحْنُ نُحِبُّ وَطَنَنَا الْعَزِيزَ', scrambledWords: ['الْعَزِيزَ', 'وَطَنَنَا', 'نُحِبُّ', 'نَحْنُ'] },
  { id: 21, correctSentence: 'الطَّبِيبُ يُعَالِجُ الْمَرْضَى', scrambledWords: ['الْمَرْضَى', 'يُعَالِجُ', 'الطَّبِيبُ'] },
  { id: 22, correctSentence: 'أَنَا أَسْتَيْقِظُ بَاكِرًا', scrambledWords: ['بَاكِرًا', 'أَسْتَيْقِظُ', 'أَنَا'] },
  { id: 23, correctSentence: 'الْفَلَّاحُ يَزْرَعُ الْأَرْضَ', scrambledWords: ['الْأَرْضَ', 'يَزْرَعُ', 'الْفَلَّاحُ'] },
  { id: 24, correctSentence: 'الْجَوُّ مُشْمِسٌ الْيَوْمَ', scrambledWords: ['الْيَوْمَ', 'مُشْمِسٌ', 'الْجَوُّ'] },
  { id: 25, correctSentence: 'أَنَا أَسْمَعُ كَلَامَ وَالِدَيَّ', scrambledWords: ['وَالِدَيَّ', 'كَلَامَ', 'أَسْمَعُ', 'أَنَا'] },
  { id: 26, correctSentence: 'الْوَرْدَةُ رَائِحَتُهَا جَمِيلَةٌ', scrambledWords: ['جَمِيلَةٌ', 'رَائِحَتُهَا', 'الْوَرْدَةُ'] },
  { id: 27, correctSentence: 'الْقِطَارُ سَرِيعٌ جِدًّا', scrambledWords: ['جِدًّا', 'سَرِيعٌ', 'الْقِطَارُ'] },
  { id: 28, correctSentence: 'نَحْنُ نَتَنَاوَلُ طَعَامَ الْغَدَاءِ', scrambledWords: ['الْغَدَاءِ', 'طَعَامَ', 'نَتَنَاوَلُ', 'نَحْنُ'] },
  { id: 29, correctSentence: 'أَنَا أَغْسِلُ أَسْنَانِي بِالْفُرْشَاةِ', scrambledWords: ['بِالْفُرْشَاةِ', 'أَسْنَانِي', 'أَغْسِلُ', 'أَنَا'] },
  { id: 30, correctSentence: 'الْخَبَّازُ يَصْنَعُ الْخُبْزَ اللَّذِيذَ', scrambledWords: ['اللَّذِيذَ', 'الْخُبْزَ', 'يَصْنَعُ', 'الْخَبَّازُ'] },
  { id: 31, correctSentence: 'نَحْنُ نَرَى بِأَعْيُنِنَا وَنَسْمَعُ بِآذَانِنَا', scrambledWords: ['وَنَسْمَعُ', 'بِآذَانِنَا', 'بِأَعْيُنِنَا', 'نَرَى', 'نَحْنُ'] },
  { id: 32, correctSentence: 'الشَّمْسُ مَصْدَرُ الضَّوْءِ وَالْحَرَارَةِ', scrambledWords: ['وَالْحَرَارَةِ', 'الضَّوْءِ', 'مَصْدَرُ', 'الشَّمْسُ'] },
  { id: 33, correctSentence: 'أَنَا أُطِيعُ وَالِدَيَّ وَأَحْتَرِمُهُمَا', scrambledWords: ['وَأَحْتَرِمُهُمَا', 'وَالِدَيَّ', 'أُطِيعُ', 'أَنَا'] },
  { id: 34, correctSentence: 'الصِّدْقُ صِفَةٌ جَمِيلَةٌ', scrambledWords: ['جَمِيلَةٌ', 'صِفَةٌ', 'الصِّدْقُ'] },
  { id: 35, correctSentence: 'الرِّيَاضَةُ مُفِيدَةٌ لِلْجِسْمِ وَالْعَقْلِ', scrambledWords: ['وَالْعَقْلِ', 'لِلْجِسْمِ', 'مُفِيدَةٌ', 'الرِّيَاضَةُ'] },
  { id: 36, correctSentence: 'أَنَا أُحَافِظُ عَلَى نَظَافَةِ مَدْرَسَتِي', scrambledWords: ['مَدْرَسَتِي', 'نَظَافَةِ', 'عَلَى', 'أُحَافِظُ', 'أَنَا'] },
  { id: 37, correctSentence: 'يَنْزِلُ الْمَطَرُ مِنَ السَّحَابِ', scrambledWords: ['السَّحَابِ', 'مِنَ', 'الْمَطَرُ', 'يَنْزِلُ'] },
  { id: 38, correctSentence: 'الْكِتَابُ أَفْضَلُ صَدِيقٍ', scrambledWords: ['صَدِيقٍ', 'أَفْضَلُ', 'الْكِتَابُ'] },
  { id: 39, correctSentence: 'أُحِبُّ اللَّعِبَ مَعَ أَصْدِقَائِي', scrambledWords: ['أَصْدِقَائِي', 'مَعَ', 'اللَّعِبَ', 'أُحِبُّ'] },
  { id: 40, correctSentence: 'الْأَزْهَارُ جَمِيلَةٌ فِي الرَّبِيعِ', scrambledWords: ['الرَّبِيعِ', 'فِي', 'جَمِيلَةٌ', 'الْأَزْهَارُ'] },
  { id: 41, correctSentence: 'الْعِلْمُ نُورٌ وَالْجَهْلُ ظَلَامٌ', scrambledWords: ['ظَلَامٌ', 'وَالْجَهْلُ', 'نُورٌ', 'الْعِلْمُ'] },
  { id: 42, correctSentence: 'أَنَا أَشْرَبُ الْعَصِيرَ الطَّازَجَ', scrambledWords: ['الطَّازَجَ', 'الْعَصِيرَ', 'أَشْرَبُ', 'أَنَا'] }
];

// Data for "Who Am I?" riddle exercise. (Expanded to 42 questions, images removed)
export const whoAmIQuestions: WhoAmIQuestion[] = [
  { 
    id: 1, 
    riddle: 'أَنَا مَلِكُ الْغَابَةِ، وَصَوْتِي زَئِيرٌ. مَنْ أَكُونُ؟', 
    answer: 'أَسَدٌ', 
    options: ['قِطٌّ', 'أَسَدٌ', 'نَمِرٌ']
  },
  { 
    id: 2, 
    riddle: 'أُشْرِقُ فِي الصَّبَاحِ وَأُعْطِي الدِّفْءَ وَالنُّورَ. مَنْ أَكُونُ؟', 
    answer: 'شَمْسٌ', 
    options: ['قَمَرٌ', 'نَجْمَةٌ', 'شَمْسٌ']
  },
  { 
    id: 3, 
    riddle: 'لَدَيَّ أَوْرَاقٌ كَثِيرَةٌ لَكِنِّي لَسْتُ شَجَرَةً. أَحْكِي لَكَ الْقِصَصَ. مَنْ أَكُونُ؟', 
    answer: 'كِتَابٌ', 
    options: ['كِتَابٌ', 'دَفْتَرٌ', 'قَلَمٌ']
  },
  {
    id: 4,
    riddle: 'أَعِيشُ فِي الْمَاءِ وَلَدَيَّ زَعَانِفُ وَخَيَاشِيمُ. مَنْ أَكُونُ؟',
    answer: 'سَمَكَةٌ',
    options: ['سَمَكَةٌ', 'ضِفْدَعٌ', 'حُوتٌ']
  },
  {
    id: 5,
    riddle: 'لَدَيَّ وَجْهٌ وَعَقَارِبُ، لَكِنْ لَا أَرَى وَلَا أَلْدَغُ. أُخْبِرُكَ بِالْوَقْتِ. مَنْ أَكُونُ؟',
    answer: 'سَاعَةٌ',
    options: ['مِرْآةٌ', 'سَاعَةٌ', 'مِنَبِّهٌ']
  },
  {
    id: 6,
    riddle: 'أَطِيرُ فِي السَّمَاءِ وَلِي أَجْنِحَةٌ، لَكِنِّي لَسْتُ طَائِرًا. مَنْ أَكُونُ؟',
    answer: 'طَائِرَةٌ',
    options: ['سَيَّارَةٌ', 'طَائِرَةٌ', 'سَفِينَةٌ']
  },
  {
    id: 7,
    riddle: 'أَسِيرُ عَلَى الْأَرْضِ وَلِي عَجَلَاتٌ، وَأَنْقُلُ النَّاسَ مِنْ مَكَانٍ لِآخَرَ. مَنْ أَكُونُ؟',
    answer: 'سَيَّارَةٌ',
    options: ['دَرَّاجَةٌ', 'قِطَارٌ', 'سَيَّارَةٌ']
  },
  {
    id: 8,
    riddle: 'أُسْتَخْدَمُ لِفَتْحِ الْأَبْوَابِ الْمُغْلَقَةِ. مَنْ أَكُونُ؟',
    answer: 'مِفْتَاحٌ',
    options: ['مِطْرَقَةٌ', 'قُفْلٌ', 'مِفْتَاحٌ']
  },
  {
    id: 9,
    riddle: 'أَحْمِي رَأْسَكَ مِنَ الشَّمْسِ، وَأُوضَعُ فَوْقَهُ. مَنْ أَكُونُ؟',
    answer: 'قُبَّعَةٌ',
    options: ['قَمِيصٌ', 'حِذَاءٌ', 'قُبَّعَةٌ']
  },
  {
    id: 10,
    riddle: 'لِي رَقَبَةٌ طَوِيلَةٌ جِدًّا، وَآكُلُ أَوْرَاقَ الشَّجَرِ الْعَالِيَةِ. مَنْ أَكُونُ؟',
    answer: 'زَرَافَةٌ',
    options: ['فِيلٌ', 'زَرَافَةٌ', 'حِصَانٌ']
  },
  {
    id: 11,
    riddle: 'أَنَا أَبْيَضُ وَلَذِيذٌ، وَتَشْرَبُنِي فِي الصَّبَاحِ لِتَقْوَى عِظَامُكَ. مَنْ أَكُونُ؟',
    answer: 'حَلِيبٌ',
    options: ['مَاءٌ', 'عَصِيرٌ', 'حَلِيبٌ']
  },
  {
    id: 12,
    riddle: 'أَنَا أَسْكُنُ فِيهِ، وَلَهُ جُدْرَانٌ وَسَقْفٌ وَبَابٌ. مَنْ أَكُونُ؟',
    answer: 'بَيْتٌ',
    options: ['مَدْرَسَةٌ', 'بَيْتٌ', 'سَيَّارَةٌ']
  },
  {
    id: 13,
    riddle: 'لَوْنِي أَحْمَرُ وَشَكْلِي مِثْلُ الْقَلْبِ، وَيُحِبُّنِي الْجَمِيعُ. مَنْ أَكُونُ؟',
    answer: 'تُفَّاحَةٌ',
    options: ['بُرْتُقَالَةٌ', 'تُفَّاحَةٌ', 'مَوْزَةٌ']
  },
  {
    id: 14,
    riddle: 'لِي ثَمَانِيَةُ أَذْرُعٍ وَأَعِيشُ فِي الْبَحْرِ. مَنْ أَكُونُ؟',
    answer: 'أُخْطُبُوطٌ',
    options: ['سَمَكَةٌ', 'أُخْطُبُوطٌ', 'سَرَطَانٌ']
  },
  {
    id: 15,
    riddle: 'أَظْهَرُ فِي السَّمَاءِ بَعْدَ الْمَطَرِ، وَلِي سَبْعَةُ أَلْوَانٍ. مَنْ أَكُونُ؟',
    answer: 'قَوْسُ قُزَحَ',
    options: ['شَمْسٌ', 'قَمَرٌ', 'قَوْسُ قُزَحَ']
  },
  {
    id: 16,
    riddle: 'أُسْتَخْدَمُ لِلتَّنْظِيفِ، وَأُكَوِّنُ رَغْوَةً مَعَ الْمَاءِ. مَنْ أَكُونُ؟',
    answer: 'صَابُونٌ',
    options: ['عِطْرٌ', 'صَابُونٌ', 'شَامْبُو']
  },
  {
    id: 17,
    riddle: 'أَنَا حَيَوَانٌ أَلِيفٌ، وَأَقُولُ "مُوَاءٌ". مَنْ أَكُونُ؟',
    answer: 'قِطَّةٌ',
    options: ['كَلْبٌ', 'قِطَّةٌ', 'أَرْنَبٌ']
  },
  {
    id: 18,
    riddle: 'لِي أَصْدَافٌ صَلْبَةٌ عَلَى ظَهْرِي، وَأَنَا بَطِيءٌ جِدًّا. مَنْ أَكُونُ؟',
    answer: 'سُلَحْفَاةٌ',
    options: ['ضِفْدَعٌ', 'سُلَحْفَاةٌ', 'حَلَزُونٌ']
  },
  {
    id: 19,
    riddle: 'أَنَامُ عَلَيْهِ فِي اللَّيْلِ لِأَرْتَاحَ. مَنْ أَكُونُ؟',
    answer: 'سَرِيرٌ',
    options: ['كُرْسِيٌّ', 'مَكْتَبٌ', 'سَرِيرٌ']
  },
  {
    id: 20,
    riddle: 'أَطْبُخُ الطَّعَامَ لِلنَّاسِ فِي الْمَطْعَمِ. مَنْ أَكُونُ؟',
    answer: 'طَبَّاخٌ',
    options: ['طَبِيبٌ', 'طَبَّاخٌ', 'مُعَلِّمٌ']
  },
  {
    id: 21,
    riddle: 'أَنَا صَغِيرٌ، أَصْنَعُ الْعَسَلَ، وَأَطِيرُ مِنْ زَهْرَةٍ لِزَهْرَةٍ. مَنْ أَكُونُ؟',
    answer: 'نَحْلَةٌ',
    options: ['فَرَاشَةٌ', 'نَحْلَةٌ', 'ذُبَابَةٌ']
  },
  {
    id: 22,
    riddle: 'تَرْتَدِينِي فِي قَدَمَيْكَ لِتَمْشِيَ بِرَاحَةٍ. مَنْ أَكُونُ؟',
    answer: 'حِذَاءٌ',
    options: ['جَوْرَبٌ', 'حِذَاءٌ', 'قُفَّازٌ']
  },
  {
    id: 23,
    riddle: 'لِي أَجْنِحَةٌ مُلَوَّنَةٌ وَجَمِيلَةٌ، وَأَطِيرُ بِخِفَّةٍ فِي الْحَدَائِقِ. مَنْ أَكُونُ؟',
    answer: 'فَرَاشَةٌ',
    options: ['نَحْلَةٌ', 'يَعْسُوبٌ', 'فَرَاشَةٌ']
  },
  {
    id: 24,
    riddle: 'أَنَا حَارٌّ جِدًّا، وَأَجْعَلُ الْمَاءَ يَغْلِي. اِحْذَرْ مِنِّي! مَنْ أَكُونُ؟',
    answer: 'نَارٌ',
    options: ['مَاءٌ', 'نَارٌ', 'هَوَاءٌ']
  },
  {
    id: 25,
    riddle: 'لِي خُرْطُومٌ طَوِيلٌ وَأَنَا أَضْخَمُ حَيَوَانٍ عَلَى الْيَابِسَةِ. مَنْ أَكُونُ؟',
    answer: 'فِيلٌ',
    options: ['وَحِيدُ الْقَرْنِ', 'فَرَسُ النَّهْرِ', 'فِيلٌ']
  },
  {
    id: 26,
    riddle: 'لِي أَذْنَانِ طَوِيلَتَانِ، وَأُحِبُّ أَكْلَ الْجَزَرِ. مَنْ أَكُونُ؟',
    answer: 'أَرْنَبٌ',
    options: ['سِنْجَابٌ', 'أَرْنَبٌ', 'فَأْرٌ']
  },
  {
    id: 27,
    riddle: 'أَنَا أَدُورُ حَوْلَ الشَّمْسِ، وَأَنْتَ تَعِيشُ عَلَيَّ. مَنْ أَكُونُ؟',
    answer: 'الْأَرْضُ',
    options: ['الْقَمَرُ', 'الْمِرِّيخُ', 'الْأَرْضُ']
  },
  {
    id: 28,
    riddle: 'يَجْرِي بِسُرْعَةٍ عَلَى قُضْبَانٍ حَدِيدِيَّةٍ، وَيُصْدِرُ صَوْتَ "تُوت تُوت". مَنْ أَكُونُ؟',
    answer: 'قِطَارٌ',
    options: ['حَافِلَةٌ', 'قِطَارٌ', 'سَفِينَةٌ']
  },
  {
    id: 29,
    riddle: 'أَنَا لَوْنُ السَّمَاءِ وَالْبَحْرِ. مَنْ أَكُونُ؟',
    answer: 'أَزْرَقُ',
    options: ['أَخْضَرُ', 'أَصْفَرُ', 'أَزْرَقُ']
  },
  {
    id: 30,
    riddle: 'أُسْتَخْدَمُ لِتَقْطِيعِ الْوَرَقِ وَالْقُمَاشِ. مَنْ أَكُونُ؟',
    answer: 'مِقَصٌّ',
    options: ['مِقَصٌّ', 'سِكِّينٌ', 'مِلْعَقَةٌ']
  },
  {
    id: 31,
    riddle: 'أَنَا مَكَانٌ تَقْرَأُ وَتَسْتَعِيرُ مِنْهُ الْكُتُبَ. مَنْ أَكُونُ؟',
    answer: 'مَكْتَبَةٌ',
    options: ['مَدْرَسَةٌ', 'مَكْتَبَةٌ', 'مَلْعَبٌ']
  },
  {
    id: 32,
    riddle: 'أُعَلِّمُ التَّلَامِيذَ فِي الْمَدْرَسَةِ. مَنْ أَكُونُ؟',
    answer: 'مُعَلِّمٌ',
    options: ['طَبِيبٌ', 'مُهَنْدِسٌ', 'مُعَلِّمٌ']
  },
  {
    id: 33,
    riddle: 'أَنَا يَوْمُ الرَّاحَةِ وَالْعُطْلَةِ الْأُسْبُوعِيَّةِ. مَنْ أَكُونُ؟',
    answer: 'الْجُمُعَةُ',
    options: ['الْأَحَدُ', 'الْجُمُعَةُ', 'الْاِثْنَيْنِ']
  },
  {
    id: 34,
    riddle: 'أَنَا مَصْنُوعٌ مِنَ السُّكَّرِ وَيُحِبُّنِي الْأَطْفَالُ، لَكِنَّ الْكَثِيرَ مِنِّي ضَارٌّ بِالْأَسْنَانِ. مَنْ أَكُونُ؟',
    answer: 'حَلْوَى',
    options: ['فَاكِهَةٌ', 'حَلْوَى', 'خُضَارٌ']
  },
  {
    id: 35,
    riddle: 'لِي أَرْبَعَةُ جُدْرَانٍ وَبَابٌ، وَتَنَامُ فِيهَا. مَنْ أَكُونُ؟',
    answer: 'غُرْفَةٌ',
    options: ['مَطْبَخٌ', 'حَدِيقَةٌ', 'غُرْفَةٌ']
  },
  {
    id: 36,
    riddle: 'أَنَا لَوْنُ الْعُشْبِ وَأَوْرَاقِ الشَّجَرِ. مَنْ أَكُونُ؟',
    answer: 'أَخْضَرُ',
    options: ['أَحْمَرُ', 'أَزْرَقُ', 'أَخْضَرُ']
  },
  {
    id: 37,
    riddle: 'أَسِيرُ بِلَا أَرْجُلٍ وَأَتْرُكُ أَثَرًا لَامِعًا. مَنْ أَكُونُ؟',
    answer: 'حَلَزُونٌ',
    options: ['ثُعْبَانٌ', 'حَلَزُونٌ', 'دُودَةٌ']
  },
  {
    id: 38,
    riddle: 'أَنَا مَكَانٌ عَامِرٌ بِالْبَاعَةِ وَالْمُشْتَرِينَ. مَنْ أَكُونُ؟',
    answer: 'سُوقٌ',
    options: ['مُسْتَشْفَى', 'سُوقٌ', 'مَدْرَسَةٌ']
  },
  {
    id: 39,
    riddle: 'أَنَا فَصْلٌ تَتَسَاقَطُ فِيهِ أَوْرَاقُ الشَّجَرِ. مَنْ أَكُونُ؟',
    answer: 'الْخَرِيفُ',
    options: ['الشِّتَاءُ', 'الصَّيْفُ', 'الْخَرِيفُ']
  },
  {
    id: 40,
    riddle: 'أُطْفِئُ الْحَرَائِقَ وَأُنْقِذُ النَّاسَ. مَنْ أَكُونُ؟',
    answer: 'رَجُلُ إِطْفَاءٍ',
    options: ['شُرْطِيٌّ', 'رَجُلُ إِطْفَاءٍ', 'طَبِيبٌ']
  },
  {
    id: 41,
    riddle: 'أُسَافِرُ فِي الْبِحَارِ وَالْمُحِيطَاتِ، وَلِي شِرَاعٌ أَوْ مُحَرِّكٌ. مَنْ أَكُونُ؟',
    answer: 'سَفِينَةٌ',
    options: ['قِطَارٌ', 'سَفِينَةٌ', 'طَائِرَةٌ']
  },
  {
    id: 42,
    riddle: 'تَجِدُنِي فِي الْمَطْبَخِ، وَأَحْفَظُ الطَّعَامَ بَارِدًا. مَنْ أَكُونُ؟',
    answer: 'ثَلَّاجَةٌ',
    options: ['فُرْنٌ', 'غَسَّالَةٌ', 'ثَلَّاجَةٌ']
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