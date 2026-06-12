"use client";

import { useMemo, useState } from "react";
import { Pokemon } from "@/types/pokemon-types";
import { PokemonSlot } from "./TeamSlot";
import { TeamValidationMessage } from "./TeamValidationMessage";
import { getSelectionFeedback } from "./validation/team-validation";
import { FaSearch, FaTimes } from "react-icons/fa";
import Image from "next/image";

interface TeamPokemonSelectorProps {
  availablePokemon: Pokemon[];
  selectedPokemon: (Pokemon | null)[];
  onSelectionChange: (pokemon: (Pokemon | null)[]) => void;
  onClose: () => void;
}

const icon = [FaSearch, FaTimes].map(
  (icon) => icon as unknown as React.ComponentType<any>,
);

const [SearchIcon, TimesIcon] = icon;

export function TeamPokemonSelector({
  availablePokemon,
  selectedPokemon,
  onSelectionChange,
  onClose,
}: TeamPokemonSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [selectionFeedback, setSelectionFeedback] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const allTypes = useMemo(() => {
    const types = new Set<string>();
    availablePokemon.forEach((p) => p.types.forEach((t) => types.add(t)));
    return Array.from(types).sort();
  }, [availablePokemon]);

  const filteredPokemon = useMemo(() => {
    return availablePokemon.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        filterType === "all" || pokemon.types.includes(filterType);
      return matchesSearch && matchesType;
    });
  }, [availablePokemon, searchTerm, filterType]);

  const selectedIds = new Set(
    selectedPokemon.filter((p) => p).map((p) => p!.id),
  );
  const slotsFilled = selectedPokemon.filter((p) => p !== null).length;

  const handlePokemonClick = (pokemon: Pokemon) => {
    const feedback = getSelectionFeedback(
      selectedPokemon,
      pokemon,
      selectedPosition,
    );

    if (feedback) {
      setSelectionFeedback(feedback);
      return;
    }

    const newSelection = [...selectedPokemon];
    const existingIndex = newSelection.findIndex((p) => p?.id === pokemon.id);

    if (existingIndex !== -1 && existingIndex !== selectedPosition! - 1) {
      newSelection[existingIndex] = null;
    }

    newSelection[selectedPosition! - 1] = pokemon;
    onSelectionChange(newSelection);
    setSelectedPosition(null);
    setSelectionFeedback(null);
  };

  const handleRemoveFromSlot = (position: number) => {
    const newSelection = [...selectedPokemon];
    newSelection[position - 1] = null;
    onSelectionChange(newSelection);
    setSelectionFeedback(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-4">
      <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-pink-500/20 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(2,6,23,0.98))] shadow-[0_20px_60px_-20px_rgba(59,130,246,0.35)]">
        <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/70 px-4 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Selecciona tu Equipo
            </h2>
            <p className="text-sm text-slate-400">
              {slotsFilled}/6 pokémon seleccionados
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-red-400 transition-colors hover:bg-red-500/10"
          >
            <TimesIcon size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-200">
              Tu Equipo (6 pokémon)
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {selectedPokemon.map((pokemon, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedPosition(idx + 1);
                    setSelectionFeedback(null);
                  }}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedPosition === idx + 1
                      ? "scale-[1.02] rounded-2xl ring-2 ring-blue-400/60"
                      : ""
                  }`}
                >
                  <PokemonSlot
                    pokemon={pokemon}
                    position={idx + 1}
                    onRemove={handleRemoveFromSlot}
                    isSelectable={true}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {selectionFeedback && (
              <TeamValidationMessage
                title={selectionFeedback.title}
                description={selectionFeedback.description}
              />
            )}

            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Busca un pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-pink-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                  filterType === "all"
                    ? "bg-pink-500 text-white"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Todos
              </button>
              {allTypes.slice(0, 8).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-all ${
                    filterType === type
                      ? "bg-blue-500 text-white"
                      : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-400">
              {selectedPosition
                ? `Selecciona un pokémon para el slot ${selectedPosition}`
                : "Haz clic en un slot arriba para comenzar"}
            </p>
            <div className="grid max-h-96 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {filteredPokemon.map((pokemon) => {
                const isSelected = selectedIds.has(pokemon.id);
                return (
                  <button
                    key={pokemon.id}
                    onClick={() => handlePokemonClick(pokemon)}
                    disabled={isSelected && selectedPosition === null}
                    className={`rounded-2xl border p-3 text-left transition-all duration-300 ${
                      isSelected
                        ? "cursor-not-allowed border-slate-700 bg-slate-900/40 opacity-50"
                        : selectedPosition
                          ? "border-white/10 bg-slate-900/70 hover:border-pink-400/50 hover:bg-slate-800"
                          : "border-white/10 bg-slate-900/50 opacity-70"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950/80">
                        <Image
                          src={pokemon.sprite}
                          alt={pokemon.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold capitalize text-white">
                          {pokemon.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {pokemon.types.join(", ")}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 bg-slate-950/70 px-4 py-4 sm:flex-row sm:px-6">
          <button
            onClick={onClose}
            disabled={slotsFilled < 6}
            className={`flex-1 rounded-2xl py-2.5 text-sm font-semibold transition-all duration-300 ${
              slotsFilled === 6
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "cursor-not-allowed bg-slate-700/70 text-slate-400"
            }`}
          >
            Confirmar Equipo ({slotsFilled}/6)
          </button>
          <button
            onClick={() => {
              onSelectionChange(Array(6).fill(null));
              setSelectedPosition(null);
            }}
            className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition-all duration-300 hover:bg-red-500/20"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}
