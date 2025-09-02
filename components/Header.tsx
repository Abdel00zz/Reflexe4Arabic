/**
 * @file This file contains the Header component for the application.
 * It displays the score, the main title, and a back button when applicable.
 * Note: This component is currently not used, as ActivityShell provides a more immersive header.
 * It has been updated to use modern icons for consistency.
 */

import React from 'react';
// Import modern icons
import { FaStar } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

// Props interface for the Header component.
interface HeaderProps {
  score: number;
  onBackToMenu: () => void;
  showBackButton: boolean;
}

/**
 * The main header component.
 * It's designed to be sticky at the top of the page.
 * @param {HeaderProps} props - The props for the component.
 * @returns {JSX.Element} The rendered header.
 */
export const Header: React.FC<HeaderProps> = ({ score, onBackToMenu, showBackButton }) => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm p-4 rounded-b-2xl shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Score Display */}
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 font-bold px-4 py-2 rounded-full">
          <FaStar className="h-6 w-6 text-yellow-400" />
          <span>{score}</span>
        </div>
        
        {/* Application Title */}
        <h1 className="text-3xl font-black text-cyan-600 absolute left-1/2 -translate-x-1/2">مُغَامَرَةُ تَعَلُّمِ اللُّغَةِ الْعَرَبِيَّةِ</h1>
        
        {/* Back Button Container (placeholder to balance the layout) */}
        <div className="w-12 h-12">
            {showBackButton && (
              <button
                onClick={onBackToMenu}
                aria-label="اَلْعَوْدَةُ إِلَى اَلْقَائِمَةِ"
                className="bg-white text-cyan-600 w-12 h-12 rounded-full hover:bg-cyan-100 transition-colors flex items-center justify-center shadow-md"
              >
                {/* Modern icon for 'back' (forward arrow for RTL) */}
                <IoIosArrowForward className="h-6 w-6" />
              </button>
            )}
        </div>
      </div>
    </header>
  );
};