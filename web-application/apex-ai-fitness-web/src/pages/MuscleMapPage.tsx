import React, { useState } from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { soundService } from '../services/soundService';
import { ExerciseItem } from '../types';

export const MuscleMapPage: React.FC = () => {
  const { openExerciseModal } = useFitnessStore();
  const [view, setView] = useState<'FRONT' | 'BACK'>('FRONT');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('Chest');

  const EXERCISE_DB: ExerciseItem[] = [
    {
      slug: 'barbell-back-squat',
      name: 'Barbell Back Squat',
      category: 'Legs',
      primaryMuscle: 'Quadriceps',
      secondaryMuscles: 'Gluteus Maximus, Hamstrings',
      equipment: 'Barbell Rack',
      difficulty: 'Intermediate',
      calories: 11.2,
      image: 'images/exercise_barbell_squat.jpg',
      instructions: [
        'Position the barbell evenly across upper trapezius muscles.',
        'Unrack with feet shoulder-width apart, toes slightly angled out 15 degrees.',
        'Brace core, inhale deeply, and initiate by breaking at hips and knees simultaneously.',
        'Descend until thighs break parallel with floor while keeping chest elevated.',
        'Drive aggressively through mid-foot to extend hips and knees back to start.'
      ],
      mistakes: [
        'Allowing knees to collapse inward (valgus)',
        'Excessive forward lean',
        'Rising onto toes'
      ],
      tempo: '3-1-1-0 (3s Descent)',
      breathing: 'Inhale and brace at top; hold during descent; exhale on ascent.',
      homeVersion: 'Bodyweight Jump Squat or Bulgarian Split Squat',
      machineVersion: 'Smith Machine Squat or Leg Press',
      dumbbellVersion: 'Dumbbell Goblet Squat'
    },
    {
      slug: 'barbell-bench-press',
      name: 'Flat Barbell Bench Press',
      category: 'Chest',
      primaryMuscle: 'Pectoralis Major',
      secondaryMuscles: 'Anterior Deltoid, Triceps Brachii',
      equipment: 'Barbell Bench',
      difficulty: 'Intermediate',
      calories: 9.5,
      image: 'images/exercise_bench_press.jpg',
      instructions: [
        'Lie flat on the bench with eyes directly below the barbell.',
        'Grip slightly wider than shoulder-width with wrists stacked straight.',
        'Retract and depress scapulae, creating a slight arch in the lower back.',
        'Lower bar under control to the lower sternum (nipple line).',
        'Press explosively upward and slightly back toward collarbones.'
      ],
      mistakes: [
        'Flaring elbows out to 90 degrees',
        'Bouncing bar off chest',
        'Lifting buttocks off bench'
      ],
      tempo: '2-1-1-0 (2s Lowering)',
      breathing: 'Inhale at top; lower bar; exhale as you press through sticking point.',
      homeVersion: 'Strict Deficit Push-Up',
      machineVersion: 'Seated Chest Press Machine',
      dumbbellVersion: 'Flat Dumbbell Bench Press'
    },
    {
      slug: 'conventional-deadlift',
      name: 'Conventional Barbell Deadlift',
      category: 'Back',
      primaryMuscle: 'Erector Spinae',
      secondaryMuscles: 'Gluteus Maximus, Hamstrings, Latissimus Dorsi',
      equipment: 'Barbell & Plates',
      difficulty: 'Advanced',
      calories: 12.8,
      image: 'images/exercise_deadlift.jpg',
      instructions: [
        'Stand with mid-foot directly underneath the barbell, feet hip-width apart.',
        'Hinge at hips and grip the bar shoulder-width apart.',
        'Drop hips slightly, raise chest, and engage lats by imagining squeezing oranges in armpits.',
        'Drive through the floor with legs while extending hips until standing tall.',
        'Return the bar to the floor by hinging hips back.'
      ],
      mistakes: [
        'Rounding the lumbar spine',
        'Hitching barbell up thighs',
        'Starting with hips too low'
      ],
      tempo: '2-0-1-1 (Dead Stop)',
      breathing:
        'Inhale and brace 360-degree intra-abdominal pressure at bottom; exhale at lockout.',
      homeVersion: 'Single-Leg Romanian Deadlift',
      machineVersion: 'Smith Machine RDL',
      dumbbellVersion: 'Dumbbell Romanian Deadlift'
    },
    {
      slug: 'overhead-shoulder-press',
      name: 'Standing Military Overhead Press',
      category: 'Shoulders',
      primaryMuscle: 'Anterior Deltoid',
      secondaryMuscles: 'Medial Deltoid, Triceps Brachii, Upper Trapezius',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      calories: 8.9,
      image: 'images/exercise_bench_press.jpg',
      instructions: [
        'Rest barbell on upper chest and anterior deltoids with elbows slightly forward.',
        'Brace glutes and abs to create a solid column of support.',
        'Press bar in a straight vertical line, tilting head slightly back to clear chin.',
        'Once bar passes forehead, press head forward under the bar into full lockout.'
      ],
      mistakes: ['Excessive lower back arching', 'Pressing bar forward instead of vertically'],
      tempo: '2-0-1-0',
      breathing: 'Inhale at chest level; exhale as arms reach overhead lockout.',
      homeVersion: 'Pike Push-Up',
      machineVersion: 'Seated Overhead Shoulder Machine',
      dumbbellVersion: 'Seated Dumbbell Shoulder Press'
    },
    {
      slug: 'pull-ups',
      name: 'Strict Pronated Pull-Up',
      category: 'Back',
      primaryMuscle: 'Latissimus Dorsi',
      secondaryMuscles: 'Biceps Brachii, Teres Major, Rhomboids',
      equipment: 'Pull-Up Bar',
      difficulty: 'Intermediate',
      calories: 10.4,
      image: 'images/exercise_deadlift.jpg',
      instructions: [
        'Grip overhead bar slightly wider than shoulder width with palms facing away.',
        'Initiate movement by depressing scapulae and driving elbows down toward hips.',
        'Pull chest up until chin clears the horizontal bar.',
        'Lower under control to a dead hang with arms fully extended.'
      ],
      mistakes: ['Kipping or swinging legs', 'Incomplete lower range of motion', 'Shrugging shoulders'],
      tempo: '2-1-1-0',
      breathing: 'Exhale while pulling up; inhale on the controlled lowering phase.',
      homeVersion: 'Doorframe Towel Rows',
      machineVersion: 'Assisted Pull-Up Machine / Lat Pulldown',
      dumbbellVersion: 'Dumbbell Bent-Over Row'
    },
    {
      slug: 'romanian-deadlift',
      name: 'Romanian Barbell Deadlift (RDL)',
      category: 'Legs',
      primaryMuscle: 'Hamstrings',
      secondaryMuscles: 'Gluteus Maximus, Erector Spinae',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      calories: 9.8,
      image: 'images/exercise_deadlift.jpg',
      instructions: [
        'Stand holding barbell at hip level with shoulder-width grip.',
        'Keep a slight 15-degree bend in knees and hold that knee angle constant.',
        'Hinge hips backward as far as possible, sliding the bar down your thighs.',
        'When you feel a deep hamstring stretch (mid-shin), squeeze glutes and extend hips forward.'
      ],
      mistakes: ['Bending knees too much', 'Rounding lower back'],
      tempo: '3-1-1-0',
      breathing: 'Inhale on the hinge down; exhale as you squeeze glutes at top.',
      homeVersion: 'Single-Leg Bodyweight RDL',
      machineVersion: 'Lying Leg Curl Machine',
      dumbbellVersion: 'Dumbbell Romanian Deadlift'
    }
  ];

  const handleSelectMuscle = (m: string) => {
    soundService.playClick();
    setSelectedMuscle(m);
  };

  const matching = EXERCISE_DB.filter(
    (e) => e.category === selectedMuscle || e.primaryMuscle.includes(selectedMuscle)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Interactive 3D Anatomical Muscle Map
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Tap any muscle group (Chest, Back, Shoulders, Biceps, Triceps, Forearms, Core, Glutes,
            Quads, Hamstrings, Calves, Neck) to filter matching exercises with instant 3D preview.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              soundService.playClick();
              setView('FRONT');
            }}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold shadow ${
              view === 'FRONT' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'
            }`}
          >
            Front View
          </button>
          <button
            onClick={() => {
              soundService.playClick();
              setView('BACK');
            }}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold shadow ${
              view === 'BACK' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'
            }`}
          >
            Back View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Map 5 cols */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col items-center justify-center min-h-[460px] bg-black/40 rounded-3xl relative shadow-glow-blue">
          {view === 'FRONT' ? (
            <div className="w-64 sm:w-72 h-96 relative">
              <svg viewBox="0 0 200 400" className="w-full h-full">
                <path
                  d="M100 20 C110 20, 115 28, 115 38 C115 48, 110 55, 100 55 C90 55, 85 48, 85 38 C85 28, 90 20, 100 20 Z"
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.5"
                />
                <path
                  onClick={() => handleSelectMuscle('Neck')}
                  className="muscle-interactive"
                  d="M92 56 L108 56 L112 70 L88 70 Z"
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.3)"
                />
                <path
                  onClick={() => handleSelectMuscle('Shoulders')}
                  className="muscle-interactive"
                  d="M68 72 C58 78, 55 95, 60 110 L75 95 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.4)"
                />
                <path
                  onClick={() => handleSelectMuscle('Shoulders')}
                  className="muscle-interactive"
                  d="M132 72 C142 78, 145 95, 140 110 L125 95 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.4)"
                />
                <path
                  onClick={() => handleSelectMuscle('Chest')}
                  className="muscle-interactive muscle-active"
                  d="M75 75 C100 75, 100 75, 125 75 L120 110 C100 115, 100 115, 80 110 Z"
                  fill="#0A84FF"
                  stroke="rgba(255,255,255,0.5)"
                />
                <path
                  onClick={() => handleSelectMuscle('Arms')}
                  className="muscle-interactive"
                  d="M60 112 L72 105 L68 145 L56 142 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.4)"
                />
                <path
                  onClick={() => handleSelectMuscle('Arms')}
                  className="muscle-interactive"
                  d="M140 112 L128 105 L132 145 L144 142 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.4)"
                />
                <path
                  onClick={() => handleSelectMuscle('Core')}
                  className="muscle-interactive"
                  d="M82 115 L118 115 L114 175 L86 175 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.4)"
                />
                <path
                  onClick={() => handleSelectMuscle('Legs')}
                  className="muscle-interactive"
                  d="M76 185 L98 185 L92 270 L72 265 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.4)"
                />
                <path
                  onClick={() => handleSelectMuscle('Legs')}
                  className="muscle-interactive"
                  d="M124 185 L102 185 L108 270 L128 265 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.4)"
                />
              </svg>
              <div className="text-center text-xs text-cyan-400 font-bold mt-2">
                Tap any muscle above to view matching exercises!
              </div>
            </div>
          ) : (
            <div className="w-64 sm:w-72 h-96 relative">
              <svg viewBox="0 0 200 400" className="w-full h-full">
                <path
                  onClick={() => handleSelectMuscle('Back')}
                  className="muscle-interactive"
                  d="M72 75 L128 75 L116 165 L84 165 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.4)"
                />
                <path
                  onClick={() => handleSelectMuscle('Legs')}
                  className="muscle-interactive"
                  d="M78 170 L122 170 L126 215 L74 215 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.4)"
                />
                <path
                  onClick={() => handleSelectMuscle('Legs')}
                  className="muscle-interactive"
                  d="M76 220 L96 220 L92 275 L74 275 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.4)"
                />
                <path
                  onClick={() => handleSelectMuscle('Legs')}
                  className="muscle-interactive"
                  d="M124 220 L104 220 L108 275 L126 275 Z"
                  fill="rgba(255,255,255,0.2)"
                  stroke="rgba(255,255,255,0.4)"
                />
              </svg>
              <div className="text-center text-xs text-cyan-400 font-bold mt-2">
                Back Anatomy View • Tap Back, Glutes or Hamstrings
              </div>
            </div>
          )}
        </div>

        {/* Right 7 cols */}
        <div className="lg:col-span-7 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-cyan-400 font-extrabold uppercase tracking-wider">
                Target Group
              </span>
              <h3 className="text-2xl font-extrabold text-white">{selectedMuscle} Group</h3>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-extrabold border border-blue-500/30">
              {matching.length} Exercises Found
            </span>
          </div>

          <div className="space-y-3">
            {matching.map((ex) => (
              <div key={ex.slug} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={ex.image}
                    alt={ex.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-white">{ex.name}</h4>
                    <p className="text-xs text-gray-400 font-medium">Primary: {ex.primaryMuscle}</p>
                  </div>
                </div>
                <button
                  onClick={() => openExerciseModal(ex)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow transition"
                >
                  3D Guide
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
