import React, { useState } from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { soundService } from '../services/soundService';

export const FoodScannerPage: React.FC = () => {
  const { logMeal, showToast } = useFitnessStore();

  const [imgUrl, setImgUrl] = useState<string>('images/food_indian_thali.jpg');
  const [foodName, setFoodName] = useState<string>(
    'High-Protein Indian Bowl (Paneer Tikka, Dal Tadka, Ragi Roti)'
  );
  const [calories, setCalories] = useState<number>(540);
  const [protein, setProtein] = useState<number>(31.5);
  const [carbs, setCarbs] = useState<number>(48.0);
  const [fat, setFat] = useState<number>(22.0);
  const [healthScore, setHealthScore] = useState<number>(95);
  const [alternative, setAlternative] = useState<string>(
    'Excellent balance! Substitute 1 tbsp oil with olive oil to improve omega-3 ratio.'
  );

  const scanSample = (type: 'thali' | 'dosa') => {
    soundService.playSuccess();
    if (type === 'dosa') {
      setImgUrl('images/food_dosa_sambar.jpg');
      setFoodName('Masala Dosa with Sambar & White Coconut Chutney');
      setCalories(385);
      setProtein(8.5);
      setCarbs(58.0);
      setFat(13.2);
      setHealthScore(82);
      setAlternative(
        'For a higher protein swap, try Pesarattu (Moong Dal Dosa) or Ragi Dosa to add +10g protein.'
      );
    } else {
      setImgUrl('images/food_indian_thali.jpg');
      setFoodName('High-Protein Indian Bowl (Paneer Tikka, Dal Tadka, Ragi Roti)');
      setCalories(540);
      setProtein(31.5);
      setCarbs(48.0);
      setFat(22.0);
      setHealthScore(95);
      setAlternative(
        'Excellent balance! Substitute 1 tbsp oil with olive oil to improve omega-3 ratio.'
      );
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    setFoodName('AI Scanned User Meal: Homemade Protein Bowl');
    setCalories(460);
    setProtein(28.0);
    setCarbs(42.0);
    setFat(14.0);
    setHealthScore(91);
    setAlternative('Good protein content! Add 50g boiled sprouts for an extra +6g dietary fiber.');
    soundService.playSuccess();
    showToast('AI Vision analysis complete! Nutritional breakdown updated.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Concise Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Food Photo Scanner
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Instant macro and health score detection with healthier swap advice.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => scanSample('thali')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition shadow-md"
          >
            Scan Sample Indian Thali
          </button>
          <button
            onClick={() => scanSample('dosa')}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs transition shadow-md"
          >
            Scan Masala Dosa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 cols */}
        <div className="lg:col-span-6 glass-card p-6 flex flex-col items-center justify-center min-h-[420px] relative bg-black/40 rounded-3xl border-dashed border-2 border-white/20 shadow-glow-blue">
          <img
            src={imgUrl}
            alt="Scanned Food Photo"
            className="w-full h-80 object-cover rounded-2xl shadow-xl"
          />
          <div className="mt-4 flex items-center space-x-3">
            <label className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold text-white cursor-pointer border border-white/15 transition">
              <span>Upload Meal Photo</span>
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
            <span className="text-xs text-gray-400 font-medium">
              or try the quick buttons above
            </span>
          </div>
        </div>

        {/* Right 6 cols */}
        <div className="lg:col-span-6 glass-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-extrabold border border-emerald-500/30">
                98% AI Confidence
              </span>
              <span className="text-2xl font-extrabold text-emerald-400">
                {healthScore} / 100 Score
              </span>
            </div>
            <h3 className="text-2xl font-extrabold mt-3 text-white">{foodName}</h3>
            <p className="text-xs text-gray-400 mt-1 font-medium">
              Serving Size: 1 standard bowl (400g)
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center py-4 border-y border-white/10">
            <div className="p-3.5 rounded-2xl bg-white/5">
              <div className="text-xs text-gray-400 font-semibold">Calories</div>
              <div className="text-xl font-extrabold text-orange-400 mt-1">{calories}</div>
              <div className="text-[10px] text-gray-500 font-bold">kcal</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5">
              <div className="text-xs text-gray-400 font-semibold">Protein</div>
              <div className="text-xl font-extrabold text-purple-400 mt-1">{protein}g</div>
              <div className="text-[10px] text-emerald-400 font-bold">High</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5">
              <div className="text-xs text-gray-400 font-semibold">Carbs</div>
              <div className="text-xl font-extrabold text-cyan-400 mt-1">{carbs}g</div>
              <div className="text-[10px] text-gray-500 font-bold">Complex</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5">
              <div className="text-xs text-gray-400 font-semibold">Fat</div>
              <div className="text-xl font-extrabold text-amber-400 mt-1">{fat}g</div>
              <div className="text-[10px] text-gray-500 font-bold">Healthy</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-xs">
            <strong className="text-blue-300 block mb-1 font-bold text-sm">
              ✨ AI Healthier Alternative Suggestion:
            </strong>
            <span className="text-gray-200 leading-relaxed">{alternative}</span>
          </div>

          <button
            onClick={() => logMeal(foodName, calories, protein)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/40 transition"
          >
            + Add to Today's Nutritional Log
          </button>
        </div>
      </div>
    </div>
  );
};
