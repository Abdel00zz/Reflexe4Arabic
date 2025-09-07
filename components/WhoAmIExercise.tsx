/**
 * @file This file contains the "Who Am I?" (مَنْ أَكُونُ؟) riddle exercise component.
 * The user reads a riddle and tries to guess the answer. After 15 seconds,
 * multiple-choice suggestions appear to help them.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { WhoAmIQuestion } from '../types';
import { whoAmIQuestions } from '../data/arabicContent';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';
import { FaPaperPlane } from 'react-icons/fa';

interface WhoAmIExerciseProps {
  onAnswer: (isCorrect: boolean, score: number) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const correctFeedbackMessages = ['ذَكَاءٌ خَارِقٌ! 🧠', 'إِجَابَةٌ صَحِيحَةٌ! 👍', 'أَنْتَ عَبْقَرِيٌّ! ✨', 'مُمْتَازٌ! ⭐'];
const TIME_BEFORE_SUGGESTIONS = 15;

export const WhoAmIExercise: React.FC<WhoAmIExerciseProps> = ({ onAnswer }) => {
  const [questions, setQuestions] = useState<WhoAmIQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [timer, setTimer] = useState(TIME_BEFORE_SUGGESTIONS);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submittedOptions, setSubmittedOptions] = useState<string[]>([]);
  
  // FIX: Use ReturnType<typeof setInterval> instead of NodeJS.Timeout for browser compatibility.
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setQuestions(shuffleArray(whoAmIQuestions));
  }, []);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const correctMessage = useMemo(() => correctFeedbackMessages[Math.floor(Math.random() * correctFeedbackMessages.length)], [currentQuestionIndex]);
  const shuffledOptions = useMemo(() => currentQuestion ? shuffleArray(currentQuestion.options) : [], [currentQuestion]);

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const startTimer = () => {
    stopTimer();
    timerIntervalRef.current = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
  };

  useEffect(() => {
    if (currentQuestion && !feedback) {
      setTimer(TIME_BEFORE_SUGGESTIONS);
      setShowSuggestions(false);
      startTimer();
    }
    return stopTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, feedback]);

  useEffect(() => {
    if (timer <= 0) {
      setShowSuggestions(true);
      stopTimer();
    }
  }, [timer]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (feedback || !userAnswer.trim() || !currentQuestion) return;

    const answer = userAnswer.trim();
    if (answer === currentQuestion.answer) {
      setFeedback('correct');
      playCorrectSound();
      onAnswer(true, 1);
    } else {
      setFeedback('incorrect');
      playIncorrectSound();
      onAnswer(false, -0.5);
    }
    stopTimer();
  };

  const handleSuggestionClick = (option: string) => {
    if (feedback || !currentQuestion) return;
    setSubmittedOptions(prev => [...prev, option]);
    if (option === currentQuestion.answer) {
      setFeedback('correct');
      playCorrectSound();
      onAnswer(true, 0.5); // Less score for using suggestion
    } else {
      setFeedback('incorrect');
      playIncorrectSound();
      onAnswer(false, -0.5);
    }
    stopTimer();
  };
  
  const handleNextQuestion = () => {
    setFeedback(null);
    setUserAnswer('');
    setSubmittedOptions([]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuestions(shuffleArray(whoAmIQuestions));
      setCurrentQuestionIndex(0);
    }
  };

  if (!currentQuestion) {
    return <div className="text-center p-10">...تَحْمِيلُ الْأَحَاجِي</div>;
  }
  
  const getButtonClass = (option: string) => {
      if (!feedback) {
          return 'bg-white hover:bg-teal-100 border-slate-300';
      }
      if (option === currentQuestion.answer) {
          return 'bg-green-500 text-white border-green-700 transform scale-110';
      }
      if (submittedOptions.includes(option) && option !== currentQuestion.answer) {
          return 'bg-red-500 text-white border-red-700';
      }
      return 'bg-gray-200 text-gray-500 border-gray-400';
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-500">
      <p className="text-slate-500 font-semibold mb-2 text-lg sm:text-xl">
        اَلسُّؤَالُ {currentQuestionIndex + 1} مِنْ {questions.length}
      </p>
      <div className="h-3 w-full bg-slate-200 rounded-full mb-4">
          <div className="h-3 bg-teal-500 rounded-full transition-all duration-300" style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div>
      </div>

      <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-6 text-center">مَنْ أَكُونُ؟</h2>
      
      <div className="bg-slate-100 p-6 rounded-lg mb-6">
          <p className="text-3xl text-center text-slate-800 font-semibold leading-relaxed">{currentQuestion.riddle}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-4 mb-6">
          <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={!!feedback || showSuggestions}
              placeholder={showSuggestions ? "اِخْتَر مِنَ الْأَسْفَلِ" : "اُكْتُبْ إِجَابَتَكَ هُنَا..."}
              className="flex-grow p-4 text-2xl rounded-lg border-2 border-slate-300 focus:border-teal-500 focus:ring-teal-500 disabled:bg-slate-100"
              dir="rtl"
          />
          <button type="submit" disabled={!userAnswer || !!feedback || showSuggestions} className="bg-teal-500 text-white font-bold p-4 rounded-lg hover:bg-teal-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex-shrink-0">
              <FaPaperPlane className="h-6 w-6"/>
          </button>
      </form>
      
      {showSuggestions && !feedback && (
          <div className="animate-fade-in mb-6">
              <p className="text-center text-slate-500 mb-4 font-semibold">مُسَاعَدَةٌ؟ ({timer} ثوانٍ) هَذِهِ بَعْضُ الاِقْتِرَاحَاتِ:</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {shuffledOptions.map(option => (
                      <button 
                        key={option} 
                        onClick={() => handleSuggestionClick(option)} 
                        disabled={!!feedback || submittedOptions.includes(option)}
                        className={`p-4 text-2xl font-bold rounded-xl shadow-md transition-all duration-300 border-4 ${getButtonClass(option)}`}
                      >
                          {option}
                      </button>
                  ))}
              </div>
          </div>
      )}
      
      {feedback && (
          <div className="text-center animate-fade-in mt-4 p-5 bg-slate-50 rounded-lg">
              <p className={`text-3xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                  {feedback === 'correct' ? correctMessage : `إِجَابَةٌ خَاطِئَةٌ! اَلْإِجَابَةُ هِيَ: "${currentQuestion.answer}"`}
              </p>
              <button onClick={handleNextQuestion} className="mt-4 bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition-colors text-2xl">
                  اَلسُّؤَالُ التَّالِي
              </button>
          </div>
      )}
    </div>
  );
};
