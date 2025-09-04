/**
 * @file This file contains the ActivityShell component.
 * This component acts as a reusable wrapper or layout for all the exercise screens.
 * It provides a consistent UI with a score display and a back button with a tooltip,
 * creating an immersive, full-screen experience for each activity.
 */

import React from 'react';
// Import modern icons from the react-icons library.
import { FaStar } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

// Props interface for the ActivityShell component.
interface ActivityShellProps {
  score: number;
  onBackToMenu: () => void;
  children: React.ReactNode; // The actual exercise component will be passed as children.
}

/**
 * The ActivityShell component.
 * @param {ActivityShellProps} props - The props for the component.
 * @returns {JSX.Element} The rendered shell containing the exercise.
 */
export const ActivityShell: React.FC<ActivityShellProps> = ({ score, onBackToMenu, children }) => {
  return (
    // Main container that centers the content and fills the screen.
    <div className="flex flex-col items-center justify-center min-h-screen p-2 sm:p-4 md:p-6 relative">
        {/* Score display, positioned at the top-left. Made responsive. */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
            <div className="flex items-center gap-2 sm:gap-3 bg-yellow-100 text-yellow-800 font-bold px-3 py-2 sm:px-5 sm:py-3 rounded-full shadow-md">
              {/* Using a modern icon for the star. Made responsive. */}
              <FaStar className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
              <span className="text-2xl sm:text-3xl">{score}</span>
            </div>
        </div>
        {/* Buttons container, positioned at the top-right */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-4">
            {/* Back to Menu button, now with a tooltip. Made responsive. */}
            <button
                onClick={onBackToMenu}
                aria-label="اَلْعَوْدَةُ إِلَى اَلْقَائِمَةِ"
                // Tooltip attributes for react-tooltip
                data-tooltip-id="app-tooltip"
                data-tooltip-content="اَلْعَوْدَةُ إِلَى اَلْقَائِمَةِ"
                className="bg-white text-cyan-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full hover:bg-cyan-100 transition-colors flex items-center justify-center shadow-md group"
            >
                {/* Modern "Close" icon. Made responsive. */}
                <IoMdClose className="h-7 w-7 sm:h-8 sm:w-8 transition-transform group-hover:scale-110" />
            </button>
        </div>
      {/* This is where the actual exercise component will be rendered. */}
      {children}
    </div>
  );
};