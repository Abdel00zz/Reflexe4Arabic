/**
 * @file This file contains the "Word Hunter" (صَائِدُ الْكَلِمَاتِ) exercise component.
 * Inspired by selective attention exercises, this game requires the user to find a hidden word
 * within a grid of letters, strengthening focus and pattern recognition skills.
 * This version features dynamic grid generation, vocalized letters, and a hint system.
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { WordHunterQuestion } from '../types';
import { wordHunterQuestions, arabicLetters } from '../data/arabicContent';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';
import { FaSearch } from 'react-icons/fa';

interface WordHunterExerciseProps {
  onAnswer: (isCorrect: boolean, score: number) => void;
}

interface Cell {
  row: number;
  col: number;
}

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const correctFeedbackMessages = ['صَيْدٌ ثَمِينٌ! 🎯', 'أَحْسَنْتَ! 👍', 'عَيْنَاكَ كَالصَّقْرِ! 🦅', 'مُمْتَازٌ! ⭐'];
const GRID_SIZE = 5;
const HINT_THRESHOLD = 2; // Show hint after this many incorrect attempts

export const WordHunterExercise: React.FC<WordHunterExerciseProps> = ({ onAnswer }) => {
  const [questions, setQuestions] = useState<WordHunterQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selection, setSelection] = useState<Cell[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [grid, setGrid] = useState<string[][]>([]);
  const [solutionPath, setSolutionPath] = useState<Cell[]>([]);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray(wordHunterQuestions));
  }, []);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const correctMessage = useMemo(() => correctFeedbackMessages[Math.floor(Math.random() * correctFeedbackMessages.length)], [currentQuestionIndex]);
  
  const generateGrid = useCallback((word: string) => {
    const letters = Array.from(word);
    const newGrid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    let placed = false;
    
    // Attempt to place the word randomly up to 100 times
    for (let attempt = 0; attempt < 100; attempt++) {
        const path: Cell[] = [];
        const reversed = Math.random() > 0.5;
        const wordLetters = reversed ? [...letters].reverse() : letters;
        const direction = Math.floor(Math.random() * 8); // 8 directions
        
        // [E, SE, S, SW, W, NW, N, NE]
        const dr = [0, 1, 1, 1, 0, -1, -1, -1];
        const dc = [1, 1, 0, -1, -1, -1, 0, 1];

        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);

        const endRow = row + dr[direction] * (wordLetters.length - 1);
        const endCol = col + dc[direction] * (wordLetters.length - 1);

        if (endRow >= 0 && endRow < GRID_SIZE && endCol >= 0 && endCol < GRID_SIZE) {
            for (let i = 0; i < wordLetters.length; i++) {
                const r = row + i * dr[direction];
                const c = col + i * dc[direction];
                newGrid[r][c] = wordLetters[i];
                path.push({ row: r, col: c });
            }
            setSolutionPath(path);
            placed = true;
            break;
        }
    }
    
    // Failsafe if random placement fails
    if (!placed) {
        const path: Cell[] = [];
        for (let i = 0; i < letters.length && i < GRID_SIZE; i++) {
            newGrid[0][i] = letters[i];
            path.push({ row: 0, col: i });
        }
        setSolutionPath(path);
    }

    // Fill the rest of the grid with random vocalized letters
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (newGrid[r][c] === '') {
                newGrid[r][c] = arabicLetters[Math.floor(Math.random() * arabicLetters.length)];
            }
        }
    }
    setGrid(newGrid);
  }, []);

  useEffect(() => {
    if (currentQuestion) {
      generateGrid(currentQuestion.word);
      setSelection([]);
      setIsSelecting(false);
      setFeedback(null);
      setIncorrectAttempts(0);
      setShowSolution(false);
    }
  }, [currentQuestion, generateGrid]);

  const checkSelection = (selectedCells: Cell[]) => {
    if (selectedCells.length < 2) return;
    const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');
    
    // Since the word is placed programmatically, we can derive the correct word from the solution path
    const correctWord = solutionPath.map(cell => grid[cell.row][cell.col]).join('');
    const correctWordReversed = [...solutionPath].reverse().map(cell => grid[cell.row][cell.col]).join('');

    if (selectedWord === correctWord || selectedWord === correctWordReversed) {
      setFeedback('correct');
      playCorrectSound();
      onAnswer(true, 10);
    } else {
      setFeedback('incorrect');
      playIncorrectSound();
      onAnswer(false, -2);
      setIncorrectAttempts(prev => prev + 1);
      setTimeout(() => {
        setFeedback(null);
        setSelection([]);
      }, 1000);
    }
  };

  const handleMouseDown = (cell: Cell) => {
    if (feedback || showSolution) return;
    setIsSelecting(true);
    setSelection([cell]);
  };
  
  const handleMouseOver = (cell: Cell) => {
    if (!isSelecting || feedback || showSolution) return;
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
      path.push({row: r, col: c});
      if(r === cell.row && c === cell.col) break;
      r += dRow;
      c += dCol;
    }
    setSelection(path);
  };
  
  const handleMouseUp = () => {
    if (!isSelecting || feedback) return;
    setIsSelecting(false);
    checkSelection(selection);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuestions(shuffleArray(wordHunterQuestions));
      setCurrentQuestionIndex(0);
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    onAnswer(false, -5); // Penalty for using hint
    setFeedback(null);
  };
  
  const isCellSelected = (cell: Cell) => selection.some(s => s.row === cell.row && s.col === cell.col);
  const isCellInSolution = (cell: Cell) => solutionPath.some(s => s.row === cell.row && s.col === cell.col);

  if (!currentQuestion || grid.length === 0) {
    return <div className="text-center p-10">...جَارِي تَحْضِيرُ الشَّبَكَةِ</div>;
  }
  
  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-4 sm:p-6" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-4 text-center">صَائِدُ الْكَلِمَاتِ</h2>
        <p className="text-2xl sm:text-3xl text-center text-slate-600 mb-6">اِبْحَثْ عَنْ كَلِمَةِ: <span className="font-bold text-orange-500">{currentQuestion.word}</span></p>

        <div 
          className="grid grid-cols-5 gap-1 p-2 bg-slate-200 rounded-lg select-none"
          style={{ direction: 'rtl' }}
        >
          {grid.map((row, rIndex) => 
            row.map((letter, cIndex) => {
              const cell = { row: rIndex, col: cIndex };
              const isSelected = isCellSelected(cell);
              const isInSolution = isCellInSolution(cell);
              
              let cellClass = 'bg-white hover:bg-orange-100';
              if (showSolution && isInSolution) cellClass = 'bg-yellow-400';
              if (isSelected) cellClass = 'bg-orange-300';
              if (feedback === 'correct' && isSelected) cellClass = 'bg-green-400 text-white';
              if (feedback === 'incorrect' && isSelected) cellClass = 'bg-red-400 text-white';
              
              return (
                <div 
                  key={`${rIndex}-${cIndex}`}
                  onMouseDown={() => handleMouseDown(cell)}
                  onMouseOver={() => handleMouseOver(cell)}
                  className={`flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 text-4xl sm:text-5xl font-bold rounded-md cursor-pointer transition-colors ${cellClass}`}
                >
                  {letter}
                </div>
              );
            })
          )}
        </div>
        
        {feedback === 'correct' || showSolution ? (
            <div className={`text-center animate-fade-in mt-4 p-4 sm:p-5 ${showSolution ? 'bg-yellow-50' : 'bg-green-50'} rounded-lg`}>
                {feedback === 'correct' && <p className="text-3xl sm:text-4xl font-bold mb-4 text-green-600">{correctMessage}</p>}
                {showSolution && <p className="text-3xl sm:text-4xl font-bold mb-4 text-yellow-600">هَذِهِ هِيَ الْكَلِمَةُ!</p>}
                <button onClick={handleNextQuestion} className="mt-4 bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-colors text-2xl">
                    الْكَلِمَةُ التَّالِيَةُ
                </button>
            </div>
        ) : (
            <div className="text-center mt-6 h-14">
                {incorrectAttempts >= HINT_THRESHOLD && !feedback && !showSolution && (
                    <button 
                        onClick={handleShowSolution}
                        className="animate-fade-in bg-yellow-400 text-yellow-900 font-bold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition-colors flex items-center gap-2 text-lg mx-auto"
                    >
                        <FaSearch />
                        <span>إِظْهَارُ الْحَلِّ</span>
                    </button>
                )}
            </div>
        )}
    </div>
  );
};