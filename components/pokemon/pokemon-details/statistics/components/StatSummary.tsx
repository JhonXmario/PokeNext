// components/pokemon/statistics/StatSummary.tsx
interface StatSummaryProps {
  totalStats: number;
  statCount: number;
  minStat: number;
  maxStat: number;
}

export default function StatSummary({ totalStats, statCount, minStat, maxStat }: StatSummaryProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
        Resumen
      </h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600 dark:text-gray-400">Promedio:</span>
          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
            {Math.round(totalStats / statCount)}
          </span>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">Rango:</span>
          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
            {minStat} - {maxStat}
          </span>
        </div>
      </div>
    </div>
  );
}