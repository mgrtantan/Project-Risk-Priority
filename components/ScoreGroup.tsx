
import React from 'react';
import { Score } from '../types';
import { SCORE_LABELS } from '../constants';

interface ScoreGroupProps {
  label: string;
  description: string;
  value: Score;
  onChange: (val: Score) => void;
  isRisk?: boolean;
}

export const ScoreGroup: React.FC<ScoreGroupProps> = ({ label, description, value, onChange, isRisk }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border border-stone-200 transition-all hover:border-stone-300">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-stone-800">{label}</h4>
          <p className="text-xs text-stone-500">{description}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        {([Score.Low, Score.Medium, Score.High] as Score[]).map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${
              value === s
                ? isRisk
                  ? 'bg-red-50 border-red-500 text-red-700 shadow-sm'
                  : 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                : 'bg-stone-50 border-stone-100 text-stone-400 hover:border-stone-200 hover:text-stone-600'
            }`}
          >
            {SCORE_LABELS[s]}
          </button>
        ))}
      </div>
    </div>
  );
};
