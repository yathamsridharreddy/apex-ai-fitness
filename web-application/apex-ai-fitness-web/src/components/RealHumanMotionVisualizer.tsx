// APEX AI FITNESS — PRO (Realistic 3D Human Picture Biomechanical Motion Engine)
// Animates the actual photorealistic 3D human picture through realistic biomechanical motion
// (planted feet, bending knees/hips, lowering torso to parallel depth) on HTML5 Canvas.

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, Eye, Layers } from 'lucide-react';
import { soundService } from '../services/soundService';

interface RealHumanMotionProps {
  image: string;
  name: string;
  primaryMuscle: string;
  targetReps?: number;
  tempo?: string;
  motionType?: 'squat' | 'pushup' | 'row' | 'pike' | 'split_squat' | 'default';
}

export const RealHumanMotionVisualizer: React.FC<RealHumanMotionProps> = ({
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
  const [showSkeletonOverlay, setShowSkeletonOverlay] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load the realistic 3D picture into an image element for canvas rendering
  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      imgRef.current = img;
    };
  }, [image]);

  useEffect(() => {
    if (!isPlaying) return;

    const cycleDurationMs = 3800 / speed;
    const intervalMs = 30;
    const step = (intervalMs / cycleDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next < 48) {
          setPhase('ECCENTRIC');
        } else if (next >= 48 && next < 62) {
          setPhase('ISOMETRIC');
        } else if (next >= 62 && next < 100) {
          setPhase('CONCENTRIC');
        } else {
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

  // Calculate normalized depth (0 = standing/lockout, 1 = full parallel/bottom depth)
  const getDepthFactor = () => {
    if (!isPlaying) return 0;
    if (progress < 48) {
      return Math.sin((progress / 48) * (Math.PI / 2));
    } else if (progress < 62) {
      return 1.0;
    } else {
      const pUp = (progress - 62) / 38;
      return 1.0 - Math.sin(pUp * (Math.PI / 2));
    }
  };

  const depth = getDepthFactor();

  // Biomechanical joint angles calculated from kinematics
  const kneeAngleDeg = Math.round(180 - depth * 92); // 180° down to 88° parallel
  const hipAngleDeg = Math.round(180 - depth * 75); // 180° down to 105°
  const elbowAngleDeg = Math.round(180 - depth * 105); // 180° down to 75°

  // Kinematic Canvas Rendering of the Realistic 3D Human Picture
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const img = imgRef.current;
    if (!img) {
      // If image still loading, render dark background
      ctx.fillStyle = '#08090D';
      ctx.fillRect(0, 0, width, height);
      return;
    }

    // DRAW THE REALISTIC 3D HUMAN PICTURE MOVING LIKE A HUMAN:
    // For Squat / Split Squat / Deadlift:
    // We segment-render the 3D image so that:
    // - The bottom 25% of the photo (feet and floor line) remains planted at the bottom of the canvas
    // - The middle 40% of the photo (thighs, knees, hips) compresses vertically and moves down as the human squats
    // - The top 35% of the photo (torso, shoulders, head) moves down vertically and leans forward slightly
    if (motionType === 'squat' || motionType === 'split_squat' || motionType === 'default') {
      const imgW = img.width;
      const imgH = img.height;

      // 1. Planted Ground & Shadow beneath the 3D Human's feet
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.beginPath();
      ctx.ellipse(width / 2, height - 25, 120 + depth * 20, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Segment 1: Bottom / Planted Feet & Floor (static ground contact)
      const feetSrcY = imgH * 0.75;
      const feetSrcH = imgH * 0.25;
      const feetDestY = height * 0.75;
      const feetDestH = height * 0.25;
      ctx.drawImage(img, 0, feetSrcY, imgW, feetSrcH, 0, feetDestY, width, feetDestH);

      // 3. Segment 2: Middle / Knees & Thighs (compresses & lowers as hips drop to parallel)
      const thighSrcY = imgH * 0.35;
      const thighSrcH = imgH * 0.40;
      const thighDropY = depth * 28; // hips lower by 28px
      const thighDestY = height * 0.35 + thighDropY * 0.4;
      const thighDestH = height * 0.40 - thighDropY * 0.3;
      ctx.drawImage(
        img,
        0,
        thighSrcY,
        imgW,
        thighSrcH,
        0,
        thighDestY,
        width,
        thighDestH
      );

      // 4. Segment 3: Top / Torso, Shoulders & Head (lowers smoothly with hips and leans forward)
      const topSrcY = 0;
      const topSrcH = imgH * 0.35;
      const topDropY = depth * 28; // torso lowers 28px down with hips
      const topDestY = topDropY;
      const topDestH = height * 0.35;

      ctx.save();
      // Apply slight forward hinge tilt around hip pivot as they squat down
      ctx.translate(width / 2, topDestY + topDestH);
      ctx.rotate((depth * 4 * Math.PI) / 180); // 4 degree forward lean
      ctx.drawImage(
        img,
        0,
        topSrcY,
        imgW,
        topSrcH,
        -width / 2,
        -topDestH,
        width,
        topDestH
      );
      ctx.restore();

      // 5. Dynamic 3D Anatomical Muscle Contraction Highlight Overlay on Quads & Glutes
      const quadX = width * 0.48;
      const quadY = height * 0.55 + depth * 15;
      const grad = ctx.createRadialGradient(quadX, quadY, 5, quadX, quadY, 70);
      grad.addColorStop(0, `rgba(10, 132, 255, ${0.4 + depth * 0.45})`);
      grad.addColorStop(0.6, `rgba(48, 209, 88, ${0.2 + depth * 0.3})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(quadX, quadY, 75, 45, 0, 0, Math.PI * 2);
      ctx.fill();

      // 6. Optional Skeleton Overlay (if user clicks "Show Skeleton Overlay")
      if (showSkeletonOverlay) {
        ctx.strokeStyle = 'rgba(48, 209, 88, 0.85)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width * 0.5, height * 0.2 + depth * 25);
        ctx.lineTo(width * 0.5, height * 0.5 + depth * 20);
        ctx.lineTo(width * 0.52, height * 0.72);
        ctx.lineTo(width * 0.52, height * 0.88);
        ctx.stroke();

        // Joint dots
        ctx.fillStyle = '#0A84FF';
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.5 + depth * 20, 6, 0, Math.PI * 2); // Hip
        ctx.arc(width * 0.52, height * 0.72, 6, 0, Math.PI * 2); // Knee
        ctx.fill();
      }
    } else {
      // PUSH-UP / PIKE / ROW ANATOMICAL PICTURE MOTION:
      // Planted hands/toes, chest lowers toward floor line as elbows bend
      const imgW = img.width;
      const imgH = img.height;
      const dropY = depth * 25; // chest lowers 25px toward floor

      ctx.save();
      ctx.drawImage(img, 0, dropY * 0.4, width, height - dropY * 0.4);
      ctx.restore();

      // Pectorals & Triceps Muscle Contraction Glow
      const pecX = width * 0.5;
      const pecY = height * 0.55 + dropY;
      const grad = ctx.createRadialGradient(pecX, pecY, 5, pecX, pecY, 85);
      grad.addColorStop(0, `rgba(10, 132, 255, ${0.45 + depth * 0.45})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(pecX, pecY, 85, 45, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [image, progress, depth, motionType, showSkeletonOverlay]);

  const getPhaseStyle = () => {
    if (phase === 'ECCENTRIC') {
      return {
        label: '⬇️ LOWERING (Eccentric)',
        color: 'bg-orange-500/85 text-white border-orange-400'
      };
    }
    if (phase === 'ISOMETRIC') {
      return {
        label: '⏸️ BOTTOM HOLD (Parallel)',
        color: 'bg-emerald-500/85 text-white border-emerald-400'
      };
    }
    return {
      label: '⬆️ EXPLODING UP (Concentric)',
      color: 'bg-blue-600/85 text-white border-blue-400'
    };
  };

  const phaseStyle = getPhaseStyle();

  const resetAnimation = () => {
    soundService.playClick();
    setCurrentRep(1);
    setProgress(0);
    setPhase('ECCENTRIC');
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0A0D14] border border-white/15 flex flex-col justify-between select-none shadow-xl">
      {/* HTML5 Canvas Kinematic Rendering of the Realistic 3D Human Picture */}
      <canvas
        ref={canvasRef}
        width={640}
        height={360}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Ambient Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

      {/* Top Bar: Muscle Badge & Animated Cadence Phase Pill */}
      <div className="relative z-10 p-3.5 flex items-center justify-between gap-2">
        <div className="px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-cyan-500/40 text-xs font-extrabold text-cyan-300 flex items-center space-x-1.5 shadow">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>3D Muscle: {primaryMuscle} ({Math.round(depth * 100)}% Contraction)</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Optional Skeleton Guide Overlay Toggle */}
          <button
            onClick={() => {
              soundService.playClick();
              setShowSkeletonOverlay(!showSkeletonOverlay);
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold border flex items-center space-x-1 transition ${
              showSkeletonOverlay
                ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 border-white/15'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showSkeletonOverlay ? 'Skeleton Guide: ON' : 'Skeleton Guide: OFF'}</span>
          </button>

          <div
            className={`px-3 py-1 rounded-xl backdrop-blur-md border text-xs font-extrabold transition-colors shadow ${phaseStyle.color}`}
          >
            {phaseStyle.label}
          </div>
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
              Real Human Tempo: {tempo} • {motionType === 'squat' ? `${kneeAngleDeg}° Knee` : `${elbowAngleDeg}° Elbow`}
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
