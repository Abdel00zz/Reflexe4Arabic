/**
 * @file This file contains the "Complete the Letter" exercise component.
 * In this exercise, the user is shown a word with a missing letter and must choose the correct letter from a set of options.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { LetterQuestion } from '../types';
import { letterQuestions } from '../data/arabicContent';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';

// Props interface for the component.
interface CompleteLetterExerciseProps {
  onAnswer: (isCorrect: boolean, score: number) => void; // Callback to report answer status and score.
}

// A utility function to shuffle an array.
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const correctFeedbackMessages = ['إِجَابَةٌ صَحِيحَةٌ! 🎉', 'أَحْسَنْتَ! 👍', 'عَمَلٌ رَائِعٌ! ✨', 'مُمْتَازٌ! ⭐'];

export const CompleteLetterExercise: React.FC<CompleteLetterExerciseProps> = ({ onAnswer }) => {
  // State to hold the shuffled list of questions.
  const [questions, setQuestions] = useState<LetterQuestion[]>([]);
  // State to track the index of the current question.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to store the user's selected option.
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // State to provide feedback to the user ('correct' or 'incorrect').
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  // Effect to load and shuffle questions when the component mounts.
  useEffect(() => {
    setQuestions(shuffleArray(letterQuestions));
  }, []);

  // useMemo to get the current question object based on the index.
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  // useMemo to shuffle the options for the current question.
  const shuffledOptions = useMemo(() => {
      return currentQuestion ? shuffleArray(currentQuestion.options) : [];
  }, [currentQuestion]);
  // useMemo to get a random positive feedback message for each question.
  const correctMessage = useMemo(() => correctFeedbackMessages[Math.floor(Math.random() * correctFeedbackMessages.length)], [currentQuestionIndex]);


  /**
   * Handles the user clicking on an option button.
   * @param {string} option - The letter the user selected.
   */
  const handleOptionClick = (option: string) => {
    // Prevent action if feedback is already shown.
    if (feedback) return;

    setSelectedOption(option);
    if (option === currentQuestion.correctLetter) {
      setFeedback('correct');
      playCorrectSound();
      onAnswer(true, 1); // Report correct answer and award 1 point.
    } else {
      setFeedback('incorrect');
      playIncorrectSound();
      onAnswer(false, -0.5); // Report incorrect answer and subtract 0.5 points.
    }
  };

  /**
   * Moves to the next question or restarts the exercise if all questions are answered.
   */
  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Reshuffle and start from the beginning.
      setQuestions(shuffleArray(letterQuestions));
      setCurrentQuestionIndex(0);
    }
  };
  
  // Display a loading message if questions are not yet loaded.
  if (!currentQuestion) {
    return <div className="text-center p-10">...تَحْمِيلُ الْأَسْئِلَةِ</div>;
  }
  
  /**
   * Determines the CSS classes for an option button based on the feedback state.
   * @param {string} option - The option to get the class for.
   * @returns {string} The Tailwind CSS classes for the button.
   */
  const getButtonClass = (option: string) => {
    if (!feedback) {
      // Default state
      return 'bg-white hover:bg-sky-100 border-slate-300 hover:border-sky-500';
    }
    if (option === currentQuestion.correctLetter) {
      // Correct answer state
      return 'bg-green-500 text-white border-green-700 transform scale-110';
    }
    if (option === selectedOption && option !== currentQuestion.correctLetter) {
      // Incorrect answer selected by user
      return 'bg-red-500 text-white border-red-700';
    }
    // Other options after an answer is given
    return 'bg-gray-200 text-gray-500 border-gray-400';
  };

  const fullWord = currentQuestion.vocalizedWord;

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-4 sm:p-8 transition-all duration-500">
      {/* Progress Bar */}
      <p className="text-slate-500 font-semibold mb-2 text-lg sm:text-xl">
        اَلسُّؤَالُ {currentQuestionIndex + 1} مِنْ {questions.length}
      </p>
      <div className="h-3 w-full bg-slate-200 rounded-full mb-4 sm:mb-8">
          <div className="h-3 bg-sky-500 rounded-full transition-all duration-300" style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div>
      </div>

      <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-4 sm:mb-8 text-center">أَكْمِلِ الْكَلِمَةَ:</h2>
      
      {/* Display for the word hint with a blank space */}
      <div className="flex justify-center items-center mb-6 sm:mb-10">
          <p className="text-6xl sm:text-8xl font-black text-slate-800 tracking-widest bg-slate-100 p-4 sm:p-8 rounded-lg">
              {currentQuestion.wordHint.split('_').map((part, index) => (
                  <React.Fragment key={index}>
                      {part}
                      {index < currentQuestion.wordHint.split('_').length - 1 && (
                          <span className={`inline-block w-20 sm:w-28 text-center border-b-8 ${feedback ? 'border-sky-500' : 'border-slate-300'}`}>
                              {feedback === 'correct' ? selectedOption : feedback === 'incorrect' ? <span className="text-red-500">{selectedOption}</span> : '?'}
                          </span>
                      )}
                  </React.Fragment>
              ))}
          </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-8">
        {shuffledOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={!!feedback}
            className={`p-4 sm:p-6 text-4xl sm:text-6xl font-bold rounded-xl shadow-md transition-all duration-300 border-4 ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Feedback Section */}
      {feedback && (
        <div className="text-center animate-fade-in mt-4 sm:mt-8 p-4 sm:p-6 bg-slate-50 rounded-lg">
           <p className={`text-3xl sm:text-4xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
              {feedback === 'correct' ? correctMessage : `خَطَأٌ! اَلْإِجَابَةُ الصَّحِيحَةُ هِيَ "${currentQuestion.correctLetter}"`}
           </p>
           <p className="text-3xl sm:text-4xl text-slate-600">اَلْكَلِمَةُ هِيَ: <span className="font-bold text-sky-600">{fullWord}</span></p>
            <button 
              onClick={handleNextQuestion} 
              className="mt-4 sm:mt-6 bg-sky-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-sky-600 transition-colors text-xl sm:text-2xl" 
            >
                اَلسُّؤَالُ التَّالِي
            </button>
        </div>
      )}
    </div>
  );
};