import React, { useState } from 'react';
import { useFitnessStore } from '../../store/useFitnessStore';
import { soundService } from '../../services/soundService';
import { ExerciseMotionVisualizer } from '../ExerciseMotionVisualizer';

export const ExerciseDetailModal: React.FC = () => {
  const { selectedExerciseModal, closeExerciseModal } = useFitnessStore();
  const [view, setView] = useState<'FRONT' | 'BACK' | 'SIDE'>('FRONT');

  if (!selectedExerciseModal) return null;
  const ex = selectedExerciseModal;

  const getMotionType = (slug: string) => {
    if (slug.includes('squat') && slug.includes('split')) return 'split_squat';
    if (slug.includes('squat')) return 'squat';
    if (slug.includes('push-up') && slug.includes('pike')) return 'pike';
    if (slug.includes('push-up') || slug.includes('bench')) return 'pushup';
    if (slug.includes('row')) return 'row';
    return 'default';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-extrabold uppercase tracking-wider">
              {ex.category}
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">{ex.name}</h3>
          </div>
          <button
            onClick={() => {
              soundService.playClick();
              closeExerciseModal();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {/* Animated Human Biomechanical Motion Visualizer */}
            <ExerciseMotionVisualizer
              image={ex.image}
              name={ex.name}
              primaryMuscle={ex.primaryMuscle}
              targetReps={ex.equipment.includes('Without Gym') ? 15 : 10}
              tempo={ex.tempo}
              motionType={getMotionType(ex.slug)}
            />

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <button
                onClick={() => {
                  soundService.playClick();
                  setView('FRONT');
                }}
                className={`p-2.5 rounded-xl transition ${
                  view === 'FRONT' ? 'bg-blue-600 text-white shadow' : 'bg-white/10 text-gray-300'
                }`}
              >
                Front Angle
              </button>
              <button
                onClick={() => {
                  soundService.playClick();
                  setView('BACK');
                }}
                className={`p-2.5 rounded-xl transition ${
                  view === 'BACK' ? 'bg-blue-600 text-white shadow' : 'bg-white/10 text-gray-300'
                }`}
              >
                Back Angle
              </button>
              <button
                onClick={() => {
                  soundService.playClick();
                  setView('SIDE');
                }}
                className={`p-2.5 rounded-xl transition ${
                  view === 'SIDE' ? 'bg-blue-600 text-white shadow' : 'bg-white/10 text-gray-300'
                }`}
              >
                Side Angle
              </button>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <strong className="text-gray-400 uppercase tracking-wider block mb-1 font-bold">
                Target Muscles
              </strong>
              <p className="text-sm text-white font-medium">
                Secondary: {ex.secondaryMuscles} • Stabilizers: Core & Erectors
              </p>
            </div>

            <div>
              <strong className="text-gray-400 uppercase tracking-wider block mb-1 font-bold">
                Step-by-Step Instructions
              </strong>
              <ul className="list-decimal pl-4 space-y-1.5 text-gray-300 font-medium">
                {ex.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong className="text-gray-400 uppercase tracking-wider block mb-1 font-bold">
                Common Mistakes & Safety
              </strong>
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 space-y-1.5 font-medium">
                {ex.mistakes.map((m, idx) => (
                  <div key={idx}>⚠️ Avoid {m}</div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <strong className="text-gray-400 uppercase tracking-wider block mb-2 font-bold">
                5 Equipment Variations
              </strong>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    soundService.playSuccess();
                    alert(
                      `Switched primary exercise target to Home Version (${ex.homeVersion || 'Bodyweight'})!`
                    );
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left transition"
                >
                  <span className="text-[10px] text-gray-400 block font-semibold">Home Version</span>
                  <span className="font-extrabold text-white">
                    {ex.homeVersion || 'Bodyweight Jump Squat'}
                  </span>
                </button>
                <button
                  onClick={() => {
                    soundService.playSuccess();
                    alert(
                      `Switched primary exercise target to Machine Version (${ex.machineVersion || 'Leg Press Machine'})!`
                    );
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left transition"
                >
                  <span className="text-[10px] text-gray-400 block font-semibold">
                    Machine Version
                  </span>
                  <span className="font-extrabold text-white">
                    {ex.machineVersion || 'Leg Press Machine'}
                  </span>
                </button>
                <button
                  onClick={() => {
                    soundService.playSuccess();
                    alert(
                      `Switched primary exercise target to Dumbbell Version (${ex.dumbbellVersion || 'Goblet Squat'})!`
                    );
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left transition"
                >
                  <span className="text-[10px] text-gray-400 block font-semibold">
                    Dumbbell Version
                  </span>
                  <span className="font-extrabold text-white">
                    {ex.dumbbellVersion || 'Goblet Squat'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
