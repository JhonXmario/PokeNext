"use client";

import { useMemo, useState } from "react";
import { PokemonTeam } from "@/types/pokemon-team-types";
import { Pokemon } from "@/types/pokemon-types";
import { TeamCard } from "./TeamCard";
import { TeamForm } from "./TeamForm";
import { TeamValidationMessage } from "./TeamValidationMessage";
import type { CreateTeamInput, TeamActionResult } from "@/app/actions/teams";
import { FaPlus, FaList } from "react-icons/fa";

interface TeamsContainerProps {
  initialTeams: PokemonTeam[];
  availablePokemon: Pokemon[];
  createTeamAction: (input: CreateTeamInput) => Promise<TeamActionResult>;
  deleteTeamAction: (teamId: string) => Promise<TeamActionResult>;
}

const icons = [FaList, FaPlus].map(
  (icon) => icon as unknown as React.ComponentType<any>,
);
const [FaListIcon, FaPlusIcon] = icons;

export function TeamsContainer({
  initialTeams,
  availablePokemon,
  createTeamAction,
  deleteTeamAction,
}: TeamsContainerProps) {
  const [teams, setTeams] = useState<PokemonTeam[]>(initialTeams);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    title: string;
    description: string;
    type?: "success" | "error";
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalTeamsLabel = useMemo(() => {
    return `${teams.length} equipo${teams.length !== 1 ? "s" : ""}`;
  }, [teams.length]);

  const handleCreateTeam = async (
    newTeam: Omit<PokemonTeam, "id" | "createdAt">,
  ) => {
    setIsSubmitting(true);
    setFeedbackMessage(null);

    const result = await createTeamAction({
      name: newTeam.name,
      description: newTeam.description,
      pokemon: newTeam.pokemon,
      stats: newTeam.stats,
    });

    if (result.success && result.team) {
      setTeams((currentTeams) => [result.team!, ...currentTeams]);
      setIsCreatingTeam(false);
      setFeedbackMessage({
        title: "Equipo creado",
        description: "Tu equipo se guardó correctamente en la base de datos.",
        type: "success",
      });
    } else {
      setFeedbackMessage({
        title: "No se pudo crear el equipo",
        description: result.error ?? "Inténtalo de nuevo.",
        type: "error",
      });
    }

    setIsSubmitting(false);
  };

  const handleDeleteTeam = async (teamId: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este equipo?")) {
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage(null);

    const result = await deleteTeamAction(teamId);

    if (result.success) {
      setTeams((currentTeams) =>
        currentTeams.filter((team) => team.id !== teamId),
      );
      setFeedbackMessage({
        title: "Equipo eliminado",
        description: "El equipo se removió correctamente.",
        type: "success",
      });
    } else {
      setFeedbackMessage({
        title: "No se pudo eliminar el equipo",
        description: result.error ?? "Inténtalo de nuevo.",
        type: "error",
      });
    }

    setIsSubmitting(false);
  };

  const handleToggleExpand = (teamId: string) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="rounded-3xl border border-pink-500/20 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(3,7,18,0.96))] p-5 shadow-[0_20px_50px_-20px_rgba(236,72,153,0.35)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-pink-200">
              <FaListIcon className="text-pink-400" />
              Gestión de equipos
            </div>
            <h1 className="mb-2 flex items-center gap-2 text-2xl font-semibold text-white sm:text-3xl">
              <FaListIcon className="text-pink-400" />
              Mis Equipos
            </h1>
            <p className="text-sm text-slate-400 sm:text-base">
              Crea y gestiona tus equipos de Pokémon ({totalTeamsLabel})
            </p>
          </div>

          {!isCreatingTeam && (
            <button
              onClick={() => setIsCreatingTeam(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:brightness-110 sm:w-auto"
            >
              <FaPlusIcon size={18} />
              Nuevo Equipo
            </button>
          )}
        </div>
      </div>

      {feedbackMessage && (
        <TeamValidationMessage
          type={feedbackMessage.type === "success" ? "success" : "error"}
          title={feedbackMessage.title}
          description={feedbackMessage.description}
        />
      )}

      {isCreatingTeam && (
        <TeamForm
          availablePokemon={availablePokemon}
          onCreateTeam={handleCreateTeam}
          onCancel={() => setIsCreatingTeam(false)}
          isSubmitting={isSubmitting}
        />
      )}

      <div>
        {teams.length === 0 && !isCreatingTeam ? (
          <div className="rounded-3xl border border-dashed border-pink-500/25 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.16),transparent_55%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,0.95))] p-8 text-center shadow-[0_20px_50px_-20px_rgba(59,130,246,0.25)] sm:p-12">
            <FaListIcon size={48} className="mx-auto mb-4 text-pink-400/70" />
            <h3 className="mb-2 text-xl font-semibold text-white">
              No hay equipos aún
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm text-slate-400 sm:text-base">
              Crea tu primer equipo de Pokémon y empieza a organizar tu
              estrategia.
            </p>
            <button
              onClick={() => setIsCreatingTeam(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-pink-600"
            >
              <FaPlusIcon size={16} />
              Crear Equipo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2 2xl:grid-cols-3">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onDelete={handleDeleteTeam}
                isExpanded={expandedTeamId === team.id}
                onToggleExpand={handleToggleExpand}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
