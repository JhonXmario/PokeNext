"use client";

import { TeamStats as TeamStatsType } from "@/types/pokemon-team-types";

interface TeamStatsProps {
  stats: TeamStatsType;
}

export function TeamStats({ stats }: TeamStatsProps) {
  const statBars = [
    { label: "HP", value: stats.hp, color: "bg-red-500" },
    { label: "ATK", value: stats.attack, color: "bg-orange-500" },
    { label: "DEF", value: stats.defense, color: "bg-blue-500" },
    { label: "SP.ATK", value: stats.spAtk, color: "bg-purple-500" },
    { label: "SP.DEF", value: stats.spDef, color: "bg-emerald-500" },
    { label: "SPD", value: stats.speed, color: "bg-pink-500" },
  ];

  const maxValue = Math.max(...statBars.map((s) => s.value), 600);

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {statBars.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-200">{stat.label}</span>
              <span className="font-semibold text-slate-100">{stat.value}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-800/80">
              <div
                className={`h-full ${stat.color} transition-all duration-300`}
                style={{ width: `${(stat.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-pink-500/20 bg-linear-to-r from-pink-500/10 to-blue-500/10 p-4 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
          Total Stats
        </p>
        <p className="mt-1 text-3xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-blue-400">
          {stats.total}
        </p>
      </div>
    </div>
  );
}
