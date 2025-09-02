/**
 * @file This is the main component of the application.
 * It acts as a router, controlling which activity is displayed based on the application's state.
 * It also manages the global score and hosts the global Tooltip component.
 */

import React, { useState, useCallback } from 'react';
// Import the Tooltip component for global use.
import { Tooltip } from 'react-tooltip';
import { ActivityType } from './types';
import { MainMenu } from './components/MainMenu';
import { ActivityShell } from './components/ActivityShell';
import { HelpModal } from './components/HelpModal';
import { CompleteLetterExercise } from './components/CompleteLetterExercise';
import { CompleteWordExercise } from './components/CompleteWordExercise';
import { MatchingGame } from './components/MatchingGame';
import { WordScrambleExercise } from './components/WordScrambleExercise';
import { CrosswordExercise } from './components/CrosswordExercise';
import { SentenceBuilderExercise } from './components/SentenceBuilderExercise';

const App: React.FC = () => {
  // State to manage the currently active screen/activity. Defaults to the main menu.
  const [activity, setActivity] = useState<ActivityType>(ActivityType.MENU);
  // State to manage the user's total score across all activities.
  const [score, setScore] = useState<number>(0);
  // State to manage the visibility of the help modal.
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  /**
   * Sets the current activity.
   * Wrapped in useCallback to prevent re-creation on re-renders, optimizing child components.
   * @param {ActivityType} selectedActivity - The activity to switch to.
   */
  const handleSelectActivity = useCallback((selectedActivity: ActivityType) => {
    setActivity(selectedActivity);
  }, []);

  /**
   * Resets the activity state to show the main menu.
   * Wrapped in useCallback for performance optimization.
   */
  const handleBackToMenu = useCallback(() => {
    setActivity(ActivityType.MENU);
  }, []);
  
  /**
   * Updates the score by adding points.
   * Wrapped in useCallback to prevent infinite re-render loops in useEffect hooks
   * within exercise components that have `onComplete` as a dependency.
   * @param {number} points - The number of points to add to the score.
   */
  const handleScoreUpdate = useCallback((points: number) => {
      setScore(prevScore => prevScore + points);
  }, []);

  /**
   * Renders the component corresponding to the current activity state.
   * This function acts as the main router for the application.
   * @returns {JSX.Element} The component to be rendered.
   */
  const renderActivity = () => {
    const exerciseProps = { onComplete: handleScoreUpdate };
    let exerciseComponent: React.ReactNode;

    switch (activity) {
      case ActivityType.COMPLETE_LETTER:
        exerciseComponent = <CompleteLetterExercise {...exerciseProps} />;
        break;
      case ActivityType.COMPLETE_WORD:
        exerciseComponent = <CompleteWordExercise {...exerciseProps} />;
        break;
      case ActivityType.MATCHING_GAME:
        exerciseComponent = <MatchingGame {...exerciseProps} />;
        break;
      case ActivityType.WORD_SCRAMBLE:
        exerciseComponent = <WordScrambleExercise {...exerciseProps} />;
        break;
      case ActivityType.CROSSWORD:
        exerciseComponent = <CrosswordExercise {...exerciseProps} />;
        break;
      case ActivityType.SENTENCE_BUILDER:
        exerciseComponent = <SentenceBuilderExercise {...exerciseProps} />;
        break;
      case ActivityType.MENU:
      default:
        // If the activity is MENU or any other value, show the main menu.
        return <MainMenu onSelectActivity={handleSelectActivity} onOpenHelp={() => setIsHelpModalOpen(true)} />;
    }
    
    // For any exercise, wrap it in the ActivityShell to provide a consistent UI.
    return (
        <ActivityShell score={score} onBackToMenu={handleBackToMenu}>
            {exerciseComponent}
        </ActivityShell>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main>
        {renderActivity()}
      </main>
      
      {/* Render the Help Modal, its visibility is controlled by state. */}
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
      
      {/* 
        Global Tooltip component. 
        Any element with `data-tooltip-id="app-tooltip"` and `data-tooltip-content="..."` 
        will display a tooltip managed by this instance.
        The className applies custom styling defined in index.html.
      */}
      <Tooltip id="app-tooltip" className="app-tooltip" />
    </div>
  );
};

export default App;