/**
 * @file This is the main component of the application.
 * It acts as a router, controlling which activity is displayed based on the application's state.
 * It also manages the global score and hosts the global Tooltip component.
 */

import React, { useState, useCallback } from 'react';
// Import the Tooltip component for global use.
import { Tooltip } from 'react-tooltip';
import { ActivityType, DetailedResults } from './types';
import { MainMenu } from './components/MainMenu';
import { ActivityShell } from './components/ActivityShell';
import { HelpModal } from './components/HelpModal';
import { ResultsModal } from './components/ResultsModal';
import { CompleteLetterExercise } from './components/CompleteLetterExercise';
import { CompleteWordExercise } from './components/CompleteWordExercise';
import { MatchingGame } from './components/MatchingGame';
import { WordScrambleExercise } from './components/WordScrambleExercise';
import { WhoAmIExercise } from './components/WhoAmIExercise';
import { SentenceBuilderExercise } from './components/SentenceBuilderExercise';
import { CrosswordExercise } from './components/CrosswordExercise';
import { WordHunterExercise } from './components/WordHunterExercise';
import { FlashWordExercise } from './components/ShadowMatchExercise';
import { DaysOfWeekExercise } from './components/DaysOfWeekExercise';
import { OppositesMatchExercise } from './components/OppositesMatchExercise';

const App: React.FC = () => {
  // State to manage the currently active screen/activity. Defaults to the main menu.
  const [activity, setActivity] = useState<ActivityType>(ActivityType.MENU);
  // State to manage detailed results for each activity.
  const [detailedResults, setDetailedResults] = useState<DetailedResults>({});
  // State to manage the visibility of the help modal.
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  // State to manage the visibility of the results modal.
  const [isResultsModalOpen, setIsResultsModalOpen] = useState<boolean>(false);

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
   * Updates the detailed results based on the user's answer in an exercise.
   * @param {ActivityType} activityType - The type of activity being played.
   * @param {boolean} isCorrect - Whether the user's answer was correct.
   * @param {number} points - The number of points to add or subtract.
   */
  const handleAnswer = useCallback((activityType: ActivityType, isCorrect: boolean, points: number) => {
      setDetailedResults(prev => {
          const newResults = { ...prev };
          // Get the current results for the specific activity, or initialize if it's the first time.
          const currentActivityResults = newResults[activityType] || { correct: 0, incorrect: 0, score: 0 };
          
          if (isCorrect) {
              currentActivityResults.correct += 1;
          } else {
              currentActivityResults.incorrect += 1;
          }
          
          // Add or subtract points.
          currentActivityResults.score += points;

          // To avoid discouraging the user, an activity's score cannot be negative.
          if (currentActivityResults.score < 0) {
            currentActivityResults.score = 0;
          }
          
          newResults[activityType] = currentActivityResults;
          return newResults;
      });
  }, []);

  // Calculate the total score from the detailed results object.
  const totalScore = Object.values(detailedResults).reduce((sum, result) => sum + (result?.score || 0), 0);

  /**
   * Renders the component corresponding to the current activity state.
   * This function acts as the main router for the application.
   * @returns {JSX.Element} The component to be rendered.
   */
  const renderActivity = () => {
    // Helper function to create a handler for a specific activity type.
    const createAnswerHandler = (activityType: ActivityType) => (isCorrect: boolean, points: number) => handleAnswer(activityType, isCorrect, points);
    let exerciseComponent: React.ReactNode;

    switch (activity) {
      case ActivityType.COMPLETE_LETTER:
        exerciseComponent = <CompleteLetterExercise onAnswer={createAnswerHandler(ActivityType.COMPLETE_LETTER)} />;
        break;
      case ActivityType.COMPLETE_WORD:
        exerciseComponent = <CompleteWordExercise onAnswer={createAnswerHandler(ActivityType.COMPLETE_WORD)} />;
        break;
      case ActivityType.MATCHING_GAME:
        exerciseComponent = <MatchingGame onAnswer={createAnswerHandler(ActivityType.MATCHING_GAME)} />;
        break;
      case ActivityType.WORD_SCRAMBLE:
        exerciseComponent = <WordScrambleExercise onAnswer={createAnswerHandler(ActivityType.WORD_SCRAMBLE)} />;
        break;
      case ActivityType.WHO_AM_I:
        exerciseComponent = <WhoAmIExercise onAnswer={createAnswerHandler(ActivityType.WHO_AM_I)} />;
        break;
      case ActivityType.SENTENCE_BUILDER:
        exerciseComponent = <SentenceBuilderExercise onAnswer={createAnswerHandler(ActivityType.SENTENCE_BUILDER)} />;
        break;
      case ActivityType.WORD_HUNTER:
        exerciseComponent = <WordHunterExercise onAnswer={createAnswerHandler(ActivityType.WORD_HUNTER)} />;
        break;
      case ActivityType.FLASH_WORD:
        exerciseComponent = <FlashWordExercise onAnswer={createAnswerHandler(ActivityType.FLASH_WORD)} />;
        break;
      case ActivityType.DAYS_OF_WEEK:
        exerciseComponent = <DaysOfWeekExercise onAnswer={createAnswerHandler(ActivityType.DAYS_OF_WEEK)} />;
        break;
      case ActivityType.OPPOSITES_MATCH:
        exerciseComponent = <OppositesMatchExercise onAnswer={createAnswerHandler(ActivityType.OPPOSITES_MATCH)} />;
        break;
      case ActivityType.MENU:
      default:
        // If the activity is MENU or any other value, show the main menu.
        return <MainMenu 
          onSelectActivity={handleSelectActivity} 
          onOpenHelp={() => setIsHelpModalOpen(true)}
          onOpenResults={() => setIsResultsModalOpen(true)}
        />;
    }
    
    // For any exercise, wrap it in the ActivityShell to provide a consistent UI.
    return (
        <ActivityShell score={totalScore} onBackToMenu={handleBackToMenu}>
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
      
      {/* Render the Results Modal */}
      <ResultsModal isOpen={isResultsModalOpen} onClose={() => setIsResultsModalOpen(false)} results={detailedResults} totalScore={totalScore} />
      
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