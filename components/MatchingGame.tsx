/**
 * @file This file contains the "Matching Game" (Memory Cards) component.
 * The user flips cards to find matching pairs of words, testing their memory and word recognition.
 */

import React, { useState, useEffect } from 'react';
import { MatchingPair } from '../types';
import { matchingPairs } from '../data/arabicContent';

// Props interface for the component.
interface MatchingGameProps {
  onComplete: (score: number) => void; // Callback to update the total score.
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

export const MatchingGame: React.FC<MatchingGameProps> = ({ onComplete }) => {
    // State to hold the array of cards for the game.
    const [cards, setCards] = useState<Card[]>([]);
    // State to track the indices of the currently flipped cards (max 2).
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    // State to prevent user clicks while a pair is being checked.
    const [isChecking, setIsChecking] = useState(false);

    /**
     * Sets up or resets the game board.
     * It duplicates the pairs, shuffles them, and initializes their state.
     */
    const setupGame = () => {
        const duplicatedPairs = [...matchingPairs, ...matchingPairs];
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

    // Effect to set up the game when the component mounts.
    useEffect(() => {
        setupGame();
    }, []);

    // Effect to check for a match whenever two cards are flipped.
    useEffect(() => {
        if (flippedIndices.length !== 2) return;

        setIsChecking(true);
        const [firstIndex, secondIndex] = flippedIndices;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        if (firstCard.id === secondCard.id) {
            // Match found
            setTimeout(() => {
                setCards(prevCards =>
                    prevCards.map((card, index) =>
                        index === firstIndex || index === secondIndex
                            ? { ...card, isMatched: true, isFlipped: true }
                            : card
                    )
                );
                onComplete(20); // Award points for a match.
                setFlippedIndices([]);
                setIsChecking(false);
            }, 800);
        } else {
            // No match, flip the cards back over.
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
    }, [flippedIndices, cards, onComplete]);
    
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

    return (
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-700 mb-2 text-center">بِطَاقَاتُ الذَّاكِرَةِ</h2>
            <p className="text-lg sm:text-2xl text-slate-500 mb-8 text-center">اِقْلِبِ الْبِطَاقَاتِ لِتَجِدَ الْكَلِمَاتِ الْمُتَطَابِقَةِ.</p>
            
            {/* Game Board Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-5 justify-center">
                {cards.map((card, index) => (
                    <div
                        key={card.instanceId}
                        onClick={() => handleCardClick(index)}
                        className={`aspect-[3/4] flex items-center justify-center rounded-lg sm:rounded-xl text-xl sm:text-3xl font-bold text-slate-700 transition-all duration-300 shadow-lg cursor-pointer transform ${card.isFlipped ? 'bg-white scale-105' : 'bg-amber-400 hover:bg-amber-500'} ${card.isMatched ? 'bg-green-200 border-2 sm:border-4 border-green-400 opacity-60' : ''}`}
                        style={{ perspective: '1000px' }}
                    >
                        {/* 3D Flip Animation Container */}
                        <div className={`w-full h-full flex items-center justify-center transition-transform duration-500 ${card.isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                           {/* Card Back */}
                           <div className="absolute w-full h-full flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                                <span className="text-4xl sm:text-6xl text-white/70">?</span>
                           </div>
                           {/* Card Front */}
                           <div className="absolute w-full h-full flex items-center justify-center rotate-y-180 p-1" style={{ backfaceVisibility: 'hidden' }}>
                                <span className="animate-fade-in">{card.word}</span>
                           </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Completion Message */}
            {allMatched && (
                <div className="text-center mt-8 animate-fade-in p-4 sm:p-6 bg-slate-50 rounded-lg">
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">🎉 رَائِعٌ! لَقَدْ أَكْمَلْتَ تَحَدِّيَ الذَّاكِرَةِ بِنَجَاحٍ! 🎉</p>
                     <button 
                        onClick={setupGame} 
                        className="mt-4 sm:mt-6 bg-amber-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-amber-600 transition-colors text-lg sm:text-xl"
                      >
                          الْعَبْ مَرَّةً أُخْرَى
                      </button>
                </div>
            )}
        </div>
    );
};