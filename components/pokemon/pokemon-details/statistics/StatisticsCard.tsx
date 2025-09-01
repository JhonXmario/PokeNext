"use client";

import { STATS_CONFIG, getStatRating } from "@/constants/pokemon-data";
import StatBar from "./components/StatBat";
import StatSummary from "./components/StatSummary";
import type { PokemonDetail } from "@/types/pokemon-details-types";

interface PokemonStatisticsProps {
  pokemon: PokemonDetail;
}

export default function PokemonStatistics({ pokemon }: PokemonStatisticsProps) {
  const totalStats = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
  const maxStat = Math.max(...pokemon.stats.map((stat) => stat.base_stat));
  const minStat = Math.min(...pokemon.stats.map((stat) => stat.base_stat));

  return (
    <div className="pokemon-card h-full">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Estadísticas Base</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total: {totalStats}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Máximo: {maxStat}</span>
          </div>
        </div>

        {/* Estadísticas individuales */}
        <div className="space-y-4 mb-6">
          {pokemon.stats.map((stat, index) => {
            const statName = stat.stat.name as keyof typeof STATS_CONFIG;
            const config = STATS_CONFIG[statName];
            const IconComponent = config.icon;
            const { rating, color: ratingColor } = getStatRating(stat.base_stat);

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded ${config.color} text-white`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{config.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{stat.base_stat}</span>
                    <span className={`text-xs font-medium ${ratingColor}`}>{rating}</span>
                  </div>
                </div>

                {/* Barra de progreso */}
                <StatBar value={stat.base_stat} maxValue={255} color={config.color} />
              </div>
            );
          })}
        </div>

        {/* Resumen de estadísticas */}
        <StatSummary 
          totalStats={totalStats} 
          statCount={pokemon.stats.length} 
          minStat={minStat} 
          maxStat={maxStat} 
        />
      </div>
    </div>
  );
}