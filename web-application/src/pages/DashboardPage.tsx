import React from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import {
  Dumbbell,
  Flame,
  Beef,
  Droplets,
  Footprints,
  HeartPulse,
  Cpu,
  Utensils,
  TrendingUp,
  Moon,
  Calendar,
  Trophy,
  Play,
  Sliders,
  ArrowRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { profile, logWater, setActiveTab, openOnboardingModal } = useFitnessStore();

  const caloriesRemain = Math.max(0, profile.targetCalories - profile.currentCaloriesConsumed);
  const proteinRemain = Math.max(0, profile.targetProtein - profile.currentProteinConsumed);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="glass-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/20 border-blue-500/30 shadow-glow-blue">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Live AI Telemetry Active • APEX ENTERPRISE ENGINE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Good evening, <span className="text-blue-400">{profile.name}</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-2xl leading-relaxed">
              Your recovery score is <strong className="text-emerald-400">{profile.recoveryScore}% (Peak Readiness)</strong>. AI Progressive Overload recommends +2.5kg on your primary lifts today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('live-workout')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-blue-600/40 flex items-center space-x-2 transition transform hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Today's Workout</span>
            </button>
            <button
              onClick={openOnboardingModal}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-sm font-bold border border-white/15 flex items-center space-x-2 transition"
            >
              <Sliders className="w-4 h-4" />
              <span>23-Point Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Core Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Workout Today */}
        <div
          className="glass-card p-4 flex flex-col justify-between cursor-pointer"
          onClick={() => setActiveTab('live-workout')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Today's Workout</span>
            <Dumbbell className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-3">
            <div className="text-lg font-extrabold">Push Hypertrophy</div>
            <div className="text-xs text-cyan-400 font-semibold mt-0.5">5 Exercises • 45 Min</div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 border-t border-white/10 pt-2 font-medium">
            <span>RPE 8.0 Target</span>
            <span className="text-blue-400 font-bold">Ready →</span>
          </div>
        </div>

        {/* Calories Remain */}
        <div className="glass-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Calories Remain</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-orange-400">{caloriesRemain}</div>
            <div className="text-xs text-gray-400 font-medium">
              Goal: {profile.targetCalories} kcal/day
            </div>
          </div>
          <div className="mt-3 w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: '38%' }}
            ></div>
          </div>
        </div>

        {/* Protein Remain */}
        <div className="glass-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Protein Remain</span>
            <Beef className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-purple-400">{proteinRemain}g</div>
            <div className="text-xs text-gray-400 font-medium">
              Goal: {profile.targetProtein}g / day
            </div>
          </div>
          <div className="mt-3 w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: '48%' }}
            ></div>
          </div>
        </div>

        {/* Water Intake */}
        <div className="glass-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Water Intake</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-cyan-400">
              {profile.currentWaterLiters}L
            </div>
            <div className="text-xs text-gray-400 font-medium">Target: 3.5 Liters</div>
          </div>
          <div className="mt-3 flex items-center space-x-1.5">
            <button
              onClick={() => logWater(0.25)}
              className="flex-1 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 text-[11px] font-bold transition"
            >
              +250ml
            </button>
            <button
              onClick={() => logWater(0.5)}
              className="flex-1 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 text-[11px] font-bold transition"
            >
              +500ml
            </button>
          </div>
        </div>

        {/* Steps Today */}
        <div className="glass-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Steps Today</span>
            <Footprints className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-400">{profile.currentSteps}</div>
            <div className="text-xs text-gray-400 font-medium">Goal: 10,000 steps</div>
          </div>
          <div className="mt-3 w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-green-400 h-2 rounded-full transition-all duration-500"
              style={{ width: '84%' }}
            ></div>
          </div>
        </div>

        {/* Recovery Score */}
        <div className="glass-card p-4 flex flex-col justify-between border-emerald-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Recovery Score</span>
            <HeartPulse className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-400">
              {profile.recoveryScore}%
            </div>
            <div className="text-xs text-emerald-400 font-semibold">Peak Readiness</div>
          </div>
          <div className="mt-3 text-[11px] text-gray-400 font-medium border-t border-white/10 pt-2">
            HRV: 78ms • RHR: 54 bpm
          </div>
        </div>
      </div>

      {/* Middle Grid (6 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: AI Coach Suggestions */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="font-extrabold text-base">AI Coach Suggestions</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Live Engine
            </span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/25 text-blue-200">
              <strong className="text-blue-300 block mb-1 text-sm">
                ⚡ Progressive Overload Action:
              </strong>
              Your recovery is 92%. Add <strong>+2.5kg</strong> to Barbell Squat and Bench Press today!
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-200">
              <strong className="text-emerald-300 block mb-1 text-sm">
                🥗 Indian Diet Optimization:
              </strong>
              Consume 1 bowl of Sprouted Moong Salad at 4:30 PM to reach your 135g protein target.
            </div>
          </div>
          <button
            onClick={() => setActiveTab('ai-coach')}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-cyan-400 transition flex items-center justify-center space-x-1"
          >
            <span>Chat with 24/7 AI Coach</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Today's Meals */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Utensils className="w-4 h-4 text-green-400" />
              </div>
              <h3 className="font-extrabold text-base">Today's Meals (Indian Plan)</h3>
            </div>
            <button
              onClick={() => setActiveTab('diet-planner')}
              className="text-xs text-blue-400 font-bold hover:underline"
            >
              Full Plan
            </button>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-xs">
              <div>
                <span className="font-bold block text-white">Breakfast: 2 Medium Idli + Sambar</span>
                <span className="text-gray-400 text-[11px]">7:30 AM • 340 kcal • 14g Protein</span>
              </div>
              <span className="text-emerald-400 font-bold">Logged ✓</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-xs">
              <div>
                <span className="font-bold block text-white">Lunch: Yellow Dal Tadka + 2 Roti</span>
                <span className="text-gray-400 text-[11px]">1:00 PM • 470 kcal • 18g Protein</span>
              </div>
              <span className="text-emerald-400 font-bold">Logged ✓</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-xs border border-blue-500/40">
              <div>
                <span className="font-bold block text-blue-300">Dinner: Paneer Tikka + Salad</span>
                <span className="text-gray-400 text-[11px]">8:00 PM • 530 kcal • 32g Protein</span>
              </div>
              <button
                onClick={() => {
                  alert('Logged Dinner: High-Protein Paneer Tikka Bowl!');
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px]"
              >
                Log Meal
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Body Composition Progress */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="font-extrabold text-base">Body Composition Progress</h3>
            </div>
            <span className="text-xs text-purple-400 font-extrabold">-2.4 kg Overall</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-2xl bg-white/5">
              <div className="text-xs text-gray-400 font-medium">Weight</div>
              <div className="text-xl font-extrabold text-white mt-1">{profile.weightKg} kg</div>
              <div className="text-[10px] text-emerald-400 font-bold mt-0.5">-0.4 kg week</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5">
              <div className="text-xs text-gray-400 font-medium">Body Fat</div>
              <div className="text-xl font-extrabold text-white mt-1">{profile.bodyFatPercentage}%</div>
              <div className="text-[10px] text-emerald-400 font-bold mt-0.5">-1.2% mo</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5">
              <div className="text-xs text-gray-400 font-medium">BMI</div>
              <div className="text-xl font-extrabold text-white mt-1">22.8</div>
              <div className="text-[10px] text-emerald-400 font-bold mt-0.5">Optimal</div>
            </div>
          </div>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span>Weekly Target: 5/5 Workouts</span>
            <button
              onClick={() => setActiveTab('analytics')}
              className="text-purple-400 font-bold"
            >
              View Charts →
            </button>
          </div>
        </div>

        {/* Card 4: Sleep Score */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <Moon className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="font-extrabold text-base">Sleep & Nervous System</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400">
              Apple Watch Synced
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold text-indigo-300">88% Score</div>
              <div class="text-xs text-gray-400 mt-1">7 hrs 42 mins total • 2 hrs Deep REM</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-emerald-400">HRV: 78 ms (+8ms)</div>
              <div className="text-xs text-gray-400 mt-0.5">Resting HR: 54 bpm</div>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
              style={{ width: '88%' }}
            ></div>
          </div>
        </div>

        {/* Card 5: Upcoming Protocol */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-extrabold text-base">Upcoming Protocol</h3>
            </div>
            <span className="text-xs text-gray-400 font-medium">Week 4 • Hypertrophy</span>
          </div>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-600/20 border border-blue-500/30">
              <div>
                <span className="font-extrabold text-blue-300 block">
                  Today: Push (Chest / Shoulders / Triceps)
                </span>
                <span className="text-gray-400 text-[11px]">
                  5 Exercises • Estimated 450 kcal Burned
                </span>
              </div>
              <button
                onClick={() => setActiveTab('live-workout')}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px]"
              >
                Start
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div>
                <span className="font-semibold block text-white">
                  Tomorrow: Pull (Back / Biceps / Rear Delts)
                </span>
                <span className="text-gray-400 text-[11px]">6 Exercises • Scheduled 6:30 AM</span>
              </div>
              <span className="text-gray-500 text-[11px] font-semibold">Scheduled</span>
            </div>
          </div>
        </div>

        {/* Card 6: Personal Records */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="font-extrabold text-base">PRs & Badges</h3>
            </div>
            <span className="text-xs text-amber-400 font-extrabold">5 Unlocked</span>
          </div>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
              <span className="font-semibold text-white">Barbell Back Squat PR</span>
              <span className="text-amber-400 font-bold font-mono">110.0 kg (July 25)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
              <span className="font-semibold text-white">Flat Bench Press PR</span>
              <span className="text-amber-400 font-bold font-mono">85.0 kg (July 22)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
              <span className="font-semibold text-white">Latest Achievement</span>
              <span className="text-cyan-400 font-bold">🔥 7-Day Iron Streak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
