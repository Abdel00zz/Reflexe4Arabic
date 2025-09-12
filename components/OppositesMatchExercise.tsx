/**
 * @file This file contains the "Opposites Match" (تطابق الأضداد) exercise component.
 * It's an interactive game where users draw lines to connect opposite words,
 * enhancing vocabulary and logical reasoning.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { OppositesExercise, OppositesExerciseType } from '../types';
import { oppositesExercises } from '../data/arabicContent';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';

interface OppositesMatchExerciseProps {
  onAnswer: (isCorrect: boolean, score: number) => void;
}

interface Word {
  id: number;
  text: string;
  side: 'left' | 'right';
  pairId: number;
}

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);
const correctFeedbackMessages = ['🎉 أَحْسَنْتَ!', 'عَمَلٌ رَائِعٌ!', 'إِجَابَةٌ صَحِيحَةٌ!', 'مُمْتَازٌ!'];

export const OppositesMatchExercise: React.FC<OppositesMatchExerciseProps> = ({ onAnswer }) => {
  const [exercises, setExercises] = useState<OppositesExercise[]>([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  // State for CONNECT_WORDS
  const [leftColumn, setLeftColumn] = useState<Word[]>([]);
  const [rightColumn, setRightColumn] = useState<Word[]>([]);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [correctPairs, setCorrectPairs] = useState<number[]>([]);
  const [incorrectAttempt, setIncorrectAttempt] = useState<[number, number] | null>(null);
  
  // State for MCQ and FILL_BLANK
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  
  // Common State
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setExercises(shuffleArray(oppositesExercises));
  }, []);
  
  const currentExercise = useMemo(() => exercises[exerciseIndex], [exercises, exerciseIndex]);
  const correctMessage = useMemo(() => correctFeedbackMessages[Math.floor(Math.random() * correctFeedbackMessages.length)], [exerciseIndex]);

  useEffect(() => {
    if (currentExercise) {
      // Reset all states
      setFeedback(null);
      setIsComplete(false);
      setSelectedOption(null);
      
      // Setup based on type
      if (currentExercise.type === OppositesExerciseType.CONNECT_WORDS && currentExercise.pairs) {
        let currentId = 0;
        const left: Word[] = [];
        const right: Word[] = [];
        currentExercise.pairs.forEach(pair => {
            left.push({ id: currentId++, text: pair.word1, side: 'left', pairId: pair.id });
            right.push({ id: currentId++, text: pair.word2, side: 'right', pairId: pair.id });
        });
        setLeftColumn(shuffleArray(left));
        setRightColumn(shuffleArray(right));
        setSelectedWord(null);
        setCorrectPairs([]);
        setIncorrectAttempt(null);
      } else if (currentExercise.options) {
        setShuffledOptions(shuffleArray(currentExercise.options));
      }
    }
  }, [currentExercise]);


  // --- Logic for CONNECT_WORDS ---
  const handleWordClick = (word: Word) => {
    if (isComplete || correctPairs.includes(word.pairId) || incorrectAttempt) return;

    if (!selectedWord) {
      // First selection
      setSelectedWord(word);
    } else if (selectedWord.side === word.side) {
      // New selection on the same side
      setSelectedWord(word);
    } else {
      // Second selection on the opposite side, check for a match
      if (selectedWord.pairId === word.pairId) {
        // Correct match
        playCorrectSound();
        onAnswer(true, 1);
        setCorrectPairs(prev => [...prev, word.pairId]);
        setSelectedWord(null);
      } else {
        // Incorrect match
        playIncorrectSound();
        onAnswer(false, -0.5);
        setIncorrectAttempt([selectedWord.id, word.id]); // Store IDs of incorrect pair
        setSelectedWord(null);
        setTimeout(() => {
          setIncorrectAttempt(null);
        }, 800); // UI feedback duration
      }
    }
  };
  
  useEffect(() => {
    if (currentExercise?.type === OppositesExerciseType.CONNECT_WORDS && currentExercise.pairs && correctPairs.length === currentExercise.pairs.length) {
      setIsComplete(true);
      setFeedback('correct');
    }
  }, [correctPairs, currentExercise]);
  
  // --- Logic for MCQ & FILL_BLANK ---
  const handleOptionClick = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    const isCorrect = option === currentExercise.correctAnswer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      playCorrectSound();
      onAnswer(true, 1);
    } else {
      playIncorrectSound();
      onAnswer(false, -0.5);
    }
    setIsComplete(true);
  };
  
  // --- Common Logic ---
  const handleNext = () => {
    if (exerciseIndex < exercises.length - 1) setExerciseIndex(prev => prev + 1);
    else setExerciseIndex(0); // Restart
  };
  
  const getButtonClassConnect = (word: Word) => {
      if (incorrectAttempt?.includes(word.id)) {
        return 'bg-red-500 text-white border-red-700 animate-shake';
      }
      if(correctPairs.includes(word.pairId)) {
        return 'bg-green-200 text-green-800 border-green-400 cursor-not-allowed';
      }
      if(selectedWord?.id === word.id) {
        return 'bg-yellow-200 border-yellow-500 scale-105 ring-4 ring-yellow-300';
      }
      return 'bg-white hover:bg-violet-100 border-slate-300';
  };
  
  const getButtonClassMCQ = (option: string) => {
    if (!feedback) return 'bg-white hover:bg-violet-100 border-slate-300';
    if (option === currentExercise.correctAnswer) return 'bg-green-500 text-white border-green-700 transform scale-105';
    if (option === selectedOption) return 'bg-red-500 text-white border-red-700';
    return 'bg-gray-200 text-gray-500 border-gray-400';
  };

  const renderConnectWords = () => (
    <>
      <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-2 text-center">صِلْ بَيْنَ الْكَلِمَةِ وَضِدِّهَا</h2>
      <p className="text-xl text-slate-500 mb-6 text-center">اُنْقُرْ عَلَى كَلِمَةٍ مِنَ الْعَمُودِ الْأَوَّلِ، ثُمَّ عَلَى ضِدِّهَا فِي الْعَمُودِ الثَّانِي.</p>
      <div className="relative flex justify-between items-start gap-8 py-4">
        {/* Left Column */}
        <div className="w-1/2 flex flex-col items-center gap-4">
          {leftColumn.map(word => 
            <button 
              key={word.id} 
              onClick={() => handleWordClick(word)} 
              disabled={isComplete || correctPairs.includes(word.pairId)} 
              className={`w-full p-5 text-3xl font-bold rounded-lg shadow-md transition-all duration-200 border-4 text-center ${getButtonClassConnect(word)}`}
            >
              {word.text}
            </button>
          )}
        </div>
        {/* Right Column */}
        <div className="w-1/2 flex flex-col items-center gap-4">
          {rightColumn.map(word => 
            <button 
              key={word.id} 
              onClick={() => handleWordClick(word)} 
              disabled={isComplete || correctPairs.includes(word.pairId)} 
              className={`w-full p-5 text-3xl font-bold rounded-lg shadow-md transition-all duration-200 border-4 text-center ${getButtonClassConnect(word)}`}
            >
              {word.text}
            </button>
          )}
        </div>
      </div>
    </>
  );

  const renderMCQ = () => (
    <>
      <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-6 text-center">اخْتَرِ الضِّدَّ</h2>
      <p className="text-3xl sm:text-4xl text-center text-slate-700 font-semibold mb-8">مَا هُوَ ضِدُّ كَلِمَةِ "<span className="text-violet-600 font-black text-4xl sm:text-5xl">{currentExercise.promptWord}</span>"؟</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shuffledOptions.map(option => <button key={option} onClick={() => handleOptionClick(option)} disabled={!!feedback} className={`p-8 text-4xl font-bold rounded-xl shadow-md transition-all duration-300 border-4 ${getButtonClassMCQ(option)}`}>{option}</button>)}
      </div>
    </>
  );
  
  const renderFillBlank = () => (
      <>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-6 text-center">أَكْمِلِ الْجُمْلَةَ</h2>
        <div className="text-center mb-8 bg-slate-100 p-6 rounded-lg">
          <p className="text-5xl sm:text-6xl font-bold text-slate-800 leading-relaxed">
            {currentExercise.sentenceHint?.split('___').map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index === 0 && <span className="inline-block text-center border-b-8 border-dashed border-slate-300 min-w-[200px] mx-4 p-2">{feedback ? <span className={feedback === 'correct' ? 'text-green-600' : 'text-red-600'}>{selectedOption}</span> : ''}</span>}
              </React.Fragment>
            ))}
          </p>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shuffledOptions.map(option => <button key={option} onClick={() => handleOptionClick(option)} disabled={!!feedback} className={`p-8 text-4xl font-bold rounded-xl shadow-md transition-all duration-300 border-4 ${getButtonClassMCQ(option)}`}>{option}</button>)}
        </div>
      </>
  );

  const renderExercise = () => {
    switch(currentExercise?.type) {
      case OppositesExerciseType.CONNECT_WORDS: return renderConnectWords();
      case OppositesExerciseType.MULTIPLE_CHOICE: return renderMCQ();
      case OppositesExerciseType.FILL_IN_THE_BLANK: return renderFillBlank();
      default: return <div className="text-center p-10">...جَارِي تَحْضِيرُ التَّحَدِّي</div>;
    }
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 relative">
      {renderExercise()}
      {isComplete && feedback && (
        <div className="text-center mt-6 animate-fade-in p-5 bg-slate-50 rounded-lg">
            <p className={`text-3xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                {feedback === 'correct' ? correctMessage : `إِجَابَةٌ خَاطِئَةٌ! اَلْإِجَابَةُ الصَّحِيحَةُ هِيَ "${currentExercise.correctAnswer}"`}
            </p>
            <button onClick={handleNext} className="bg-violet-500 text-white font-bold py-3 px-8 rounded-full hover:bg-violet-600 transition-colors text-xl">
              التَّمْرِينُ التَّالِي
            </button>
        </div>
      )}
    </div>
  );
};