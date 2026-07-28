import React, { useEffect, useState } from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { soundService } from '../services/soundService';
import {
  Zap,
  Flame,
  Award,
  HeartPulse,
  Volume2,
  VolumeX,
  UserCheck,
  Shield,
  LayoutDashboard,
  Cpu,
  Activity,
  PlayCircle,
  Camera,
  Utensils,
  Scan,
  User,
  Bot,
  TrendingUp
} from 'lucide-react';
import { TabId } from '../types';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    profile,
    theme,
    setTheme,
    isVoiceCoachOn,
    toggleVoiceCoach,
    openOnboardingModal
  } = useFitnessStore();

  const [timeStr, setTimeStr] = useState<string>('18:30');

  useEffect(() => {
    const update = () => {
      const str = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTimeStr(str);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'workout-engine', label: 'Workout Engine', icon: <Cpu className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'exercise-library', label: 'Exercise Library', icon: <Activity className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'live-workout', label: 'Live Workout', icon: <PlayCircle className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'form-analysis', label: 'Form Camera', icon: <Camera className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'diet-planner', label: 'Indian Diet', icon: <Utensils className="w-3.5 h-3.5 text-green-400" /> },
    { id: 'food-scanner', label: 'Food Scanner', icon: <Scan className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'muscle-map', label: '3D Muscle Map', icon: <User className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'ai-coach', label: 'AI Coach', icon: <Bot className="w-3.5 h-3.5 text-pink-400" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> }
  ];

  return (
    <header className="glass-header sticky top-0 z-50 px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Clean Title */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              APEX AI
            </span>
            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full uppercase tracking-wider">
              PRO
            </span>
          </div>
        </div>

        {/* Essential Telemetry Pills */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-semibold text-xs">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{profile.streakDays} Day Streak</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold text-xs">
            <Award className="w-4 h-4 text-blue-500" />
            <span>Lvl {profile.level} • {profile.totalXp} XP</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-xs">
            <HeartPulse className="w-4 h-4 text-emerald-500" />
            <span>{profile.recoveryScore}% Recovery</span>
          </div>
        </div>

        {/* Clean Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={toggleVoiceCoach}
            className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/40 text-blue-400 flex items-center space-x-1.5 text-xs font-semibold transition"
          >
            {isVoiceCoachOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">Voice: {isVoiceCoachOn ? 'ON' : 'OFF'}</span>
          </button>

          {/* Theme Switcher */}
          <div className="flex items-center bg-white/10 dark:bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => {
                soundService.playClick();
                setTheme('dark');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => {
                soundService.playClick();
                setTheme('oled');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                theme === 'oled'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              OLED
            </button>
            <button
              onClick={() => {
                soundService.playClick();
                setTheme('light');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                theme === 'light'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Light
            </button>
          </div>

          <button
            onClick={openOnboardingModal}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold flex items-center space-x-1.5 transition"
          >
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className="p-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-400 transition"
            title="Admin Portal"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-Navbar */}
      <nav className="max-w-7xl mx-auto mt-2.5 flex items-center space-x-1.5 overflow-x-auto py-1 border-t border-white/10 no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs transition shrink-0 ${
              activeTab === t.id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};
