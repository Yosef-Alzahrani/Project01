import React from 'react';
import { ChevronDown } from 'lucide-react';
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}
export function Select({
  label,
  options,
  error,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label &&
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      }
      <div className="relative">
        <select
          className={`
            w-full appearance-none rounded-lg border bg-white dark:bg-gray-900/50 
            border-gray-300 dark:border-gray-700 
            text-gray-900 dark:text-white 
            focus:ring-2 focus:ring-emerald-500 focus:border-transparent
            disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-800
            transition-all duration-200
            pl-4 pr-10 py-2.5
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}>

          {options.map((option) =>
          <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>);

}