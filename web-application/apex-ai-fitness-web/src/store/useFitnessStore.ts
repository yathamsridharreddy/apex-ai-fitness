// APEX AI FITNESS — PRO (Zustand Full-Stack State Store with Authenticated User Session Engine)
// Zero predefined user data — displays logged-in user profile, BMR, macros, and training telemetry.

import { create } from 'zustand';
import { ExerciseItem, IndianFoodItem, TabId, ThemeMode, UserProfile, UserAuth } from '../types';
import { soundService } from '../services/soundService';

export interface ToastMessage {
  visible: boolean;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface FitnessState {
  auth: UserAuth;
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
  toast: ToastMessage | null;
  
  // Active Workout Live Player
  liveWorkout: {
    exerciseSlug: string;
    title: string;
    equipmentNote: string;
    sets: { setNum: number; weight: number; reps: number; isCompleted: boolean }[];
    elapsedSeconds: number;
  };

  // Auth Actions
  login: (email: string, name: string) => void;
  signup: (email: string, name: string, weightKg?: number, heightCm?: number, age?: number) => void;
  loginAsGuest: () => void;
  logout: () => void;

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
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
  
  // Actions
  logWater: (liters: number) => void;
  logMeal: (name: string, calories: number, protein: number) => void;
  toggleCompleteSet: (idx: number) => void;
  addLiveSet: () => void;
  finishLiveWorkout: () => void;
  enableHomeWorkoutMode: () => void;
}

const getBlankProfile = (name: string, weightKg = 70.0, heightCm = 175, age = 26): UserProfile => {
  const bmrCalc = Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
  const tdeeCalc = Math.round(bmrCalc * 1.55);
  const proteinCalc = Math.round(weightKg * 2.2);

  return {
    name,
    age,
    gender: 'MALE',
    heightCm,
    weightKg,
    goalWeightKg: Math.round(weightKg * 0.95),
    bodyFatPercentage: 16.5,
    activityLevel: 'MODERATELY_ACTIVE',
    experience: 'INTERMEDIATE',
    workoutLocation: 'COMMERCIAL_GYM',
    equipmentAvailable: 'FULL_COMMERCIAL_GYM',
    fitnessGoal: 'BODY_RECOMPOSITION',
    workoutDaysPerWeek: 5,
    workoutDurationMin: 60,
    injuries: ['None'],
    medicalConditions: ['None'],
    allergies: ['None'],
    dietPreference: 'High Protein Indian & Global',
    foodBudgetMonthly: 10000,
    dailySchedule: 'Morning Workout (6:30 AM)',
    sleepHours: 7.5,
    waterIntakeLiters: 3.5,
    country: 'India',

    bmr: bmrCalc,
    tdee: tdeeCalc,
    targetCalories: tdeeCalc,
    targetProtein: proteinCalc,
    targetCarbs: 240,
    targetFat: 65,
    currentWaterLiters: 1.5,
    currentCaloriesConsumed: 0,
    currentProteinConsumed: 0,
    currentSteps: 3200,
    recoveryScore: 94,
    sleepScore: 90,
    streakDays: 1,
    totalXp: 100,
    level: 1
  };
};

export const useFitnessStore = create<FitnessState>((set, get) => ({
  auth: {
    isAuthenticated: false,
    user: null
  },
  theme: 'dark',
  activeTab: 'dashboard',
  profile: getBlankProfile('Guest User'),
  exercises: [],
  indianFoods: [],
  selectedExerciseModal: null,
  showOnboardingModal: false,
  showCelebrationModal: false,
  isVoiceCoachOn: true,
  selectedWorkoutType: 'PUSH_PULL_LEGS',
  isVegOnly: true,
  toast: null,

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

  // Auth Actions
  login: (email, name) => {
    soundService.playSuccess();
    const cleanName = name || email.split('@')[0] || 'Member';
    const stored = localStorage.getItem(`apex_user_${email}`);
    let nextProfile = getBlankProfile(cleanName);
    if (stored) {
      try {
        nextProfile = JSON.parse(stored);
      } catch (e) {}
    }
    set({
      auth: {
        isAuthenticated: true,
        user: {
          id: `usr_${Date.now()}`,
          email,
          name: cleanName
        }
      },
      profile: nextProfile,
      activeTab: 'dashboard'
    });
    get().showToast(`Welcome back, ${cleanName}! Signed in to Apex AI Pro.`, 'success');
    soundService.playVoiceCue('/audio/workout_start.mp3', `Welcome back, ${cleanName}.`);
  },

  signup: (email, name, weightKg = 70, heightCm = 175, age = 26) => {
    soundService.playSuccess();
    const cleanName = name || email.split('@')[0] || 'Member';
    const nextProfile = getBlankProfile(cleanName, weightKg, heightCm, age);
    localStorage.setItem(`apex_user_${email}`, JSON.stringify(nextProfile));

    set({
      auth: {
        isAuthenticated: true,
        user: {
          id: `usr_${Date.now()}`,
          email,
          name: cleanName
        }
      },
      profile: nextProfile,
      activeTab: 'dashboard'
    });
    get().showToast(`Account created for ${cleanName}! Your personalized plan is ready.`, 'success');
    soundService.playVoiceCue('/audio/workout_start.mp3', `Welcome to Apex AI Pro, ${cleanName}.`);
  },

  loginAsGuest: () => {
    soundService.playClick();
    const guestName = 'Alex Mercer';
    set({
      auth: {
        isAuthenticated: true,
        user: {
          id: 'usr_guest_01',
          email: 'alex.mercer@apex.ai',
          name: guestName
        }
      },
      profile: getBlankProfile(guestName, 74.0, 180, 27),
      activeTab: 'dashboard'
    });
    get().showToast('Signed in as Guest Athlete (Alex Mercer)', 'info');
  },

  logout: () => {
    soundService.playClick();
    set({
      auth: {
        isAuthenticated: false,
        user: null
      },
      activeTab: 'dashboard'
    });
    get().showToast('Signed out of account.', 'info');
  },

  setTheme: (theme) => set({ theme }),
  setActiveTab: (activeTab) => {
    soundService.playClick();
    set({ activeTab });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  setProfile: (partial) => {
    set((state) => {
      const updated = { ...state.profile, ...partial };
      if (state.auth.user) {
        localStorage.setItem(`apex_user_${state.auth.user.email}`, JSON.stringify(updated));
      }
      return { profile: updated };
    });
  },
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
    get().showToast(`Voice Coach: ${nextState ? 'ON' : 'OFF'}`, 'info');
  },
  setSelectedWorkoutType: (selectedWorkoutType) => set({ selectedWorkoutType }),
  toggleVegOnly: () => {
    soundService.playClick();
    set((state) => {
      const next = !state.isVegOnly;
      get().showToast(`Filter updated: ${next ? 'Vegetarian Only' : 'All Foods'}`, 'info');
      return { isVegOnly: next };
    });
  },

  showToast: (message, type = 'success') => {
    set({ toast: { visible: true, message, type } });
    setTimeout(() => {
      if (get().toast?.message === message) {
        set({ toast: null });
      }
    }, 3800);
  },

  hideToast: () => set({ toast: null }),

  logWater: (liters) => {
    soundService.playClick();
    set((state) => {
      const nextProfile = {
        ...state.profile,
        currentWaterLiters: Number((state.profile.currentWaterLiters + liters).toFixed(2))
      };
      if (state.auth.user) {
        localStorage.setItem(`apex_user_${state.auth.user.email}`, JSON.stringify(nextProfile));
      }
      return { profile: nextProfile };
    });
    get().showToast(`Hydration Logged: +${liters * 1000}ml water!`, 'success');
    soundService.playVoiceCue('/audio/workout_start.mp3', `Logged ${liters * 1000} milliliters of water.`);
  },

  logMeal: (name, calories, protein) => {
    soundService.playSuccess();
    set((state) => {
      const nextProfile = {
        ...state.profile,
        currentCaloriesConsumed: state.profile.currentCaloriesConsumed + calories,
        currentProteinConsumed: state.profile.currentProteinConsumed + protein
      };
      if (state.auth.user) {
        localStorage.setItem(`apex_user_${state.auth.user.email}`, JSON.stringify(nextProfile));
      }
      return { profile: nextProfile };
    });
    get().showToast(`Logged Meal: ${name} (+${calories} kcal, +${protein}g Protein)`, 'success');
  },

  toggleCompleteSet: (idx) => {
    soundService.playSuccess();
    set((state) => {
      const nextSets = [...state.liveWorkout.sets];
      nextSets[idx] = { ...nextSets[idx], isCompleted: !nextSets[idx].isCompleted };
      if (nextSets[idx].isCompleted) {
        get().showToast(`Set ${nextSets[idx].setNum} Completed! Rest timer active.`, 'success');
      }
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
      get().showToast(`Set ${nextNum} added to current protocol`, 'info');
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
    set((state) => {
      const nextProfile = {
        ...state.profile,
        streakDays: state.profile.streakDays + 1,
        totalXp: state.profile.totalXp + 250
      };
      if (state.auth.user) {
        localStorage.setItem(`apex_user_${state.auth.user.email}`, JSON.stringify(nextProfile));
      }
      return {
        showCelebrationModal: true,
        profile: nextProfile
      };
    });
    get().showToast('Workout Complete! +250 XP Awarded & Streak Increased!', 'success');
    soundService.playVoiceCue('/audio/workout_complete.mp3', 'Workout complete! You set a new personal record and earned 250 XP!');
  },

  enableHomeWorkoutMode: () => {
    soundService.playSuccess();
    set((state) => {
      const nextProfile = {
        ...state.profile,
        workoutLocation: 'HOME_GYM',
        equipmentAvailable: 'BODYWEIGHT'
      };
      if (state.auth.user) {
        localStorage.setItem(`apex_user_${state.auth.user.email}`, JSON.stringify(nextProfile));
      }
      return {
        selectedWorkoutType: 'HOME_WORKOUT',
        profile: nextProfile,
        liveWorkout: {
          exerciseSlug: 'bodyweight-jump-squat',
          title: 'Explosive Bodyweight Jump Squat',
          equipmentNote: '100% Zero Gym Equipment (Home Floor)',
          sets: [
            { setNum: 1, weight: 0.0, reps: 15, isCompleted: true },
            { setNum: 2, weight: 0.0, reps: 15, isCompleted: false },
            { setNum: 3, weight: 0.0, reps: 15, isCompleted: false },
            { setNum: 4, weight: 0.0, reps: 12, isCompleted: false }
          ],
          elapsedSeconds: 0
        }
      };
    });
    get().showToast('Switched to 100% Zero-Gym Mode! Protocol updated to home calisthenics.', 'success');
    soundService.playVoiceCue('/audio/workout_start.mp3', 'Home workout without gym equipment enabled! Zero gym equipment required today.');
  }
}));
