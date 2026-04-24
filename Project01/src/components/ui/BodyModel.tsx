import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
interface BodyModelProps {
  selectedMuscle: string | null;
  onMuscleSelect: (muscle: string) => void;
}
export function BodyModel({ selectedMuscle, onMuscleSelect }: BodyModelProps) {
  const { t } = useLanguage();
  const [view, setView] = useState<'front' | 'back'>('front');
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);
  const muscles = {
    front: [
    {
      id: 'chest',
      path: 'M 90 60 Q 100 80 110 60 L 130 60 Q 140 80 150 60 L 150 80 Q 120 100 90 80 Z',
      label: 'chest'
    },
    {
      id: 'shoulders',
      path: 'M 70 50 Q 80 40 90 50 L 90 70 Q 80 80 70 70 Z M 150 50 Q 160 40 170 50 L 170 70 Q 160 80 150 70 Z',
      label: 'shoulders'
    },
    {
      id: 'arms',
      path: 'M 70 70 L 60 120 L 80 120 L 90 70 Z M 170 70 L 180 120 L 160 120 L 150 70 Z',
      label: 'arms'
    },
    {
      id: 'abs',
      path: 'M 95 85 L 145 85 L 140 130 L 100 130 Z',
      label: 'abs'
    },
    {
      id: 'thighs',
      path: 'M 95 135 L 85 200 L 115 200 L 115 135 Z M 145 135 L 155 200 L 125 200 L 125 135 Z',
      label: 'thighs'
    },
    {
      id: 'calves',
      path: 'M 85 205 L 90 260 L 110 260 L 115 205 Z M 155 205 L 150 260 L 130 260 L 125 205 Z',
      label: 'calves'
    }],

    back: [
    {
      id: 'back',
      path: 'M 90 50 L 150 50 L 140 100 L 100 100 Z',
      label: 'back'
    },
    {
      id: 'shoulders',
      path: 'M 70 50 Q 80 40 90 50 L 90 70 Q 80 80 70 70 Z M 150 50 Q 160 40 170 50 L 170 70 Q 160 80 150 70 Z',
      label: 'shoulders'
    },
    {
      id: 'arms',
      path: 'M 70 70 L 60 120 L 80 120 L 90 70 Z M 170 70 L 180 120 L 160 120 L 150 70 Z',
      label: 'arms'
    },
    {
      id: 'glutes',
      path: 'M 95 105 L 145 105 L 145 135 L 95 135 Z',
      label: 'glutes'
    },
    {
      id: 'thighs',
      path: 'M 95 140 L 85 200 L 115 200 L 115 140 Z M 145 140 L 155 200 L 125 200 L 125 140 Z',
      label: 'thighs'
    },
    {
      id: 'calves',
      path: 'M 85 205 L 90 260 L 110 260 L 115 205 Z M 155 205 L 150 260 L 130 260 L 125 205 Z',
      label: 'calves'
    }]

  };
  const getMuscleColor = (id: string) => {
    if (selectedMuscle === id) return '#10b981'; // Emerald 500
    if (hoveredMuscle === id) return '#3b82f6'; // Blue 500
    return '#9ca3af'; // Gray 400
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setView('front')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${view === 'front' ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>

          {t('bodyAnalysis.bodyModel.front')}
        </button>
        <button
          onClick={() => setView('back')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${view === 'back' ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>

          {t('bodyAnalysis.bodyModel.back')}
        </button>
      </div>

      <div className="relative h-[400px] w-[300px]">
        <svg viewBox="0 0 240 300" className="w-full h-full drop-shadow-xl">
          {/* Body Outline */}
          <path
            d="M 120 20 Q 140 20 145 40 L 170 50 L 180 120 L 160 120 L 155 200 L 150 260 L 130 260 L 125 200 L 125 140 L 115 140 L 115 200 L 110 260 L 90 260 L 85 200 L 80 120 L 60 120 L 70 50 L 95 40 Q 100 20 120 20 Z"
            fill="#e5e7eb"
            className="dark:fill-gray-800"
            stroke="#d1d5db"
            strokeWidth="2" />


          {/* Muscle Groups */}
          {muscles[view].map((muscle) =>
          <path
            key={muscle.id}
            d={muscle.path}
            fill={getMuscleColor(muscle.id)}
            stroke="white"
            strokeWidth="1"
            className="cursor-pointer transition-colors duration-300 hover:opacity-80"
            onMouseEnter={() => setHoveredMuscle(muscle.id)}
            onMouseLeave={() => setHoveredMuscle(null)}
            onClick={() => onMuscleSelect(muscle.id)} />

          )}

          {/* Head (static) */}
          <circle
            cx="120"
            cy="25"
            r="15"
            fill="#d1d5db"
            className="dark:fill-gray-700" />

        </svg>

        {/* Labels */}
        {hoveredMuscle &&
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none">
            {t(`bodyAnalysis.bodyModel.muscles.${hoveredMuscle}`)}
          </div>
        }
      </div>
    </div>);

}