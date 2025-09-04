/**
 * @file This file contains the "Listen and Choose" exercise component.
 * This smart exercise uses the browser's Web Speech API to say a word, and the user must select the correct written form of that word.
 * It now uses modern icons and tooltips for better UX.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ListenQuestion } from '../types';
import { listenQuestions } from '../data/arabicContent';
// Import modern icons
import { FaVolumeUp, FaArrowLeft } from 'react-icons/fa';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';

// Props interface for the component.
interface ListenChooseExerciseProps {
  onComplete: (score: number) => void; // Callback to update the total score.
}

// A utility function to shuffle an array.
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const ListenChooseExercise: React.FC<ListenChooseExerciseProps> = ({ onComplete }) => {
  // State for the list of questions.
  const [questions, setQuestions] = useState<ListenQuestion[]>([]);
  // State for the current question index.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State for the user's selected option.
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // State for providing feedback to the user.
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Effect to load and shuffle questions on component mount.
  useEffect(() => {
    setQuestions(shuffleArray(listenQuestions));
  }, []);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const shuffledOptions = useMemo(() => {
      return currentQuestion ? shuffleArray(currentQuestion.options) : [];
  }, [currentQuestion]);

  /**
   * Uses the Web Speech API to speak a given text in Arabic.
   * @param {string} text - The text to be spoken.
   */
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any previous speech.
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA'; // Set language to Arabic (Saudi Arabia).
      utterance.rate = 0.8; // Slow down the speech rate slightly.
      window.speechSynthesis.speak(utterance);
    } else {
      alert("عُذْرًا، مُتَصَفِّحُكَ لَا يَدْعَمُ مِيزَةَ النُّطْقِ.");
    }
  };

  // Effect to automatically speak the word when a new question is loaded.
  useEffect(() => {
    if (currentQuestion) {
        // Give a slight delay for the UI to update before speaking.
        setTimeout(() => speak(currentQuestion.correctWord), 500);
    }
  }, [currentQuestion]);

  /**
   * Handles the user selecting an answer.
   * @param {string} option - The selected word.
   */
  const handleOptionClick = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    if (option === currentQuestion.correctWord) {
      setFeedback('correct');
      playCorrectSound();
      onComplete(15);
    } else {
      setFeedback('incorrect');
      playIncorrectSound();
    }
  };

  /**
   * Moves to the next question.
   */
  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Reshuffle and start over.
      setQuestions(shuffleArray(listenQuestions));
      setCurrentQuestionIndex(0);
    }
  };

  if (!currentQuestion) {
    return <div className="text-center p-10">...تَحْمِيلُ الْأَسْئِلَةِ</div>;
  }

  /**
   * Determines the CSS classes for an option button based on the feedback state.
   * @param {string} option - The option to get the class for.
   * @returns {string} The Tailwind CSS classes.
   */
  const getButtonClass = (option: string) => {
    if (!feedback) {
      return 'bg-white hover:bg-teal-100 border-slate-300 hover:border-teal-500';
    }
    if (option === currentQuestion.correctWord) {
      return 'bg-green-500 text-white border-green-700 transform scale-110';
    }
    if (option === selectedOption && option !== currentQuestion.correctWord) {
      return 'bg-red-500 text-white border-red-700';
    }
    return 'bg-gray-200 text-gray-500 border-gray-400';
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative">
         {/* Next Question Button (appears after answering) with a tooltip */}
         {feedback && (
            <button 
                onClick={handleNextQuestion} 
                className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-teal-500 text-white p-3 rounded-full hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 animate-fade-in" 
                aria-label="اَلسُّؤَالُ التَّالِي"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="اَلسُّؤَالُ التَّالِي"
            >
                {/* Modern icon for 'next' (left arrow for RTL) */}
                <FaArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
        )}
        {/* Progress Bar */}
        <p className="text-slate-500 font-semibold mb-2 text-sm sm:text-base">
          اَلسُّؤَالُ {currentQuestionIndex + 1} مِنْ {questions.length}
        </p>
        <div className="h-2 w-full bg-slate-200 rounded-full mb-6">
            <div className="h-2 bg-teal-500 rounded-full transition-all duration-300" style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-6 text-center">اِسْتَمِعْ لِلْكَلِمَةِ وَاخْتَرِ الْكِتَابَةَ الصَّحِيحَةَ:</h2>
        
        {/* Speak Button with a tooltip */}
        <div className="text-center mb-8">
            <button 
                onClick={() => speak(currentQuestion.correctWord)} 
                className="bg-teal-500 text-white w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg hover:bg-teal-600 transition-colors flex items-center justify-center mx-auto animate-pulse"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="اِسْتَمِعْ مَرَّةً أُخْرَى"
            >
                <FaVolumeUp className="h-12 w-12 sm:h-16 sm:w-16" />
            </button>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {shuffledOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              disabled={!!feedback}
              className={`p-4 text-2xl sm:text-3xl font-bold rounded-xl shadow-md transition-all duration-300 border-2 ${getButtonClass(option)}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback Section */}
        {feedback && (
          <div className="text-center animate-fade-in mt-6">
             <p className={`text-xl sm:text-2xl font-bold ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                {feedback === 'correct' ? 'أَحْسَنْتَ! 🔊' : `إِجَابَةٌ خَاطِئَةٌ! اَلْكَلِمَةُ الصَّحِيحَةُ هِيَ "${currentQuestion.correctWord}"`}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};
