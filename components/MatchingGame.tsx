/**
 * @file This file contains the "Matching Game" (Memory Cards) component.
 * This version allows the user to select a difficulty level from the start.
 * Each level now consists of multiple exercises that the user progresses through.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { MatchingPair } from '../types';
import { matchingLevels, MatchingLevel } from '../data/arabicContent';

// Props interface for the component.
interface MatchingGameProps {
  onAnswer: (isCorrect: boolean, score: number) => void;
}

// Extended interface for a card in the game, including its state.
interface Card {
    id: number; // The pair ID, used for matching.
    instanceId: number; // A unique ID for this specific card instance on the board.
    type: 'word' | 'emoji';
    content: string; // The word or the emoji character.
    isFlipped: boolean;
    isMatched: boolean;
}

// A utility function to shuffle an array.
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const MatchingGame: React.FC<MatchingGameProps> = ({ onAnswer }) => {
    // State to manage the overall game phase.
    const [gamePhase, setGamePhase] = useState<'level_select' | 'study' | 'match' | 'level_complete'>('level_select');
    // State for the current level index.
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    // State for the current exercise index within a level.
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    // State to hold the array of cards for the game.
    const [cards, setCards] = useState<Card[]>([]);
    // State to track the user's current selection.
    const [selection, setSelection] = useState<number[]>([]);
    // State to prevent user clicks while a pair is being checked.
    const [isChecking, setIsChecking] = useState(false);
    // State for the countdown timer during the study phase.
    const [studyTimer, setStudyTimer] = useState(0);
    // State to count the number of moves (a move is flipping two cards).
    const [moves, setMoves] = useState(0);

    const levelConfig = useMemo(() => matchingLevels[currentLevelIndex], [currentLevelIndex]);
    
    /**
     * Sets up or resets the game board for a specific exercise within a level.
     */
    const setupExercise = (levelIdx: number, exerciseIdx: number) => {
        const config = matchingLevels[levelIdx];
        const exercisePairs = config.exercises[exerciseIdx];
        if (!config || !exercisePairs) return;

        const gameCards: Card[] = [];
        exercisePairs.forEach(pair => {
            gameCards.push({
                id: pair.id, instanceId: gameCards.length, type: 'word', content: pair.word, isFlipped: true, isMatched: false,
            });
            gameCards.push({
                id: pair.id, instanceId: gameCards.length, type: 'emoji', content: pair.emoji, isFlipped: true, isMatched: false,
            });
        });
        
        setCards(shuffleArray(gameCards));
        setSelection([]);
        setIsChecking(false);
        setMoves(0);
        setStudyTimer(config.studyTime);
        setGamePhase('study');
    }
    
    const handleSelectLevel = (levelIdx: number) => {
        setCurrentLevelIndex(levelIdx);
        setCurrentExerciseIndex(0);
        setupExercise(levelIdx, 0);
    }

    // Effect to handle the countdown for the study phase.
    useEffect(() => {
        if (gamePhase === 'study') {
            if (studyTimer > 0) {
                const timer = setTimeout(() => setStudyTimer(prev => prev - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setCards(prev => prev.map(c => ({...c, isFlipped: false})));
                setGamePhase('match');
            }
        }
    }, [gamePhase, studyTimer]);

    // Core effect for game logic when a pair is selected.
    useEffect(() => {
        if (selection.length < 2) return;

        setIsChecking(true);
        const timer = setTimeout(() => {
            const [firstId, secondId] = selection;
            const firstCard = cards.find(c => c.instanceId === firstId);
            const secondCard = cards.find(c => c.instanceId === secondId);

            if (firstCard && secondCard && firstCard.id === secondCard.id) {
                onAnswer(true, 20);
                setCards(prev => prev.map(card => (card.instanceId === firstId || card.instanceId === secondId) ? { ...card, isMatched: true } : card));
            } else {
                onAnswer(false, 0);
                setTimeout(() => {
                    setCards(prev => prev.map(card => (card.instanceId === firstId || card.instanceId === secondId) ? { ...card, isFlipped: false } : card));
                }, 1200);
            }
            setSelection([]);
            setTimeout(() => setIsChecking(false), 200);
        }, 500);

        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selection]);
    
    // Effect to check for exercise/level completion.
    useEffect(() => {
        if (cards.length > 0 && gamePhase === 'match' && cards.every(card => card.isMatched)) {
            setTimeout(() => {
                const nextExerciseIndex = currentExerciseIndex + 1;
                if (nextExerciseIndex < levelConfig.exercises.length) {
                    setCurrentExerciseIndex(nextExerciseIndex);
                    setupExercise(currentLevelIndex, nextExerciseIndex);
                } else {
                    setGamePhase('level_complete');
                }
            }, 1200); // Wait a bit to show the completed board
        }
    }, [cards, gamePhase, currentExerciseIndex, currentLevelIndex, levelConfig]);

    const handleCardClick = (cardInstanceId: number) => {
        const clickedCard = cards.find(c => c.instanceId === cardInstanceId);
        if (gamePhase !== 'match' || isChecking || !clickedCard || clickedCard.isMatched || clickedCard.isFlipped) {
            return;
        }

        setCards(prev => prev.map(card => card.instanceId === cardInstanceId ? { ...card, isFlipped: true } : card));
        const newSelection = [...selection, cardInstanceId];
        setSelection(newSelection);
        if(newSelection.length === 2) setMoves(prev => prev + 1);
    };
    
    const handleReplay = () => {
        handleSelectLevel(currentLevelIndex);
    }
    
    const handleChooseLevel = () => {
        setGamePhase('level_select');
    }

    // RENDER LOGIC for intermediary screens.
    if (gamePhase === 'level_select') {
        return (
             <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 text-center animate-fade-in">
                <h2 className="text-4xl font-bold text-slate-700 mb-2">تَحَدِّي الذَّاكِرَةِ</h2>
                <p className="text-2xl text-slate-500 mb-6">اخْتَرِ مُسْتَوَى الصُّعُوبَةِ.</p>
                <div className="flex flex-col gap-4">
                  {matchingLevels.map((level, index) => (
                      <button 
                        key={level.level} 
                        onClick={() => handleSelectLevel(index)} 
                        className="w-full text-white font-bold py-4 px-8 rounded-full text-2xl hover:scale-105 transition-transform bg-amber-500 hover:bg-amber-600"
                      >
                          الْمُسْتَوَى {level.level} ({level.label})
                      </button>
                  ))}
                </div>
            </div>
        )
    }

    if (gamePhase === 'level_complete') {
        return (
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 text-center animate-fade-in">
                <h2 className="text-4xl font-bold text-green-600 mb-2">🎉 مُسْتَوًى مُكْتَمِلٌ! 🎉</h2>
                <p className="text-2xl text-slate-500 mb-4">أَحْسَنْتَ! أَكْمَلْتَ جَمِيعَ تَمَارِينِ الْمُسْتَوَى {levelConfig.level}.</p>
                <div className="flex flex-col gap-4">
                  <button onClick={handleReplay} className="w-full text-white font-bold py-3 px-8 rounded-full text-xl hover:scale-105 transition-transform bg-amber-500 hover:bg-amber-600">
                      إِعَادَةُ الْمُسْتَوَى
                  </button>
                  <button onClick={handleChooseLevel} className="w-full text-slate-700 bg-slate-200 font-bold py-3 px-8 rounded-full text-xl hover:scale-105 transition-transform hover:bg-slate-300">
                      اخْتَرِ مُسْتَوًى آخَرَ
                  </button>
                </div>
            </div>
        );
    }


    // RENDER LOGIC for the main game board.
    return (
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 sm:p-6">
            <div className="text-center mb-3">
                {gamePhase === 'study' ? (
                    <div className="animate-fade-in">
                        <h2 className="text-3xl font-bold text-slate-700">مَرْحَلَةُ الدِّرَاسَةِ (الْمُسْتَوَى {levelConfig.level})</h2>
                        <p className="text-5xl font-black text-amber-500">{studyTimer}</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-700">الْمُسْتَوَى {levelConfig.level} - التَّمْرِينُ {currentExerciseIndex + 1}/{levelConfig.exercises.length}</h2>
                        <p className="text-2xl text-slate-500">الْحَرَكَاتُ: <span className="font-bold">{moves}</span></p>
                    </div>
                )}
            </div>
            
            <div className={`grid gap-2 sm:gap-4 justify-center ${levelConfig.gridCols}`}>
                {cards.map((card) => (
                    <div
                        key={card.instanceId}
                        onClick={() => handleCardClick(card.instanceId)}
                        style={{ perspective: '1000px' }}
                        className={`aspect-[3/4] rounded-lg sm:rounded-xl transition-opacity duration-300 ${card.isMatched ? 'opacity-70' : 'cursor-pointer'}`}
                    >
                        <div 
                            className="w-full h-full relative transition-transform duration-500 rounded-lg sm:rounded-xl" 
                            style={{ transformStyle: 'preserve-3d', transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                        >
                           <div className="absolute w-full h-full flex items-center justify-center rounded-lg sm:rounded-xl shadow-lg bg-amber-500" style={{ backfaceVisibility: 'hidden' }}>
                                <span className="text-5xl sm:text-7xl text-white/70">?</span>
                           </div>
                           <div 
                                className={`absolute w-full h-full flex items-center justify-center p-1 rounded-lg sm:rounded-xl shadow-lg ${card.isMatched ? 'bg-green-200 border-4 border-green-400' : 'bg-white'}`} 
                                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                            >
                                <span className={`text-center ${card.type === 'emoji' ? 'text-5xl sm:text-7xl' : 'text-2xl sm:text-4xl font-bold text-slate-700'}`}>
                                    {card.content}
                                </span>
                           </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};