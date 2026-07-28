import React, { useState } from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { Search, ArrowRight, Home } from 'lucide-react';
import { ExerciseItem } from '../types';

export const ExerciseLibraryPage: React.FC = () => {
  const { openExerciseModal } = useFitnessStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [onlyNoGym, setOnlyNoGym] = useState(false);

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
      image: 'images/exercise_bodyweight_squat.jpg',
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
      image: 'images/exercise_floor_pushup.jpg',
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
      image: 'images/exercise_chair_split_squat.jpg',
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
      image: 'images/exercise_pike_pushup.jpg',
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
      image: 'images/exercise_doorframe_row.jpg',
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
      slug: 'plank-shoulder-tap',
      name: 'Floor Plank with Alternate Shoulder Taps',
      category: 'Core',
      primaryMuscle: 'Abdominals & Core',
      secondaryMuscles: 'Anterior Deltoid, Obliques',
      equipment: '100% Without Gym Equipment (Home Floor)',
      difficulty: 'Beginner',
      calories: 8.5,
      image: 'images/exercise_floor_pushup.jpg',
      instructions: [
        'Assume a high plank push-up position on your home floor.',
        'Brace core firmly so hips remain perfectly square to the floor.',
        'Lift right hand to touch left shoulder without twisting torso, then return to floor.',
        'Repeat on opposite side in a smooth, alternating cadence.'
      ],
      mistakes: ['Rocking hips from side to side', 'Letting lower back sag'],
      tempo: '2-0-2-0 (Controlled Balance)',
      breathing: 'Breathe rhythmically throughout the hold.',
      homeVersion: 'Plank Shoulder Tap (Primary No Gym)',
      machineVersion: 'Abdominal Crunch Machine',
      dumbbellVersion: 'Renegade Row'
    },
    {
      slug: 'glute-bridge-single-leg',
      name: 'Single-Leg Floor Glute Bridge',
      category: 'Legs',
      primaryMuscle: 'Gluteus Maximus',
      secondaryMuscles: 'Hamstrings, Erector Spinae',
      equipment: '100% Without Gym Equipment (Home Floor)',
      difficulty: 'Beginner',
      calories: 9.2,
      image: 'images/exercise_bodyweight_squat.jpg',
      instructions: [
        'Lie on back on home floor with knees bent and feet hip-width apart.',
        'Extend left leg straight up toward ceiling while keeping right heel planted.',
        'Drive through right heel to elevate hips until thigh and torso form a straight line.',
        'Squeeze right glute at the top for 1 second before lowering.'
      ],
      mistakes: ['Arching lower back instead of driving from glutes', 'Pushing through toes'],
      tempo: '2-1-2-0 (1s Glute Squeeze)',
      breathing: 'Inhale on descent; exhale on hip drive.',
      homeVersion: 'Single-Leg Floor Glute Bridge (Primary No Gym)',
      machineVersion: 'Seated Leg Curl Machine',
      dumbbellVersion: 'Dumbbell Romanian Deadlift'
    },
    {
      slug: 'mountain-climbers-hiit',
      name: 'Explosive Floor Mountain Climbers',
      category: 'Cardio',
      primaryMuscle: 'Core & Abdominals',
      secondaryMuscles: 'Hip Flexors, Anterior Deltoids, Cardio',
      equipment: '100% Without Gym Equipment (Home Floor)',
      difficulty: 'Beginner',
      calories: 14.0,
      image: 'images/exercise_floor_pushup.jpg',
      instructions: [
        'Start in a high push-up plank position with hands under shoulders.',
        'Drive right knee toward chest explosively, keeping hips level.',
        'Switch legs rapidly in a running motion while maintaining upper body stability.'
      ],
      mistakes: ['Bouncing hips up and down', 'Letting shoulders drift behind wrists'],
      tempo: '1-0-1-0 (HIIT Sprint)',
      breathing: 'Exhale sharply with each knee drive.',
      homeVersion: 'Explosive Mountain Climbers (Primary No Gym)',
      machineVersion: 'Treadmill Sprint Interval',
      dumbbellVersion: 'Dumbbell Thruster'
    },

    // 3 GYM EXERCISES FOR CONTRAST
    {
      slug: 'barbell-back-squat',
      name: 'Barbell Back Squat',
      category: 'Legs',
      primaryMuscle: 'Quadriceps',
      secondaryMuscles: 'Gluteus Maximus, Hamstrings',
      equipment: 'Barbell Rack (Gym Equipment Required)',
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
      equipment: 'Barbell Bench (Gym Equipment Required)',
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
      equipment: 'Barbell & Plates (Gym Equipment Required)',
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
    }
  ];

  const filtered = EXERCISE_DB.filter((ex) => {
    const matchesQ =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.primaryMuscle.toLowerCase().includes(search.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'ALL' || ex.category === category;
    const matchesNoGym = !onlyNoGym || ex.equipment.includes('Without Gym Equipment');
    return matchesQ && matchesCat && matchesNoGym;
  });

  return (
    <div className="space-y-6">
      {/* Clean Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            3D Exercise Library
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Gym & 100% Zero-Gym bodyweight calisthenics with photorealistic 3D human motion.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setOnlyNoGym(!onlyNoGym)}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-lg flex items-center space-x-1.5 transition ${
              onlyNoGym
                ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{onlyNoGym ? '🏠 Showing Zero-Gym Only' : 'Show Zero-Gym Only'}</span>
          </button>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exercise..."
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
            <option value="Core" className="bg-gray-900">
              Core & Abdominals
            </option>
            <option value="Cardio" className="bg-gray-900">
              Cardio & HIIT
            </option>
          </select>
        </div>
      </div>

      {/* Clean Grid */}
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
              {ex.equipment.includes('Without Gym') ? (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-[10px] font-extrabold shadow">
                  🏠 ZERO GYM
                </div>
              ) : (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-blue-600/90 text-white text-[10px] font-extrabold shadow">
                  🏋️ GYM EQUIPMENT
                </div>
              )}
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-base text-white">{ex.name}</h4>
                <span className="text-xs text-emerald-400 font-bold">{ex.difficulty}</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Secondary: {ex.secondaryMuscles}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10 font-semibold">
                <span className={ex.equipment.includes('Without Gym') ? 'text-emerald-400' : 'text-cyan-400'}>{ex.equipment}</span>
                <button
                  onClick={() => openExerciseModal(ex)}
                  className="text-blue-400 font-bold hover:underline flex items-center space-x-1"
                >
                  <span>3D Guide</span>
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
