/**
 * @file This file contains the "Word Hunter" (صَائِدُ الْكَلِمَاتِ) exercise component.
 * This version features multiple, user-selectable levels with increasing grid dimensions.
 * Each level now contains a series of multiple exercises (word grids) to complete.
 * The letter cells have been enlarged for better usability.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { wordHunterLevels, arabicLetters } from '../data/arabicContent';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';

interface WordHunterExerciseProps {
  onAnswer: (isCorrect: boolean, score: number) => void;
}

interface Cell {
  row: number;
  col: number;
}

// Level configuration mapping grid sizes to the words for that level.
const levelConfigs = [
  { level: 1, gridSize: 3, exercises: wordHunterLevels[0] },
  { level: 2, gridSize: 5, exercises: wordHunterLevels[1] },
  { level: 3, gridSize: 6, exercises: wordHunterLevels[2] },
  { level: 4, gridSize: 7, exercises: wordHunterLevels[3] },
];

export const WordHunterExercise: React.FC<WordHunterExerciseProps> = ({ onAnswer }) => {
  const [gamePhase, setGamePhase] = useState<'level_select' | 'playing' | 'level_complete' | 'game_complete'>('level_select');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  
  // Game state for the current exercise
  const [grid, setGrid] = useState<string[][]>([]);
  const [wordsToFind, setWordsToFind] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCells, setFoundCells] = useState<Cell[]>([]);
  
  // User interaction state
  const [selection, setSelection] = useState<Cell[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [feedbackCells, setFeedbackCells] = useState<Cell[]>([]);

  const generateGrid = useCallback((gridSize: number, words: string[]) => {
    let newGrid: (string | null)[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
    const directions = [
        { r: 0, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 0 }, { r: 1, c: -1 },
        { r: 0, c: -1 }, { r: -1, c: -1 }, { r: -1, c: 0 }, { r: -1, c: 1 }
    ];

    words.forEach(word => {
        let placed = false;
        for (let attempt = 0; attempt < 100; attempt++) {
            const wordLetters = Math.random() > 0.5 ? Array.from(word) : Array.from(word).reverse();
            const dir = directions[Math.floor(Math.random() * directions.length)];
            const startRow = Math.floor(Math.random() * gridSize);
            const startCol = Math.floor(Math.random() * gridSize);
            const endRow = startRow + dir.r * (wordLetters.length - 1);
            const endCol = startCol + dir.c * (wordLetters.length - 1);

            if (endRow >= 0 && endRow < gridSize && endCol >= 0 && endCol < gridSize) {
                let canPlace = true;
                for (let i = 0; i < wordLetters.length; i++) {
                    const r = startRow + i * dir.r;
                    const c = startCol + i * dir.c;
                    if (newGrid[r][c] !== null && newGrid[r][c] !== wordLetters[i]) {
                        canPlace = false;
                        break;
                    }
                }
                
                if (canPlace) {
                    for (let i = 0; i < wordLetters.length; i++) {
                        const r = startRow + i * dir.r;
                        const c = startCol + i * dir.c;
                        newGrid[r][c] = wordLetters[i];
                    }
                    placed = true;
                    break;
                }
            }
        }
        if(!placed) console.warn(`Could not place word: ${word}`);
    });
    
    const finalGrid = newGrid.map(row => row.map(cell => 
        cell === null ? arabicLetters[Math.floor(Math.random() * arabicLetters.length)] : cell
    ));

    setGrid(finalGrid as string[][]);
  }, []);

  const setupExercise = (levelIndex: number, exerciseIndex: number) => {
    const config = levelConfigs[levelIndex];
    const exerciseWords = config.exercises[exerciseIndex];
    if (!config || !exerciseWords) return;

    setWordsToFind(exerciseWords);
    setFoundWords([]);
    // Keep foundCells from previous exercises for a sense of overall completion, or reset it. Let's reset.
    setFoundCells([]);
    setSelection([]);
    generateGrid(config.gridSize, exerciseWords);
  };
  
  const handleSelectLevel = (levelIndex: number) => {
    setCurrentLevel(levelIndex);
    setCurrentExerciseIndex(0);
    setupExercise(levelIndex, 0);
    setGamePhase('playing');
  }
  
  const checkSelection = (selectedCells: Cell[]) => {
    if (selectedCells.length < 2) return;
    const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');
    const selectedWordReversed = [...selectedWord].reverse().join('');
    
    const wordToFind = wordsToFind.find(w => (w === selectedWord || w === selectedWordReversed) && !foundWords.includes(w));

    if (wordToFind) {
      playCorrectSound();
      onAnswer(true, 10);
      setFoundWords(prev => [...prev, wordToFind]);
      setFoundCells(prev => [...prev, ...selectedCells]);
    } else {
      playIncorrectSound();
      onAnswer(false, -2);
      setFeedbackCells(selectedCells);
      setTimeout(() => {
        setFeedbackCells([]);
      }, 500);
    }
  };
  
  useEffect(() => {
      if (gamePhase === 'playing' && wordsToFind.length > 0 && foundWords.length === wordsToFind.length) {
          setTimeout(() => {
              const levelConfig = levelConfigs[currentLevel];
              const nextExerciseIndex = currentExerciseIndex + 1;
              if (nextExerciseIndex < levelConfig.exercises.length) {
                  setCurrentExerciseIndex(nextExerciseIndex);
                  setupExercise(currentLevel, nextExerciseIndex);
              } else {
                  setGamePhase('level_complete');
              }
          }, 1200);
      }
  }, [foundWords, wordsToFind, gamePhase, currentLevel, currentExerciseIndex, setupExercise]);

  const handleMouseDown = (cell: Cell) => {
    if (gamePhase !== 'playing') return;
    setIsSelecting(true);
    setSelection([cell]);
  };
  
  const handleMouseOver = (cell: Cell) => {
    if (!isSelecting) return;
    const start = selection[0];
    const path: Cell[] = [start];
    const dRow = Math.sign(cell.row - start.row);
    const dCol = Math.sign(cell.col - start.col);

    if (Math.abs(cell.row - start.row) !== Math.abs(cell.col - start.col) && dRow !== 0 && dCol !== 0) {
      return; 
    }
    
    let r = start.row + dRow;
    let c = start.col + dCol;

    while(true){
      if (r < 0 || r >= grid.length || c < 0 || c >= grid.length) break;
      path.push({row: r, col: c});
      if(r === cell.row && c === cell.col) break;
      r += dRow;
      c += dCol;
    }
    setSelection(path);
  };
  
  const handleMouseUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);
    checkSelection(selection);
    setSelection([]);
  };
  
  const getCellClass = (cell: Cell) => {
    const isSelected = selection.some(s => s.row === cell.row && s.col === cell.col);
    const isFound = foundCells.some(s => s.row === cell.row && s.col === cell.col);
    const isFeedback = feedbackCells.some(s => s.row === cell.row && s.col === cell.col);

    if (isFeedback) return 'bg-red-400 text-white';
    if (isFound) return 'bg-green-400 text-white';
    if (isSelected) return 'bg-orange-300';
    return 'bg-white hover:bg-orange-100';
  };

  const getCellSizeClass = (gridSize: number) => {
    if (gridSize <= 3) return 'w-28 h-28 text-6xl';
    if (gridSize <= 5) return 'w-24 h-24 text-5xl';
    if (gridSize <= 6) return 'w-20 h-20 text-4xl';
    return 'w-16 h-16 text-3xl'; // For 7x7
  };

  if (gamePhase === 'level_select') {
      return (
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-slate-700 mb-2">صَائِدُ الْكَلِمَاتِ</h2>
            <p className="text-2xl text-slate-500 mb-6">اخْتَرِ الْمُسْتَوَى لِتَبْدَأَ:</p>
            <div className="grid grid-cols-2 gap-4">
              {levelConfigs.map((config, index) => (
                <button 
                  key={config.level} 
                  onClick={() => handleSelectLevel(index)} 
                  className="p-6 rounded-2xl text-white font-bold text-2xl flex flex-col items-center justify-center gap-2 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 bg-orange-500"
                >
                  <span>الْمُسْتَوَى {config.level}</span>
                  <span className="text-lg opacity-80">{config.gridSize}x{config.gridSize}</span>
                </button>
              ))}
            </div>
        </div>
      );
  }

  if (gamePhase === 'level_complete') {
      const isLastLevel = currentLevel + 1 >= levelConfigs.length;
      return (
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-green-600 mb-2">🎉 مُسْتَوًى مُكْتَمِلٌ! 🎉</h2>
            <p className="text-2xl text-slate-500 mb-4">أَحْسَنْتَ! لَقَدْ أَكْمَلْتَ جَمِيعَ تَمَارِينِ الْمُسْتَوَى {currentLevel + 1}.</p>
            <div className="flex flex-col gap-4">
               <button onClick={() => handleSelectLevel(currentLevel)} className="w-full text-white font-bold py-3 px-8 rounded-full text-xl hover:scale-105 transition-transform bg-orange-500 hover:bg-orange-600">
                  إِعَادَةُ الْمُسْتَوَى
               </button>
               <button onClick={() => setGamePhase('level_select')} className="w-full text-slate-700 bg-slate-200 font-bold py-3 px-8 rounded-full text-xl hover:scale-105 transition-transform hover:bg-slate-300">
                  اخْتَرِ مُسْتَوًى آخَرَ
               </button>
            </div>
        </div>
      );
  }
  
  if (grid.length === 0) {
    return <div className="text-center p-10">...جَارِي تَحْضِيرُ الشَّبَكَةِ</div>;
  }
  
  const { gridSize, exercises } = levelConfigs[currentLevel];
  const cellSizeClass = getCellSizeClass(gridSize);

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 flex-shrink-0 order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-slate-700 mb-3">الْكَلِمَاتُ الْمَطْلُوبَةُ:</h3>
            <ul className="space-y-2">
                {wordsToFind.map(word => (
                    <li key={word} className={`text-4xl font-bold transition-all ${foundWords.includes(word) ? 'text-green-500 line-through' : 'text-red-600'}`}>
                        {word}
                    </li>
                ))}
            </ul>
        </div>
        <div className="flex-grow order-1 lg:order-2" onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-700 mb-4 text-center">
              الْمُسْتَوَى {currentLevel + 1} - التَّمْرِينُ {currentExerciseIndex + 1}/{exercises.length}
            </h2>
            <div 
              className="grid gap-1 p-2 bg-slate-200 rounded-lg select-none mx-auto"
              style={{ direction: 'rtl', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, width: 'max-content' }}
            >
              {grid.map((row, rIndex) => 
                row.map((letter, cIndex) => {
                  const cell = { row: rIndex, col: cIndex };
                  return (
                    <div 
                      key={`${rIndex}-${cIndex}`}
                      onMouseDown={() => handleMouseDown(cell)}
                      onMouseOver={() => handleMouseOver(cell)}
                      className={`flex items-center justify-center font-bold rounded-md cursor-pointer transition-colors ${cellSizeClass} ${getCellClass(cell)}`}
                    >
                      {letter}
                    </div>
                  );
                })
              )}
            </div>
        </div>
    </div>
  );
};