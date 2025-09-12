/**
 * @file This file contains the "Days of the Week Challenge" exercise component.
 * It teaches the order of the days of the week in Arabic through an interactive
 * drag-and-drop sequencing game.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { daysOfWeek, daysOfWeekExercises } from '../data/arabicContent';
import { DaysOfWeekExercise as DaysOfWeekExerciseData, DaysOfWeekExerciseType } from '../types';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';

interface DaysOfWeekExerciseProps {
  onAnswer: (isCorrect: boolean, score: number) => void;
}

interface DayTile {
  id: number;
  day: string;
}

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const correctFeedbackMessages = ['🎉 أَحْسَنْتَ!', 'عَمَلٌ رَائِعٌ!', 'إِجَابَةٌ صَحِيحَةٌ!', 'مُمْتَازٌ!'];

export const DaysOfWeekExercise: React.FC<DaysOfWeekExerciseProps> = ({ onAnswer }) => {
  const [exercises, setExercises] = useState<DaysOfWeekExerciseData[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // State for Drag & Drop
  const [availableDays, setAvailableDays] = useState<DayTile[]>([]);
  const [daySlots, setDaySlots] = useState<(DayTile | null)[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ tile: DayTile, sourceIndex: number, sourceType: 'options' | 'slot' } | null>(null);
  const [showCorrectOrder, setShowCorrectOrder] = useState<boolean>(false);

  // State for Multiple Choice
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  
  // Common State
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    setExercises(shuffleArray(daysOfWeekExercises));
  }, []);
  
  const currentExercise = useMemo(() => exercises[currentExerciseIndex], [exercises, currentExerciseIndex]);
  const correctMessage = useMemo(() => correctFeedbackMessages[Math.floor(Math.random() * correctFeedbackMessages.length)], [currentExerciseIndex]);

  useEffect(() => {
    if (currentExercise) {
      // Reset common state
      setFeedback(null);
      setSelectedOption(null);
      setShowCorrectOrder(false); // Reset the "show answer" state for the new question.

      // Setup based on type
      if (currentExercise.type === DaysOfWeekExerciseType.ORDER_DRAG_DROP) {
        const initialTiles = shuffleArray(daysOfWeek.map((day, index) => ({ id: index, day })));
        setAvailableDays(initialTiles);
        setDaySlots(Array(7).fill(null));
      } else if (currentExercise.type === DaysOfWeekExerciseType.MULTIPLE_CHOICE && currentExercise.options) {
        setShuffledOptions(shuffleArray(currentExercise.options));
      }
    }
  }, [currentExercise]);


  const handleDragStart = (tile: DayTile, sourceIndex: number, sourceType: 'options' | 'slot') => {
    if (feedback) return;
    setDraggedItem({ tile, sourceIndex, sourceType });
  };

  const handleDrop = (targetIndex: number) => {
    if (!draggedItem || feedback) return;

    const newDaySlots = [...daySlots];
    const newAvailableDays = [...availableDays];
    const { tile: sourceTile, sourceType, sourceIndex } = draggedItem;

    const targetTile = newDaySlots[targetIndex];
    newDaySlots[targetIndex] = sourceTile;

    if (sourceType === 'options') newAvailableDays.splice(sourceIndex, 1);
    else newDaySlots[sourceIndex] = null;

    if (targetTile) {
      if (sourceType === 'slot') newDaySlots[sourceIndex] = targetTile;
      else newAvailableDays.push(targetTile);
    }
    
    setDaySlots(newDaySlots);
    setAvailableDays(shuffleArray(newAvailableDays));
    setDraggedItem(null);
  };

  const checkDragDropAnswer = () => {
    const isCorrect = daySlots.every((tile, index) => tile?.day === daysOfWeek[index]);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      playCorrectSound();
      onAnswer(true, 10);
    } else {
      playIncorrectSound();
      onAnswer(false, -5);
    }
  };

  const handleOptionClick = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    const isCorrect = option === currentExercise.correctAnswer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
     if (isCorrect) {
      playCorrectSound();
      onAnswer(true, 5);
    } else {
      playIncorrectSound();
      onAnswer(false, -2);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      setExercises(shuffleArray(daysOfWeekExercises));
      setCurrentExerciseIndex(0);
    }
  };
  
  const getButtonClass = (option: string) => {
    if (!feedback) return 'bg-white hover:bg-fuchsia-100 border-slate-300';
    if (option === currentExercise.correctAnswer) return 'bg-green-500 text-white border-green-700 transform scale-105';
    if (option === selectedOption) return 'bg-red-500 text-white border-red-700';
    return 'bg-gray-200 text-gray-500 border-gray-400';
  };

  const renderDragDrop = () => (
    <>
      <p className="text-2xl sm:text-3xl text-center text-slate-500 mb-6">اسْحَبْ كُلَّ يَوْمٍ إِلَى مَكَانِهِ الصَّحِيحِ.</p>
      {/* Answer Slots */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mb-6">
        {daySlots.map((tile, index) => {
          let displayTile = tile;
          if (showCorrectOrder) {
            // If showing correct answer, override with the correct day.
            displayTile = { id: index, day: daysOfWeek[index] };
          }
          return (
            <div
              key={index}
              onDrop={() => handleDrop(index)}
              onDragOver={(e) => e.preventDefault()}
              draggable={!!displayTile && !showCorrectOrder}
              onDragStart={() => displayTile && !showCorrectOrder && handleDragStart(displayTile, index, 'slot')}
              className={`p-4 min-h-[9rem] flex flex-col items-center justify-center rounded-xl border-4 border-dashed transition-all ${
                feedback && displayTile
                  ? showCorrectOrder
                    ? 'border-sky-500 bg-sky-50'
                    : displayTile.day === daysOfWeek[index]
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50 animate-shake'
                  : 'border-slate-300'
              } ${displayTile ? (showCorrectOrder ? 'bg-sky-50 cursor-default' : 'bg-white cursor-grab') : 'bg-slate-100'}`}
            >
              <span className="text-slate-400 font-bold text-lg">اَلْيَوْمُ {index + 1}</span>
              {displayTile && <span className="font-bold text-3xl text-fuchsia-700">{displayTile.day}</span>}
            </div>
          );
        })}
      </div>

      {/* Available Days */}
      <div className={`flex flex-wrap justify-center gap-4 bg-slate-100 p-4 rounded-lg min-h-[12rem] items-center transition-opacity ${showCorrectOrder ? 'opacity-0' : 'opacity-100'}`}>
        {availableDays.map((tile, index) => (
          <div
            key={tile.id}
            draggable={!showCorrectOrder}
            onDragStart={() => handleDragStart(tile, index, 'options')}
            className="px-10 py-5 bg-white rounded-xl shadow-md cursor-grab hover:shadow-lg hover:scale-105 transition-transform"
          >
            <span className="font-bold text-4xl text-slate-800">{tile.day}</span>
          </div>
        ))}
      </div>
      
      {!feedback && (
          <div className="text-center mt-6">
            <button onClick={checkDragDropAnswer} disabled={availableDays.length > 0} className="bg-fuchsia-500 text-white font-bold py-4 px-10 rounded-full hover:bg-fuchsia-600 transition-colors text-2xl disabled:bg-slate-300 disabled:cursor-not-allowed">
              تَحَقَّقْ مِنَ الْإِجَابَةِ
            </button>
          </div>
      )}
    </>
  );

  const renderMultipleChoice = () => (
      <>
        <p className="text-3xl sm:text-4xl text-center text-slate-700 font-semibold mb-8 bg-slate-100 p-8 rounded-lg">{currentExercise.prompt}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shuffledOptions.map(option => (
                <button key={option} onClick={() => handleOptionClick(option)} disabled={!!feedback} className={`p-8 text-4xl font-bold rounded-xl shadow-md transition-all duration-300 border-4 ${getButtonClass(option)}`}>
                    {option}
                </button>
            ))}
        </div>
      </>
  );


  if (!currentExercise) {
      return <div className="text-center p-10">...جَارِي تَحْضِيرُ التَّحَدِّي</div>;
  }

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-4 text-center">تَحَدِّي أَيَّامِ الْأُسْبُوعِ</h2>
      
      {currentExercise.type === DaysOfWeekExerciseType.ORDER_DRAG_DROP ? renderDragDrop() : renderMultipleChoice()}

      {/* Feedback and Actions */}
      {feedback && (
        <div className="text-center mt-6 animate-fade-in p-5 bg-slate-50 rounded-lg">
          <p className={`text-3xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
            {feedback === 'correct' ? correctMessage : `خَطَأٌ! ${currentExercise.type === DaysOfWeekExerciseType.MULTIPLE_CHOICE ? `اَلْإِجَابَةُ الصَّحِيحَةُ هِيَ "${currentExercise.correctAnswer}"` : 'حَاوِلْ مَرَّةً أُخْرَى.'}`}
          </p>

          {feedback === 'incorrect' && currentExercise.type === DaysOfWeekExerciseType.ORDER_DRAG_DROP && !showCorrectOrder && (
            <button
              onClick={() => setShowCorrectOrder(true)}
              className="bg-sky-500 text-white font-bold py-2 px-6 rounded-full hover:bg-sky-600 transition-colors text-lg mb-4"
            >
              أَرِنِي الْإِجَابَةَ الصَّحِيحَةَ
            </button>
          )}

          <button
            onClick={handleNext}
            className="bg-fuchsia-500 text-white font-bold py-3 px-8 rounded-full hover:bg-fuchsia-600 transition-colors text-xl"
          >
            السُّؤَالُ التَّالِي
          </button>
        </div>
      )}
    </div>
  );
};