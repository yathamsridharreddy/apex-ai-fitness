// APEX AI FITNESS — PRO (Full-Stack REST API Client & Local Storage Sync)
// Synchronizes with the Express/SQLite server and falls back gracefully to LocalStorage.

import { ExerciseItem, IndianFoodItem, UserProfile } from '../types';

const API_BASE = '/api/v1';

export const apiClient = {
  async getProfile(): Promise<UserProfile | null> {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (res.ok) return await res.json();
    } catch (e) {
      const stored = localStorage.getItem('apex_profile');
      if (stored) return JSON.parse(stored);
    }
    return null;
  },

  async saveProfile(profile: UserProfile): Promise<boolean> {
    try {
      localStorage.setItem('apex_profile', JSON.stringify(profile));
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      return res.ok;
    } catch (e) {
      return true;
    }
  },

  async getExercises(): Promise<ExerciseItem[]> {
    try {
      const res = await fetch(`${API_BASE}/exercises`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return [];
  },

  async getIndianFoods(): Promise<IndianFoodItem[]> {
    try {
      const res = await fetch(`${API_BASE}/nutrition`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return [];
  },

  async logMeal(meal: { name: string; calories: number; protein: number }): Promise<void> {
    try {
      await fetch(`${API_BASE}/nutrition/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meal)
      });
    } catch (e) {}
  },

  async logWorkoutComplete(xpReward: number): Promise<void> {
    try {
      await fetch(`${API_BASE}/workouts/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xpReward })
      });
    } catch (e) {}
  }
};
