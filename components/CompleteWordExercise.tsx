/**
 * @file This file contains the "Complete the Word" (in a sentence) exercise component.
 * In this exercise, the user is shown a sentence with a missing word and must choose the correct word from a set of options.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { WordQuestion } from '../types';
import { wordQuestions } from '../data/arabicContent';

// Props interface for the component.
interface CompleteWordExerciseProps {
  onComplete: (score: number) => void; // Callback to update the total score.
}

// A utility function to shuffle an array.
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const CompleteWordExercise: React.FC<CompleteWordExerciseProps> = ({ onComplete }) => {
  // State to hold the shuffled list of questions.
  const [questions, setQuestions] = useState<WordQuestion[]>([]);
  // State to track the index of the current question.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to store the user's selected option.
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // State to provide feedback to the user ('correct' or 'incorrect').
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Effect to load and shuffle questions when the component mounts.
  useEffect(() => {
    setQuestions(shuffleArray(wordQuestions));
  }, []);

  // useMemo to get the current question object based on the index.
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  // useMemo to shuffle the options for the current question.
  const shuffledOptions = useMemo(() => {
      return currentQuestion ? shuffleArray(currentQuestion.options) : [];
  }, [currentQuestion]);

  /**
   * Handles the user clicking on an option button.
   * @param {string} option - The word the user selected.
   */
  const handleOptionClick = (option: string) => {
    // Prevent action if feedback is already shown.
    if (feedback) return;

    setSelectedOption(option);
    if (option === currentQuestion.correctWord) {
      setFeedback('correct');
      onComplete(10); // Award points for correct answer.
    } else {
      setFeedback('incorrect');
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
      setQuestions(shuffleArray(wordQuestions));
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
      return 'bg-white hover:bg-emerald-100 border-slate-300 hover:border-emerald-500';
    }
    if (option === currentQuestion.correctWord) {
      // Correct answer state
      return 'bg-green-500 text-white border-green-700 transform scale-110';
    }
    if (option === selectedOption && option !== currentQuestion.correctWord) {
      // Incorrect answer selected by user
      return 'bg-red-500 text-white border-red-700';
    }
    // Other options after an answer is given
    return 'bg-gray-200 text-gray-500 border-gray-400';
  };

  const fullSentence = currentQuestion.sentenceHint.replace('___', currentQuestion.correctWord);

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 sm:p-8">
      {/* Progress Bar */}
      <p className="text-slate-500 font-semibold mb-2 text-sm sm:text-base">
        اَلسُّؤَالُ {currentQuestionIndex + 1} مِنْ {questions.length}
      </p>
      <div className="h-3 w-full bg-slate-200 rounded-full mb-4 sm:mb-8">
          <div className="h-3 bg-emerald-500 rounded-full transition-all duration-300" style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div>
      </div>
      
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-700 mb-6 text-center">أَكْمِلِ الْجُمْلَةَ:</h2>
      
      {/* Display for the sentence hint with a blank space */}
      <div className="text-center mb-8 bg-slate-100 p-4 sm:p-8 rounded-lg">
           <p className="text-3xl sm:text-5xl font-bold text-slate-800 leading-relaxed">
              {currentQuestion.sentenceHint.split('___').map((part, index) => (
                  <React.Fragment key={index}>
                      {part}
                      {index < currentQuestion.sentenceHint.split('___').length - 1 && (
                          <span className="inline-block text-center border-b-8 border-dashed border-slate-300 min-w-[150px] sm:min-w-[200px] mx-2 sm:mx-4 p-1 sm:p-2">
                             {feedback ? <span className={feedback === 'correct' ? 'text-green-600' : 'text-red-600'}>{selectedOption}</span> : ''}
                          </span>
                      )}
                  </React.Fragment>
              ))}
           </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 mb-8">
        {shuffledOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={!!feedback}
            className={`p-4 sm:p-6 text-xl sm:text-3xl font-bold rounded-xl shadow-md transition-all duration-300 border-4 ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Feedback Section */}
      {feedback && (
        <div className="text-center animate-fade-in mt-4 sm:mt-8 p-4 sm:p-6 bg-slate-50 rounded-lg">
           <p className={`text-2xl sm:text-3xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
              {feedback === 'correct' ? 'إِجَابَةٌ رَائِعَةٌ! ⭐' : `لِلْأَسَفِ! اَلْإِجَابَةُ الصَّحِيحَةُ هِيَ "${currentQuestion.correctWord}"`}
           </p>
           <p className="text-2xl sm:text-3xl text-slate-600">اَلْجُمْلَةُ الْكَامِلَةُ: <span className="font-bold text-emerald-600">{fullSentence}</span></p>
           <button 
              onClick={handleNextQuestion} 
              className="mt-4 sm:mt-6 bg-emerald-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-emerald-600 transition-colors text-lg sm:text-xl"
            >
                اَلسُّؤَالُ التَّالِي
            </button>
        </div>
      )}
    </div>
  );
};