import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PointDisplayProps {
  points: number;
  className?: string;
  showIcon?: boolean;
}

export const PointDisplay = ({ points, className = '', showIcon = true }: PointDisplayProps) => {
  const isPositive = points > 0;
  const isNegative = points < 0;
  const absPoints = Math.abs(points);

  const getColorClass = () => {
    if (isPositive) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (isNegative) return 'text-rose-600 bg-rose-50 border-rose-100';
    return 'text-slate-500 bg-slate-50 border-slate-100';
  };

  const getIcon = () => {
    if (isPositive) return <TrendingUp className="w-3 h-3" />;
    if (isNegative) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-bold tabular-nums ${getColorClass()} ${className}`}>
      {showIcon && getIcon()}
      <span>
        {isPositive ? '+' : isNegative ? '-' : ''}
        {absPoints.toLocaleString()}
      </span>
    </div>
  );
};
