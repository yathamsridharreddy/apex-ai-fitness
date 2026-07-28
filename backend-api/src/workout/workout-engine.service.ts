// APEX AI FITNESS — PRO (AI Workout Engine & Smart Progressive Overload Service)
// Handles 14 workout styles, recovery-adapted volume, injury exclusions, and progressive overload.

import { EXERCISE_DATABASE, ExerciseData } from '../database/seed-data';

export interface UserPhysiometrics {
  userId: string;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  bodyFatPercentage: number;
  fitnessGoal: string;
  recoveryScore: number;
  experienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ELITE';
  equipmentAvailable: string;
  workoutTimeMin: number;
  workoutDaysPerWeek: number;
  injuries: string[];
  missedSessions: number;
}

export interface GeneratedWorkoutPlan {
  id: string;
  title: string;
  workoutType: string;
  targetDurationMinutes: number;
  estimatedCaloriesBurned: number;
  recoveryAdjustment: string;
  progressiveOverloadRecommendation: string;
  exercises: {
    exercise: ExerciseData;
    sets: number;
    reps: string;
    targetWeightKg: number;
    restSeconds: number;
    notes: string;
    rpeTarget: number;
  }[];
}

export class AiWorkoutEngineService {
  /**
   * Generates an adaptive, progressive workout plan for any of the 14 Workout Types
   */
  public generateWorkoutPlan(
    user: UserPhysiometrics,
    workoutType: string
  ): GeneratedWorkoutPlan {
    // 1. Filter out exercises that conflict with user injuries
    const safeExercises = EXERCISE_DATABASE.filter(ex => {
      if (user.injuries.some(inj => inj.toLowerCase().includes('back') && ex.category === 'Back')) {
        // Allow supported exercises, replace axial loading
        return ex.slug !== 'conventional-deadlift';
      }
      if (user.injuries.some(inj => inj.toLowerCase().includes('shoulder') && ex.category === 'Shoulders')) {
        return ex.slug !== 'overhead-shoulder-press';
      }
      return true;
    });

    // 2. Adjust volume and RPE based on Recovery Score & Missed Sessions
    let setsMultiplier = 1.0;
    let rpeTarget = 8.0;
    let recoveryAdjustment = 'Optimal Volume (100% Target Capacity)';

    if (user.recoveryScore < 70) {
      setsMultiplier = 0.75;
      rpeTarget = 7.0;
      recoveryAdjustment = 'Reduced Volume (-25%) due to low recovery score (<70). Active recovery focus.';
    } else if (user.recoveryScore > 90 && user.missedSessions === 0) {
      setsMultiplier = 1.15;
      rpeTarget = 8.5;
      recoveryAdjustment = 'High Readiness (+15% Volume). Peak progressive overload opportunity.';
    }

    // 3. Progressive Overload Engine Calculation
    const overloadRecommendation = this.calculateProgressiveOverload(user.recoveryScore, user.experienceLevel);

    // 4. Select exercises according to workoutType
    let selectedExercises: ExerciseData[] = [];

    switch (workoutType) {
      case 'PUSH_PULL_LEGS':
      case 'Push Pull Legs':
        selectedExercises = safeExercises;
        break;
      case 'UPPER_LOWER':
      case 'Upper Lower':
        selectedExercises = safeExercises.filter(ex => ['Chest', 'Back', 'Shoulders'].includes(ex.category));
        break;
      case 'STRENGTH':
      case 'POWERLIFTING':
        selectedExercises = safeExercises.filter(ex => ['barbell-back-squat', 'barbell-bench-press', 'conventional-deadlift'].includes(ex.slug));
        break;
      case 'FAT_LOSS':
      case 'HIIT':
        selectedExercises = safeExercises;
        break;
      case 'HOME_WORKOUT':
      case 'CALISTHENICS':
        selectedExercises = safeExercises.filter(ex => ex.equipment === 'Bodyweight' || ex.homeVersion);
        break;
      default:
        selectedExercises = safeExercises;
        break;
    }

    if (selectedExercises.length === 0) {
      selectedExercises = EXERCISE_DATABASE.slice(0, 5);
    }

    // 5. Calculate sets and reps
    const exercisesWithRx = selectedExercises.map((ex, index) => {
      const baseSets = index < 2 ? 4 : 3;
      const sets = Math.max(2, Math.round(baseSets * setsMultiplier));
      const reps = workoutType === 'STRENGTH' || workoutType === 'POWERLIFTING' ? '5' : '8-10';
      const weight = this.estimateWorkingWeight(ex.slug, user.weightKg, user.experienceLevel);

      return {
        exercise: ex,
        sets,
        reps,
        targetWeightKg: weight,
        restSeconds: workoutType === 'STRENGTH' ? 150 : 90,
        notes: `Focus on ${ex.tempo} tempo and keep primary tension on ${ex.primaryMuscle}.`,
        rpeTarget
      };
    });

    return {
      id: `plan-${Date.now()}`,
      title: `${workoutType.replace(/_/g, ' ')} — Adaptive Protocol`,
      workoutType,
      targetDurationMinutes: user.workoutTimeMin || 60,
      estimatedCaloriesBurned: Math.round((user.workoutTimeMin || 60) * 7.5 * (user.weightKg / 70)),
      recoveryAdjustment,
      progressiveOverloadRecommendation: overloadRecommendation,
      exercises: exercisesWithRx
    };
  }

  private calculateProgressiveOverload(recoveryScore: number, experience: string): string {
    if (recoveryScore < 60) {
      return 'DELOAD WEEK RECOMMENDED: Reduce load by 15% to allow central nervous system supercompensation.';
    }
    if (recoveryScore >= 85) {
      return 'INCREASE WEIGHT: Add +2.5kg to upper body lifts and +5.0kg to lower body lifts today.';
    }
    return 'MAINTAIN LOAD: Increase reps by 1 per set before advancing weight next session.';
  }

  private estimateWorkingWeight(slug: string, bodyWeightKg: number, experience: string): number {
    const factor = experience === 'ADVANCED' ? 1.4 : experience === 'INTERMEDIATE' ? 1.1 : 0.75;
    if (slug.includes('squat')) return Math.round(bodyWeightKg * 1.1 * factor);
    if (slug.includes('bench')) return Math.round(bodyWeightKg * 0.8 * factor);
    if (slug.includes('deadlift')) return Math.round(bodyWeightKg * 1.3 * factor);
    if (slug.includes('overhead')) return Math.round(bodyWeightKg * 0.5 * factor);
    return Math.round(bodyWeightKg * 0.6 * factor);
  }
}
