/**
 * @file This file contains the "Matching Game" (Memory Cards) component.
 * It has been transformed into a "Memory Challenge" with a pedagogical focus.
 * The game is structured into levels, and each level requires completing 6 separate exercises to advance.
 * This encourages mastery before increasing difficulty.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { MatchingPair } from '../types';
import { matchingPairs } from '../data/arabicContent';

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

// Game configuration for each level.
const levels = [
    { level: 1, pairs: 4, studyTime: 5, gridCols: 'grid-cols-4' },
    { level: 2, pairs: 8, studyTime: 8, gridCols: 'grid-cols-4' },
    { level: 3, pairs: 14, studyTime: 12, gridCols: 'grid-cols-7' },
];

// Define how many rounds must be completed to pass a level.
const ROUNDS_PER_LEVEL = 6;

// A utility function to shuffle an array.
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const MatchingGame: React.FC<MatchingGameProps> = ({ onAnswer }) => {
    // State to manage the overall game phase.
    const [gamePhase, setGamePhase] = useState<'start' | 'study' | 'match' | 'round_complete' | 'level_complete' | 'game_complete'>('start');
    // State for the current level number.
    const [currentLevel, setCurrentLevel] = useState(1);
    // State for the current round within a level.
    const [currentRound, setCurrentRound] = useState(1);
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

    const levelConfig = useMemo(() => levels[currentLevel - 1], [currentLevel]);
    
    /**
     * Sets up or resets the game board for a given round.
     */
    const setupRound = (levelNumber: number) => {
        const config = levels[levelNumber - 1];
        if (!config) {
            setGamePhase('game_complete');
            return;
        }

        const gamePairs = shuffleArray(matchingPairs).slice(0, config.pairs);
        
        const gameCards: Card[] = [];
        gamePairs.forEach(pair => {
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
    
    // Effect to check for round/level completion.
    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.isMatched)) {
            setTimeout(() => {
                if (currentRound < ROUNDS_PER_LEVEL) {
                    setGamePhase('round_complete');
                } else {
                    if (currentLevel >= levels.length) {
                        setGamePhase('game_complete');
                    } else {
                        setGamePhase('level_complete');
                    }
                }
            }, 500);
        }
    }, [cards, currentLevel, currentRound]);

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
    
    const handleNextRound = () => {
        setCurrentRound(prev => prev + 1);
        setupRound(currentLevel);
    }
    
    const handleNextLevel = () => {
        const nextLevelNum = currentLevel + 1;
        setCurrentLevel(nextLevelNum);
        setCurrentRound(1);
        setupRound(nextLevelNum);
    }
    
    const handleRestart = () => {
        setCurrentLevel(1);
        setCurrentRound(1);
        setGamePhase('start');
    }

    // RENDER LOGIC for intermediary screens.
    if (['start', 'round_complete', 'level_complete', 'game_complete'].includes(gamePhase)) {
        return (
             <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 text-center animate-fade-in">
                {gamePhase === 'start' && <>
                    <h2 className="text-4xl font-bold text-slate-700 mb-2">تَحَدِّي الذَّاكِرَةِ</h2>
                    <p className="text-2xl text-slate-500 mb-6">أَكْمِلْ {ROUNDS_PER_LEVEL} تَمَارِينَ فِي كُلِّ مُسْتَوًى لِتَتَقَدَّمَ.</p>
                    <button onClick={() => setupRound(1)} className="w-full text-white font-bold py-4 px-8 rounded-full text-2xl hover:scale-105 transition-transform bg-amber-500 hover:bg-amber-600">
                        اِبْدَأِ التَّحَدِّي
                    </button>
                </>}
                {gamePhase === 'round_complete' && <>
                    <h2 className="text-4xl font-bold text-green-600 mb-2">✔️ تَمْرِينٌ مُكْتَمِلٌ ✔️</h2>
                    <p className="text-2xl text-slate-500 mb-4">أَحْسَنْتَ! أَكْمَلْتَ التَّمْرِينَ فِي <span className="font-bold text-slate-700">{moves}</span> حَرَكَاتٍ.</p>
                    <button onClick={handleNextRound} className="w-full text-white font-bold py-4 px-8 rounded-full text-2xl hover:scale-105 transition-transform bg-amber-500 hover:bg-amber-600">
                        التَّمْرِينُ التَّالِي
                    </button>
                </>}
                {gamePhase === 'level_complete' && <>
                    <h2 className="text-4xl font-bold text-green-600 mb-2">🎉 مُسْتَوًى مُكْتَمِلٌ! 🎉</h2>
                    <p className="text-2xl text-slate-500 mb-4">لَقَدْ أَكْمَلْتَ الْمُسْتَوَى {currentLevel}! هَلْ أَنْتَ مُسْتَعِدٌّ لِلْمُسْتَوَى التَّالِي؟</p>
                    <button onClick={handleNextLevel} className="w-full text-white font-bold py-4 px-8 rounded-full text-2xl hover:scale-105 transition-transform bg-amber-500 hover:bg-amber-600">
                        الْمُسْتَوَى التَّالِي
                    </button>
                </>}
                 {gamePhase === 'game_complete' && <>
                    <h2 className="text-4xl font-bold text-green-600 mb-2">🏆 اكْتَمَلَ التَّحَدِّي 🏆</h2>
                    <p className="text-2xl text-slate-500 mb-4">لَقَدْ أَظْهَرْتَ ذَاكِرَةً قَوِيَّةً! عَمَلٌ رَائِعٌ!</p>
                    <button onClick={handleRestart} className="w-full text-white font-bold py-4 px-8 rounded-full text-2xl hover:scale-105 transition-transform bg-amber-500 hover:bg-amber-600">
                        الْعَبْ مَرَّةً أُخْرَى
                    </button>
                </>}
            </div>
        )
    }

    // RENDER LOGIC for the main game board.
    return (
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 sm:p-6">
            <div className="text-center mb-3">
                {gamePhase === 'study' ? (
                    <div className="animate-fade-in">
                        <h2 className="text-3xl font-bold text-slate-700">مَرْحَلَةُ الدِّرَاسَةِ (الْمُسْتَوَى {currentLevel} - تَمْرِينٌ {currentRound}/{ROUNDS_PER_LEVEL})</h2>
                        <p className="text-5xl font-black text-amber-500">{studyTimer}</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-700">الْمُسْتَوَى {currentLevel} - تَمْرِينٌ {currentRound}/{ROUNDS_PER_LEVEL}</h2>
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