import React, { useState } from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { soundService } from '../services/soundService';
import { ExerciseItem } from '../types';

export const MuscleMapPage: React.FC = () => {
  const { openExerciseModal, showToast } = useFitnessStore();
  const [view, setView] = useState<'FRONT' | 'BACK'>('FRONT');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('Chest');

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

  const handleSelectMuscle = (m: string) => {
    soundService.playClick();
    setSelectedMuscle(m);
    showToast(`Highlighted Muscle: ${m}`, 'info');
  };

  const matching = EXERCISE_DB.filter(
    (e) => e.category === selectedMuscle || e.primaryMuscle.includes(selectedMuscle)
  );

  return (
    <div className="space-y-6">
      {/* Crisp Minimal Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Interactive 3D Muscle Map
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Tap any muscle group to view matching exercises with 3D anatomical guides.
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
                Tap any muscle above to view exercises!
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
                Back Anatomy View • Tap Back or Glutes
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
