import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useFitnessStore } from '../store/useFitnessStore';
import { soundService } from '../services/soundService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AnalyticsPage: React.FC = () => {
  const { profile, showToast } = useFitnessStore();
  const [chartType, setChartType] = useState<'strength' | 'weight' | 'consistency'>('strength');

  const strengthData = {
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'],
    datasets: [
      {
        label: 'Squat 1RM (kg)',
        data: [95, 97.5, 100, 102.5, 107.5, 110],
        borderColor: '#0A84FF',
        backgroundColor: 'rgba(10, 132, 255, 0.15)',
        tension: 0.3,
        fill: true,
        borderWidth: 3
      },
      {
        label: 'Bench Press 1RM (kg)',
        data: [75, 77.5, 77.5, 80, 82.5, 85],
        borderColor: '#30D158',
        backgroundColor: 'rgba(48, 209, 88, 0.15)',
        tension: 0.3,
        fill: true,
        borderWidth: 3
      }
    ]
  };

  const weightData = {
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'],
    datasets: [
      {
        label: 'Body Weight (kg)',
        data: [70.6, 70.0, 69.5, 69.1, 68.6, 68.2],
        borderColor: '#BF5AF2',
        backgroundColor: 'rgba(191, 90, 242, 0.15)',
        tension: 0.3,
        fill: true,
        borderWidth: 3
      }
    ]
  };

  const consistencyData = {
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'],
    datasets: [
      {
        label: 'Weekly Workouts Completed',
        data: [4, 5, 5, 5, 4, 5],
        borderColor: '#FF9F0A',
        backgroundColor: 'rgba(255, 159, 10, 0.15)',
        tension: 0.2,
        fill: true,
        borderWidth: 3
      }
    ]
  };

  const currentData =
    chartType === 'weight'
      ? weightData
      : chartType === 'consistency'
      ? consistencyData
      : strengthData;

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#FFFFFF', font: { weight: 'bold' } }
      }
    },
    scales: {
      x: {
        ticks: { color: '#A1A8B8' },
        grid: { color: 'rgba(255,255,255,0.06)' }
      },
      y: {
        ticks: { color: '#A1A8B8' },
        grid: { color: 'rgba(255,255,255,0.06)' }
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Crisp Minimal Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Progress Analytics
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Interactive charts for strength, weight, and consistency.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                soundService.playClick();
                setChartType('strength');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold shadow ${
                chartType === 'strength' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'
              }`}
            >
              Strength 1RM
            </button>
            <button
              onClick={() => {
                soundService.playClick();
                setChartType('weight');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold shadow ${
                chartType === 'weight' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'
              }`}
            >
              Weight & Fat %
            </button>
            <button
              onClick={() => {
                soundService.playClick();
                setChartType('consistency');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold shadow ${
                chartType === 'consistency' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'
              }`}
            >
              Workout Frequency
            </button>
          </div>
        </div>

        <div className="glass-card p-6 shadow-glow-blue">
          <div className="h-80 w-full">
            <Line data={currentData} options={options} />
          </div>
        </div>
      </div>

      {/* Gamification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg">Gamification & Badges</h3>
            <span className="text-xs text-amber-400 font-extrabold">
              Level {profile.level} • {profile.totalXp} XP
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/40 text-center shadow-sm">
              <div className="text-3xl">🔥</div>
              <div className="text-xs font-extrabold text-white mt-1.5">7-Day Streak</div>
              <div className="text-[10px] text-amber-300 font-semibold">+300 XP</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/40 text-center shadow-sm">
              <div className="text-3xl">🏋️‍♂️</div>
              <div className="text-xs font-extrabold text-white mt-1.5">100-Ton Club</div>
              <div className="text-[10px] text-blue-300 font-semibold">+1000 XP</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/40 text-center shadow-sm">
              <div className="text-3xl">🥗</div>
              <div className="text-xs font-extrabold text-white mt-1.5">Thali Master</div>
              <div className="text-[10px] text-emerald-300 font-semibold">+250 XP</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/40 text-center shadow-sm">
              <div className="text-3xl">🎯</div>
              <div className="text-xs font-extrabold text-white mt-1.5">Form Perfect</div>
              <div className="text-[10px] text-purple-300 font-semibold">+400 XP</div>
            </div>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-white/10">
            <div className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
              Weekly Challenge Progress
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-extrabold text-white">5-Session Iron Week</div>
                <div className="text-[11px] text-gray-400">Complete 5 scheduled workouts this week</div>
              </div>
              <span className="px-3.5 py-1 rounded-lg bg-blue-600/30 text-blue-300 font-extrabold text-xs">
                4 / 5 Done
              </span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="lg:col-span-5 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg">Leaderboard</h3>
            <span className="text-xs font-extrabold text-cyan-400">Top 5% Rank</span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center space-x-3">
                <span className="font-extrabold text-amber-400">#1</span>
                <span className="font-bold text-sm">Vikramaditya S. 🏆</span>
              </div>
              <span className="text-xs font-bold text-gray-300">Level 14 • 18,500 XP</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center space-x-3">
                <span className="font-extrabold text-gray-300">#2</span>
                <span className="font-bold text-sm">Aarav Mehta ⚡</span>
              </div>
              <span className="text-xs font-bold text-gray-300">Level 12 • 14,200 XP</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-600/30 border border-blue-500/50 shadow-md">
              <div className="flex items-center space-x-3">
                <span className="font-extrabold text-cyan-300">#3</span>
                <span className="font-extrabold text-sm text-white">{profile.name} (You) 🔥</span>
              </div>
              <span className="text-xs font-extrabold text-cyan-300">
                Level {profile.level} • {profile.totalXp} XP
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center space-x-3">
                <span className="font-extrabold text-gray-400">#4</span>
                <span className="font-bold text-sm">Rohan Kapoor 💪</span>
              </div>
              <span className="text-xs font-bold text-gray-400">Level 6 • 1,100 XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wearable Sync */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg">Connected Wearables</h3>
            <p className="text-xs text-gray-400">
              Supports Apple Watch, Wear OS, Garmin, Samsung Galaxy Watch, and Fitbit.
            </p>
          </div>
          <button
            onClick={() => {
              soundService.playSuccess();
              showToast(
                'All Apple Watch & Garmin telemetry synced! HR: 54 bpm, HRV: 78 ms.',
                'success'
              );
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg transition"
          >
            Sync Devices Now
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/40 shadow-sm">
            <div className="font-extrabold text-sm text-white">Apple Watch</div>
            <div className="text-xs text-emerald-400 font-extrabold mt-1">Connected ✓</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5">
            <div className="font-bold text-sm text-white">Garmin Fenix</div>
            <div className="text-xs text-gray-400 font-bold mt-1">Available</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5">
            <div className="font-bold text-sm text-white">Samsung Watch</div>
            <div className="text-xs text-gray-400 font-bold mt-1">Available</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5">
            <div className="font-bold text-sm text-white">Wear OS</div>
            <div className="text-xs text-gray-400 font-bold mt-1">Available</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5">
            <div className="font-bold text-sm text-white">Fitbit</div>
            <div className="text-xs text-gray-400 font-bold mt-1">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};
