/**
 * @file This file contains the Crossword exercise component.
 * It provides a classic crossword puzzle where users fill in a grid based on clues.
 * This is a more advanced exercise for developing vocabulary and critical thinking.
 */

import React, { useState, useEffect, useRef } from 'react';
import { CrosswordData, CrosswordClue } from '../types';
import { crosswordData } from '../data/arabicContent';

// Props interface for the component.
interface CrosswordExerciseProps {
  onComplete: (score: number) => void; // Callback to update the total score.
}

// Type definition for the grid state: a 2D array of strings or nulls.
type GridState = (string | null)[][];

export const CrosswordExercise: React.FC<CrosswordExerciseProps> = ({ onComplete }) => {
  // State to hold the current state of the crossword grid.
  const [grid, setGrid] = useState<GridState>([]);
  // State to track the currently selected clue.
  const [activeClue, setActiveClue] = useState<CrosswordClue | null>(null);
  // State to track if the puzzle has been successfully completed.
  const [isComplete, setIsComplete] = useState(false);
  // Ref to hold references to all the input elements in the grid for focus management.
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  // Effect to initialize the grid when the component mounts.
  useEffect(() => {
    // Create an empty grid filled with nulls.
    const newGrid = Array(crosswordData.size).fill(null).map(() => Array(crosswordData.size).fill(null));
    // Populate the grid with empty strings for cells that are part of a clue.
    crosswordData.clues.forEach(clue => {
      for (let i = 0; i < clue.answer.length; i++) {
        if (clue.direction === 'across') {
          newGrid[clue.row][clue.col + i] = '';
        } else {
          newGrid[clue.row + i][clue.col] = '';
        }
      }
    });
    setGrid(newGrid);
    // Initialize the refs array with the same dimensions.
    inputRefs.current = Array(crosswordData.size).fill(null).map(() => Array(crosswordData.size).fill(null));
  }, []);

  /**
   * Checks if all answers in the grid are correct.
   */
  const checkCompletion = () => {
    for (const clue of crosswordData.clues) {
      let userAnswer = '';
      for (let i = 0; i < clue.answer.length; i++) {
        userAnswer += clue.direction === 'across' ? grid[clue.row][clue.col + i] : grid[clue.row + i][clue.col];
      }
      // If any answer is incorrect, stop checking.
      if (userAnswer.toLowerCase() !== clue.answer.toLowerCase()) {
        // Here you could add feedback for incorrect answers.
        return;
      }
    }
    // If all answers are correct, mark as complete and award points.
    setIsComplete(true);
    onComplete(50);
  };
  
  /**
   * Handles changes to an input cell in the grid.
   * @param {number} row - The row of the changed cell.
   * @param {number} col - The column of the changed cell.
   * @param {string} value - The new value (a single letter).
   */
  const handleInputChange = (row: number, col: number, value: string) => {
    if (isComplete || value.length > 1) return;
    const newGrid = [...grid];
    newGrid[row][col] = value;
    setGrid(newGrid);

    // Auto-focus the next cell in the active clue's direction.
    if(value && activeClue) {
      if (activeClue.direction === 'across' && col < crosswordData.size - 1) {
        inputRefs.current[row][col+1]?.focus();
      } else if (activeClue.direction === 'down' && row < crosswordData.size - 1) {
        inputRefs.current[row+1][col]?.focus();
      }
    }
  };
  
  /**
   * Sets the active clue when a user clicks on a cell.
   * @param {number} row - The row of the clicked cell.
   * @param {number} col - The column of the clicked cell.
   */
  const handleCellClick = (row: number, col: number) => {
      // Find the clue associated with the clicked cell.
      const clue = crosswordData.clues.find(c => {
          if (c.direction === 'across') {
              return c.row === row && col >= c.col && col < c.col + c.answer.length;
          }
          return c.col === col && row >= c.row && row < c.row + c.answer.length;
      });
      setActiveClue(clue || null);
  }

  return (
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-2 sm:p-8 flex flex-col lg:flex-row gap-4 sm:gap-8">
      {/* Left side: Crossword Grid */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-700 mb-4 sm:mb-6 text-center">الْكَلِمَاتُ الْمُتَقَاطِعَةُ</h2>
        <div className="grid gap-0.5 sm:gap-1 bg-slate-800 p-1 sm:p-2 rounded-lg" style={{ gridTemplateColumns: `repeat(${crosswordData.size}, 1fr)` }}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              // Non-playable cells are rendered as solid blocks.
              if (cell === null) {
                return <div key={`${rowIndex}-${colIndex}`} className="aspect-square bg-slate-800" />;
              }
              const clueNumber = crosswordData.clues.find(c => c.row === rowIndex && c.col === colIndex)?.number;
              return (
                <div key={`${rowIndex}-${colIndex}`} className="relative aspect-square bg-white">
                  {clueNumber && <span className="absolute top-0 right-0.5 text-[8px] sm:text-xs font-bold text-slate-500">{clueNumber}</span>}
                  <input
                    ref={el => { inputRefs.current[rowIndex][colIndex] = el; }}
                    type="text"
                    maxLength={1}
                    value={cell || ''}
                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className="w-full h-full text-center text-xl sm:text-2xl md:text-4xl font-bold bg-transparent outline-none focus:bg-amber-100"
                    disabled={isComplete}
                  />
                </div>
              );
            })
          )}
        </div>
         <div className="text-center mt-4 sm:mt-6">
            <button onClick={checkCompletion} disabled={isComplete} className="bg-slate-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-slate-800 transition-colors text-lg sm:text-xl disabled:bg-slate-400">
              {isComplete ? 'أَحْسَنْتَ!' : 'تَحَقَّقْ مِنَ الْإِجَابَاتِ'}
            </button>
        </div>
      </div>
      {/* Right side: Clue List */}
      <div className="w-full lg:w-1/3 bg-slate-50 p-4 sm:p-6 rounded-lg max-h-[40vh] lg:max-h-full overflow-y-auto">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-600">الْأَلْغَازُ:</h3>
        <div className="space-y-4 text-sm sm:text-base">
          <div>
            <h4 className="font-bold text-slate-800">أُفُقِيًّا:</h4>
            <ul className="list-inside list-disc text-slate-600 space-y-1">
              {crosswordData.clues.filter(c => c.direction === 'across').map(clue => <li key={clue.number} className={`p-1 rounded ${activeClue?.number === clue.number ? 'bg-amber-200' : ''}`}>{clue.number}. {clue.clue}</li>)}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-bold text-slate-800">عَمُودِيًّا:</h4>
            <ul className="list-inside list-disc text-slate-600 space-y-1">
              {crosswordData.clues.filter(c => c.direction === 'down').map(clue => <li key={clue.number} className={`p-1 rounded ${activeClue?.number === clue.number ? 'bg-amber-200' : ''}`}>{clue.number}. {clue.clue}</li>)}
            </ul>
          </div>
        </div>
      </div>
      {/* Completion Overlay */}
      {isComplete && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center animate-fade-in">
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl text-center">
                <p className="text-4xl sm:text-5xl mb-4">🎉</p>
                <h2 className="text-3xl sm:text-4xl font-black text-green-600">عَمَلٌ مُذْهِلٌ!</h2>
                <p className="text-lg sm:text-xl text-slate-600 mt-2">لَقَدْ حَلَلْتَ لُغْزَ الْكَلِمَاتِ الْمُتَقَاطِعَةِ!</p>
            </div>
        </div>
      )}
    </div>
  );
};