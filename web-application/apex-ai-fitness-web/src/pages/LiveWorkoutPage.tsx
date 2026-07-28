import React, { useState, useEffect } from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { soundService } from '../services/soundService';
import { PlayCircle, Eye, Volume2, Plus, ArrowRight, Droplets, Home } from 'lucide-react';

export const LiveWorkoutPage: React.FC = () => {
  const {
    liveWorkout,
    toggleCompleteSet,
    addLiveSet,
    finishLiveWorkout,
    logWater
  } = useFitnessStore();

  const [restTimeRemain, setRestTimeRemain] = useState<number>(0);
  const [workoutTimeSec, setWorkoutTimeSec] = useState<number>(142);
  const [currentSlug, setCurrentSlug] = useState<string>('bodyweight-jump-squat');

  useEffect(() => {
    const timer = setInterval(() => {
      setWorkoutTimeSec((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer: any = null;
    if (restTimeRemain > 0) {
      timer = setInterval(() => {
        setRestTimeRemain((prev) => {
          if (prev <= 1) {
            soundService.playVoiceCue(
              '/audio/rest_timer_done.mp3',
              'Rest time is up! Get ready for your next set.'
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [restTimeRemain]);

  const startRestTimer = (sec: number) => {
    soundService.playClick();
    setRestTimeRemain(sec);
  };

  const formatTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(min).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const EX_INFO: Record<string, { name: string; primary: string; secondary: string; image: string; tempo: string; breath: string; equip: string }> = {
    'bodyweight-jump-squat': {
      name: 'Explosive Bodyweight Jump Squat',
      primary: 'Quadriceps',
      secondary: 'Glutes, Hamstrings, Calves',
      image: 'images/exercise_bodyweight_squat.jpg',
      tempo: '2-0-X-0 (Explosive Jump)',
      breath: 'Inhale Down / Exhale Jump',
      equip: '100% Without Gym Equipment (Home Floor)'
    },
    'strict-push-up': {
      name: 'Strict Anatomical Floor Push-Up',
      primary: 'Pectoralis Major',
      secondary: 'Anterior Deltoids, Triceps',
      image: 'images/exercise_floor_pushup.jpg',
      tempo: '2-1-1-0 (1s Floor Pause)',
      breath: 'Inhale Down / Exhale Up',
      equip: '100% Without Gym Equipment (Home Floor)'
    },
    'bulgarian-split-squat-home': {
      name: 'Chair Bulgarian Split Squat',
      primary: 'Quadriceps',
      secondary: 'Gluteus Maximus, Hamstrings',
      image: 'images/exercise_chair_split_squat.jpg',
      tempo: '3-1-1-0 (3s Negative)',
      breath: 'Inhale Down / Exhale Up',
      equip: '100% Without Gym Equipment (Home Chair)'
    },
    'barbell-back-squat': {
      name: 'Barbell Back Squat',
      primary: 'Quadriceps',
      secondary: 'Glutes, Hamstrings',
      image: 'images/exercise_barbell_squat.jpg',
      tempo: '3-1-1-0 (3s Descent)',
      breath: 'Inhale Down / Exhale Up',
      equip: 'Barbell Rack (Gym Equipment)'
    },
    'barbell-bench-press': {
      name: 'Flat Barbell Bench Press',
      primary: 'Pectoralis Major',
      secondary: 'Anterior Deltoid, Triceps',
      image: 'images/exercise_bench_press.jpg',
      tempo: '2-1-1-0 (2s Lowering)',
      breath: 'Inhale Down / Exhale Up',
      equip: 'Barbell Bench (Gym Equipment)'
    },
    'conventional-deadlift': {
      name: 'Conventional Barbell Deadlift',
      primary: 'Erector Spinae',
      secondary: 'Glutes, Hamstrings, Lats',
      image: 'images/exercise_deadlift.jpg',
      tempo: '2-0-1-1 (Dead Stop)',
      breath: 'Brace Bottom / Exhale Top',
      equip: 'Barbell & Plates (Gym Equipment)'
    }
  };

  const info = EX_INFO[currentSlug] || EX_INFO['bodyweight-jump-squat'];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="glass-card p-6 border-blue-500/40 bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-glow-blue">
        <div>
          <div className="flex items-center space-x-2 text-xs font-extrabold text-cyan-400 uppercase tracking-wider mb-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Live Workout Protocol Active • AI Voice Coach Ready</span>
          </div>
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-extrabold">{info.name}</h2>
            {info.equip.includes('Without Gym') ? (
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-extrabold shadow">
                🏠 100% ZERO GYM EQUIPMENT
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-extrabold shadow">
                🏋️ GYM EQUIPMENT
              </span>
            )}
          </div>
          <p className="text-xs text-gray-300 mt-1">
            Primary: <span className="text-blue-400 font-bold">{info.primary}</span> • Secondary:{' '}
            <span className="text-cyan-400 font-bold">{info.secondary}</span> • <span className="text-emerald-400 font-bold">{info.equip}</span>
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Switch Exercise</div>
            <select
              value={currentSlug}
              onChange={(e) => {
                soundService.playClick();
                setCurrentSlug(e.target.value);
              }}
              className="bg-transparent text-white text-xs font-bold focus:outline-none"
            >
              <optgroup label="🏠 100% Without Gym Equipment (Home)">
                <option value="bodyweight-jump-squat" className="bg-gray-900">
                  Explosive Bodyweight Jump Squat (0% Gym)
                </option>
                <option value="strict-push-up" className="bg-gray-900">
                  Strict Anatomical Floor Push-Up (0% Gym)
                </option>
                <option value="bulgarian-split-squat-home" className="bg-gray-900">
                  Chair Bulgarian Split Squat (0% Gym)
                </option>
              </optgroup>
              <optgroup label="🏋️ Gym Equipment Required">
                <option value="barbell-back-squat" className="bg-gray-900">
                  Barbell Back Squat
                </option>
                <option value="barbell-bench-press" className="bg-gray-900">
                  Flat Bench Press
                </option>
                <option value="conventional-deadlift" className="bg-gray-900">
                  Conventional Deadlift
                </option>
              </optgroup>
            </select>
          </div>

          {/* Workout Elapsed Timer */}
          <div className="text-center px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Workout Time</div>
            <div className="text-lg font-extrabold font-mono text-cyan-300">
              {formatTime(workoutTimeSec)}
            </div>
          </div>

          {/* Rest Timer Button / Modal */}
          <div
            className="text-center px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-500/40 cursor-pointer transition hover:bg-orange-500/30"
            onClick={() => startRestTimer(60)}
          >
            <div className="text-[10px] text-orange-300 font-bold uppercase">Rest Timer</div>
            <div className="text-lg font-extrabold font-mono text-orange-400">
              {formatTime(restTimeRemain)}
            </div>
          </div>

          {/* Finish Workout Button */}
          <button
            onClick={finishLiveWorkout}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/40 transition transform hover:scale-105"
          >
            Finish & Claim XP
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols */}
        <div className="lg:col-span-7 glass-card p-6 flex flex-col justify-between space-y-4">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/15 flex items-center justify-center group">
            <img
              src={info.image}
              alt={info.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-cyan-500/40 text-xs font-extrabold text-cyan-300 flex items-center space-x-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>3D Muscle Overlay: {info.primary}</span>
            </div>
            <button
              onClick={() =>
                soundService.playVoiceCue(
                  '/audio/workout_start.mp3',
                  "Welcome to your Apex AI workout session. Let's focus on proper form, tempo, and progressive overload. Let's begin!"
                )
              }
              className="absolute bottom-4 right-4 px-4 py-2.5 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-extrabold shadow-lg flex items-center space-x-2 backdrop-blur-md transition"
            >
              <Volume2 className="w-4 h-4" />
              <span>Hear Voice Coach Cue</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs font-bold text-gray-400">Tempo Protocol</div>
              <div className="text-sm font-extrabold text-white mt-0.5">{info.tempo}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs font-bold text-gray-400">Breathing Cue</div>
              <div className="text-sm font-extrabold text-cyan-400 mt-0.5">{info.breath}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs font-bold text-gray-400">Equipment Needed</div>
              <div className="text-sm font-extrabold text-emerald-400 mt-0.5">{info.equip.includes('Without Gym') ? '0% Gym Equipment' : 'Barbell/Weights'}</div>
            </div>
          </div>

          {/* RPE Selector */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">
                Rate of Perceived Exertion (RPE) Target
              </div>
              <div className="text-[11px] text-gray-400">
                Select exertion difficulty after each set
              </div>
            </div>
            <div className="flex items-center space-x-1.5">
              {[7.0, 8.0, 9.0, 10.0].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    soundService.playSuccess();
                    alert(
                      `Set RPE recorded: ${val}. AI progressive overload will adjust your next working set load automatically!`
                    );
                  }}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-blue-600 text-xs font-bold transition"
                >
                  {val === 10.0 ? '10 (Max)' : val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 cols */}
        <div className="lg:col-span-5 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base">Current Sets & Progression</h3>
            <span className="text-xs font-extrabold text-blue-400">
              Set {liveWorkout.sets.filter((s) => s.isCompleted).length + 1} of {liveWorkout.sets.length}{' '}
              Active
            </span>
          </div>

          {/* Sets List */}
          <div className="space-y-2.5">
            {liveWorkout.sets.map((s, idx) => (
              <div
                key={s.setNum}
                className={`flex items-center justify-between p-3.5 rounded-xl ${
                  s.isCompleted
                    ? 'bg-emerald-500/10 border border-emerald-500/30'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-7 h-7 rounded-full ${
                      s.isCompleted ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-400'
                    } flex items-center justify-center text-xs font-bold`}
                  >
                    {s.setNum}
                  </span>
                  <div>
                    <div className="text-xs font-extrabold text-white">
                      {s.weight === 0 ? 'Bodyweight' : `${s.weight} kg`} x {s.reps} reps
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium">Target RPE: 8.0</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    toggleCompleteSet(idx);
                    if (!s.isCompleted) {
                      startRestTimer(60);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-lg ${
                    s.isCompleted ? 'bg-emerald-600 text-white' : 'bg-white/10 text-gray-300'
                  } text-xs font-extrabold transition`}
                >
                  {s.isCompleted ? 'Completed ✓' : 'Mark Done'}
                </button>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2.5 pt-3 border-t border-white/10">
            <button
              onClick={addLiveSet}
              className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Set</span>
            </button>
            <button
              onClick={() => {
                soundService.playSuccess();
                setCurrentSlug('strict-push-up');
                alert('Advancing to next exercise: Strict Anatomical Floor Push-Up (100% Without Gym Equipment)!');
              }}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-extrabold text-white transition flex items-center justify-center space-x-1.5 shadow-lg shadow-blue-500/30"
            >
              <span>Next Exercise</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hydration Box */}
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-cyan-300">Hydration Alert</div>
                <div className="text-[11px] text-gray-400">Drink 150ml water between sets</div>
              </div>
            </div>
            <button
              onClick={() => logWater(0.15)}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/30 hover:bg-cyan-500/50 text-cyan-300 text-xs font-extrabold transition"
            >
              +150ml
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
