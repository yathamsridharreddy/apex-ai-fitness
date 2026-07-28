import React from 'react';
import { useFitnessStore } from '../../store/useFitnessStore';
import { soundService } from '../../services/soundService';
import { Trophy } from 'lucide-react';

export const CelebrationModal: React.FC = () => {
  const { showCelebrationModal, closeCelebrationModal, setActiveTab } = useFitnessStore();

  if (!showCelebrationModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 text-center space-y-5 border-blue-500/40 shadow-glow-blue">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-bounce">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-extrabold text-white">Workout Complete!</h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          Outstanding performance! You crushed your RPE target, logged a new PR, and earned{' '}
          <strong className="text-amber-400">+250 XP</strong>.
        </p>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-left space-y-2 font-semibold">
          <div className="flex justify-between">
            <span>Workout Streak:</span> <strong className="text-orange-400">🔥 8 Days (+1)</strong>
          </div>
          <div className="flex justify-between">
            <span>Level Progress:</span>{' '}
            <strong className="text-blue-400">Lvl 6 (1,700 / 3,000 XP)</strong>
          </div>
          <div className="flex justify-between">
            <span>Total Volume Lifted:</span>{' '}
            <strong className="text-emerald-400">4,820 kg</strong>
          </div>
        </div>
        <button
          onClick={() => {
            soundService.playClick();
            closeCelebrationModal();
            setActiveTab('dashboard');
          }}
          className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-lg shadow-blue-500/30 transition"
        >
          Continue to Dashboard →
        </button>
      </div>
    </div>
  );
};
