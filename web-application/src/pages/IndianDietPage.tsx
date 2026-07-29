import React from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { soundService } from '../services/soundService';
import { IndianFoodItem } from '../types';

export const IndianDietPage: React.FC = () => {
  const { profile, isVegOnly, toggleVegOnly, logMeal, showToast } = useFitnessStore();

  const INDIAN_FOOD_DB: IndianFoodItem[] = [
    {
      name: 'Idli (2 Medium) + Sambar',
      category: 'Breakfast',
      serving: '2 idlis + 150ml sambar',
      calories: 226,
      protein: 9.6,
      carbs: 42.5,
      fat: 2.6,
      isVegetarian: true
    },
    {
      name: 'Plain Dosa',
      category: 'Breakfast',
      serving: '1 medium crepe',
      calories: 168,
      protein: 3.9,
      carbs: 28.2,
      fat: 4.2,
      isVegetarian: true
    },
    {
      name: 'Masala Dosa with Sambar',
      category: 'Breakfast',
      serving: '1 dosa + sambar bowl',
      calories: 385,
      protein: 8.5,
      carbs: 58.0,
      fat: 13.2,
      isVegetarian: true
    },
    {
      name: 'Vegetable Upma',
      category: 'Breakfast',
      serving: '1 standard bowl',
      calories: 215,
      protein: 5.1,
      carbs: 34.0,
      fat: 6.5,
      isVegetarian: true
    },
    {
      name: 'Kanda Poha',
      category: 'Breakfast',
      serving: '1 standard bowl',
      calories: 250,
      protein: 4.8,
      carbs: 46.2,
      fat: 5.2,
      isVegetarian: true
    },
    {
      name: 'Whole Wheat Roti (Phulka)',
      category: 'Grain/Millet',
      serving: '1 medium roti',
      calories: 85,
      protein: 3.1,
      carbs: 17.5,
      fat: 0.5,
      isVegetarian: true
    },
    {
      name: 'Steamed White Rice',
      category: 'Grain/Millet',
      serving: '1 cooked cup',
      calories: 195,
      protein: 4.2,
      carbs: 43.5,
      fat: 0.4,
      isVegetarian: true
    },
    {
      name: 'Yellow Dal Tadka (Arhar/Toor)',
      category: 'Lentils/Dal',
      serving: '1 standard bowl',
      calories: 180,
      protein: 9.8,
      carbs: 26.4,
      fat: 4.5,
      isVegetarian: true
    },
    {
      name: 'Grilled Paneer Tikka (Low Oil)',
      category: 'Protein',
      serving: '6 medium cubes (150g)',
      calories: 275,
      protein: 18.5,
      carbs: 5.2,
      fat: 20.0,
      isVegetarian: true
    },
    {
      name: 'Tandoori Chicken Breast',
      category: 'Protein',
      serving: '1 whole breast (160g)',
      calories: 220,
      protein: 38.0,
      carbs: 2.5,
      fat: 6.0,
      isVegetarian: false
    },
    {
      name: 'Boiled Eggs (2 Whole)',
      category: 'Protein',
      serving: '2 large eggs',
      calories: 155,
      protein: 12.6,
      carbs: 1.1,
      fat: 10.6,
      isVegetarian: false
    },
    {
      name: 'Fish Curry (Rohu / Katla)',
      category: 'Protein',
      serving: '2 fillets with light gravy',
      calories: 240,
      protein: 26.5,
      carbs: 6.0,
      fat: 12.0,
      isVegetarian: false
    },
    {
      name: 'Ragi Mudde / Ragi Ball',
      category: 'Grain/Millet',
      serving: '1 medium ball',
      calories: 185,
      protein: 5.2,
      carbs: 39.5,
      fat: 0.9,
      isVegetarian: true
    },
    {
      name: 'Sprouted Moong Salad',
      category: 'Protein',
      serving: '1 large bowl',
      calories: 145,
      protein: 11.2,
      carbs: 24.0,
      fat: 0.8,
      isVegetarian: true
    }
  ];

  const filtered = isVegOnly ? INDIAN_FOOD_DB.filter((f) => f.isVegetarian) : INDIAN_FOOD_DB;

  const openCustomMeal = () => {
    soundService.playClick();
    const name = prompt('Enter Food Name:', 'Paneer Bhurji & Brown Rice');
    if (!name) return;
    const cal = Number(prompt('Enter Calories:', '420') || '420');
    const pro = Number(prompt('Enter Protein (grams):', '24') || '24');
    logMeal(name, cal, pro);
  };

  return (
    <div className="space-y-6">
      {/* Crisp Minimal Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Indian Diet Planner
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            40+ authentic regional Indian foods with macro tracking.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleVegOnly}
            className="px-5 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-xs transition"
          >
            {isVegOnly ? '🌱 Vegetarian: ON' : '🍗 All Foods (Veg + Non-Veg)'}
          </button>
          <button
            onClick={openCustomMeal}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition shadow-lg shadow-blue-500/20"
          >
            + Log Custom Meal
          </button>
        </div>
      </div>

      {/* Target breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <div className="text-xs text-gray-400 font-bold uppercase">Calories</div>
          <div className="text-3xl font-extrabold text-orange-400 mt-1">
            {profile.targetCalories} kcal
          </div>
          <div className="text-xs text-gray-400 font-medium mt-1">
            {profile.currentCaloriesConsumed} kcal logged today
          </div>
        </div>
        <div className="glass-card p-5">
          <div className="text-xs text-gray-400 font-bold uppercase">Protein Target</div>
          <div className="text-3xl font-extrabold text-purple-400 mt-1">
            {profile.targetProtein}g
          </div>
          <div className="text-xs text-emerald-400 font-bold mt-1">2.2g / kg bodyweight</div>
        </div>
        <div className="glass-card p-5">
          <div className="text-xs text-gray-400 font-bold uppercase">Carbs</div>
          <div className="text-3xl font-extrabold text-cyan-400 mt-1">{profile.targetCarbs}g</div>
          <div className="text-xs text-gray-400 font-medium mt-1">Complex oats & millets</div>
        </div>
        <div className="glass-card p-5">
          <div className="text-xs text-gray-400 font-bold uppercase">Fats</div>
          <div className="text-3xl font-extrabold text-amber-400 mt-1">{profile.targetFat}g</div>
          <div className="text-xs text-gray-400 font-medium mt-1">Ghee, peanuts & olive oil</div>
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((f, idx) => (
          <div key={idx} className="glass-card p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold ${
                    f.isVegetarian
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-orange-500/20 text-orange-400'
                  }`}
                >
                  {f.isVegetarian ? '🌱 VEG' : '🍗 HIGH PROTEIN'}
                </span>
                <span className="text-xs font-extrabold text-orange-400">{f.calories} kcal</span>
              </div>
              <h4 className="font-extrabold text-base text-white mt-2">{f.name}</h4>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{f.serving}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-purple-400 font-extrabold">{f.protein}g Protein</span>
              <button
                onClick={() => logMeal(f.name, f.calories, f.protein)}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition"
              >
                + Log Meal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
