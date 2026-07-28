// APEX AI FITNESS — PRO (Mobile App TypeScript Types)

export type Gender = 'MALE' | 'FEMALE' | 'NON_BINARY' | 'PREFER_NOT_TO_SAY';

export type ActivityLevel = 'SEDENTARY' | 'LIGHTLY_ACTIVE' | 'MODERATELY_ACTIVE' | 'VERY_ACTIVE' | 'ATHLETE';

export type WorkoutType =
  | 'PUSH_PULL_LEGS'
  | 'UPPER_LOWER'
  | 'BODYBUILDING'
  | 'POWERLIFTING'
  | 'STRENGTH'
  | 'FAT_LOSS'
  | 'MUSCLE_GAIN'
  | 'ATHLETE'
  | 'CROSSFIT'
  | 'HIIT'
  | 'HOME_WORKOUT'
  | 'CALISTHENICS'
  | 'SENIOR_FITNESS'
  | 'WOMENS_FITNESS';

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  goalWeightKg: number;
  bodyFatPercentage: number;
  activityLevel: ActivityLevel;
  experience: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ELITE';
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
  
  // Physiometrics
  bmr: number;
  tdee: number;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  
  // Real-time tracking
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
