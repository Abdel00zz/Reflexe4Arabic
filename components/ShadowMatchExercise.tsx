/**
 * @file This file contains the "Word in a Flash" (كَلِمَةٌ فِي وَمْضَةٍ) exercise component.
 * Based on tachistoscopic training methods, this game enhances reading speed, focus, and rapid word recognition.
 * A word is flashed briefly, and the user must identify it from a set of options.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { FlashWordQuestion } from '../types';
import { flashWordQuestions } from '../data/arabicContent';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';

interface FlashWordExerciseProps {
  onAnswer: (isCorrect: boolean, score: number) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const correctFeedbackMessages = ['سَرِيعٌ جِدًّا! ⚡️', 'لَمْحَةٌ ذَكِيَّةٌ! 👀', 'رَائِعٌ! 👍', 'مُمْتَازٌ! ⭐'];

const INITIAL_SPEED = 500; // ms
const MIN_SPEED = 150; // ms
const SPEED_DECREMENT = 50; // ms, decrease on success
const SPEED_INCREMENT = 25; // ms, increase on failure
const STREAK_FOR_SPEED_UP = 3; // Number of correct answers in a row to speed up

export const FlashWordExercise: React.FC<FlashWordExerciseProps> = ({ onAnswer }) => {
  const [questions, setQuestions] = useState<FlashWordQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameState, setGameState] = useState<'ready' | 'countdown' | 'flashing' | 'answering' | 'feedback'>('ready');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [flashSpeed, setFlashSpeed] = useState(INITIAL_SPEED);
  const [correctStreak, setCorrectStreak] = useState(0);

  useEffect(() => {
    setQuestions(shuffleArray(flashWordQuestions));
  }, []);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const shuffledOptions = useMemo(() => currentQuestion ? shuffleArray(currentQuestion.options) : [], [currentQuestion]);
  const correctMessage = useMemo(() => correctFeedbackMessages[Math.floor(Math.random() * correctFeedbackMessages.length)], [currentQuestionIndex]);

  // Countdown timer effect
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(c => c - 1), 700);
        return () => clearTimeout(timer);
      } else {
        setGameState('flashing');
      }
    }
  }, [gameState, countdown]);
  
  // Flashing word effect
  useEffect(() => {
    if (gameState === 'flashing') {
      const timer = setTimeout(() => {
        setGameState('answering');
      }, flashSpeed);
      return () => clearTimeout(timer);
    }
  }, [gameState, flashSpeed]);

  const handleStart = () => {
    setCountdown(3);
    setGameState('countdown');
  };

  const handleAnswerClick = (option: string) => {
    if (gameState !== 'answering') return;
    
    const isCorrect = option === currentQuestion.word;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setGameState('feedback');
    
    if (isCorrect) {
      playCorrectSound();
      onAnswer(true, 5); // 5 points for a correct answer
      const newStreak = correctStreak + 1;
      setCorrectStreak(newStreak);
      if (newStreak >= STREAK_FOR_SPEED_UP) {
        setFlashSpeed(s => Math.max(MIN_SPEED, s - SPEED_DECREMENT));
        setCorrectStreak(0); // Reset streak after speeding up
      }
    } else {
      playIncorrectSound();
      onAnswer(false, -2); // -2 points for incorrect
      setCorrectStreak(0);
      setFlashSpeed(s => Math.min(INITIAL_SPEED, s + SPEED_INCREMENT));
    }
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setQuestions(shuffleArray(flashWordQuestions));
      setCurrentQuestionIndex(0);
    }
    setGameState('ready');
  };
  
  if (!currentQuestion) {
    return <div className="text-center p-10">...تَحْمِيلُ الْأَسْئِلَةِ</div>;
  }

  const renderGameState = () => {
    switch(gameState) {
      case 'ready':
        return (
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-700 mb-4">هَلْ أَنْتَ مُسْتَعِدٌّ؟</h3>
            <p className="text-xl text-slate-500 mb-6">سَتَظْهَرُ كَلِمَةٌ لِجُزْءٍ مِنَ الثَّانِيَةِ. حَاوِلْ مَعْرِفَتَهَا!</p>
            <button onClick={handleStart} className="bg-lime-500 text-white font-bold py-4 px-10 rounded-full text-2xl hover:bg-lime-600 transition-colors">
              اِبْدَأْ
            </button>
          </div>
        );
      
      case 'countdown':
      case 'flashing':
        return (
          <div className="w-full h-64 flex items-center justify-center bg-slate-800 rounded-2xl">
            <span className="text-9xl font-black text-white animate-ping-once">
              {gameState === 'countdown' ? countdown : currentQuestion.word}
            </span>
          </div>
        );
      
      case 'answering':
      case 'feedback':
        return (
          <>
            <div className="w-full h-64 flex items-center justify-center bg-slate-100 rounded-2xl mb-6">
              <span className="text-9xl font-black text-slate-400">؟</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {shuffledOptions.map(option => {
                const isCorrect = option === currentQuestion.word;
                let buttonClass = 'bg-white hover:bg-lime-100 border-slate-300';
                if(gameState === 'feedback') {
                    if (isCorrect) {
                        buttonClass = 'bg-green-500 text-white border-green-700 scale-105';
                    } else {
                        buttonClass = 'bg-red-500 text-white border-red-700';
                    }
                }

                return (
                  <button key={option} onClick={() => handleAnswerClick(option)} disabled={gameState === 'feedback'} className={`p-6 text-4xl font-bold rounded-xl shadow-md transition-all duration-300 border-4 ${buttonClass}`}>
                    {option}
                  </button>
                )
              })}
            </div>

            {gameState === 'feedback' && (
              <div className="text-center animate-fade-in mt-6 p-5 bg-slate-50 rounded-lg">
                <p className={`text-4xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback === 'correct' ? correctMessage : 'إِجَابَةٌ خَاطِئَةٌ!'}
                </p>
                <div className="text-3xl text-slate-600 flex items-center justify-center gap-4">
                  <span>اَلْكَلِمَةُ الصَّحِيحَةُ:</span>
                  <span className="font-bold text-lime-600">{currentQuestion.word}</span>
                  <span className="text-5xl">{currentQuestion.emoji}</span>
                </div>
                <button onClick={handleNextQuestion} className="mt-4 bg-lime-500 text-white font-bold py-3 px-8 rounded-full hover:bg-lime-600 transition-colors text-2xl">
                  التَّالِي
                </button>
              </div>
            )}
          </>
        );
    }
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 transition-all duration-500">
      <div className="flex justify-between items-center mb-4">
        <p className="text-slate-500 font-semibold text-xl">اَلسُّؤَالُ {currentQuestionIndex + 1} مِنْ {questions.length}</p>
        <p className="text-slate-500 font-semibold text-xl bg-slate-100 px-4 py-1 rounded-full">
          ⚡️ السُّرْعَةُ: {flashSpeed} جُزْءٌ مِنَ الثَّانِيَةِ
        </p>
      </div>
      <div className="h-3 w-full bg-slate-200 rounded-full mb-6">
          <div className="h-3 bg-lime-500 rounded-full transition-all duration-300" style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div>
      </div>
      
      {renderGameState()}
    </div>
  );
};
