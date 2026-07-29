import React from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { Cpu, ArrowRight, Home } from 'lucide-react';
import { ExerciseItem } from '../types';

export const WorkoutEnginePage: React.FC = () => {
  const {
    selectedWorkoutType,
    setSelectedWorkoutType,
    openExerciseModal,
    setActiveTab,
    enableHomeWorkoutMode,
    showToast
  } = useFitnessStore();

  const EXERCISE_DB: ExerciseItem[] = [
    {
      slug: 'bodyweight-jump-squat',
      name: 'Explosive Bodyweight Jump Squat',
      category: 'Legs',
      primaryMuscle: 'Quadriceps',
      secondaryMuscles: 'Gluteus Maximus, Hamstrings, Calves',
      equipment: '100% Without Gym Equipment (Home Floor)',
      difficulty: 'Beginner',
      calories: 12.5,
      image: '/images/exercise_bodyweight_squat.jpg',
      instructions: [
        'Stand with feet shoulder-width apart on your home floor.',
        'Hinge hips back and descend until thighs break parallel.',
        'Explode upward through mid-foot into a vertical jump.',
        'Land softly with slightly bent knees and immediately transition into the next repetition.'
      ],
      mistakes: [
        'Landing with stiff knees',
        'Allowing knees to collapse inward',
        'Leaning torso too far forward'
      ],
      tempo: '2-0-X-0 (Explosive Jump)',
      breathing: 'Inhale on controlled descent; exhale explosively on the jump.',
      homeVersion: 'Bodyweight Jump Squat (Primary No Gym)',
      machineVersion: 'Leg Press Machine',
      dumbbellVersion: 'Dumbbell Goblet Squat'
    },
    {
      slug: 'strict-push-up',
      name: 'Strict Anatomical Floor Push-Up',
      category: 'Chest',
      primaryMuscle: 'Pectoralis Major',
      secondaryMuscles: 'Anterior Deltoid, Triceps Brachii',
      equipment: '100% Without Gym Equipment (Home Floor)',
      difficulty: 'Beginner',
      calories: 9.8,
      image: '/images/exercise_floor_pushup.jpg',
      instructions: [
        'Place hands slightly wider than shoulder-width on your home floor.',
        'Brace core and glutes to create a straight line from heels to head.',
        'Lower chest under control until it lightly grazes the floor with elbows tucked at 45°.',
        'Press explosively through palms back to full lockout.'
      ],
      mistakes: [
        'Flaring elbows out to 90 degrees',
        'Sagging hips or arching lumbar spine',
        'Incomplete lockout at the top'
      ],
      tempo: '2-1-1-0 (1s Floor Pause)',
      breathing: 'Inhale while lowering chest; exhale forcefully while pressing up.',
      homeVersion: 'Strict Anatomical Floor Push-Up (Primary No Gym)',
      machineVersion: 'Seated Chest Press Machine',
      dumbbellVersion: 'Flat Dumbbell Bench Press'
    },
    {
      slug: 'bulgarian-split-squat-home',
      name: 'Chair Bulgarian Split Squat',
      category: 'Legs',
      primaryMuscle: 'Quadriceps',
      secondaryMuscles: 'Gluteus Maximus, Hamstrings',
      equipment: '100% Without Gym Equipment (Home Chair)',
      difficulty: 'Intermediate',
      calories: 11.0,
      image: '/images/exercise_chair_split_squat.jpg',
      instructions: [
        'Elevate rear foot on a sturdy household chair or sofa behind you.',
        'Hop front foot forward so shin remains relatively vertical at the bottom.',
        'Lower rear knee toward floor until front thigh breaks parallel.',
        'Drive through front heel to return to standing position.'
      ],
      mistakes: [
        'Placing front foot too close to chair',
        'Allowing front knee to wobble',
        'Hyperextending lumbar spine'
      ],
      tempo: '3-1-1-0 (3s Negative)',
      breathing: 'Inhale down; exhale as you drive up.',
      homeVersion: 'Chair Bulgarian Split Squat (Primary No Gym)',
      machineVersion: 'Leg Press Machine Single-Leg',
      dumbbellVersion: 'Dumbbell Bulgarian Split Squat'
    },
    {
      slug: 'pike-push-up-home',
      name: 'Bodyweight Pike Shoulder Push-Up',
      category: 'Shoulders',
      primaryMuscle: 'Anterior Deltoid',
      secondaryMuscles: 'Upper Trapezius, Triceps Brachii',
      equipment: '100% Without Gym Equipment (Home Floor)',
      difficulty: 'Intermediate',
      calories: 9.2,
      image: '/images/exercise_pike_pushup.jpg',
      instructions: [
        'Assume a downward dog / inverted V position with hips elevated high.',
        'Bend elbows to lower crown of head forward toward floor in front of hands.',
        'Press hands into floor to push torso up and back into inverted V lockout.'
      ],
      mistakes: ['Flaring elbows wide', 'Dropping hips flat into a standard push-up'],
      tempo: '2-1-1-0 (Controlled Descent)',
      breathing: 'Inhale as head lowers; exhale as shoulders press overhead.',
      homeVersion: 'Bodyweight Pike Push-Up (Primary No Gym)',
      machineVersion: 'Seated Shoulder Press Machine',
      dumbbellVersion: 'Seated Dumbbell Shoulder Press'
    },
    {
      slug: 'doorframe-towel-row',
      name: 'Doorframe / Table Inverted Row',
      category: 'Back',
      primaryMuscle: 'Latissimus Dorsi',
      secondaryMuscles: 'Rhomboids, Biceps Brachii, Rear Delts',
      equipment: '100% Without Gym Equipment (Home Doorframe)',
      difficulty: 'Beginner',
      calories: 9.0,
      image: '/images/exercise_doorframe_row.jpg',
      instructions: [
        'Grip both sides of a sturdy household doorframe or use a towel looped around a secure door handle.',
        'Lean torso back with heels planted on floor and core braced.',
        'Pull chest toward doorframe by driving elbows backward and squeezing scapulae together.',
        'Extend arms under control back to full stretch.'
      ],
      mistakes: ['Shrugging shoulders toward ears', 'Using momentum from hips'],
      tempo: '2-1-1-0 (1s Scapular Squeeze)',
      breathing: 'Exhale while pulling chest up; inhale on controlled release.',
      homeVersion: 'Doorframe Towel Row (Primary No Gym)',
      machineVersion: 'Lat Pulldown / Seated Cable Row',
      dumbbellVersion: 'Dumbbell Bent-Over Row'
    },
    {
      slug: 'barbell-back-squat',
      name: 'Barbell Back Squat',
      category: 'Legs',
      primaryMuscle: 'Quadriceps',
      secondaryMuscles: 'Gluteus Maximus, Hamstrings',
      equipment: 'Barbell Rack (Gym Equipment Required)',
      difficulty: 'Intermediate',
      calories: 11.2,
      image: '/images/exercise_barbell_squat.jpg',
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
      equipment: 'Barbell Bench (Gym Equipment Required)',
      difficulty: 'Intermediate',
      calories: 9.5,
      image: '/images/exercise_bench_press.jpg',
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
      equipment: 'Barbell & Plates (Gym Equipment Required)',
      difficulty: 'Advanced',
      calories: 12.8,
      image: '/images/exercise_deadlift.jpg',
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
    }
  ];

  let list = EXERCISE_DB;
  if (selectedWorkoutType === 'UPPER_LOWER') {
    list = EXERCISE_DB.filter((e) => ['Chest', 'Back', 'Shoulders'].includes(e.category));
  }
  if (selectedWorkoutType === 'HOME_WORKOUT' || selectedWorkoutType === 'CALISTHENICS') {
    list = EXERCISE_DB.filter((e) => e.equipment.includes('Without Gym Equipment'));
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Workout Engine
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Adaptive workout protocols tailored to your recovery, injuries, and available equipment.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={enableHomeWorkoutMode}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-extrabold shadow-lg flex items-center space-x-1.5 transition"
          >
            <Home className="w-4 h-4" />
            <span>100% Zero-Gym Mode</span>
          </button>
          <select
            value={selectedWorkoutType}
            onChange={(e) => {
              setSelectedWorkoutType(e.target.value);
              showToast(`Protocol switched to ${e.target.value.replace(/_/g, ' ')}`, 'info');
            }}
            className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm font-bold text-white focus:outline-none focus:border-blue-500"
          >
            <option value="PUSH_PULL_LEGS" className="bg-gray-900">
              Push Pull Legs (Hypertrophy Focus)
            </option>
            <option value="HOME_WORKOUT" className="bg-gray-900">
              🏠 Home Workout (100% Zero Gym Equipment)
            </option>
            <option value="CALISTHENICS" className="bg-gray-900">
              🏠 Calisthenics Mastery (100% Zero Gym Equipment)
            </option>
            <option value="UPPER_LOWER" className="bg-gray-900">
              Upper Lower Split (4-Day)
            </option>
            <option value="BODYBUILDING" className="bg-gray-900">
              Bodybuilding (Aesthetic Muscle Gain)
            </option>
            <option value="POWERLIFTING" className="bg-gray-900">
              Powerlifting (Squat / Bench / Deadlift)
            </option>
            <option value="STRENGTH" className="bg-gray-900">
              Pure Strength (5x5 Compound Focus)
            </option>
            <option value="FAT_LOSS" className="bg-gray-900">
              Fat Loss & Metabolic Conditioning
            </option>
            <option value="MUSCLE_GAIN" className="bg-gray-900">
              Lean Muscle Gain Protocol
            </option>
            <option value="ATHLETE" className="bg-gray-900">
              Athlete Power & Explosive Performance
            </option>
            <option value="CROSSFIT" className="bg-gray-900">
              CrossFit AMRAP & MetCon Engine
            </option>
            <option value="HIIT" className="bg-gray-900">
              HIIT High-Intensity Cardio Burn
            </option>
            <option value="SENIOR_FITNESS" className="bg-gray-900">
              Senior Fitness & Joint Mobility
            </option>
            <option value="WOMENS_FITNESS" className="bg-gray-900">
              Women's Holistic Sculpt & Glute Focus
            </option>
          </select>
          <button
            onClick={() => showToast('Protocol Generated! Your progressive overload targets are active.', 'success')}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-extrabold shadow-lg shadow-blue-500/30 transition"
          >
            Generate Plan
          </button>
        </div>
      </div>

      {/* Concise Telemetry Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-900/30 to-emerald-900/20 border-blue-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-glow-blue">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h4 className="font-extrabold text-base">
              Active Plan: {selectedWorkoutType.replace(/_/g, ' ')}
            </h4>
            <p className="text-xs text-gray-300 mt-1">
              {selectedWorkoutType === 'HOME_WORKOUT' || selectedWorkoutType === 'CALISTHENICS'
                ? '🏠 100% Zero Gym Equipment Mode: Bodyweight calisthenics & floor mastery.'
                : 'Progressive Overload Active: Recommending +2.5kg increase based on 92% recovery score.'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xs font-semibold">
          <div className="text-center px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            <div className="text-gray-400">Duration</div>
            <div className="text-white font-extrabold text-sm">60 min</div>
          </div>
          <div className="text-center px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            <div className="text-gray-400">Calorie Burn</div>
            <div className="text-orange-400 font-extrabold text-sm">450 kcal</div>
          </div>
          <button
            onClick={() => setActiveTab('live-workout')}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold transition shadow-lg shadow-emerald-500/30 flex items-center space-x-1.5"
          >
            <span>Launch Protocol</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Exercises list */}
      <div className="space-y-3">
        {list.map((ex, index) => (
          <div
            key={ex.slug}
            className="glass-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 font-extrabold flex items-center justify-center">
                {index + 1}
              </div>
              <div>
                <h4 className="font-extrabold text-base">{ex.name}</h4>
                <p className="text-xs text-gray-400 font-medium">
                  Target: <span className="text-blue-400 font-bold">{ex.primaryMuscle}</span> • Equipment: <span className={ex.equipment.includes('Without Gym') ? 'text-emerald-400 font-bold' : 'text-cyan-400 font-bold'}>{ex.equipment}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-xs font-semibold">
              <div className="text-center">
                <span className="text-gray-400 block">Sets x Reps</span>
                <span className="text-white font-extrabold">4 x {ex.equipment.includes('Without Gym') ? '15-20' : '8-10'}</span>
              </div>
              <div className="text-center">
                <span className="text-gray-400 block">Target Load</span>
                <span className="text-cyan-400 font-extrabold">{ex.equipment.includes('Without Gym') ? 'Bodyweight Only' : '82.5 kg (+2.5 kg)'}</span>
              </div>
              <div className="text-center">
                <span className="text-gray-400 block">Rest</span>
                <span className="text-orange-400 font-extrabold">60-90 sec</span>
              </div>
              <button
                onClick={() => openExerciseModal(ex)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition"
              >
                Guide
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
