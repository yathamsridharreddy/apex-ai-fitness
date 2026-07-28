// APEX AI FITNESS — PRO (Realistic Human Exercise Motion & Animated Rep Counter Engine)
// Animates 3D anatomical human models through eccentric/concentric cycles with a real-time rep counter.

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Activity } from 'lucide-react';
import { soundService } from '../services/soundService';

interface VisualizerProps {
  image: string;
  name: string;
  primaryMuscle: string;
  targetReps?: number;
  tempo?: string;
  motionType?: 'squat' | 'pushup' | 'row' | 'pike' | 'split_squat' | 'default';
}

export const ExerciseMotionVisualizer: React.FC<VisualizerProps> = ({
  image,
  name,
  primaryMuscle,
  targetReps = 15,
  tempo = '3-1-1-0',
  motionType = 'squat'
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1.0); // 1.0x normal, 0.5x slow-mo
  const [currentRep, setCurrentRep] = useState<number>(1);
  const [phase, setPhase] = useState<'ECCENTRIC' | 'ISOMETRIC' | 'CONCENTRIC'>('ECCENTRIC');
  const [progress, setProgress] = useState<number>(0); // 0 to 100 within current rep

  useEffect(() => {
    if (!isPlaying) return;

    // A complete rep takes 4000ms at 1.0x speed
    const cycleDurationMs = 4000 / speed;
    const intervalMs = 50;
    const step = (intervalMs / cycleDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next < 50) {
          setPhase('ECCENTRIC');
        } else if (next >= 50 && next < 65) {
          setPhase('ISOMETRIC');
        } else if (next >= 65 && next < 100) {
          setPhase('CONCENTRIC');
        } else {
          // Rep completed
          setCurrentRep((r) => {
            const nextRep = r >= targetReps ? 1 : r + 1;
            if (nextRep === 1) {
              soundService.playSuccess();
            } else {
              soundService.playClick();
            }
            return nextRep;
          });
          return 0;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, speed, targetReps]);

  const resetAnimation = () => {
    soundService.playClick();
    setCurrentRep(1);
    setProgress(0);
    setPhase('ECCENTRIC');
  };

  // Determine CSS motion transform based on motionType and progress
  const getMotionTransform = () => {
    if (!isPlaying) return 'scale(1) translate(0px, 0px)';

    // Sine wave calculation from progress (0 to 100)
    const rad = (progress / 100) * Math.PI * 2;
    const wave = Math.sin(rad); // oscillates between -1 and 1

    switch (motionType) {
      case 'squat':
      case 'split_squat':
        // Smooth vertical knee/hip flexion motion
        const translateY = wave * 14;
        const scaleSq = 1 + wave * 0.04;
        return `translateY(${translateY}px) scale(${scaleSq})`;
      case 'pushup':
      case 'pike':
        // Smooth chest/shoulder pressing motion
        const pushScale = 1 - wave * 0.07;
        const pushY = wave * 10;
        return `translateY(${pushY}px) scale(${pushScale})`;
      case 'row':
        // Smooth scapular pulling motion
        const rowX = wave * -10;
        const rowScale = 1 + wave * 0.05;
        return `translateX(${rowX}px) scale(${rowScale})`;
      default:
        const defY = wave * 10;
        return `translateY(${defY}px) scale(${1 + wave * 0.03})`;
    }
  };

  const getPhaseStyle = () => {
    if (phase === 'ECCENTRIC') {
      return { label: '⬇️ LOWERING (Eccentric)', color: 'bg-orange-500/80 text-white border-orange-400' };
    }
    if (phase === 'ISOMETRIC') {
      return { label: '⏸️ BOTTOM HOLD (Parallel)', color: 'bg-emerald-500/80 text-white border-emerald-400' };
    }
    return { label: '⬆️ EXPLODING UP (Concentric)', color: 'bg-blue-600/80 text-white border-blue-400' };
  };

  const phaseStyle = getPhaseStyle();

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/15 flex flex-col justify-between select-none shadow-xl">
      {/* Animated Biomechanical Human Model Image */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          style={{
            transform: getMotionTransform(),
            transition: 'transform 0.05s linear'
          }}
          className="w-full h-full object-cover origin-center"
        />
        {/* Ambient Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Top Bar: Muscle Badge & Animated Cadence Phase Pill */}
      <div className="relative z-10 p-3.5 flex items-center justify-between gap-2">
        <div className="px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-cyan-500/40 text-xs font-extrabold text-cyan-300 flex items-center space-x-1.5 shadow">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>3D Muscle: {primaryMuscle}</span>
        </div>

        <div
          className={`px-3 py-1 rounded-xl backdrop-blur-md border text-xs font-extrabold transition-colors shadow ${phaseStyle.color}`}
        >
          {phaseStyle.label}
        </div>
      </div>

      {/* Bottom Bar: Live Rep Counter Gauge & Animation Speed Controls */}
      <div className="relative z-10 p-3.5 flex items-center justify-between gap-2 bg-black/70 backdrop-blur-md border-t border-white/15">
        {/* Live Animated Rep Counter */}
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Circular Progress Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-cyan-400 transition-all duration-75"
                strokeDasharray={`${progress}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-extrabold text-white font-mono">
              {currentRep}
            </span>
          </div>
          <div>
            <div className="text-xs font-extrabold text-white uppercase tracking-wider">
              REP {currentRep} OF {targetReps}
            </div>
            <div className="text-[10px] text-gray-400 font-semibold">
              Real Human Tempo: {tempo}
            </div>
          </div>
        </div>

        {/* Animation Play / Pause / Slow-Mo Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => {
              soundService.playClick();
              setIsPlaying(!isPlaying);
            }}
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              setSpeed((s) => (s === 1.0 ? 0.5 : 1.0));
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition ${
              speed === 0.5
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {speed === 1.0 ? '1.0X Pace' : '0.5X Slow-Mo'}
          </button>

          <button
            onClick={resetAnimation}
            title="Reset Rep Counter"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
