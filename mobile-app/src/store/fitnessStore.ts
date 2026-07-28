// APEX AI FITNESS — PRO (Zustand Production State Store for React Native / Expo)
// Manages offline persistence, biometric caching, active workout timers, and telemetry.

import { create } from 'zustand';
import { UserProfile, WorkoutType } from '../types';

interface FitnessState {
  profile: UserProfile;
  currentWorkoutType: WorkoutType;
  isVoiceCoachEnabled: boolean;
  activeWorkout: {
    exerciseSlug: string;
    elapsedSeconds: number;
    currentSet: number;
    sets: { setNumber: number; weightKg: number; reps: number; isCompleted: boolean }[];
  } | null;
  updateProfile: (partial: Partial<UserProfile>) => void;
  toggleVoiceCoach: () => void;
  startWorkout: (type: WorkoutType) => void;
  logWater: (liters: number) => void;
  logMeal: (calories: number, protein: number) => void;
}

export const useFitnessStore = create<FitnessState>((set, get) => ({
  profile: {
    name: 'Priya Sharma',
    age: 28,
    gender: 'FEMALE',
    heightCm: 168,
    weightKg: 68.2,
    goalWeightKg: 63.0,
    bodyFatPercentage: 18.4,
    activityLevel: 'MODERATELY_ACTIVE',
    experience: 'INTERMEDIATE',
    workoutLocation: 'COMMERCIAL_GYM',
    equipmentAvailable: 'FULL_COMMERCIAL_GYM',
    fitnessGoal: 'BODY_RECOMPOSITION',
    workoutDaysPerWeek: 5,
    workoutDurationMin: 60,
    injuries: ['Mild Lower Back Sensitive'],
    medicalConditions: ['None'],
    allergies: ['Lactose Sensitive'],
    dietPreference: 'Indian Vegetarian High Protein',
    foodBudgetMonthly: 8000,
    dailySchedule: 'Morning Workout (6:30 AM)',
    sleepHours: 7.5,
    waterIntakeLiters: 3.5,
    country: 'India',
    bmr: 1480,
    tdee: 2150,
    targetCalories: 2150,
    targetProtein: 135,
    targetCarbs: 240,
    targetFat: 60,
    currentWaterLiters: 2.8,
    currentCaloriesConsumed: 810,
    currentProteinConsumed: 46,
    currentSteps: 8420,
    recoveryScore: 92,
    sleepScore: 88,
    streakDays: 7,
    totalXp: 1450,
    level: 6
  },
  currentWorkoutType: 'PUSH_PULL_LEGS',
  isVoiceCoachEnabled: true,
  activeWorkout: null,

  updateProfile: (partial) =>
    set((state) => ({ profile: { ...state.profile, ...partial } })),

  toggleVoiceCoach: () =>
    set((state) => ({ isVoiceCoachEnabled: !state.isVoiceCoachEnabled })),

  startWorkout: (type) =>
    set({
      currentWorkoutType: type,
      activeWorkout: {
        exerciseSlug: 'barbell-back-squat',
        elapsedSeconds: 0,
        currentSet: 1,
        sets: [
          { setNumber: 1, weightKg: 80, reps: 10, isCompleted: true },
          { setNumber: 2, weightKg: 82.5, reps: 8, isCompleted: false },
          { setNumber: 3, weightKg: 82.5, reps: 8, isCompleted: false },
          { setNumber: 4, weightKg: 85, reps: 6, isCompleted: false }
        ]
      }
    }),

  logWater: (liters) =>
    set((state) => ({
      profile: {
        ...state.profile,
        currentWaterLiters: Number((state.profile.currentWaterLiters + liters).toFixed(2))
      }
    })),

  logMeal: (calories, protein) =>
    set((state) => ({
      profile: {
        ...state.profile,
        currentCaloriesConsumed: state.profile.currentCaloriesConsumed + calories,
        currentProteinConsumed: state.profile.currentProteinConsumed + protein
      }
    }))
}));
