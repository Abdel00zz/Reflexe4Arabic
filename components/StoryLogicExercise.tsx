/**
 * @file This file contains the "Story Logic" (مَنْطِقُ الْقِصَّةِ) exercise component.
 * This activity enhances logical reasoning and sequencing skills by asking the user to
 * arrange three emoji pictures to form a short, coherent story using drag and drop.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { StoryLogicQuestion } from '../types';
import { storyLogicQuestions } from '../data/arabicContent';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';
import { FaArrowLeft } from 'react-icons/fa';

interface StoryLogicExerciseProps {
  onAnswer: (isCorrect: boolean, score: number) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const correctFeedbackMessages = ['قِصَّةٌ رَائِعَةٌ! 📖', 'تَرْتِيبٌ مَنْطِقِيٌّ! 👍', 'أَنْتَ مُبْدِعٌ! ✨', 'عَمَلٌ مُمْتَازٌ! ⭐'];

export const StoryLogicExercise: React.FC<StoryLogicExerciseProps> = ({ onAnswer }) => {
  const [questions, setQuestions] = useState<StoryLogicQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [answerSlots, setAnswerSlots] = useState<(string | null)[]>([null, null, null]);
  const [draggedItem, setDraggedItem] = useState<{ emoji: string, sourceIndex: number, sourceType: 'options' | 'slot' } | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    setQuestions(shuffleArray(storyLogicQuestions));
  }, []);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const correctMessage = useMemo(() => correctFeedbackMessages[Math.floor(Math.random() * correctFeedbackMessages.length)], [currentQuestionIndex]);
  
  useEffect(() => {
    if (currentQuestion) {
      setOptions(shuffleArray(currentQuestion.emojis));
      setAnswerSlots([null, null, null]);
      setFeedback(null);
    }
  }, [currentQuestion]);
  
  const handleDragStart = (emoji: string, sourceIndex: number, sourceType: 'options' | 'slot') => {
    if (feedback) return;
    setDraggedItem({ emoji, sourceIndex, sourceType });
  };
  
  const handleDrop = (targetIndex: number) => {
    if (!draggedItem || feedback) return;

    const newAnswerSlots = [...answerSlots];
    const newOptions = [...options];

    const sourceEmoji = draggedItem.emoji;
    const targetEmoji = newAnswerSlots[targetIndex];

    // Place the source emoji in the target slot
    newAnswerSlots[targetIndex] = sourceEmoji;

    // Remove source emoji from its original place
    if (draggedItem.sourceType === 'options') {
      newOptions.splice(draggedItem.sourceIndex, 1);
    } else { // 'slot'
      newAnswerSlots[draggedItem.sourceIndex] = null;
    }

    // If target had an emoji, move it
    if (targetEmoji) {
        if(draggedItem.sourceType === 'slot') {
            // Swap with source slot
            newAnswerSlots[draggedItem.sourceIndex] = targetEmoji;
        } else {
            // Move back to options
            newOptions.push(targetEmoji);
        }
    }
    
    setAnswerSlots(newAnswerSlots);
    setOptions(newOptions);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const checkAnswer = () => {
    const userAnswer = answerSlots.filter(s => s !== null).join('');
    const correctAnswer = currentQuestion.correctOrder.join('');
    
    if (userAnswer === correctAnswer) {
      setFeedback('correct');
      playCorrectSound();
      onAnswer(true, 5);
    } else {
      setFeedback('incorrect');
      playIncorrectSound();
      onAnswer(false, -2);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuestions(shuffleArray(storyLogicQuestions));
      setCurrentQuestionIndex(0);
    }
  };

  if (!currentQuestion) {
    return <div className="text-center p-10">...تَحْمِيلُ الْقِصَصِ</div>;
  }
  
  const isComplete = answerSlots.every(slot => slot !== null);

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-500">
      <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-4 text-center">مَنْطِقُ الْقِصَّةِ</h2>
      <p className="text-xl sm:text-2xl text-center text-slate-600 mb-6">اسْحَبِ الصُّوَرَ لِتَرْتِيبِ الْقِصَّةِ.</p>
      
      {/* Answer Area (Drop Targets) */}
      <div dir="rtl" className="flex justify-center items-center gap-2 sm:gap-4 p-4 rounded-lg mb-6 min-h-[140px]">
        {answerSlots.map((emoji, index) => (
          <React.Fragment key={index}>
            <div
              onDrop={() => handleDrop(index)}
              onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index); }}
              onDragLeave={() => setDragOverIndex(null)}
              draggable={!!emoji}
              onDragStart={(e) => emoji && handleDragStart(emoji, index, 'slot')}
              className={`w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center text-5xl sm:text-6xl rounded-2xl border-4 border-dashed transition-all duration-200 ${
                emoji ? 'bg-white cursor-grab' : 'bg-slate-200'
              } ${dragOverIndex === index ? 'border-purple-500 scale-105' : ''} ${
                feedback === 'correct' ? 'border-green-400' : feedback === 'incorrect' ? 'border-red-400 animate-shake' : 'border-slate-300'
              }`}
            >
              {emoji}
            </div>
            {index < 2 && <FaArrowLeft className="text-slate-300 text-2xl sm:text-4xl" />}
          </React.Fragment>
        ))}
      </div>

      {/* Options Area (Draggable Items) */}
      <div dir="rtl" className="flex justify-center items-center gap-4 bg-slate-100 p-4 rounded-lg mb-6 min-h-[140px]">
        {options.map((emoji, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(emoji, index, 'options')}
            className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center text-5xl sm:text-6xl rounded-2xl bg-white shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200 cursor-grab"
          >
            {emoji}
          </div>
        ))}
        {options.length === 0 && !feedback && (
          <p className="text-slate-500 text-xl font-semibold">اضْغَطْ عَلَى "تَحَقَّقْ" لِتَرَى النَّتِيجَةَ.</p>
        )}
      </div>
      
      {feedback ? (
        <div className="text-center animate-fade-in mt-4 p-4 sm:p-5 bg-slate-50 rounded-lg">
          {feedback === 'correct' ? (
            <>
              <p className="text-3xl sm:text-4xl font-bold mb-4 text-green-600">{correctMessage}</p>
              <div className="bg-purple-100 border-2 border-purple-200 p-4 rounded-lg">
                 <p className="text-2xl sm:text-3xl text-purple-800">{currentQuestion.storySentence}</p>
              </div>
            </>
          ) : (
             <p className="text-3xl sm:text-4xl font-bold text-red-600">تَرْتِيبٌ غَيْرُ صَحِيحٍ! حَاوِلْ مَرَّةً أُخْرَى.</p>
          )}
          <button onClick={handleNextQuestion} className="mt-4 bg-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-600 transition-colors text-2xl">
            الْقِصَّةُ التَّالِيَةُ
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
            <button
                onClick={checkAnswer}
                disabled={!isComplete}
                className="bg-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-600 transition-colors text-xl sm:text-2xl disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
                تَحَقَّقْ مِنَ الْإِجَابَةِ
            </button>
        </div>
      )}
    </div>
  );
};