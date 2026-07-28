// APEX AI FITNESS — PRO (Realistic Commercial Database Seed)
// Contains production exercises with anatomical metadata, authentic Indian foods, and workout templates.

export interface ExerciseData {
  slug: string;
  name: string;
  category: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
  stabilizerMuscles: string[];
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  machineUsed?: string;
  caloriesBurnedPerMin: number;
  photo3dFront: string;
  photo3dBack: string;
  photo3dSide: string;
  instructions: string[];
  commonMistakes: string[];
  safetyTips: string[];
  breathing: string;
  grip: string;
  posture: string;
  rangeOfMotion: string;
  tempo: string;
  warmupTips: string[];
  homeVersion?: string;
  machineVersion?: string;
  dumbbellVersion?: string;
  barbellVersion?: string;
  cableVersion?: string;
}

export const EXERCISE_DATABASE: ExerciseData[] = [
  {
    slug: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    category: 'Legs',
    primaryMuscle: 'Quadriceps',
    secondaryMuscles: ['Gluteus Maximus', 'Hamstrings', 'Adductor Magnus'],
    stabilizerMuscles: ['Erector Spinae', 'Transversus Abdominis', 'Soleus'],
    equipment: 'Barbell Rack',
    difficulty: 'Intermediate',
    caloriesBurnedPerMin: 11.2,
    photo3dFront: '/images/exercise_barbell_squat.jpg',
    photo3dBack: '/images/exercise_barbell_squat.jpg',
    photo3dSide: '/images/exercise_barbell_squat.jpg',
    instructions: [
      'Position the barbell evenly across your upper trapezius muscles.',
      'Unrack with feet shoulder-width apart, toes slightly angled out 15 degrees.',
      'Brace your core, inhale deeply, and initiate by breaking at the hips and knees simultaneously.',
      'Descend until thighs break parallel with the floor while keeping chest elevated.',
      'Drive aggressively through mid-foot to extend hips and knees back to starting position.'
    ],
    commonMistakes: [
      'Allowing knees to collapse inward (valgus collapse) during the ascent.',
      'Excessive forward lean causing lower back strain.',
      'Rising onto toes or lifting heels off the floor.',
      'Incomplete depth (not reaching parallel).'
    ],
    safetyTips: [
      'Always set safety pins in the power rack at hip height.',
      'Maintain a neutral cervical spine by keeping eyes focused 6 feet ahead on the floor.',
      'Do not hold your breath during multi-rep sub-maximal sets.'
    ],
    breathing: 'Inhale and brace at the top; hold during descent; exhale during the final 30% of the ascent.',
    grip: 'Pronated grip, slightly wider than shoulder width, pulling bar firmly into traps.',
    posture: 'Thoracic extension, scapulae retracted, core braced 360 degrees.',
    rangeOfMotion: 'Full hip flexion below 90 degrees with stable lumbar alignment.',
    tempo: '3-1-1-0 (3s eccentric descent, 1s isometric bottom hold, 1s explosive ascent, 0s rest)',
    warmupTips: [
      '2 sets of 10 bodyweight squats',
      '90-90 hip internal/external rotations',
      'Ankle dorsiflexion stretches against a wall'
    ],
    homeVersion: 'Bodyweight Jump Squat or Bulgarian Split Squat',
    machineVersion: 'Smith Machine Squat or Leg Press',
    dumbbellVersion: 'Dumbbell Goblet Squat',
    barbellVersion: 'Barbell Back Squat (Primary)',
    cableVersion: 'Cable Front Squat with Rope Attachment'
  },
  {
    slug: 'barbell-bench-press',
    name: 'Flat Barbell Bench Press',
    category: 'Chest',
    primaryMuscle: 'Pectoralis Major',
    secondaryMuscles: ['Anterior Deltoid', 'Triceps Brachii', 'Serratus Anterior'],
    stabilizerMuscles: ['Latissimus Dorsi', 'Biceps Brachii', 'Glutes'],
    equipment: 'Barbell Bench',
    difficulty: 'Intermediate',
    caloriesBurnedPerMin: 9.5,
    photo3dFront: '/images/exercise_bench_press.jpg',
    photo3dBack: '/images/exercise_bench_press.jpg',
    photo3dSide: '/images/exercise_bench_press.jpg',
    instructions: [
      'Lie flat on the bench with eyes directly below the barbell.',
      'Grip the bar slightly wider than shoulder-width with wrists stacked straight.',
      'Retract and depress scapulae, creating a slight natural arch in the lower back.',
      'Lower the bar under control to the lower sternum (nipple line).',
      'Press explosively upward and slightly back toward the collarbones until arms are extended.'
    ],
    commonMistakes: [
      'Flaring elbows out to 90 degrees, risking rotator cuff impingement.',
      'Bouncing the bar off the chest.',
      'Lifting buttocks off the bench during heavy reps.',
      'Uneven lockout between left and right arms.'
    ],
    safetyTips: [
      'Always use a spotter when lifting near failure.',
      'Keep thumbs wrapped securely around the bar (no suicide grip).'
    ],
    breathing: 'Inhale at the top; lower bar; exhale as you press through the sticking point.',
    grip: 'Closed pronated grip, index fingers on ring markings.',
    posture: 'Scapulae clamped back and down, feet flat and driving into the floor.',
    rangeOfMotion: 'Complete chest touch to full elbow lockout without shoulder protraction.',
    tempo: '2-1-1-0 (2s lowering, 1s chest pause, 1s press)',
    warmupTips: [
      'Scapular wall slides',
      'Band pull-aparts for posterior delts',
      '1 set of 15 push-ups'
    ],
    homeVersion: 'Standard Push-Up or Deficit Push-Up',
    machineVersion: 'Seated Chest Press Machine',
    dumbbellVersion: 'Flat Dumbbell Bench Press',
    barbellVersion: 'Flat Barbell Bench Press (Primary)',
    cableVersion: 'Standing Cable Chest Fly'
  },
  {
    slug: 'conventional-deadlift',
    name: 'Conventional Barbell Deadlift',
    category: 'Back',
    primaryMuscle: 'Erector Spinae',
    secondaryMuscles: ['Gluteus Maximus', 'Hamstrings', 'Latissimus Dorsi', 'Trapezius'],
    stabilizerMuscles: ['Forearm Flexors', 'Abdominals', 'Rhomboids'],
    equipment: 'Barbell & Plates',
    difficulty: 'Advanced',
    caloriesBurnedPerMin: 12.8,
    photo3dFront: '/images/exercise_deadlift.jpg',
    photo3dBack: '/images/exercise_deadlift.jpg',
    photo3dSide: '/images/exercise_deadlift.jpg',
    instructions: [
      'Stand with mid-foot directly underneath the barbell, feet hip-width apart.',
      'Hinge at hips and grip the bar shoulder-width apart.',
      'Drop hips slightly, raise chest, and engage lats by imagining squeezing oranges in your armpits.',
      'Drive through the floor with your legs while simultaneously extending hips until standing tall.',
      'Return the bar to the floor by hinging hips back and lowering under control.'
    ],
    commonMistakes: [
      'Rounding the lumbar spine (cat-back deadlift).',
      'Hitching the barbell up the thighs.',
      'Starting with hips too low like a squat.',
      'Hyper-extending the lower back at lockout.'
    ],
    safetyTips: [
      'Do not jerk the bar off the floor; build tension before lift-off.',
      'Use chalk or lifting straps for maximal loads if grip fails.'
    ],
    breathing: 'Inhale and brace 360-degree intra-abdominal pressure at bottom; exhale at lockout.',
    grip: 'Double overhand or hook grip; switch to mixed grip only for maximal PRs.',
    posture: 'Neutral spine from sacrum to cranium, chest proud, lats locked.',
    rangeOfMotion: 'From dead stop on floor to full hip and knee extension.',
    tempo: '2-0-1-1 (2s controlled descent, dead stop, 1s explosive pull, 1s lockout squeeze)',
    warmupTips: [
      'Hip hinge drills with PVC pipe',
      'Glute bridges',
      'Cat-cow spinal mobility'
    ],
    homeVersion: 'Single-Leg Romanian Deadlift (Bodyweight/Backpack)',
    machineVersion: 'Smith Machine Romanian Deadlift',
    dumbbellVersion: 'Dumbbell Romanian Deadlift',
    barbellVersion: 'Conventional Barbell Deadlift (Primary)',
    cableVersion: 'Cable Pull-Through'
  },
  {
    slug: 'overhead-shoulder-press',
    name: 'Standing Military Overhead Press',
    category: 'Shoulders',
    primaryMuscle: 'Anterior Deltoid',
    secondaryMuscles: ['Medial Deltoid', 'Triceps Brachii', 'Upper Trapezius'],
    stabilizerMuscles: ['Glutes', 'Core Abdominals', 'Serratus Anterior'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    caloriesBurnedPerMin: 8.9,
    photo3dFront: '/images/exercise_bench_press.jpg',
    photo3dBack: '/images/exercise_bench_press.jpg',
    photo3dSide: '/images/exercise_bench_press.jpg',
    instructions: [
      'Rest barbell on upper chest and anterior deltoids with elbows slightly forward.',
      'Brace glutes and abs to create a solid column of support.',
      'Press the bar in a straight vertical line, tilting head slightly back to clear the chin.',
      'Once bar passes forehead, press head forward under the bar into full lockout.'
    ],
    commonMistakes: [
      'Excessive lower back arching due to weak core bracing.',
      'Pressing the bar forward instead of vertically.',
      'Bending knees to push-press when strict press is required.'
    ],
    safetyTips: [
      'Keep wrists stacked directly over elbows.',
      'Avoid hyperextending neck.'
    ],
    breathing: 'Inhale at chest level; exhale as arms reach overhead lockout.',
    grip: 'Pronated grip slightly wider than shoulder width.',
    posture: 'Ribcage locked down, glutes squeezed tight.',
    rangeOfMotion: 'Full clavicle rest to complete overhead arm extension.',
    tempo: '2-0-1-0',
    warmupTips: ['Arm circles', 'Band face pulls', 'Y-T-W shoulder raises'],
    homeVersion: 'Pike Push-Up or Handstand Push-Up',
    machineVersion: 'Seated Overhead Shoulder Press Machine',
    dumbbellVersion: 'Seated Dumbbell Shoulder Press',
    barbellVersion: 'Standing Military Overhead Press (Primary)',
    cableVersion: 'Single-Arm Cable Shoulder Press'
  },
  {
    slug: 'pull-ups',
    name: 'Strict Pronated Pull-Up',
    category: 'Back',
    primaryMuscle: 'Latissimus Dorsi',
    secondaryMuscles: ['Biceps Brachii', 'Teres Major', 'Rhomboids'],
    stabilizerMuscles: ['Core Abdominals', 'Forearm Grip'],
    equipment: 'Pull-Up Bar',
    difficulty: 'Intermediate',
    caloriesBurnedPerMin: 10.4,
    photo3dFront: '/images/exercise_deadlift.jpg',
    photo3dBack: '/images/exercise_deadlift.jpg',
    photo3dSide: '/images/exercise_deadlift.jpg',
    instructions: [
      'Grip the overhead bar slightly wider than shoulder width with palms facing away.',
      'Initiate movement by depressing scapulae and driving elbows down toward your hips.',
      'Pull chest up until chin clears the horizontal bar.',
      'Lower under control to a dead hang with arms fully extended.'
    ],
    commonMistakes: [
      'Kipping or swinging legs for momentum.',
      'Incomplete lower range of motion (not reaching dead hang).',
      'Shrugging shoulders toward ears at the top.'
    ],
    safetyTips: ['Control the descent to avoid biceps tendon strain.'],
    breathing: 'Exhale while pulling up; inhale on the controlled lowering phase.',
    grip: 'Pronated overhand grip with thumb wrapped around bar.',
    posture: 'Slight hollow body position with legs extended.',
    rangeOfMotion: 'Full dead hang to chin above bar.',
    tempo: '2-1-1-0',
    warmupTips: ['Scapular pull-ups', 'Lat stretches', 'Dead hangs'],
    homeVersion: 'Doorframe Towel Rows or Prone Cobra',
    machineVersion: 'Assisted Pull-Up Machine / Lat Pulldown',
    dumbbellVersion: 'Dumbbell Bent-Over Row',
    barbellVersion: 'Barbell Pendlay Row',
    cableVersion: 'Wide-Grip Lat Pulldown'
  },
  {
    slug: 'romanian-deadlift',
    name: 'Romanian Barbell Deadlift (RDL)',
    category: 'Legs',
    primaryMuscle: 'Hamstrings',
    secondaryMuscles: ['Gluteus Maximus', 'Erector Spinae'],
    stabilizerMuscles: ['Latissimus Dorsi', 'Forearms'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    caloriesBurnedPerMin: 9.8,
    photo3dFront: '/images/exercise_deadlift.jpg',
    photo3dBack: '/images/exercise_deadlift.jpg',
    photo3dSide: '/images/exercise_deadlift.jpg',
    instructions: [
      'Stand holding barbell at hip level with shoulder-width grip.',
      'Keep a slight 15-degree bend in knees and hold that knee angle constant.',
      'Hinge hips backward as far as possible, sliding the bar down your thighs.',
      'When you feel a deep hamstring stretch (usually mid-shin), squeeze glutes and extend hips forward.'
    ],
    commonMistakes: ['Bending knees too much (turning into a conventional squat/deadlift).', 'Rounding lower back.'],
    safetyTips: ['Keep the barbell grazing your legs throughout.'],
    breathing: 'Inhale on the hinge down; exhale as you squeeze glutes at the top.',
    grip: 'Double overhand pronated grip.',
    posture: 'Chest up, lats engaged, lumbar spine neutral.',
    rangeOfMotion: 'Hip extension to maximum hamstring stretch without lumbar rounding.',
    tempo: '3-1-1-0',
    warmupTips: ['Good mornings with empty bar', 'Leg swings'],
    homeVersion: 'Single-Leg Bodyweight RDL',
    machineVersion: 'Seated or Lying Leg Curl Machine',
    dumbbellVersion: 'Dumbbell Romanian Deadlift',
    barbellVersion: 'Barbell Romanian Deadlift (Primary)',
    cableVersion: 'Cable Pull-Through'
  }
];

export interface IndianFoodMeta {
  name: string;
  regionalName?: string;
  category: 'Breakfast' | 'Lentils/Dal' | 'Protein' | 'Grain/Millet' | 'Dairy' | 'Fruit/Veg' | 'Snack';
  servingSizeGrams: number;
  servingDescription: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  sugarGrams: number;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  healthScore: number;
  healthierAlternative?: string;
}

export const INDIAN_FOOD_DATABASE: IndianFoodMeta[] = [
  {
    name: 'Idli (2 Medium)',
    regionalName: 'Steam Fermented Rice Lentil Cakes',
    category: 'Breakfast',
    servingSizeGrams: 150,
    servingDescription: '2 medium idlis',
    calories: 116,
    proteinGrams: 4.2,
    carbsGrams: 24.5,
    fatGrams: 0.4,
    fiberGrams: 1.8,
    sugarGrams: 0.5,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    healthScore: 95,
    healthierAlternative: 'Ragi Idli or Moong Dal Idli for higher protein'
  },
  {
    name: 'Plain Dosa',
    regionalName: 'South Indian Rice Lentil Crepe',
    category: 'Breakfast',
    servingSizeGrams: 120,
    servingDescription: '1 medium dosa',
    calories: 168,
    proteinGrams: 3.9,
    carbsGrams: 28.2,
    fatGrams: 4.2,
    fiberGrams: 1.5,
    sugarGrams: 0.8,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    healthScore: 88,
    healthierAlternative: 'Pesarattu (Moong Dal Dosa) or Ragi Dosa'
  },
  {
    name: 'Masala Dosa with Sambar',
    regionalName: 'Spiced Potato Crepe with Lentil Soup',
    category: 'Breakfast',
    servingSizeGrams: 250,
    servingDescription: '1 complete dosa + small bowl sambar',
    calories: 385,
    proteinGrams: 8.5,
    carbsGrams: 58.0,
    fatGrams: 13.2,
    fiberGrams: 4.8,
    sugarGrams: 3.2,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    healthScore: 82,
    healthierAlternative: 'Paneer Masala Dosa with less potato stuffing'
  },
  {
    name: 'Vegetable Upma',
    regionalName: 'Semolina Breakfast Bowl',
    category: 'Breakfast',
    servingSizeGrams: 180,
    servingDescription: '1 medium bowl',
    calories: 215,
    proteinGrams: 5.1,
    carbsGrams: 34.0,
    fatGrams: 6.5,
    fiberGrams: 2.9,
    sugarGrams: 2.1,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    healthScore: 85,
    healthierAlternative: 'Quinoa Upma or Oats Vegetable Upma'
  },
  {
    name: 'Kanda Poha',
    regionalName: 'Flattened Rice with Onion & Peanuts',
    category: 'Breakfast',
    servingSizeGrams: 160,
    servingDescription: '1 standard bowl',
    calories: 250,
    proteinGrams: 4.8,
    carbsGrams: 46.2,
    fatGrams: 5.2,
    fiberGrams: 2.4,
    sugarGrams: 1.8,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    healthScore: 89,
    healthierAlternative: 'Red Rice Poha with extra boiled sprouts'
  },
  {
    name: 'Whole Wheat Roti (Phulka)',
    regionalName: 'Chapati / Indian Flatbread',
    category: 'Grain/Millet',
    servingSizeGrams: 40,
    servingDescription: '1 medium roti (no ghee)',
    calories: 85,
    proteinGrams: 3.1,
    carbsGrams: 17.5,
    fatGrams: 0.5,
    fiberGrams: 2.6,
    sugarGrams: 0.4,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    healthScore: 92,
    healthierAlternative: 'Multigrain Roti or Ragi Roti'
  },
  {
    name: 'Steamed White Rice',
    regionalName: 'Chawal',
    category: 'Grain/Millet',
    servingSizeGrams: 150,
    servingDescription: '1 cooked cup',
    calories: 195,
    proteinGrams: 4.2,
    carbsGrams: 43.5,
    fatGrams: 0.4,
    fiberGrams: 0.6,
    sugarGrams: 0.1,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    healthScore: 78,
    healthierAlternative: 'Brown Rice or Steamed Foxtail Millet'
  },
  {
    name: 'Yellow Dal Tadka (Arhar/Toor)',
    regionalName: 'Spiced Lentil Stew',
    category: 'Lentils/Dal',
    servingSizeGrams: 200,
    servingDescription: '1 standard bowl',
    calories: 180,
    proteinGrams: 9.8,
    carbsGrams: 26.4,
    fatGrams: 4.5,
    fiberGrams: 6.2,
    sugarGrams: 2.1,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    healthScore: 94
  },
  {
    name: 'Grilled Paneer Tikka (Low Oil)',
    regionalName: 'Cottage Cheese Skewers',
    category: 'Protein',
    servingSizeGrams: 150,
    servingDescription: '6 medium paneer cubes',
    calories: 275,
    proteinGrams: 18.5,
    carbsGrams: 5.2,
    fatGrams: 20.0,
    fiberGrams: 1.1,
    sugarGrams: 2.4,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    healthScore: 91,
    healthierAlternative: 'Low-fat Cow Milk Paneer or Tofu Tikka'
  },
  {
    name: 'Tandoori Chicken Breast',
    regionalName: 'Roasted Chicken in Clay Oven',
    category: 'Protein',
    servingSizeGrams: 160,
    servingDescription: '1 whole breast piece',
    calories: 220,
    proteinGrams: 38.0,
    carbsGrams: 2.5,
    fatGrams: 6.0,
    fiberGrams: 0.5,
    sugarGrams: 1.0,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    healthScore: 98
  },
  {
    name: 'Boiled Eggs (2 Whole)',
    regionalName: 'Ande',
    category: 'Protein',
    servingSizeGrams: 100,
    servingDescription: '2 large eggs',
    calories: 155,
    proteinGrams: 12.6,
    carbsGrams: 1.1,
    fatGrams: 10.6,
    fiberGrams: 0.0,
    sugarGrams: 1.1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    healthScore: 97
  },
  {
    name: 'Fish Curry (Rohu / Katla)',
    regionalName: 'Indian Spiced Freshwater Fish',
    category: 'Protein',
    servingSizeGrams: 180,
    servingDescription: '2 fillets with light gravy',
    calories: 240,
    proteinGrams: 26.5,
    carbsGrams: 6.0,
    fatGrams: 12.0,
    fiberGrams: 1.2,
    sugarGrams: 2.0,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    healthScore: 96
  },
  {
    name: 'Fresh Curd (Dahi - Whole Milk)',
    regionalName: 'Indian Yogurt',
    category: 'Dairy',
    servingSizeGrams: 150,
    servingDescription: '1 medium bowl',
    calories: 98,
    proteinGrams: 5.2,
    carbsGrams: 6.8,
    fatGrams: 6.0,
    fiberGrams: 0.0,
    sugarGrams: 6.2,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    healthScore: 93,
    healthierAlternative: 'Greek Yogurt or Low-fat Dahi'
  },
  {
    name: 'South Indian Sambar',
    regionalName: 'Vegetable Lentil Stew',
    category: 'Lentils/Dal',
    servingSizeGrams: 200,
    servingDescription: '1 standard bowl',
    calories: 110,
    proteinGrams: 5.4,
    carbsGrams: 18.0,
    fatGrams: 2.2,
    fiberGrams: 4.5,
    sugarGrams: 3.5,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    healthScore: 95
  },
  {
    name: 'Ragi Mudde / Ragi Ball',
    regionalName: 'Finger Millet Ball',
    category: 'Grain/Millet',
    servingSizeGrams: 150,
    servingDescription: '1 medium ball',
    calories: 185,
    proteinGrams: 5.2,
    carbsGrams: 39.5,
    fatGrams: 0.9,
    fiberGrams: 6.5,
    sugarGrams: 0.8,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    healthScore: 98
  },
  {
    name: 'Mixed Millets Khichdi',
    regionalName: 'Bajra, Jowar & Foxtail Millet Bowl',
    category: 'Grain/Millet',
    servingSizeGrams: 200,
    servingDescription: '1 standard bowl',
    calories: 230,
    proteinGrams: 8.4,
    carbsGrams: 42.0,
    fatGrams: 3.5,
    fiberGrams: 7.2,
    sugarGrams: 1.5,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    healthScore: 97
  },
  {
    name: 'Roasted Peanuts (Unsalted)',
    regionalName: 'Moongphali',
    category: 'Snack',
    servingSizeGrams: 30,
    servingDescription: '1 handful (30g)',
    calories: 170,
    proteinGrams: 7.8,
    carbsGrams: 4.8,
    fatGrams: 14.2,
    fiberGrams: 2.6,
    sugarGrams: 1.2,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    healthScore: 91
  },
  {
    name: 'Sprouted Moong Salad',
    regionalName: 'Green Gram Sprouts Chaat',
    category: 'Protein',
    servingSizeGrams: 150,
    servingDescription: '1 large bowl with lemon & herbs',
    calories: 145,
    proteinGrams: 11.2,
    carbsGrams: 24.0,
    fatGrams: 0.8,
    fiberGrams: 6.8,
    sugarGrams: 2.8,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    healthScore: 99
  }
];
