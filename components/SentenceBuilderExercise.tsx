/**
 * @file This file contains the "Sentence Builder" exercise component.
 * This is an advanced exercise where the user arranges scrambled words to form a coherent Arabic sentence,
 * teaching them about grammar and sentence structure.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { SentenceQuestion } from '../types';
import { sentenceQuestions } from '../data/arabicContent';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';

// Props interface for the component.
interface SentenceBuilderExerciseProps {
  onAnswer: (isCorrect: boolean, score: number) => void; // Callback to report answer status and score.
}

// Interface for a word tile, giving each word a unique ID for state management.
interface WordTile {
  id: number;
  word: string;
}

// A utility function to shuffle an array.
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const correctFeedbackMessages = ['جُمْلَةٌ صَحِيحَةٌ! ✍️', 'أَحْسَنْتَ التَّرْتِيبَ! 👍', 'عَمَلٌ رَائِعٌ! ✨', 'مُمْتَازٌ! ⭐'];

export const SentenceBuilderExercise: React.FC<SentenceBuilderExerciseProps> = ({ onAnswer }) => {
  // State for the list of questions.
  const [questions, setQuestions] = useState<SentenceQuestion[]>([]);
  // State for the current question index.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State for the words available to be picked.
  const [availableWords, setAvailableWords] = useState<WordTile[]>([]);
  // State for the words the user has placed to build the sentence.
  const [builtSentence, setBuiltSentence] = useState<WordTile[]>([]);
  // State for providing feedback to the user.
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  // Effect to load and shuffle questions on component mount.
  useEffect(() => {
    setQuestions(shuffleArray(sentenceQuestions));
  }, []);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const correctMessage = useMemo(() => correctFeedbackMessages[Math.floor(Math.random() * correctFeedbackMessages.length)], [currentQuestionIndex]);

  // Effect to set up a new question whenever the current question changes.
  useEffect(() => {
    if (currentQuestion) {
      const initialTiles = currentQuestion.scrambledWords.map((word, index) => ({ id: index, word }));
      setAvailableWords(shuffleArray(initialTiles));
      setBuiltSentence([]);
      setFeedback(null);
    }
  }, [currentQuestion]);

  /**
   * Moves a word from the available pool to the built sentence area.
   * @param {WordTile} tile - The word tile to move.
   */
  const handleWordClick = (tile: WordTile) => {
    if (feedback) return;
    setBuiltSentence(prev => [...prev, tile]);
    setAvailableWords(prev => prev.filter(t => t.id !== tile.id));
  };
  
  /**
   * Moves a word from the built sentence back to the available pool.
   * @param {WordTile} tile - The word tile to remove from the sentence.
   */
  const handleRemoveWord = (tile: WordTile) => {
    if (feedback) return;
    setAvailableWords(prev => [...prev, tile]);
    setBuiltSentence(prev => prev.filter(t => t.id !== tile.id));
  }

  /**
   * Checks if the constructed sentence is correct.
   */
  const checkAnswer = () => {
    const userAnswer = builtSentence.map(t => t.word).join(' ');
    if (userAnswer === currentQuestion.correctSentence) {
        setFeedback('correct');
        playCorrectSound();
        onAnswer(true, 25);
    } else {
        setFeedback('incorrect');
        playIncorrectSound();
        onAnswer(false, 0);
    }
  }

  /**
   * Moves to the next question or restarts the exercise.
   */
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuestions(shuffleArray(sentenceQuestions));
      setCurrentQuestionIndex(0);
    }
  };
  
  if (!currentQuestion) {
    return <div className="text-center p-10">...تَحْمِيلُ الْأَسْئِلَةِ</div>;
  }

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 sm:p-8 transition-all duration-500">
      {/* Progress Bar */}
      <p className="text-slate-500 font-semibold mb-2 text-lg sm:text-xl">
        اَلسُّؤَالُ {currentQuestionIndex + 1} مِنْ {questions.length}
      </p>
      <div className="h-3 w-full bg-slate-200 rounded-full mb-4 sm:mb-8">
          <div className="h-3 bg-indigo-500 rounded-full transition-all duration-300" style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div>
      </div>

      <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-8 text-center">رَتِّبِ الْكَلِمَاتِ لِتُكَوِّنَ جُمْلَةً مُفِيدَةً:</h2>
      
      {/* Area where the user builds the sentence */}
      <div dir="rtl" className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-8 bg-slate-100 p-4 sm:p-6 rounded-lg min-h-[120px] border-2 border-dashed">
          {builtSentence.map((tile) => (
              <button key={tile.id} onClick={() => handleRemoveWord(tile)} className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-lg shadow text-2xl sm:text-3xl font-bold text-indigo-600 cursor-pointer">
                  {tile.word}
              </button>
          ))}
      </div>

      {/* Area with available word tiles */}
      <div dir="rtl" className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 min-h-[120px]">
        {availableWords.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleWordClick(tile)}
            disabled={feedback !== null}
            className="px-4 py-2 sm:px-6 sm:py-3 text-2xl sm:text-3xl font-bold rounded-lg shadow-md transition-all duration-200 border-4 bg-white hover:bg-indigo-100 border-slate-300 hover:border-indigo-500"
          >
            {tile.word}
          </button>
        ))}
      </div>

        {/* Check Answer Button (appears when all words are used) */}
        {!feedback && availableWords.length === 0 && (
             <div className="text-center">
                 <button onClick={checkAnswer} className="bg-indigo-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-indigo-600 transition-colors text-xl sm:text-2xl">
                    تَحَقَّقْ مِنَ الْإِجَابَةِ
                </button>
            </div>
        )}

      {/* Feedback Section */}
      {feedback && (
        <div className="text-center animate-fade-in mt-4 sm:mt-8 p-4 sm:p-6 bg-slate-50 rounded-lg">
           <p className={`text-3xl sm:text-4xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
              {feedback === 'correct' ? correctMessage : 'حَاوِلْ مَرَّةً أُخْرَى!'}
           </p>
           <p className="text-3xl sm:text-4xl text-slate-600">اَلْجُمْلَةُ الصَّحِيحَةُ هِيَ: <span className="font-bold text-indigo-600">{currentQuestion.correctSentence}</span></p>
           <button 
              onClick={handleNextQuestion} 
              className="mt-4 sm:mt-6 bg-indigo-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-indigo-600 transition-colors text-xl sm:text-2xl"
            >
                اَلسُّؤَالُ التَّالِي
            </button>
        </div>
      )}
    </div>
  );
};