/**
 * @file This file contains the "Sentence Builder" exercise component.
 * This is an advanced exercise where the user arranges scrambled words to form a coherent Arabic sentence,
 * teaching them about grammar and sentence structure.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { SentenceQuestion } from '../types';
import { sentenceQuestions } from '../data/arabicContent';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';
import { BsBackspaceFill } from 'react-icons/bs';

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
  // State for the currently selected tile in the built sentence for swapping.
  const [selectedTile, setSelectedTile] = useState<WordTile | null>(null);
  
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
      setSelectedTile(null);
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
   * Handles clicking a word in the built sentence area for selection and swapping.
   * @param {WordTile} clickedTile - The word tile that was clicked.
   */
  const handleBuiltWordClick = (clickedTile: WordTile) => {
    if (feedback) return;

    if (!selectedTile) {
      // Nothing selected, so select this tile.
      setSelectedTile(clickedTile);
    } else {
      if (selectedTile.id === clickedTile.id) {
        // Clicked the same tile, so deselect.
        setSelectedTile(null);
      } else {
        // Clicked a different tile, so swap them.
        const newBuiltSentence = [...builtSentence];
        const fromIndex = builtSentence.findIndex(t => t.id === selectedTile.id);
        const toIndex = builtSentence.findIndex(t => t.id === clickedTile.id);
        
        if (fromIndex !== -1 && toIndex !== -1) {
          // Perform the swap.
          [newBuiltSentence[fromIndex], newBuiltSentence[toIndex]] = [newBuiltSentence[toIndex], newBuiltSentence[fromIndex]];
          setBuiltSentence(newBuiltSentence);
        }
        // Deselect after swap.
        setSelectedTile(null);
      }
    }
  };

  /**
   * Removes a word from the sentence. If a word is selected, it removes that one.
   * Otherwise, it removes the last word.
   */
  const handleBackspace = () => {
    if (feedback || builtSentence.length === 0) return;
    
    let wordToRemove: WordTile | undefined;
    
    if (selectedTile) {
      wordToRemove = selectedTile;
      setBuiltSentence(prev => prev.filter(t => t.id !== selectedTile.id));
      setSelectedTile(null);
    } else {
      wordToRemove = builtSentence[builtSentence.length - 1];
      setBuiltSentence(prev => prev.slice(0, -1));
    }
    
    if (wordToRemove) {
      setAvailableWords(prev => [...prev, wordToRemove!]);
    }
  };

  /**
   * Checks if the constructed sentence is correct.
   */
  const checkAnswer = () => {
    const userAnswer = builtSentence.map(t => t.word).join(' ');
    if (userAnswer === currentQuestion.correctSentence) {
        setFeedback('correct');
        playCorrectSound();
        onAnswer(true, 1);
    } else {
        setFeedback('incorrect');
        playIncorrectSound();
        onAnswer(false, -0.5);
    }
    setSelectedTile(null); // Deselect on submission.
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
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-500">
      {/* Progress Bar */}
      <p className="text-slate-500 font-semibold mb-2 text-lg sm:text-xl">
        اَلسُّؤَالُ {currentQuestionIndex + 1} مِنْ {questions.length}
      </p>
      <div className="h-3 w-full bg-slate-200 rounded-full mb-4">
          <div className="h-3 bg-indigo-500 rounded-full transition-all duration-300" style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div>
      </div>

      <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-6 text-center">رَتِّبِ الْكَلِمَاتِ لِتُكَوِّنَ جُمْلَةً مُفِيدَةً:</h2>
      
      {/* Area where the user builds the sentence + Backspace button */}
      <div className="flex items-center gap-4 mb-6">
        <button 
            onClick={handleBackspace} 
            disabled={feedback !== null || builtSentence.length === 0} 
            className="flex-shrink-0 w-28 h-28 flex items-center justify-center bg-slate-200 text-slate-600 rounded-xl shadow-md hover:bg-slate-300 transition-colors disabled:opacity-50"
            data-tooltip-id="app-tooltip"
            data-tooltip-content="إِلْغَاءُ كَلِمَةٍ"
            aria-label="إِلْغَاءُ كَلِمَةٍ"
        >
            <BsBackspaceFill className="h-12 w-12" />
        </button>
        <div dir="rtl" className="flex-grow flex flex-wrap justify-center items-center gap-3 sm:gap-4 bg-slate-100 p-4 sm:p-6 rounded-lg min-h-[140px] border-2 border-dashed">
            {builtSentence.length > 0 ? (
              builtSentence.map((tile) => (
                  <button 
                    key={tile.id} 
                    onClick={() => handleBuiltWordClick(tile)} 
                    className={`px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow text-3xl sm:text-4xl font-bold transition-all duration-200 ${
                        selectedTile?.id === tile.id 
                        ? 'bg-yellow-300 text-yellow-900 ring-4 ring-yellow-400 scale-105' 
                        : 'bg-white text-indigo-600 cursor-pointer'
                    }`}
                  >
                      {tile.word}
                  </button>
              ))
            ) : (
              <span className="text-slate-400 text-2xl font-semibold">اِبْدَأْ بِبِنَاءِ جُمْلَتِكَ هُنَا</span>
            )}
        </div>
      </div>


      {/* Area with available word tiles */}
      <div dir="rtl" className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 min-h-[140px]">
        {availableWords.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleWordClick(tile)}
            disabled={feedback !== null}
            className="px-6 py-3 sm:px-8 sm:py-4 text-3xl sm:text-4xl font-bold rounded-lg shadow-md transition-all duration-200 border-4 bg-white hover:bg-indigo-100 border-slate-300 hover:border-indigo-500"
          >
            {tile.word}
          </button>
        ))}
      </div>

      {/* Action Button: Check Answer */}
      <div className="flex justify-center mt-4">
        <button 
            onClick={checkAnswer} 
            disabled={feedback !== null || availableWords.length > 0}
            className="bg-indigo-500 text-white font-bold py-4 px-10 rounded-full hover:bg-indigo-600 transition-colors text-2xl sm:text-3xl disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
            تَحَقَّقْ مِنَ الْإِجَابَةِ
        </button>
      </div>

      {/* Feedback Section */}
      {feedback && (
        <div className="text-center animate-fade-in mt-6 p-4 sm:p-5 bg-slate-50 rounded-lg">
           <p className={`text-3xl sm:text-4xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
              {feedback === 'correct' ? correctMessage : 'حَاوِلْ مَرَّةً أُخْرَى!'}
           </p>
           <p className="text-3xl sm:text-4xl text-slate-600">اَلْجُمْلَةُ الصَّحِيحَةُ هِيَ: <span className="font-bold text-indigo-600">{currentQuestion.correctSentence}</span></p>
           <button 
              onClick={handleNextQuestion} 
              className="mt-6 bg-indigo-500 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full hover:bg-indigo-600 transition-colors text-2xl sm:text-3xl"
            >
                اَلسُّؤَالُ التَّالِي
            </button>
        </div>
      )}
    </div>
  );
};