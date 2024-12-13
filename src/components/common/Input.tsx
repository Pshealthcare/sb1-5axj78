import React, { forwardRef } from 'react';
import { cn } from '../../utils/classNames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, multiline, rows = 3, className, ...props }, ref) => {
    const inputClasses = cn(
      "block w-full rounded-md border-gray-300 shadow-sm",
      "focus:border-primary-500 focus:ring-primary-500",
      error && "border-red-300",
      className
    );

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        {multiline ? (
          <textarea
            {...props}
            rows={rows}
            className={inputClasses}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={inputClasses}
            {...props}
          />
        )}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';