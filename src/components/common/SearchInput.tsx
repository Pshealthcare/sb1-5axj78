import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/classNames';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  icon,
  className,
  ...props
}) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type="text"
        className={cn(
          "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
          icon && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  );
};