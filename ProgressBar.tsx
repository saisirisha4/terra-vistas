import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  showLabel = true,
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min(100, Math.round((current / max) * 100));
  
  // Color tier based on fullness
  let barColor = 'bg-emerald-500';
  let badgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let statusText = 'Filling up';

  if (percentage >= 80) {
    barColor = 'bg-gradient-to-r from-amber-500 to-rose-500';
    badgeColor = 'text-rose-700 bg-rose-50 border-rose-200';
    statusText = 'Almost full • Max savings tier!';
  } else if (percentage >= 50) {
    barColor = 'bg-gradient-to-r from-emerald-500 to-teal-500';
    badgeColor = 'text-teal-700 bg-teal-50 border-teal-200';
    statusText = 'Group tier 2 unlocked';
  } else {
    barColor = 'bg-gradient-to-r from-blue-500 to-emerald-500';
    badgeColor = 'text-blue-700 bg-blue-50 border-blue-200';
    statusText = 'Open for travelers';
  }

  const heightClass = size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-2.5';

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-medium mb-1.5">
          <span className="text-slate-600 font-semibold flex items-center gap-1.5">
            <span className="text-slate-900 font-bold text-sm">{current}</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">{max} travelers</span>
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badgeColor}`}>
            {statusText}
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClass} shadow-inner`}>
        <div
          className={`${heightClass} rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
          <span>{percentage}% capacity</span>
          <span>{max - current} slots remaining</span>
        </div>
      )}
    </div>
  );
};
