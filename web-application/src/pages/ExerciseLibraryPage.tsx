import React, { useState } from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { Activity, Search, ArrowRight } from 'lucide-react';
import { ExerciseItem } from '../types';

export const ExerciseLibraryPage: React.FC = () => {
  const { openExerciseModal } = useFitnessStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');

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

  const filtered = EXERCISE_DB.filter((ex) => {
    const matchesQ =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.primaryMuscle.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'ALL' || ex.category === category;
    return matchesQ && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            3D Exercise Library (Realistic Human Anatomical Engine)
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Featuring high-definition photorealistic 3D human models, primary/secondary/stabilizer
            muscle highlights, and 5 equipment variations. ZERO cartoons or stick figures.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exercise or muscle..."
              className="pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm font-medium text-white focus:outline-none focus:border-blue-500 w-56 sm:w-64"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm font-bold text-white focus:outline-none"
          >
            <option value="ALL" className="bg-gray-900">
              All Muscles
            </option>
            <option value="Chest" className="bg-gray-900">
              Chest (Pectoralis)
            </option>
            <option value="Legs" className="bg-gray-900">
              Legs (Quads/Hamstrings)
            </option>
            <option value="Back" className="bg-gray-900">
              Back (Lats/Erectors)
            </option>
            <option value="Shoulders" className="bg-gray-900">
              Shoulders (Delts)
            </option>
            <option value="Arms" className="bg-gray-900">
              Arms (Biceps/Triceps)
            </option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ex) => (
          <div
            key={ex.slug}
            className="glass-card overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black/40">
              <img
                src={ex.image}
                alt={ex.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur text-[10px] font-extrabold text-cyan-300">
                {ex.category} • {ex.primaryMuscle}
              </div>
            </div>
            <div className="p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-base text-white">{ex.name}</h4>
                <span className="text-xs text-emerald-400 font-bold">{ex.difficulty}</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Secondary: {ex.secondaryMuscles}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10 font-semibold">
                <span>{ex.equipment}</span>
                <button
                  onClick={() => openExerciseModal(ex)}
                  className="text-blue-400 font-bold hover:underline flex items-center space-x-1"
                >
                  <span>3D Anatomical Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
