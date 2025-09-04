/**
 * @file This file contains the "Matching Game" (Memory Cards) component.
 * The user flips cards to find matching pairs of words, testing their memory and word recognition.
 */

import React, { useState, useEffect } from 'react';
import { MatchingPair } from '../types';
import { matchingPairs } from '../data/arabicContent';
import { playCorrectSound, playIncorrectSound } from '../utils/sounds';

// Props interface for the component.
interface MatchingGameProps {
  onAnswer: (isCorrect: boolean, score: number) => void; // Callback to report answer status and score.
}

// Extended interface for a card in the game, including its state.
interface Card extends MatchingPair {
    instanceId: number; // A unique ID for each card instance, even for matching pairs.
    isFlipped: boolean;
    isMatched: boolean;
}

// A utility function to shuffle an array.
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const MatchingGame: React.FC<MatchingGameProps> = ({ onAnswer }) => {
    // State to manage game level
    const [level, setLevel] = useState<'easy' | 'medium' | 'hard' | null>(null);
    // State to hold the array of cards for the game.
    const [cards, setCards] = useState<Card[]>([]);
    // State to track the indices of the currently flipped cards (max 2).
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    // State to prevent user clicks while a pair is being checked.
    const [isChecking, setIsChecking] = useState(false);

    /**
     * Sets up or resets the game board based on the selected difficulty level.
     */
    const setupGame = (selectedLevel: 'easy' | 'medium' | 'hard') => {
        let pairCount = 4;
        if (selectedLevel === 'medium') pairCount = 8;
        if (selectedLevel === 'hard') pairCount = 14;

        const gamePairs = shuffleArray(matchingPairs).slice(0, pairCount);
        const duplicatedPairs = [...gamePairs, ...gamePairs];
        const gameCards = shuffleArray(duplicatedPairs).map((pair, index) => ({
            ...pair,
            instanceId: index,
            isFlipped: false,
            isMatched: false,
        }));
        setCards(gameCards);
        setFlippedIndices([]);
        setIsChecking(false);
    }

    // Effect to set up the game when a level is chosen.
    useEffect(() => {
        if (level) {
            setupGame(level);
        }
    }, [level]);

    // Effect to check for a match whenever two cards are flipped.
    useEffect(() => {
        if (flippedIndices.length !== 2) return;

        setIsChecking(true);
        const [firstIndex, secondIndex] = flippedIndices;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        if (firstCard.id === secondCard.id) {
            // Match found
            playCorrectSound();
            onAnswer(true, 20); // Report correct match and award points.
            setTimeout(() => {
                setCards(prevCards =>
                    prevCards.map((card, index) =>
                        index === firstIndex || index === secondIndex
                            ? { ...card, isMatched: true, isFlipped: true }
                            : card
                    )
                );
                setFlippedIndices([]);
                setIsChecking(false);
            }, 800);
        } else {
            // No match, flip the cards back over.
            playIncorrectSound();
            onAnswer(false, 0); // Report incorrect match.
            setTimeout(() => {
                setCards(prevCards =>
                    prevCards.map((card, index) =>
                        index === firstIndex || index === secondIndex
                            ? { ...card, isFlipped: false }
                            : card
                    )
                );
                setFlippedIndices([]);
                setIsChecking(false);
            }, 1200);
        }
    }, [flippedIndices, cards, onAnswer]);
    
    /**
     * Handles the user clicking on a card.
     * @param {number} index - The index of the clicked card.
     */
    const handleCardClick = (index: number) => {
        // Ignore clicks if checking, card is already flipped, or two cards are already up.
        if (isChecking || cards[index].isFlipped || flippedIndices.length === 2) {
            return;
        }

        // Flip the card.
        setCards(prevCards =>
            prevCards.map((card, i) =>
                i === index ? { ...card, isFlipped: true } : card
            )
        );
        // Add its index to the flipped indices array.
        setFlippedIndices(prev => [...prev, index]);
    };

    // Check if all cards have been matched.
    const allMatched = cards.length > 0 && cards.every(card => card.isMatched);
    
    if (!level) {
        return (
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
                <h2 className="text-4xl font-bold text-slate-700 mb-2">اخْتَرِ الْمُسْتَوَى</h2>
                <p className="text-2xl text-slate-500 mb-8">كُلَّمَا زَادَتِ الصُّعُوبَةُ، زَادَتِ النِّقَاطُ!</p>
                <div className="flex flex-col gap-4">
                    <button 
                        onClick={() => setLevel('easy')} 
                        className="w-full text-white font-bold py-4 px-8 rounded-full text-2xl hover:scale-105 transition-transform bg-green-500 hover:bg-green-600"
                    >
                        سَهْلٌ (4 أَزْوَاجٍ)
                    </button>
                    <button 
                        onClick={() => setLevel('medium')} 
                        className="w-full text-white font-bold py-4 px-8 rounded-full text-2xl hover:scale-105 transition-transform bg-amber-500 hover:bg-amber-600"
                    >
                        مُتَوَسِّطٌ (8 أَزْوَاجٍ)
                    </button>
                    <button 
                        onClick={() => setLevel('hard')} 
                        className="w-full text-white font-bold py-4 px-8 rounded-full text-2xl hover:scale-105 transition-transform bg-rose-500 hover:bg-rose-600"
                    >
                        صَعْبٌ (14 زَوْجًا)
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 sm:p-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-700 mb-2 text-center">بِطَاقَاتُ الذَّاكِرَةِ</h2>
            <p className="text-xl sm:text-3xl text-slate-500 mb-8 text-center">اِقْلِبِ الْبِطَاقَاتِ لِتَجِدَ الْكَلِمَاتِ الْمُتَطَابِقَةِ.</p>
            
            {/* Game Board Grid */}
            <div className={`grid gap-2 sm:gap-5 justify-center ${level === 'hard' ? 'grid-cols-7' : 'grid-cols-4'}`}>
                {cards.map((card, index) => (
                    <div
                        key={card.instanceId}
                        onClick={() => handleCardClick(index)}
                        className={`aspect-[3/4] flex items-center justify-center rounded-lg sm:rounded-xl text-2xl sm:text-4xl font-bold text-slate-700 transition-all duration-300 shadow-lg cursor-pointer`}
                        style={{ perspective: '1000px' }}
                    >
                        {/* 3D Flip Animation Container */}
                        <div 
                            className="w-full h-full flex items-center justify-center transition-transform duration-500 rounded-lg sm:rounded-xl" 
                            style={{ 
                                transformStyle: 'preserve-3d',
                                transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                backgroundColor: card.isFlipped ? (card.isMatched ? '#A7F3D0' : 'white') : '#FBBF24',
                                opacity: card.isMatched ? 0.7 : 1,
                                border: card.isMatched ? '4px solid #34D399' : 'none',
                            }}
                        >
                           {/* Card Back */}
                           <div className="absolute w-full h-full flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                                <span className="text-5xl sm:text-7xl text-white/70">?</span>
                           </div>
                           {/* Card Front */}
                           <div className="absolute w-full h-full flex items-center justify-center p-1" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                <span className="animate-fade-in">{card.word}</span>
                           </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Completion Message */}
            {allMatched && (
                <div className="text-center mt-8 animate-fade-in p-4 sm:p-6 bg-slate-50 rounded-lg">
                    <p className="text-3xl sm:text-4xl font-bold text-green-600">🎉 رَائِعٌ! لَقَدْ أَكْمَلْتَ تَحَدِّيَ الذَّاكِرَةِ بِنَجَاحٍ! 🎉</p>
                     <button 
                        onClick={() => setLevel(null)} 
                        className="mt-4 sm:mt-6 bg-amber-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-amber-600 transition-colors text-lg sm:text-2xl"
                      >
                          الْعَبْ مَرَّةً أُخْرَى
                      </button>
                </div>
            )}
        </div>
    );
};