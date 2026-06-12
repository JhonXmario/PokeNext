"use client";

import { useMemo, useState } from "react";
import { Pokemon } from "@/types/pokemon-types";
import { PokemonTeam } from "@/types/pokemon-team-types";
import { TeamPokemonSelector } from "./TeamPokemonSelector";
import { PokemonSlot } from "./TeamSlot";
import { TeamValidationMessage } from "./TeamValidationMessage";
import { getTeamValidationState } from "./validation/team-validation";
import { FaPlus, FaTimes } from "react-icons/fa";
import { createEmptyTeamStats, normalizePokemonStats } from "@/lib/pokemon-stats";

interface TeamFormProps {
  availablePokemon: Pokemon[];
  onCreateTeam: (team: Omit<PokemonTeam, "id" | "createdAt">) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const icon = [FaPlus, FaTimes].map(
  (icon) => icon as unknown as React.ComponentType<any>,
);

const [PlusIcon, TimesIcon] = icon;

export function TeamForm({
  availablePokemon,
  onCreateTeam,
  onCancel,
  isSubmitting = false,
}: TeamFormProps) {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<(Pokemon | null)[]>(
    Array(6).fill(null),
  );
  const [showSelector, setShowSelector] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const previewStats = useMemo(() => {
    const summary = selectedPokemon.reduce((acc, pokemon) => {
      if (!pokemon) {
        return acc;
      }

      const normalizedStats = normalizePokemonStats(pokemon.stats);

      return {
        hp: acc.hp + normalizedStats.hp,
        attack: acc.attack + normalizedStats.attack,
        defense: acc.defense + normalizedStats.defense,
        spAtk: acc.spAtk + normalizedStats.spAtk,
        spDef: acc.spDef + normalizedStats.spDef,
        speed: acc.speed + normalizedStats.speed,
        total: acc.total + normalizedStats.total,
      };
    }, createEmptyTeamStats());

    return summary;
  }, [selectedPokemon]);

  const validationState = useMemo(
    () => getTeamValidationState(selectedPokemon, teamName),
    [selectedPokemon, teamName],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setHasAttemptedSubmit(true);

    if (!validationState.isValid) {
      return;
    }

    const normalizedPokemon = selectedPokemon.filter(
      (pokemon): pokemon is Pokemon => pokemon !== null,
    );

    const newTeam: Omit<PokemonTeam, "id" | "createdAt"> = {
      name: teamName.trim(),
      description: teamDescription.trim() || undefined,
      pokemon: normalizedPokemon.map((pokemon, idx) => ({
        pokemon,
        position: idx + 1,
      })),
      stats: {
        hp: previewStats.hp,
        attack: previewStats.attack,
        defense: previewStats.defense,
        spAtk: previewStats.spAtk,
        spDef: previewStats.spDef,
        speed: previewStats.speed,
        total: previewStats.total,
      },
    };

    onCreateTeam(newTeam);
    setTeamName("");
    setTeamDescription("");
    setSelectedPokemon(Array(6).fill(null));
    setHasAttemptedSubmit(false);
  };

  const filledSlots = validationState.filledSlots;
  const statCards = [
    { label: "HP", value: previewStats.hp, color: "red" },
    { label: "ATK", value: previewStats.attack, color: "orange" },
    { label: "DEF", value: previewStats.defense, color: "blue" },
    { label: "SP.ATK", value: previewStats.spAtk, color: "purple" },
    { label: "SP.DEF", value: previewStats.spDef, color: "green" },
    { label: "SPD", value: previewStats.speed, color: "pink" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-pink-500/20 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.16),transparent_45%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96))] p-4 shadow-[0_20px_50px_-20px_rgba(236,72,153,0.35)] sm:p-6"
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">
            Crear Nuevo Equipo
          </h3>
          <p className="text-sm text-slate-400">
            Arma un equipo equilibrado con 6 Pokémon.
          </p>
        </div>
        <div
          className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${
            validationState.isValid
              ? "bg-emerald-500/15 text-emerald-300"
              : "bg-amber-500/15 text-amber-300"
          }`}
        >
          {validationState.isValid ? "✓ Listo" : "Revisa el equipo"}
        </div>
      </div>

      {(hasAttemptedSubmit || (!validationState.isValid && filledSlots > 0)) &&
        validationState.errors.map((error) => (
          <TeamValidationMessage
            key={error.id}
            title={error.title}
            description={error.description}
          />
        ))}

      {validationState.isValid && filledSlots === 6 && (
        <TeamValidationMessage
          type="success"
          title="Equipo listo para crear"
          description="Tu equipo tiene 6 Pokémon válidos y un nombre asignado."
        />
      )}

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Nombre del Equipo
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Ej: Elite Squad"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-pink-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Descripción (opcional)
          </label>
          <textarea
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            placeholder="Describe la estrategia de tu equipo..."
            className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-pink-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-200">
            Integrantes ({filledSlots}/6)
          </label>
          <span className="text-xs text-slate-400">
            Toca un slot para editarlo
          </span>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
          {selectedPokemon.map((pokemon, idx) => (
            <div
              key={idx}
              onClick={() => setShowSelector(true)}
              className="transition-transform duration-300 hover:-translate-y-0.5"
            >
              <PokemonSlot
                pokemon={pokemon}
                position={idx + 1}
                onRemove={() => {
                  const newSelection = [...selectedPokemon];
                  newSelection[idx] = null;
                  setSelectedPokemon(newSelection);
                  setHasAttemptedSubmit(false);
                }}
                isSelectable={true}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setShowSelector(true);
            setHasAttemptedSubmit(false);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-sm font-semibold text-blue-300 transition-all duration-300 hover:bg-blue-500/20"
        >
          <PlusIcon size={16} />
          {filledSlots === 0 ? "Seleccionar Pokémon" : "Modificar Selección"}
        </button>
      </div>

      {filledSlots > 0 && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:p-5">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-400">
            Estadísticas Previas
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl border p-2 text-center ${
                  stat.color === "red"
                    ? "border-red-500/20 bg-red-500/10"
                    : stat.color === "orange"
                      ? "border-orange-500/20 bg-orange-500/10"
                      : stat.color === "blue"
                        ? "border-blue-500/20 bg-blue-500/10"
                        : stat.color === "purple"
                          ? "border-purple-500/20 bg-purple-500/10"
                          : stat.color === "green"
                            ? "border-emerald-500/20 bg-emerald-500/10"
                            : "border-pink-500/20 bg-pink-500/10"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </p>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    stat.color === "red"
                      ? "text-red-400"
                      : stat.color === "orange"
                        ? "text-orange-400"
                        : stat.color === "blue"
                          ? "text-blue-400"
                          : stat.color === "purple"
                            ? "text-purple-400"
                            : stat.color === "green"
                              ? "text-emerald-400"
                              : "text-pink-400"
                  }`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-pink-500/20 bg-linear-to-r from-pink-500/10 to-blue-500/10 p-3 text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
              Total Stats
            </p>
            <p className="mt-1 text-2xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-blue-400">
              {previewStats.total}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row">
        <button
          type="submit"
          disabled={!validationState.isValid || isSubmitting}
          className={`flex-1 rounded-2xl py-2.5 text-sm font-semibold transition-all duration-300 ${
            validationState.isValid && !isSubmitting
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "cursor-not-allowed bg-slate-700/70 text-slate-400"
          }`}
        >
          <span className="inline-flex items-center justify-center gap-2">
            <PlusIcon size={16} />
            Crear Equipo
          </span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-300 transition-all duration-300 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <TimesIcon size={16} />
            Cancelar
          </span>
        </button>
      </div>

      {showSelector && (
        <TeamPokemonSelector
          availablePokemon={availablePokemon}
          selectedPokemon={selectedPokemon}
          onSelectionChange={setSelectedPokemon}
          onClose={() => setShowSelector(false)}
        />
      )}
    </form>
  );
}
