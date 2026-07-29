// APEX AI FITNESS — PRO (Full-Stack TypeScript Types with User Authentication)

export type ThemeMode = 'dark' | 'oled' | 'light';
export type TabId =
  | 'dashboard'
  | 'workout-engine'
  | 'exercise-library'
  | 'live-workout'
  | 'form-analysis'
  | 'diet-planner'
  | 'food-scanner'
  | 'muscle-map'
  | 'ai-coach'
  | 'analytics'
  | 'admin';

export interface UserAuth {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  } | null;
}

export interface ExerciseItem {
  slug: string;
  name: string;
  category: string;
  primaryMuscle: string;
  secondaryMuscles: string;
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  calories: number;
  image: string;
  instructions: string[];
  mistakes: string[];
  tempo: string;
  breathing: string;
  homeVersion: string;
  machineVersion: string;
  dumbbellVersion: string;
}

export interface IndianFoodItem {
  id?: string;
  name: string;
  category: 'Breakfast' | 'Lentils/Dal' | 'Protein' | 'Grain/Millet' | 'Dairy' | 'Snack';
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isVegetarian: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  goalWeightKg: number;
  bodyFatPercentage: number;
  activityLevel: string;
  experience: string;
  workoutLocation: string;
  equipmentAvailable: string;
  fitnessGoal: string;
  workoutDaysPerWeek: number;
  workoutDurationMin: number;
  injuries: string[];
  medicalConditions: string[];
  allergies: string[];
  dietPreference: string;
  foodBudgetMonthly: number;
  dailySchedule: string;
  sleepHours: number;
  waterIntakeLiters: number;
  country: string;

  // Real-time tracking metrics
  bmr: number;
  tdee: number;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  currentWaterLiters: number;
  currentCaloriesConsumed: number;
  currentProteinConsumed: number;
  currentSteps: number;
  recoveryScore: number;
  sleepScore: number;
  streakDays: number;
  totalXp: number;
  level: number;
}
