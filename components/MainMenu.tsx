/**
 * @file This file contains the MainMenu component.
 * It serves as the main navigation hub, allowing users to select an activity,
 * view results, or get help. It uses modern icons for a better visual experience.
 */

import React from 'react';
import { ActivityType } from '../types';
// Import modern icons from react-icons
import { BsPencilFill, BsUiChecks, BsShuffle, BsChatQuoteFill } from 'react-icons/bs';
import { FaQuestionCircle, FaTrophy, FaSearch } from 'react-icons/fa';
import { GiCardRandom } from "react-icons/gi";

interface MainMenuProps {
  onSelectActivity: (activity: ActivityType) => void;
  onOpenHelp: () => void;
  onOpenResults: () => void;
}

// Data structure for menu items to make rendering cleaner.
const menuItems = [
    { type: ActivityType.COMPLETE_LETTER, icon: <BsPencilFill />, label: 'أَكْمِلِ الْحَرْفَ', color: 'bg-sky-500' },
    { type: ActivityType.COMPLETE_WORD, icon: <BsUiChecks />, label: 'أَكْمِلِ الْكَلِمَةَ', color: 'bg-emerald-500' },
    { type: ActivityType.MATCHING_GAME, icon: <GiCardRandom />, label: 'بِطَاقَاتُ الذَّاكِرَةِ', color: 'bg-amber-500' },
    { type: ActivityType.WORD_SCRAMBLE, icon: <BsShuffle />, label: 'رَتِّبِ الْحُرُوفَ', color: 'bg-rose-500' },
    { type: ActivityType.WHO_AM_I, icon: <FaSearch />, label: 'مَنْ أَكُونُ؟', color: 'bg-teal-500' },
    { type: ActivityType.SENTENCE_BUILDER, icon: <BsChatQuoteFill />, label: 'رَتِّبِ الْجُمْلَةَ', color: 'bg-indigo-500' },
];

export const MainMenu: React.FC<MainMenuProps> = ({ onSelectActivity, onOpenHelp, onOpenResults }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        <div className="text-center mb-6">
            <h1 className="text-5xl sm:text-7xl font-black text-cyan-600 mb-2">مُغَامَرَةُ تَعَلُّمِ الْعَرَبِيَّةِ</h1>
            <p className="text-xl sm:text-2xl text-slate-500">اِخْتَرْ لُعْبَةً وَابْدَأِ التَّعَلُّمَ!</p>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6">
            {menuItems.map(item => (
                <button
                    key={item.type}
                    onClick={() => onSelectActivity(item.type)}
                    className={`p-6 rounded-2xl text-white font-bold text-2xl flex flex-col items-center justify-center gap-4 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ${item.color}`}
                >
                    <div className="text-5xl">{item.icon}</div>
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
        
        <div className="flex items-center gap-4">
            <button 
                onClick={onOpenHelp}
                className="bg-white text-slate-600 font-bold py-3 px-6 rounded-full shadow-md hover:bg-slate-100 transition-colors flex items-center gap-2 text-lg"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="كَيْفِيَّةُ اللَّعِبِ"
            >
                <FaQuestionCircle />
                <span>مُسَاعَدَةٌ</span>
            </button>
            <button 
                onClick={onOpenResults}
                className="bg-yellow-400 text-yellow-900 font-bold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition-colors flex items-center gap-2 text-lg"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="اِعْرِضْ نَتَائِجَكَ"
            >
                <FaTrophy />
                <span>نَتَائِجِي</span>
            </button>
        </div>
    </div>
  );
};