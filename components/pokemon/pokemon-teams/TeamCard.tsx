"use client";

import { PokemonTeam } from "@/types/pokemon-team-types";
import { PokemonSlot } from "./TeamSlot";
import { TeamStats } from "./TeamStat";
import { FaChevronDown, FaTrash } from "react-icons/fa";

interface TeamCardProps {
  team: PokemonTeam;
  onDelete?: (teamId: string) => void;
  isExpanded?: boolean;
  onToggleExpand?: (teamId: string) => void;
}

const icon = [FaChevronDown, FaTrash].map(
  (icon) => icon as unknown as React.ComponentType<any>,
);

const [ChevronIcon, TrashIcon] = icon;

export function TeamCard({
  team,
  onDelete,
  isExpanded = false,
  onToggleExpand,
}: TeamCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-pink-500/20 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_42%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(2,6,23,0.98))] shadow-[0_20px_50px_-20px_rgba(236,72,153,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-pink-400/50 hover:shadow-[0_24px_60px_-20px_rgba(59,130,246,0.35)]">
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-r from-pink-500/10 via-transparent to-blue-500/10" />

      <div
        className="relative cursor-pointer p-5 transition-colors duration-300 hover:bg-white/5 sm:p-6"
        onClick={() => onToggleExpand?.(team.id)}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-3 inline-flex items-center rounded-full border border-pink-500/20 bg-pink-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-pink-200">
              Equipo destacado
            </div>
            <h3 className="mb-1 truncate text-lg font-semibold text-white">
              {team.name}
            </h3>
            {team.description && (
              <p className="line-clamp-2 text-sm text-slate-400">
                {team.description}
              </p>
            )}
            <p className="mt-2 text-xs text-slate-500">
              Creado: {team.createdAt.toLocaleDateString("es-ES")}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:flex-col sm:items-end">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-center shadow-inner">
              <div className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-blue-500">
                {team.stats.total}
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Total Stats
              </p>
            </div>
            <ChevronIcon
              size={14}
              className={`shrink-0 text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </div>
      </div>

      <div className="relative p-4 sm:p-5">
        <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
          {team.pokemon.map((slot) => (
            <div key={slot.position}>
              <PokemonSlot pokemon={slot.pokemon} position={slot.position} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-2">
            <p className="text-slate-400">HP</p>
            <p className="font-semibold text-red-400">{team.stats.hp}</p>
          </div>
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/10 p-2">
            <p className="text-slate-400">ATK</p>
            <p className="font-semibold text-orange-400">{team.stats.attack}</p>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-2">
            <p className="text-slate-400">DEF</p>
            <p className="font-semibold text-blue-400">{team.stats.defense}</p>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="relative border-t border-white/10 bg-slate-950/70 p-4 sm:p-5">
          <h4 className="mb-4 text-sm font-semibold text-white">
            Estadísticas Detalladas
          </h4>
          <TeamStats stats={team.stats} />
        </div>
      )}

      <div className="relative flex flex-col gap-2 border-t border-white/10 bg-slate-950/80 px-4 py-3 sm:flex-row sm:px-5">
        <button
          onClick={() => onToggleExpand?.(team.id)}
          className="flex-1 rounded-xl bg-linear-to-r from-pink-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
        >
          {isExpanded ? "Contraer" : "Ver Detalles"}
        </button>
        {onDelete && (
          <button
            onClick={() => onDelete(team.id)}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition-all duration-300 hover:bg-red-500/20"
          >
            <TrashIcon size={14} className="mx-auto" />
          </button>
        )}
      </div>
    </div>
  );
}
