"use client";

import { Pokemon } from "@/types/pokemon-types";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

interface PokemonSlotProps {
  pokemon: Pokemon | null;
  position: number;
  onRemove?: (position: number) => void;
  onSelect?: (position: number) => void;
  isSelectable?: boolean;
}

const icon = [FaTimes].map(
  (icon) => icon as unknown as React.ComponentType<any>,
);

const [TimesIcon] = icon;

export function PokemonSlot({
  pokemon,
  position,
  onRemove,
  onSelect,
  isSelectable = false,
}: PokemonSlotProps) {
  if (!pokemon) {
    return (
      <button
        onClick={() => onSelect?.(position)}
        className={`relative aspect-square w-full overflow-hidden rounded-2xl border border-dashed border-pink-500/30 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.14),transparent_45%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,0.95))] p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-400/60 ${
          isSelectable ? "cursor-pointer" : "cursor-default"
        }`}
        disabled={!isSelectable}
      >
        <div className="flex h-full flex-col items-center justify-center rounded-xl border border-white/5 bg-slate-950/50 text-center">
          <div className="text-2xl font-bold text-pink-400">+</div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Slot {position}
          </p>
        </div>
      </button>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-[0_16px_40px_-20px_rgba(236,72,153,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-pink-400/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.12),transparent_45%)]" />

      <div className="absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/90 text-[11px] font-semibold text-white shadow-lg">
        {position}
      </div>

      <div className="relative aspect-square p-3">
        <div className="flex h-full items-center justify-center rounded-2xl bg-slate-950/70 p-2">
          <Image
            src={pokemon.sprite}
            alt={pokemon.name}
            width={120}
            height={120}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="relative border-t border-white/10 p-3">
        <h3 className="truncate text-sm font-semibold capitalize text-white">
          {pokemon.name}
        </h3>

        {pokemon.types && pokemon.types.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`type-badge type-${type} px-2 py-0.5 text-[10px]`}
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </div>

      {onRemove && (
        <button
          onClick={() => onRemove(position)}
          className="absolute -right-1 -top-1 rounded-full bg-red-500/90 p-1.5 text-white opacity-0 transition-all duration-300 group-hover:opacity-100"
          title="Remover pokémon"
        >
          <TimesIcon size={12} />
        </button>
      )}
    </div>
  );
}
