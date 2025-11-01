interface StatBarProps {
  value: number;
  maxValue: number;
  color: string;
}

export default function StatBar({ value, maxValue, color }: StatBarProps) {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-1000 ease-out`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      ></div>
    </div>
  );
}