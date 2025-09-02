/**
 * @file This file contains the MainMenu component, which serves as the home screen of the application.
 * It displays a grid of buttons, each launching a different learning activity, using modern icons.
 */

import React from 'react';
import { ActivityType } from '../types';
// Import a set of modern icons for the menu buttons.
import { FaPenNib, FaBookOpen, FaPuzzlePiece, FaNewspaper, FaLightbulb } from 'react-icons/fa';
import { CgCardSpades } from "react-icons/cg";
import { MdSubtitles } from "react-icons/md";

// Props interface for the MainMenu component.
interface MainMenuProps {
  onSelectActivity: (activity: ActivityType) => void;
  onOpenHelp: () => void;
}

/**
 * A reusable button component for the main menu.
 * @param {object} props - The props for the component.
 * @returns {JSX.Element} A styled button for selecting an activity.
 */
const MenuButton: React.FC<{ onClick: () => void; title: string; description: string; color: string; icon: React.ReactNode }> = ({ onClick, title, description, color, icon }) => {
    return (
        <button
            onClick={onClick}
            // Increased width, padding, and font sizes for a bigger, more centered look. Responsive classes added.
            className={`w-full md:w-2/5 lg:w-1/3 p-4 sm:p-8 rounded-3xl text-white text-right shadow-lg hover:scale-105 transform transition-transform duration-300 ${color} border-4 border-white/30 hover:border-white/80`}
        >
            {/* The icon is now passed as a ReactNode for flexibility. Made responsive. */}
            <div className="text-4xl sm:text-6xl mb-4">{icon}</div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h3>
            <p className="text-base sm:text-lg font-normal">{description}</p>
        </button>
    );
};

/**
 * The main menu component that displays activity choices.
 * @param {MainMenuProps} props - The props for the component.
 * @returns {JSX.Element} The rendered main menu screen.
 */
export const MainMenu: React.FC<MainMenuProps> = ({ onSelectActivity, onOpenHelp }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 text-center">
      {/* Help Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
            <button
                onClick={onOpenHelp}
                aria-label="اَلْمُسَاعَدَةُ"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="اَلْمُسَاعَدَةُ"
                className="bg-white text-amber-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full hover:bg-amber-100 transition-colors flex items-center justify-center shadow-md group"
            >
                <FaLightbulb className="h-6 w-6 sm:h-8 sm:w-8 transition-transform group-hover:scale-110" />
            </button>
      </div>

      <h1 className="text-4xl sm:text-6xl font-black text-cyan-600 mb-4">مُغَامَرَةُ تَعَلُّمِ اللُّغَةِ الْعَرَبِيَّةِ</h1>
      <p className="text-xl sm:text-2xl text-slate-500 mb-8 sm:mb-12 max-w-3xl">اِخْتَرْ تَحَدِّيًا لِتَبْدَأَ رِحْلَةَ تَعَلُّمِ اللُّغَةِ الْعَرَبِيَّةِ بِطَرِيقَةٍ ذَكِيَّةٍ وَمُمْتِعَةٍ.</p>
      
      {/* Container for menu buttons, with increased gap for better spacing. Made responsive. */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-10">
        <MenuButton 
            onClick={() => onSelectActivity(ActivityType.COMPLETE_LETTER)}
            title="أَكْمِلِ الْحَرْفَ"
            description="اِخْتَرِ الْحَرْفَ الصَّحِيحَ لِإِكْمَالِ الْكَلِمَةِ."
            color="bg-sky-500"
            icon={<FaPenNib />}
        />
        <MenuButton 
            onClick={() => onSelectActivity(ActivityType.COMPLETE_WORD)}
            title="أَكْمِلِ الْجُمْلَةَ"
            description="اِخْتَرِ الْكَلِمَةَ الْمُنَاسِبَةَ لِإِكْمَالِ الْجُمْلَةِ."
            color="bg-emerald-500"
            icon={<FaBookOpen />}
        />
        <MenuButton 
            onClick={() => onSelectActivity(ActivityType.MATCHING_GAME)}
            title="بِطَاقَاتُ الذَّاكِرَةِ"
            description="اِقْلِبِ الْبِطَاقَاتِ وَابْحَثْ عَنِ الْأَزْوَاجِ الْمُتَطَابِقَةِ."
            color="bg-amber-500"
            icon={<CgCardSpades />}
        />
        <MenuButton 
            onClick={() => onSelectActivity(ActivityType.WORD_SCRAMBLE)}
            title="تَرْكِيبُ الْكَلِمَاتِ"
            description="رَتِّبِ الْحُرُوفَ الْمُبَعْثَرَةَ لِتُكَوِّنَ كَلِمَةً."
            color="bg-rose-500"
            icon={<FaPuzzlePiece />}
        />
        <MenuButton 
            onClick={() => onSelectActivity(ActivityType.SENTENCE_BUILDER)}
            title="تَكْوِينُ الْجُمَلِ"
            description="رَتِّبِ الْكَلِمَاتِ لِتُكَوِّنَ جُمْلَةً مُفِيدَةً."
            color="bg-indigo-500"
            icon={<MdSubtitles />}
        />
        <MenuButton 
            onClick={() => onSelectActivity(ActivityType.CROSSWORD)}
            title="الْكَلِمَاتُ الْمُتَقَاطِعَةُ"
            description="حِلَّ الْأَلْغَازَ لِتَمْلَأَ الشَّبَكَةَ بِالْكَلِمَاتِ."
            color="bg-slate-700"
            icon={<FaNewspaper />}
        />
      </div>
       {/* Creator Credit Footer */}
      <footer className="absolute bottom-4 text-center text-slate-500 font-semibold text-sm sm:text-base">
        <p>فكرة وتصميم: عبدالمالك بدوح - المغرب 🇲🇦</p>
        <a href="mailto:bdh.malek@gmail.com" className="hover:text-cyan-600 transition-colors">bdh.malek@gmail.com</a>
      </footer>
    </div>
  );
};