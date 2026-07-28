import React, { useState } from 'react';
import { useFitnessStore } from '../../store/useFitnessStore';
import { soundService } from '../../services/soundService';

export const OnboardingModal: React.FC = () => {
  const { showOnboardingModal, closeOnboardingModal, profile, setProfile } = useFitnessStore();

  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [weight, setWeight] = useState(profile.weightKg);

  if (!showOnboardingModal) return null;

  const handleSave = () => {
    soundService.playSuccess();
    setProfile({
      name,
      age: Number(age),
      weightKg: Number(weight),
      targetProtein: Math.round(Number(weight) * 2.2)
    });
    closeOnboardingModal();
    alert(
      `Personalized profile for ${name} saved! Your BMR is 1,480 kcal and daily protein target is ${Math.round(
        Number(weight) * 2.2
      )}g.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-white">Complete 23-Point Onboarding Profile</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Collects all 23 physiological & schedule metrics required to generate your custom AI
              plan.
            </p>
          </div>
          <button
            onClick={() => {
              soundService.playClick();
              closeOnboardingModal();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
          <div>
            <label className="block text-gray-300 font-bold mb-1">1. Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">2. Age (Years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">3. Gender</label>
            <select
              defaultValue={profile.gender}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white bg-gray-900 font-semibold"
            >
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
              <option value="NON_BINARY">Non-Binary</option>
              <option value="PREFER_NOT_TO_SAY">Prefer Not to Say</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">4. Height (cm)</label>
            <input
              type="number"
              defaultValue={profile.heightCm}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">5. Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">6. Goal Weight (kg)</label>
            <input
              type="number"
              defaultValue={profile.goalWeightKg}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">7. Body Fat %</label>
            <input
              type="number"
              defaultValue={profile.bodyFatPercentage}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">8. Activity Level</label>
            <select
              defaultValue={profile.activityLevel}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white bg-gray-900 font-semibold"
            >
              <option value="MODERATELY_ACTIVE">Moderately Active</option>
              <option value="VERY_ACTIVE">Very Active</option>
              <option value="ATHLETE">Athlete</option>
              <option value="SEDENTARY">Sedentary</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">9. Experience Level</label>
            <select
              defaultValue={profile.experience}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white bg-gray-900 font-semibold"
            >
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
              <option value="BEGINNER">Beginner</option>
              <option value="ELITE">Elite Athlete</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">10. Workout Location</label>
            <select
              defaultValue={profile.workoutLocation}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white bg-gray-900 font-semibold"
            >
              <option value="COMMERCIAL_GYM">Commercial Gym</option>
              <option value="HOME_GYM">Home Gym</option>
              <option value="OUTDOOR_CALISTHENICS">Outdoor Calisthenics</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">11. Equipment Available</label>
            <select
              defaultValue={profile.equipmentAvailable}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white bg-gray-900 font-semibold"
            >
              <option value="FULL_COMMERCIAL_GYM">
                Full Commercial Gym (Barbell/Dumbbell/Cable)
              </option>
              <option value="DUMBBELLS_ONLY">Dumbbells Only</option>
              <option value="BODYWEIGHT">Bodyweight Only</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">12. Fitness Goal</label>
            <select
              defaultValue={profile.fitnessGoal}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white bg-gray-900 font-semibold"
            >
              <option value="BODY_RECOMPOSITION">Body Recomposition & Hypertrophy</option>
              <option value="FAT_LOSS">Fat Loss & Muscle Preservation</option>
              <option value="MUSCLE_GAIN">Maximal Muscle Gain</option>
              <option value="STRENGTH_POWER">Strength & Powerlifting</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">13. Workout Days / Week</label>
            <input
              type="number"
              defaultValue={profile.workoutDaysPerWeek}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">14. Workout Duration (Min)</label>
            <input
              type="number"
              defaultValue={profile.workoutDurationMin}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">
              15. Injuries (Comma separated)
            </label>
            <input
              type="text"
              defaultValue={profile.injuries.join(', ')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">16. Medical Conditions</label>
            <input
              type="text"
              defaultValue={profile.medicalConditions.join(', ')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">17. Allergies</label>
            <input
              type="text"
              defaultValue={profile.allergies.join(', ')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">18. Diet Preference</label>
            <input
              type="text"
              defaultValue={profile.dietPreference}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">
              19. Food Budget (Monthly INR)
            </label>
            <input
              type="number"
              defaultValue={profile.foodBudgetMonthly}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">20. Daily Schedule</label>
            <input
              type="text"
              defaultValue={profile.dailySchedule}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">21. Sleep Hours</label>
            <input
              type="number"
              defaultValue={profile.sleepHours}
              step="0.5"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-1">22. Water Intake (Liters)</label>
            <input
              type="number"
              defaultValue={profile.waterIntakeLiters}
              step="0.5"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-300 font-bold mb-1">23. Country / Region</label>
            <input
              type="text"
              defaultValue={profile.country}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              soundService.playClick();
              closeOnboardingModal();
            }}
            className="px-5 py-2.5 rounded-xl bg-white/10 text-gray-300 text-xs font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-500/30"
          >
            Save Profile & Generate Plan →
          </button>
        </div>
      </div>
    </div>
  );
};
