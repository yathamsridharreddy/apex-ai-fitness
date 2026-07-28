// APEX AI FITNESS — PRO (AI Diet Planner & Indian Food Nutrition Engine)
// Handles macro calculations, Indian food thali & meal planning, food scanner vision, and meal replacements.

import { INDIAN_FOOD_DATABASE, IndianFoodMeta } from '../database/seed-data';

export interface NutritionalTargets {
  dailyCalories: number;
  dailyProteinGrams: number;
  dailyCarbsGrams: number;
  dailyFatGrams: number;
  dailyFiberGrams: number;
  dailySugarMaxGrams: number;
  dailyWaterLiters: number;
  mealTimingSchedule: string[];
}

export interface MealPlanDay {
  date: string;
  targets: NutritionalTargets;
  meals: {
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Pre-Workout' | 'Post-Workout' | 'Cheat Meal';
    time: string;
    food: IndianFoodMeta;
    servings: number;
    totalCalories: number;
    totalProteinG: number;
    totalCarbsG: number;
    totalFatG: number;
    isLogged: boolean;
  }[];
}

export class AiNutritionService {
  /**
   * Calculates accurate daily BMR, TDEE, and macro splits based on goals
   */
  public calculateNutritionalTargets(
    weightKg: number,
    heightCm: number,
    age: number,
    gender: 'MALE' | 'FEMALE' | 'NON_BINARY' | 'PREFER_NOT_TO_SAY',
    activityLevel: string,
    goal: string
  ): NutritionalTargets {
    // Mifflin-St Jeor Equation
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    if (gender === 'MALE') bmr += 5;
    else if (gender === 'FEMALE') bmr -= 161;

    let activityMultiplier = 1.55; // MODERATELY_ACTIVE default
    if (activityLevel === 'SEDENTARY') activityMultiplier = 1.2;
    if (activityLevel === 'VERY_ACTIVE') activityMultiplier = 1.725;
    if (activityLevel === 'ATHLETE') activityMultiplier = 1.9;

    const tdee = Math.round(bmr * activityMultiplier);
    let dailyCalories = tdee;

    if (goal === 'FAT_LOSS') dailyCalories = Math.round(tdee * 0.82); // 18% deficit
    if (goal === 'MUSCLE_GAIN') dailyCalories = Math.round(tdee * 1.12); // 12% surplus

    // Macro Split: 2.2g/kg protein for athletes, remaining split between carbs & fats
    const dailyProteinGrams = Math.round(weightKg * 2.2);
    const proteinCalories = dailyProteinGrams * 4;
    const fatCalories = dailyCalories * 0.25;
    const dailyFatGrams = Math.round(fatCalories / 9);
    const carbCalories = Math.max(0, dailyCalories - proteinCalories - fatCalories);
    const dailyCarbsGrams = Math.round(carbCalories / 4);

    return {
      dailyCalories,
      dailyProteinGrams,
      dailyCarbsGrams,
      dailyFatGrams,
      dailyFiberGrams: Math.round(weightKg * 0.5),
      dailySugarMaxGrams: 35,
      dailyWaterLiters: Number((weightKg * 0.045).toFixed(1)),
      mealTimingSchedule: [
        '07:30 AM — Breakfast',
        '10:30 AM — Pre-Workout Snack',
        '01:00 PM — Lunch',
        '04:30 PM — Evening Protein Snack',
        '08:00 PM — Dinner'
      ]
    };
  }

  /**
   * Generates a complete Indian or International daily meal plan
   */
  public generateMealPlan(targets: NutritionalTargets, isVegetarian: boolean = true): MealPlanDay {
    const breakfastFood = INDIAN_FOOD_DATABASE.find(f => f.name.includes('Idli')) || INDIAN_FOOD_DATABASE[0];
    const lunchFood1 = INDIAN_FOOD_DATABASE.find(f => f.name.includes('Dal')) || INDIAN_FOOD_DATABASE[7];
    const lunchFood2 = INDIAN_FOOD_DATABASE.find(f => f.name.includes('Roti')) || INDIAN_FOOD_DATABASE[5];
    const dinnerProtein = isVegetarian
      ? (INDIAN_FOOD_DATABASE.find(f => f.name.includes('Paneer')) || INDIAN_FOOD_DATABASE[8])
      : (INDIAN_FOOD_DATABASE.find(f => f.name.includes('Chicken')) || INDIAN_FOOD_DATABASE[9]);
    const snackFood = INDIAN_FOOD_DATABASE.find(f => f.name.includes('Sprouted')) || INDIAN_FOOD_DATABASE[17];

    return {
      date: new Date().toISOString().split('T')[0],
      targets,
      meals: [
        {
          mealType: 'Breakfast',
          time: '07:30 AM',
          food: breakfastFood,
          servings: 1.5,
          totalCalories: Math.round(breakfastFood.calories * 1.5),
          totalProteinG: Math.round(breakfastFood.proteinGrams * 1.5),
          totalCarbsG: Math.round(breakfastFood.carbsGrams * 1.5),
          totalFatG: Math.round(breakfastFood.fatGrams * 1.5),
          isLogged: false
        },
        {
          mealType: 'Lunch',
          time: '01:00 PM',
          food: lunchFood1,
          servings: 1.2,
          totalCalories: Math.round(lunchFood1.calories * 1.2),
          totalProteinG: Math.round(lunchFood1.proteinGrams * 1.2),
          totalCarbsG: Math.round(lunchFood1.carbsGrams * 1.2),
          totalFatG: Math.round(lunchFood1.fatGrams * 1.2),
          isLogged: false
        },
        {
          mealType: 'Dinner',
          time: '08:00 PM',
          food: dinnerProtein,
          servings: 1.0,
          totalCalories: dinnerProtein.calories,
          totalProteinG: dinnerProtein.proteinGrams,
          totalCarbsG: dinnerProtein.carbsGrams,
          totalFatG: dinnerProtein.fatGrams,
          isLogged: false
        },
        {
          mealType: 'Snack',
          time: '04:30 PM',
          food: snackFood,
          servings: 1.0,
          totalCalories: snackFood.calories,
          totalProteinG: snackFood.proteinGrams,
          totalCarbsG: snackFood.carbsGrams,
          totalFatG: snackFood.fatGrams,
          isLogged: false
        }
      ]
    };
  }

  /**
   * AI Food Scanner Vision Simulator
   */
  public analyzeFoodPhoto(photoUrl: string): {
    foodName: string;
    confidence: number;
    calories: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    fiberG: number;
    servingSize: string;
    healthScore: number;
    healthierAlternative: string;
  } {
    // Detect Indian Thali or Dosa or general meal
    if (photoUrl.includes('dosa')) {
      return {
        foodName: 'Masala Dosa with Sambar & Coconut Chutney',
        confidence: 0.96,
        calories: 385,
        proteinG: 8.5,
        carbsG: 58.0,
        fatG: 13.2,
        fiberG: 4.8,
        servingSize: '1 complete dosa + 150ml sambar',
        healthScore: 82,
        healthierAlternative: 'Paneer Masala Dosa with Ragi batter for +10g protein & lower glycemic index.'
      };
    }
    return {
      foodName: 'High-Protein Indian Bowl (Paneer Tikka, Dal Tadka, Ragi Roti, Salad)',
      confidence: 0.98,
      calories: 540,
      proteinG: 31.5,
      carbsG: 48.0,
      fatG: 22.0,
      fiberG: 9.5,
      servingSize: '1 standard thali bowl (400g)',
      healthScore: 95,
      healthierAlternative: 'Excellent balance! Substitute 1 tbsp oil with olive oil to improve omega-3 ratio.'
    };
  }
}
