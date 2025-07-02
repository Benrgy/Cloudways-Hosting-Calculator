
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const LoadingSpinner = ({ size = 'md', className, text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClasses = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-center",
        text && `flex-col ${containerClasses[size]}`,
        className
      )}
      role="status"
      aria-label={text || "Loading content, please wait"}
    >
      <div 
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-emerald-600",
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      {text && (
        <span className="text-sm text-gray-600 font-medium">
          {text}
        </span>
      )}
      <span className="sr-only">
        {text || "Loading..."}
      </span>
    </div>
  );
};
