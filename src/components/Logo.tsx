
import React from 'react';
import { Cloud, Calculator } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo = ({ size = 'md', showText = true, className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative" aria-hidden="true">
        <Cloud className={`${sizeClasses[size]} text-emerald-600`} />
        <Calculator className={`${sizeClasses[size]} text-blue-600 absolute -bottom-1 -right-1 w-4 h-4`} />
      </div>
      {showText && (
        <span className={`font-bold text-gray-900 ${textSizeClasses[size]}`}>
          Cloudways Calculator
        </span>
      )}
    </div>
  );
};
