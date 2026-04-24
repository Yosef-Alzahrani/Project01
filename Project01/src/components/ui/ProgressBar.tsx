import React from 'react';
interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  showValue?: boolean;
}
export function ProgressBar({
  value,
  max = 100,
  label,
  color = 'bg-emerald-500',
  showValue = true
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(value / max * 100, 0), 100);
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        {label &&
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
        }
        {showValue &&
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(percentage)}%
          </span>
        }
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{
            width: `${percentage}%`
          }}>
        </div>
      </div>
    </div>);

}
export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  color = '#10b981'




}: ProgressBarProps & {size?: number;strokeWidth?: number;sublabel?: string;}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(Math.max(value / max * 100, 0), 100);
  const offset = circumference - percentage / 100 * circumference;
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative"
        style={{
          width: size,
          height: size
        }}>

        <svg className="transform -rotate-90 w-full h-full">
          <circle
            className="text-gray-200 dark:text-gray-800"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2} />

          <circle
            className="transition-all duration-1000 ease-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke={color}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2} />

        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </span>
          {sublabel &&
          <span className="text-xs text-gray-500 dark:text-gray-400">
              {sublabel}
            </span>
          }
        </div>
      </div>
      {label &&
      <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      }
    </div>);

}