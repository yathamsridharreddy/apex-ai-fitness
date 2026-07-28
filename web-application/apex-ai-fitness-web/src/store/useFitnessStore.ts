// APEX AI FITNESS — PRO (Zustand Full-Stack State Store with 100% Zero Gym Equipment Workouts)

import { create } from 'zustand';
import { ExerciseItem, IndianFoodItem, TabId, ThemeMode, UserProfile } from '../types';
import { soundService } from '../services/soundService';

interface FitnessState {
  theme: ThemeMode;
  activeTab: TabId;
  profile: UserProfile;
  exercises: ExerciseItem[];
  indianFoods: IndianFoodItem[];
  selectedExerciseModal: ExerciseItem | null;
  showOnboardingModal: boolean;
  showCelebrationModal: boolean;
  isVoiceCoachOn: boolean;
  selectedWorkoutType: string;
  isVegOnly: boolean;
  
  // Active Workout Live Player
  liveWorkout: {
    exerciseSlug: string;
    title: string;
    equipmentNote: string;
    sets: { setNum: number; weight: number; reps: number; isCompleted: boolean }[];
    elapsedSeconds: number;
  };

  setTheme: (theme: ThemeMode) => void;
  setActiveTab: (tab: TabId) => void;
  setProfile: (profile: Partial<UserProfile>) => void;
  setExercises: (exs: ExerciseItem[]) => void;
  setIndianFoods: (foods: IndianFoodItem[]) => void;
  openExerciseModal: (ex: ExerciseItem) => void;
  closeExerciseModal: () => void;
  openOnboardingModal: () => void;
  closeOnboardingModal: () => void;
  openCelebrationModal: () => void;
  closeCelebrationModal: () => void;
  toggleVoiceCoach: () => void;
  setSelectedWorkoutType: (type: string) => void;
  toggleVegOnly: () => void;
  
  // Actions
  logWater: (liters: number) => void;
  logMeal: (name: string, calories: number, protein: number) => void;
  toggleCompleteSet: (idx: number) => void;
  addLiveSet: () => void;
  finishLiveWorkout: () => void;
  enableHomeWorkoutMode: () => void;
}

const defaultProfile: UserProfile = {
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
  country: 'India (Andhra Pradesh, Tuni)',

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
};

export const useFitnessStore = create<FitnessState>((set, get) => ({
  theme: 'dark',
  activeTab: 'dashboard',
  profile: defaultProfile,
  exercises: [],
  indianFoods: [],
  selectedExerciseModal: null,
  showOnboardingModal: false,
  showCelebrationModal: false,
  isVoiceCoachOn: true,
  selectedWorkoutType: 'PUSH_PULL_LEGS',
  isVegOnly: true,

  liveWorkout: {
    exerciseSlug: 'barbell-back-squat',
    title: 'Barbell Back Squat',
    equipmentNote: 'Barbell Rack (Gym)',
    sets: [
      { setNum: 1, weight: 80.0, reps: 10, isCompleted: true },
      { setNum: 2, weight: 82.5, reps: 8, isCompleted: false },
      { setNum: 3, weight: 82.5, reps: 8, isCompleted: false },
      { setNum: 4, weight: 85.0, reps: 6, isCompleted: false }
    ],
    elapsedSeconds: 0
  },

  setTheme: (theme) => set({ theme }),
  setActiveTab: (activeTab) => {
    soundService.playClick();
    set({ activeTab });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  setProfile: (partial) => set((state) => ({ profile: { ...state.profile, ...partial } })),
  setExercises: (exercises) => set({ exercises }),
  setIndianFoods: (indianFoods) => set({ indianFoods }),
  openExerciseModal: (ex) => {
    soundService.playClick();
    set({ selectedExerciseModal: ex });
  },
  closeExerciseModal: () => set({ selectedExerciseModal: null }),
  openOnboardingModal: () => {
    soundService.playClick();
    set({ showOnboardingModal: true });
  },
  closeOnboardingModal: () => set({ showOnboardingModal: false }),
  openCelebrationModal: () => set({ showCelebrationModal: true }),
  closeCelebrationModal: () => set({ showCelebrationModal: false }),
  toggleVoiceCoach: () => {
    const nextState = soundService.toggleVoiceCoach();
    set({ isVoiceCoachOn: nextState });
  },
  setSelectedWorkoutType: (selectedWorkoutType) => set({ selectedWorkoutType }),
  toggleVegOnly: () => {
    soundService.playClick();
    set((state) => ({ isVegOnly: !state.isVegOnly }));
  },

  logWater: (liters) => {
    soundService.playClick();
    set((state) => ({
      profile: {
        ...state.profile,
        currentWaterLiters: Number((state.profile.currentWaterLiters + liters).toFixed(2))
      }
    }));
    soundService.playVoiceCue('/audio/workout_start.mp3', `Logged ${liters * 1000} milliliters of water.`);
  },

  logMeal: (name, calories, protein) => {
    soundService.playSuccess();
    set((state) => ({
      profile: {
        ...state.profile,
        currentCaloriesConsumed: state.profile.currentCaloriesConsumed + calories,
        currentProteinConsumed: state.profile.currentProteinConsumed + protein
      }
    }));
  },

  toggleCompleteSet: (idx) => {
    soundService.playSuccess();
    set((state) => {
      const nextSets = [...state.liveWorkout.sets];
      nextSets[idx] = { ...nextSets[idx], isCompleted: !nextSets[idx].isCompleted };
      return {
        liveWorkout: {
          ...state.liveWorkout,
          sets: nextSets
        }
      };
    });
  },

  addLiveSet: () => {
    soundService.playClick();
    set((state) => {
      const nextNum = state.liveWorkout.sets.length + 1;
      return {
        liveWorkout: {
          ...state.liveWorkout,
          sets: [...state.liveWorkout.sets, { setNum: nextNum, weight: 0.0, reps: 15, isCompleted: false }]
        }
      };
    });
  },

  finishLiveWorkout: () => {
    soundService.playSuccess();
    set((state) => ({
      showCelebrationModal: true,
      profile: {
        ...state.profile,
        streakDays: state.profile.streakDays + 1,
        totalXp: state.profile.totalXp + 250
      }
    }));
    soundService.playVoiceCue('/audio/workout_complete.mp3', 'Workout complete! You set a new personal record and earned 250 XP!');
  },

  enableHomeWorkoutMode: () => {
    soundService.playSuccess();
    set({
      selectedWorkoutType: 'HOME_WORKOUT',
      profile: {
        ...get().profile,
        workoutLocation: 'HOME_GYM',
        equipmentAvailable: 'BODYWEIGHT'
      },
      liveWorkout: {
        exerciseSlug: 'bodyweight-jump-squat',
        title: 'Explosive Bodyweight Jump Squat',
        equipmentNote: '100% Without Gym Equipment (Home Floor)',
        sets: [
          { setNum: 1, weight: 0.0, reps: 15, isCompleted: true },
          { setNum: 2, weight: 0.0, reps: 15, isCompleted: false },
          { setNum: 3, weight: 0.0, reps: 15, isCompleted: false },
          { setNum: 4, weight: 0.0, reps: 12, isCompleted: false }
        ],
        elapsedSeconds: 0
      }
    });
    soundService.playVoiceCue('/audio/workout_start.mp3', 'Home workout without gym equipment enabled! Zero gym equipment required today. Let\'s begin with explosive bodyweight jump squats.');
  }
}));
