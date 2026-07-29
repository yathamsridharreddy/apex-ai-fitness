import React, { useEffect } from 'react';
import { useFitnessStore } from './store/useFitnessStore';
import { Navbar } from './components/Navbar';
import { ToastBanner } from './components/ToastBanner';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { WorkoutEnginePage } from './pages/WorkoutEnginePage';
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage';
import { LiveWorkoutPage } from './pages/LiveWorkoutPage';
import { FormAnalysisPage } from './pages/FormAnalysisPage';
import { IndianDietPage } from './pages/IndianDietPage';
import { FoodScannerPage } from './pages/FoodScannerPage';
import { MuscleMapPage } from './pages/MuscleMapPage';
import { AiCoachPage } from './pages/AiCoachPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AdminPage } from './pages/AdminPage';
import { ExerciseDetailModal } from './components/modals/ExerciseDetailModal';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { CelebrationModal } from './components/modals/CelebrationModal';

const App: React.FC = () => {
  const { theme, activeTab, auth } = useFitnessStore();

  useEffect(() => {
    document.body.classList.remove('light-mode', 'oled-mode');
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else if (theme === 'oled') {
      document.body.classList.add('oled-mode');
    }
  }, [theme]);

  // If user is not logged in, display the Authentication & Login Screen (zero predefined user data)
  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col relative overflow-x-hidden">
        <ToastBanner />
        <LoginPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Ambient Spotlight Backgrounds */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Glass Navigation Header */}
      <Navbar />

      {/* Global Toast Notification Banner (Zero browser alerts) */}
      <ToastBanner />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-28 relative z-10">
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'workout-engine' && <WorkoutEnginePage />}
        {activeTab === 'exercise-library' && <ExerciseLibraryPage />}
        {activeTab === 'live-workout' && <LiveWorkoutPage />}
        {activeTab === 'form-analysis' && <FormAnalysisPage />}
        {activeTab === 'diet-planner' && <IndianDietPage />}
        {activeTab === 'food-scanner' && <FoodScannerPage />}
        {activeTab === 'muscle-map' && <MuscleMapPage />}
        {activeTab === 'ai-coach' && <AiCoachPage />}
        {activeTab === 'analytics' && <AnalyticsPage />}
        {activeTab === 'admin' && <AdminPage />}
      </main>

      {/* Global Modals */}
      <ExerciseDetailModal />
      <OnboardingModal />
      <CelebrationModal />
    </div>
  );
};

export default App;
