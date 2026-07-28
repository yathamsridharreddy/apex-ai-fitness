// APEX AI FITNESS — PRO (Gamification, XP, Badges & Leaderboard Engine)
// Handles XP progression, Level calculations, Achievements, Daily/Weekly challenges, and Leaderboards.

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'STREAK' | 'STRENGTH' | 'NUTRITION' | 'CONSISTENCY';
  unlocked: boolean;
  xpValue: number;
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  type: 'DAILY' | 'WEEKLY';
  progress: number;
  target: number;
  unit: string;
  xpReward: number;
  completed: boolean;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  level: number;
  totalXp: number;
  streakDays: number;
  isCurrentUser?: boolean;
}

export class GamificationService {
  /**
   * Calculates current level and progress to next level from total XP
   */
  public calculateLevel(totalXp: number): { level: number; currentXpInLevel: number; nextLevelXp: number; progressPercent: number } {
    // Level N requires N * 500 XP
    let level = 1;
    let accumulated = 0;
    while (totalXp >= accumulated + level * 500) {
      accumulated += level * 500;
      level++;
    }
    const currentXpInLevel = totalXp - accumulated;
    const nextLevelXp = level * 500;
    const progressPercent = Math.round((currentXpInLevel / nextLevelXp) * 100);

    return { level, currentXpInLevel, nextLevelXp, progressPercent };
  }

  public getBadges(userStats: { totalWorkouts: number; streak: number; totalVolumeKg: number }): BadgeItem[] {
    return [
      {
        id: 'badge-1',
        title: '7-Day Iron Streak',
        description: 'Completed 7 workouts in a row without missing a scheduled day',
        icon: '🔥',
        category: 'STREAK',
        unlocked: userStats.streak >= 7,
        xpValue: 300
      },
      {
        id: 'badge-2',
        title: '100-Ton Club',
        description: 'Lifted a cumulative 100,000 kg across all training sessions',
        icon: '🏋️‍♂️',
        category: 'STRENGTH',
        unlocked: userStats.totalVolumeKg >= 100000,
        xpValue: 1000
      },
      {
        id: 'badge-3',
        title: 'Thali Protein Master',
        description: 'Hit daily protein macro targets for 5 consecutive days',
        icon: '🥗',
        category: 'NUTRITION',
        unlocked: true,
        xpValue: 250
      },
      {
        id: 'badge-4',
        title: 'Form Perfectionist',
        description: 'Completed 10 sets with 100% AI camera form check score',
        icon: '🎯',
        category: 'CONSISTENCY',
        unlocked: true,
        xpValue: 400
      },
      {
        id: 'badge-5',
        title: 'Century Athlete',
        description: 'Completed 100 total workouts on Apex AI',
        icon: '👑',
        category: 'CONSISTENCY',
        unlocked: userStats.totalWorkouts >= 100,
        xpValue: 2500
      }
    ];
  }

  public getActiveChallenges(): ChallengeItem[] {
    return [
      {
        id: 'chal-daily-1',
        title: 'Daily Hydration Master',
        description: 'Log 3.5 Liters of water today',
        type: 'DAILY',
        progress: 2.8,
        target: 3.5,
        unit: 'Liters',
        xpReward: 100,
        completed: false
      },
      {
        id: 'chal-daily-2',
        title: 'High Protein Indian Bowl',
        description: 'Log a meal with at least 30g protein',
        type: 'DAILY',
        progress: 1,
        target: 1,
        unit: 'Meal',
        xpReward: 150,
        completed: true
      },
      {
        id: 'chal-weekly-1',
        title: '5-Session Iron Week',
        description: 'Complete 5 scheduled workouts this week',
        type: 'WEEKLY',
        progress: 4,
        target: 5,
        unit: 'Workouts',
        xpReward: 750,
        completed: false
      },
      {
        id: 'chal-weekly-2',
        title: 'Progressive Volume Smash',
        description: 'Lift 25,000 kg total volume this week',
        type: 'WEEKLY',
        progress: 21400,
        target: 25000,
        unit: 'kg',
        xpReward: 1000,
        completed: false
      }
    ];
  }

  public getLeaderboard(): LeaderboardUser[] {
    return [
      { rank: 1, name: 'Vikramaditya S.', avatar: '🏆', level: 14, totalXp: 18500, streakDays: 42 },
      { rank: 2, name: 'Aarav Mehta', avatar: '⚡', level: 12, totalXp: 14200, streakDays: 28 },
      { rank: 3, name: 'Priya Sharma (You)', avatar: '🔥', level: 6, totalXp: 3450, streakDays: 7, isCurrentUser: true },
      { rank: 4, name: 'Rohan Kapoor', avatar: '💪', level: 6, totalXp: 3100, streakDays: 5 },
      { rank: 5, name: 'Ananya Deshmukh', avatar: '🧘‍♀️', level: 5, totalXp: 2850, streakDays: 6 }
    ];
  }
}
