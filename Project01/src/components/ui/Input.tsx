import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}
export function Input({
  label,
  error,
  icon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label &&
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      }
      <div className="relative">
        {icon &&
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        }
        <input
          className={`
            w-full rounded-lg border bg-white dark:bg-gray-900/50 
            border-gray-300 dark:border-gray-700 
            text-gray-900 dark:text-white 
            placeholder-gray-400 dark:placeholder-gray-500
            focus:ring-2 focus:ring-emerald-500 focus:border-transparent
            disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-800
            transition-all duration-200
            ${icon ? 'pl-10' : 'pl-4'} 
            pr-4 py-2.5
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props} />

      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>);

}