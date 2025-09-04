/**
 * @file This file contains the "Crossword" exercise component.
 * It provides a classic crossword puzzle to test vocabulary and spelling.
 */

import React, { useState, useEffect, useRef } from 'react';
import { CrosswordClue } from '../types';
import { crosswordData } from '../data/arabicContent';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';

interface CrosswordExerciseProps {
  onAnswer: (isCorrect: boolean, score: number) => void;
}

type GridState = (string | null)[][];
type LockState = boolean[][];

export const CrosswordExercise: React.FC<CrosswordExerciseProps> = ({ onAnswer }) => {
  const [grid, setGrid] = useState<GridState>([]);
  const [locked, setLocked] = useState<LockState>([]);
  const [activeClue, setActiveClue] = useState<CrosswordClue | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);
  const [completedClues, setCompletedClues] = useState<number[]>([]);

  useEffect(() => {
    const { size } = crosswordData;
    const initialGrid: GridState = Array(size).fill(null).map(() => Array(size).fill(null));
    const initialLock: LockState = Array(size).fill(false).map(() => Array(size).fill(false));
    inputRefs.current = Array(size).fill(null).map(() => Array(size).fill(null));
    setGrid(initialGrid);
    setLocked(initialLock);
    setActiveClue(crosswordData.clues[0]);
  }, []);

  const handleCellClick = (row: number, col: number) => {
    const clickedClue = crosswordData.clues.find(clue => {
      if (clue.direction === 'across') {
        return row === clue.row && col >= clue.col && col < clue.col + clue.answer.length;
      } else { // down
        return col === clue.col && row >= clue.row && row < clue.row + clue.answer.length;
      }
    });
    if (clickedClue) {
      setActiveClue(clickedClue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const value = e.target.value.slice(-1); // Only take the last character
    const newGrid = [...grid];
    newGrid[row][col] = value;
    setGrid(newGrid);

    // Auto-focus next input
    if (value && activeClue) {
      let nextRow = row;
      let nextCol = col;
      if (activeClue.direction === 'across') {
        nextCol++;
      } else {
        nextRow++;
      }
      if (
        nextRow < crosswordData.size &&
        nextCol < crosswordData.size &&
        inputRefs.current[nextRow] &&
        inputRefs.current[nextRow][nextCol]
      ) {
        inputRefs.current[nextRow][nextCol]?.focus();
      } else {
         checkClueCompletion(activeClue);
      }
    }
  };
  
  const checkClueCompletion = (clue: CrosswordClue) => {
      let word = '';
      if (clue.direction === 'across') {
          for (let i = 0; i < clue.answer.length; i++) {
              word += grid[clue.row][clue.col + i] || '';
          }
      } else {
          for (let i = 0; i < clue.answer.length; i++) {
              word += grid[clue.row + i][clue.col] || '';
          }
      }

      if (word.length === clue.answer.length) {
          if (word === clue.answer) {
              if (!completedClues.includes(clue.number)) {
                  playCorrectSound();
                  onAnswer(true, 1);
                  setCompletedClues(prev => [...prev, clue.number]);
                  // Lock the cells
                  const newLocked = [...locked];
                  if (clue.direction === 'across') {
                      for (let i = 0; i < clue.answer.length; i++) newLocked[clue.row][clue.col + i] = true;
                  } else {
                      for (let i = 0; i < clue.answer.length; i++) newLocked[clue.row + i][clue.col] = true;
                  }
                  setLocked(newLocked);
              }
          } else {
              playIncorrectSound();
              onAnswer(false, -0.5);
          }
      }
  };

  const isCellPartOfClue = (row: number, col: number, clue: CrosswordClue) => {
    if (clue.direction === 'across') {
      return row === clue.row && col >= clue.col && col < clue.col + clue.answer.length;
    }
    return col === clue.col && row >= clue.row && row < clue.row + clue.answer.length;
  };
  
  const allClues = crosswordData.clues;
  const isComplete = completedClues.length === allClues.length;

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col lg:flex-row gap-8">
      {/* Grid */}
      <div className="flex-grow">
          <h2 className="text-4xl font-bold text-slate-700 mb-4 text-center">الْكَلِمَاتُ الْمُتَقَاطِعَةُ</h2>
          <div dir="rtl" style={{ display: 'grid', gridTemplateColumns: `repeat(${crosswordData.size}, 1fr)`, gap: '4px' }}>
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const isPartOfAnyClue = allClues.some(clue => isCellPartOfClue(r, c, clue));
                if (!isPartOfAnyClue) {
                  return <div key={`${r}-${c}`} className="aspect-square bg-slate-700 rounded-sm"></div>;
                }
                const clueNumber = allClues.find(clue => clue.row === r && clue.col === c)?.number;
                const isLocked = locked[r]?.[c];

                return (
                  <div key={`${r}-${c}`} className="relative aspect-square">
                    {clueNumber && <span className="absolute top-0 right-1 text-xs text-slate-500 font-bold">{clueNumber}</span>}
                    <input
                      ref={el => { if(inputRefs.current[r]) inputRefs.current[r][c] = el }}
                      type="text"
                      value={cell || ''}
                      onChange={(e) => handleInputChange(e, r, c)}
                      onClick={() => handleCellClick(r, c)}
                      maxLength={1}
                      disabled={isLocked}
                      className={`w-full h-full text-center text-xl sm:text-2xl font-bold rounded-sm border-2 ${activeClue && isCellPartOfClue(r, c, activeClue) ? 'border-sky-500 bg-sky-100' : 'border-slate-300'} ${isLocked ? 'bg-green-200 text-green-800' : 'bg-white'}`}
                    />
                  </div>
                );
              })
            )}
          </div>
          {isComplete && <div className="text-center mt-4 p-4 bg-green-100 text-green-700 font-bold rounded-lg">أَحْسَنْتَ! لَقَدْ أَكْمَلْتَ الشَّبَكَةَ بِنَجَاحٍ!</div>}
      </div>
      
      {/* Clues */}
      <div className="w-full lg:w-80 flex-shrink-0">
          <div className="mb-4">
              <h3 className="text-2xl font-bold text-slate-600 border-b-2 border-slate-200 pb-2 mb-2">أُفُقِيٌّ</h3>
              {allClues.filter(c => c.direction === 'across').map(clue => (
                  <div key={clue.number} onClick={() => setActiveClue(clue)} className={`p-2 rounded cursor-pointer ${activeClue?.number === clue.number ? 'bg-sky-100' : ''} ${completedClues.includes(clue.number) ? 'line-through text-slate-400' : ''}`}>
                      <strong>{clue.number}.</strong> {clue.clue}
                  </div>
              ))}
          </div>
          <div>
              <h3 className="text-2xl font-bold text-slate-600 border-b-2 border-slate-200 pb-2 mb-2">رَأْسِيٌّ</h3>
              {allClues.filter(c => c.direction === 'down').map(clue => (
                  <div key={clue.number} onClick={() => setActiveClue(clue)} className={`p-2 rounded cursor-pointer ${activeClue?.number === clue.number ? 'bg-sky-100' : ''} ${completedClues.includes(clue.number) ? 'line-through text-slate-400' : ''}`}>
                      <strong>{clue.number}.</strong> {clue.clue}
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};