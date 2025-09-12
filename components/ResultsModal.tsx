/**
 * @file This file contains the ResultsModal component.
 * It displays a summary of the user's performance across all activities.
 */

import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaTrophy } from 'react-icons/fa';
import { DetailedResults, ActivityType } from '../types';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: DetailedResults;
  totalScore: number;
}

const activityNames: { [key in ActivityType]?: string } = {
    [ActivityType.COMPLETE_LETTER]: 'إِكْمَالُ الْحَرْفِ',
    [ActivityType.COMPLETE_WORD]: 'إِكْمَالُ الْكَلِمَةِ',
    [ActivityType.MATCHING_GAME]: 'بِطَاقَاتُ الذَّاكِرَةِ',
    [ActivityType.WORD_SCRAMBLE]: 'تَرْتِيبُ الْحُرُوفِ',
    [ActivityType.WHO_AM_I]: 'مَنْ أَكُونُ؟',
    [ActivityType.SENTENCE_BUILDER]: 'تَرْتِيبُ الْجُمْلَةِ',
    [ActivityType.WORD_HUNTER]: 'صَائِدُ الْكَلِمَاتِ',
    [ActivityType.FLASH_WORD]: 'كَلِمَةٌ فِي وَمْضَةٍ',
    [ActivityType.DAYS_OF_WEEK]: 'تَحَدِّي أَيَّامِ الْأُسْبُوعِ',
    [ActivityType.OPPOSITES_MATCH]: 'تَطَابُقُ الْأَضْدَادِ',
};


export const ResultsModal: React.FC<ResultsModalProps> = ({ isOpen, onClose, results, totalScore }) => {
  if (!isOpen) return null;

  const playedActivities = Object.keys(results).filter(key => activityNames[key as ActivityType] !== undefined) as ActivityType[];

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="إِغْلَاق"
        >
          <IoMdClose className="h-8 w-8" />
        </button>

        <div className="flex flex-col items-center mb-6">
            <FaTrophy className="text-yellow-400 text-6xl mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-700">نَتَائِجُكَ</h2>
        </div>

        <div className="bg-yellow-100 text-yellow-800 text-center p-4 rounded-lg mb-6">
            <p className="text-xl">مَجْمُوعُ النِّقَاطِ</p>
            <p className="text-5xl font-black">{totalScore}</p>
        </div>

        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-600">تَفَاصِيلُ الْأَلْعَابِ:</h3>
            {playedActivities.length > 0 ? (
                <div className="divide-y divide-slate-200">
                    {playedActivities.map(activityKey => {
                        const result = results[activityKey];
                        if (!result) return null;
                        return (
                             <div key={activityKey} className="py-3 flex justify-between items-center">
                                <span className="font-bold text-lg text-slate-700">{activityNames[activityKey]}</span>
                                <div className="text-left flex items-center gap-4">
                                     <span className="text-green-600">صَحِيحٌ: {result.correct}</span>
                                     <span className="text-red-600">خَطَأٌ: {result.incorrect}</span>
                                     <span className="font-bold text-yellow-800 bg-yellow-200 px-3 py-1 rounded-full">النِّقَاطُ: {result.score}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p className="text-center text-slate-500 p-4 bg-slate-50 rounded-lg">لَمْ تَلْعَبْ أَيَّ لُعْبَةٍ بَعْدُ. اِبْدَأِ اللَّعِبَ لِتَرَى نَتَائِجَكَ هُنَا!</p>
            )}
        </div>
      </div>
    </div>
  );
};