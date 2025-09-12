/**
 * @file This file contains the MainMenu component.
 * It serves as the main navigation hub, allowing users to select an activity,
 * view results, or get help. It uses modern icons for a better visual experience.
 */

import React from 'react';
import { ActivityType } from '../types';
// Import modern icons from react-icons
import { BsPencilFill, BsUiChecks, BsShuffle, BsChatQuoteFill, BsArrowLeftRight } from 'react-icons/bs';
import { FaQuestionCircle, FaTrophy, FaSearch, FaSearchPlus, FaRegCalendarAlt } from 'react-icons/fa';
import { GiCardRandom } from "react-icons/gi";
import { IoIosFlash } from 'react-icons/io';

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
    { type: ActivityType.WORD_HUNTER, icon: <FaSearchPlus />, label: 'صَائِدُ الْكَلِمَاتِ', color: 'bg-orange-500' },
    { type: ActivityType.FLASH_WORD, icon: <IoIosFlash />, label: 'كَلِمَةٌ فِي وَمْضَةٍ', color: 'bg-lime-500' },
    { type: ActivityType.DAYS_OF_WEEK, icon: <FaRegCalendarAlt />, label: 'تَحَدِّي أَيَّامِ الْأُسْبُوعِ', color: 'bg-fuchsia-500' },
    { type: ActivityType.OPPOSITES_MATCH, icon: <BsArrowLeftRight />, label: 'تَطَابُقُ الْأَضْدَادِ', color: 'bg-violet-500' },
];

export const MainMenu: React.FC<MainMenuProps> = ({ onSelectActivity, onOpenHelp, onOpenResults }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        <div className="text-center mb-8">
            <h1 className="text-6xl sm:text-8xl font-black text-cyan-600 mb-2">مُغَامَرَةُ تَعَلُّمِ الْعَرَبِيَّةِ</h1>
            <p className="text-2xl sm:text-3xl text-slate-500">اِخْتَرْ لُعْبَةً وَابْدَأِ التَّعَلُّمَ!</p>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mb-8">
            {menuItems.map(item => (
                <button
                    key={item.type}
                    onClick={() => onSelectActivity(item.type)}
                    className={`p-8 rounded-2xl text-white font-bold text-3xl flex flex-col items-center justify-center gap-4 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ${item.color}`}
                >
                    <div className="text-6xl">{item.icon}</div>
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
        
        <div className="flex items-center gap-6">
            <button 
                onClick={onOpenHelp}
                className="bg-white text-slate-600 font-bold py-4 px-8 rounded-full shadow-md hover:bg-slate-100 transition-colors flex items-center gap-3 text-xl"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="كَيْفِيَّةُ اللَّعِبِ"
            >
                <FaQuestionCircle className="text-2xl" />
                <span>مُسَاعَدَةٌ</span>
            </button>
            <button 
                onClick={onOpenResults}
                className="bg-yellow-400 text-yellow-900 font-bold py-4 px-8 rounded-full shadow-md hover:bg-yellow-500 transition-colors flex items-center gap-3 text-xl"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="اِعْرِضْ نَتَائِجَكَ"
            >
                <FaTrophy className="text-2xl" />
                <span>نَتَائِجِي</span>
            </button>
        </div>
    </div>
  );
};