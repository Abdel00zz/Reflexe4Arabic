/**
 * @file This file contains the "Word Scramble" exercise component.
 * The user is given a set of scrambled letters and must arrange them to form a correct word.
 * It now uses a modern icon and tooltip for the backspace button.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ScrambleQuestion } from '../types';
import { scrambleQuestions } from '../data/arabicContent';
import { BsBackspaceFill } from 'react-icons/bs';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';

// Props interface for the component.
interface WordScrambleExerciseProps {
  onAnswer: (isCorrect: boolean, score: number) => void; // Callback to report answer status and score.
}

// Interface for a letter tile, giving each letter a unique ID for state management.
interface LetterTile {
  id: number;
  letter: string;
}

// A utility function to shuffle an array.
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const correctFeedbackMessages = ['عَمَلٌ رَائِعٌ! 🧩', 'كَلِمَةٌ صَحِيحَةٌ! 👍', 'أَحْسَنْتَ التَّرْكِيبَ! ✨', 'مُمْتَازٌ! ⭐'];

export const WordScrambleExercise: React.FC<WordScrambleExerciseProps> = ({ onAnswer }) => {
  // State for the list of questions.
  const [questions, setQuestions] = useState<ScrambleQuestion[]>([]);
  // State for the current question index.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State for the letters available to be picked.
  const [availableLetters, setAvailableLetters] = useState<LetterTile[]>([]);
  // State for the letters the user has placed to build the word.
  const [builtWord, setBuiltWord] = useState<LetterTile[]>([]);
  // State for providing feedback to the user.
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  // Effect to load and shuffle questions on component mount.
  useEffect(() => {
    setQuestions(shuffleArray(scrambleQuestions));
  }, []);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const correctMessage = useMemo(() => correctFeedbackMessages[Math.floor(Math.random() * correctFeedbackMessages.length)], [currentQuestionIndex]);

  // Effect to set up a new question whenever the current question changes.
  useEffect(() => {
    if (currentQuestion) {
      const initialTiles = currentQuestion.scrambledLetters.map((letter, index) => ({ id: index, letter }));
      setAvailableLetters(initialTiles);
      setBuiltWord([]);
      setFeedback(null);
    }
  }, [currentQuestion]);

  /**
   * Moves a letter from the available pool to the built word area.
   * @param {LetterTile} tile - The letter tile to move.
   */
  const handleLetterClick = (tile: LetterTile) => {
    if (feedback) return;
    setBuiltWord(prev => [...prev, tile]);
    setAvailableLetters(prev => prev.filter(t => t.id !== tile.id));
  };

  /**
   * Moves the last letter from the built word back to the available pool (backspace).
   */
  const handleBackspace = () => {
    if (feedback || builtWord.length === 0) return;
    const lastLetter = builtWord[builtWord.length - 1];
    setAvailableLetters(prev => [...prev, lastLetter]);
    setBuiltWord(prev => prev.slice(0, -1));
  };
  
  // Effect to check the answer automatically when the built word has the correct length.
  useEffect(() => {
    if (!currentQuestion || feedback) return;
    const constructedWord = builtWord.map(t => t.letter).join('');
    // The length check must use the original scrambled letters array length, as the target word might have combined characters.
    if (constructedWord.length > 0 && builtWord.length === currentQuestion.scrambledLetters.length) {
      if (constructedWord === currentQuestion.word) {
        setFeedback('correct');
        playCorrectSound();
        onAnswer(true, 1);
      } else {
        setFeedback('incorrect');
        playIncorrectSound();
        onAnswer(false, -0.5);
      }
    }
  }, [builtWord, currentQuestion, onAnswer, feedback]);


  /**
   * Moves to the next question or restarts the exercise.
   */
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuestions(shuffleArray(scrambleQuestions));
      setCurrentQuestionIndex(0);
    }
  };
  
  if (!currentQuestion) {
    return <div className="text-center p-10">...تَحْمِيلُ الْأَسْئِلَةِ</div>;
  }

  // BUG FIX: The length calculation for the placeholder array can become negative during a fast
  // state transition between a long word and a short word, causing a RangeError.
  // Math.max(0, ...) ensures the length is never negative.
  const placeholderCount = Math.max(0, currentQuestion.scrambledLetters.length - builtWord.length);

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-500">
      {/* Progress Bar */}
      <p className="text-slate-500 font-semibold mb-2 text-lg sm:text-xl">
        اَلسُّؤَالُ {currentQuestionIndex + 1} مِنْ {questions.length}
      </p>
      <div className="h-3 w-full bg-slate-200 rounded-full mb-4">
          <div className="h-3 bg-rose-500 rounded-full transition-all duration-300" style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div>
      </div>

      <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-2 text-center">رَتِّبِ الْحُرُوفَ لِتُكَوِّنَ كَلِمَةً:</h2>
      {currentQuestion.hint && <p className="text-center text-slate-500 mb-4 text-xl sm:text-2xl">تَلْمِيحٌ: {currentQuestion.hint}</p>}
      
      {/* Area where the user builds the word */}
      <div dir="rtl" className="flex justify-center items-center gap-2 sm:gap-3 mb-6 bg-slate-100 p-2 sm:p-4 rounded-lg min-h-[80px] sm:min-h-[120px]">
          {builtWord.map((tile) => (
              <div key={tile.id} className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-white rounded-lg shadow text-4xl sm:text-5xl font-bold text-rose-600">
                  {tile.letter}
              </div>
          ))}
          {/* Placeholder boxes for remaining letters */}
          {Array(placeholderCount).fill(0).map((_, index) => (
               <div key={index} className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-200 rounded-lg shadow-inner"></div>
          ))}
      </div>

      {/* Area with available letter tiles */}
      <div dir="rtl" className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 min-h-[80px] sm:min-h-[120px]">
        {availableLetters.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleLetterClick(tile)}
            disabled={feedback !== null}
            className="w-20 h-20 sm:w-24 sm:h-24 text-4xl sm:text-5xl font-bold rounded-xl shadow-md transition-all duration-200 border-4 bg-white hover:bg-rose-100 border-slate-300 hover:border-rose-500"
          >
            {tile.letter}
          </button>
        ))}
      </div>

      {/* Backspace Button with a tooltip */}
       <div className="flex justify-center">
            <button 
                onClick={handleBackspace} 
                disabled={feedback !== null || builtWord.length === 0} 
                className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-slate-200 text-slate-600 rounded-xl shadow-md hover:bg-slate-300 transition-colors disabled:opacity-50"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="مَسْحُ الْحَرْفِ الْأَخِيرِ"
            >
                <BsBackspaceFill className="h-10 w-10 sm:h-12 sm:w-12" />
            </button>
       </div>

      {/* Feedback Section */}
      {feedback && (
        <div className="text-center animate-fade-in mt-4 p-4 sm:p-5 bg-slate-50 rounded-lg">
           <p className={`text-3xl sm:text-4xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
              {feedback === 'correct' ? correctMessage : 'خَطَأٌ! حَاوِلْ مَرَّةً أُخْرَى.'}
           </p>
           <p className="text-3xl sm:text-4xl text-slate-600">اَلْكَلِمَةُ الصَّحِيحَةُ هِيَ: <span className="font-bold text-rose-600">{currentQuestion.word}</span></p>
           <button 
              onClick={handleNextQuestion} 
              className="mt-4 bg-rose-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-rose-600 transition-colors text-xl sm:text-2xl"
            >
                اَلسُّؤَالُ التَّالِي
            </button>
        </div>
      )}
    </div>
  );
};