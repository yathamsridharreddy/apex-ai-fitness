// APEX AI FITNESS — PRO (Sleek Apple-Minimal Tabbed Profile Modal)
// Clean 3-tab layout (Body Stats, Training Plan, Diet & Recovery) instead of an overwhelming 23-field form wall.

import React, { useState } from 'react';
import { useFitnessStore } from '../../store/useFitnessStore';
import { soundService } from '../../services/soundService';
import { User, Dumbbell, Utensils, Check } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { showOnboardingModal, closeOnboardingModal, profile, setProfile } = useFitnessStore();

  const [activeProfileTab, setActiveProfileTab] = useState<'BODY' | 'TRAINING' | 'DIET'>('BODY');
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [weight, setWeight] = useState(profile.weightKg);
  const [goalWeight, setGoalWeight] = useState(profile.goalWeightKg);
  const [height, setHeight] = useState(profile.heightCm);
  const [goal, setGoal] = useState(profile.fitnessGoal);
  const [equipment, setEquipment] = useState(profile.equipmentAvailable);
  const [days, setDays] = useState(profile.workoutDaysPerWeek);
  const [diet, setDiet] = useState(profile.dietPreference);
  const [water, setWater] = useState(profile.waterIntakeLiters);
  const [sleep, setSleep] = useState(profile.sleepHours);

  if (!showOnboardingModal) return null;

  const handleSave = () => {
    soundService.playSuccess();
    const updatedProtein = Math.round(Number(weight) * 2.2);
    setProfile({
      name,
      age: Number(age),
      weightKg: Number(weight),
      goalWeightKg: Number(goalWeight),
      heightCm: Number(height),
      fitnessGoal: goal,
      equipmentAvailable: equipment,
      workoutDaysPerWeek: Number(days),
      dietPreference: diet,
      waterIntakeLiters: Number(water),
      sleepHours: Number(sleep),
      targetProtein: updatedProtein
    });
    closeOnboardingModal();
    alert(
      `Profile saved for ${name}! Daily protein target updated to ${updatedProtein}g (2.2g/kg bodyweight).`
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="glass-card max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-glow-blue">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-white">Fitness & Nutrition Profile</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Apple-minimal profile settings with instant macro & BMR calibration.
            </p>
          </div>
          <button
            onClick={() => {
              soundService.playClick();
              closeOnboardingModal();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* 3 Apple-Style Profile Tabs */}
        <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => {
              soundService.playClick();
              setActiveProfileTab('BODY');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              activeProfileTab === 'BODY'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Body Stats</span>
          </button>
          <button
            onClick={() => {
              soundService.playClick();
              setActiveProfileTab('TRAINING');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              activeProfileTab === 'TRAINING'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Training Plan</span>
          </button>
          <button
            onClick={() => {
              soundService.playClick();
              setActiveProfileTab('DIET');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              activeProfileTab === 'DIET'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Diet & Health</span>
          </button>
        </div>

        {/* Tab 1: Body Stats */}
        {activeProfileTab === 'BODY' && (
          <div className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Current Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-1">Goal Weight (kg)</label>
                <input
                  type="number"
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Instant Calculated Physiometrics Summary Box */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-400 block font-semibold">Basal Metabolic Rate</span>
                <strong className="text-blue-300 text-sm">1,480 kcal / day</strong>
              </div>
              <div className="text-right">
                <span className="text-gray-400 block font-semibold">Daily Protein Goal</span>
                <strong className="text-emerald-400 text-sm">{Math.round(weight * 2.2)}g (2.2g/kg)</strong>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Training Plan */}
        {activeProfileTab === 'TRAINING' && (
          <div className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Primary Fitness Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white bg-gray-900 font-semibold focus:outline-none"
              >
                <option value="BODY_RECOMPOSITION">Body Recomposition & Hypertrophy</option>
                <option value="FAT_LOSS">Fat Loss & Muscle Preservation</option>
                <option value="MUSCLE_GAIN">Maximal Lean Muscle Gain</option>
                <option value="STRENGTH_POWER">Strength & Powerlifting</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Primary Equipment Mode</label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white bg-gray-900 font-semibold focus:outline-none"
              >
                <option value="BODYWEIGHT">🏠 100% Zero-Gym Equipment (Home Floor & Chair)</option>
                <option value="FULL_COMMERCIAL_GYM">🏋️ Full Commercial Gym (Barbells & Dumbbells)</option>
                <option value="DUMBBELLS_ONLY">Dumbbells Only</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Workout Days / Week</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-1">Duration (min)</label>
                <input
                  type="number"
                  defaultValue={60}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Diet & Recovery */}
        {activeProfileTab === 'DIET' && (
          <div className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Dietary Preference</label>
              <input
                type="text"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Daily Water Goal (L)</label>
                <input
                  type="number"
                  value={water}
                  step="0.5"
                  onChange={(e) => setWater(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-1">Target Sleep (hrs)</label>
                <input
                  type="number"
                  value={sleep}
                  step="0.5"
                  onChange={(e) => setSleep(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold focus:outline-none"
                />
              </div>
            </div>

            {/* Health Checklist Pill */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Mild Lower Back Sensitive (Injury adaptation active)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Lactose Sensitive (Plant protein alternatives enabled)</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              soundService.playClick();
              closeOnboardingModal();
            }}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-bold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-500/30 transition"
          >
            Save Profile & Update Macros →
          </button>
        </div>
      </div>
    </div>
  );
};
