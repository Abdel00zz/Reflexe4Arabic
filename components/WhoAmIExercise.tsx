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
  const shuffledOptions = useMemo(() => {
    return currentQuestion ? shuffleArray(currentQuestion.options) : [];
  }, [currentQuestion]);

  useEffect(() => {
    if (feedback === 'correct' && timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
    }
  }, [feedback]);
  
  // Effect to manage the suggestion timer
  useEffect(() => {
    if (!currentQuestion || feedback) return;

    setShowSuggestions(false);
    setTimer(TIME_BEFORE_SUGGESTIONS);

    timerIntervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          setShowSuggestions(true);
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [currentQuestion, feedback]);


  const handleSubmit = (answer: string) => {
    if (!answer || feedback) return;

    // Normalize answer by removing diacritics for a more forgiving check
    const normalize = (str: string) => str.normalize("NFD").replace(/[\u064B-\u0652]/g, "");

    if (normalize(answer.trim()) === normalize(currentQuestion.answer)) {
      setFeedback('correct');
      playCorrectSound();
      onAnswer(true, 1);
    } else {
      setFeedback('incorrect');
      playIncorrectSound();
      onAnswer(false, -0.5);
      setTimeout(() => setFeedback(null), 1500); // Reset feedback to allow another try
    }
  };
  
  const handleOptionClick = (option: string) => {
      if (feedback) return;
      setSubmittedOptions(prev => [...prev, option]);
      handleSubmit(option);
  }

  const handleNextQuestion = () => {
    setFeedback(null);
    setUserAnswer('');
    setSubmittedOptions([]);
    setShowSuggestions(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuestions(shuffleArray(whoAmIQuestions));
      setCurrentQuestionIndex(0);
    }
  };

  if (!currentQuestion) {
    return <div className="text-center p-10">...تَحْمِيلُ الْأَلْغَازِ</div>;
  }
  
  const getButtonClass = (option: string) => {
    if (!feedback) return 'bg-white hover:bg-teal-100 border-slate-300 hover:border-teal-500';
    if (option === currentQuestion.answer) return 'bg-green-500 text-white border-green-700';
    if (submittedOptions.includes(option)) return 'bg-red-500 text-white border-red-700';
    return 'bg-gray-200 text-gray-500 border-gray-400';
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-500">
      {/* Progress Bar */}
      <p className="text-slate-500 font-semibold mb-2 text-lg sm:text-xl">
        اَللُّغْزُ {currentQuestionIndex + 1} مِنْ {questions.length}
      </p>
      <div className="h-3 w-full bg-slate-200 rounded-full mb-4">
        <div className="h-3 bg-teal-500 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
      </div>

      <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-4 text-center">مَنْ أَكُونُ؟</h2>
      
      <div className="bg-slate-100 p-6 rounded-lg mb-4">
        <p className="text-3xl sm:text-4xl font-semibold text-slate-800 text-center leading-relaxed">{currentQuestion.riddle}</p>
      </div>

      {feedback === 'correct' ? (
        <div className="text-center animate-fade-in mt-4 p-4 sm:p-5 bg-green-50 rounded-lg">
            <p className="text-3xl sm:text-4xl font-bold mb-4 text-green-600">{correctMessage}</p>
            <p className="text-3xl sm:text-4xl text-slate-600">اَلْإِجَابَةُ هِيَ: <span className="font-bold text-teal-600">{currentQuestion.answer}</span></p>
            <button 
              onClick={handleNextQuestion} 
              className="mt-4 bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition-colors text-2xl" 
            >
                اَللُّغْزُ التَّالِي
            </button>
        </div>
      ) : (
        <>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(userAnswer); }} className="flex gap-2 mb-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="اُكْتُبْ إِجَابَتَكَ هُنَا..."
              className={`flex-grow p-4 text-2xl rounded-lg border-4 transition-colors ${feedback === 'incorrect' ? 'border-red-500' : 'border-slate-300 focus:border-teal-500'} focus:outline-none`}
            />
            <button type="submit" className="bg-teal-500 text-white px-6 rounded-lg hover:bg-teal-600 transition-colors">
                <FaPaperPlane className="h-7 w-7" />
            </button>
        </form>
        {feedback === 'incorrect' && <p className="text-red-500 text-center text-xl mb-4">إِجَابَةٌ غَيْرُ صَحِيحَةٍ، حَاوِلْ مَرَّةً أُخْرَى!</p>}

        {!showSuggestions ? (
            <div className="text-center text-slate-500">
                سَتَظْهَرُ الاِقْتِرَاحَاتُ بَعْدَ <span className="font-bold text-teal-600 text-lg">{timer}</span> ثَانِيَةٍ...
            </div>
        ) : (
            <div className="animate-fade-in">
                <p className="text-center font-semibold text-slate-600 mb-3 text-xl">أَوِ اخْتَرْ مِنَ الاِقْتِرَاحَاتِ التَّالِيَةِ:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {shuffledOptions.map(option => (
                        <button 
                          key={option} 
                          onClick={() => handleOptionClick(option)}
                          disabled={submittedOptions.includes(option) && option !== currentQuestion.answer}
                          className={`p-4 text-3xl font-bold rounded-xl shadow-md transition-all duration-300 border-4 ${getButtonClass(option)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        )}
        </>
      )}

    </div>
  );
};