import { Pokemon } from "@/types/pokemon-types";

export interface TeamValidationMessage {
  id: string;
  title: string;
  description: string;
}

export interface TeamValidationState {
  isValid: boolean;
  filledSlots: number;
  errors: TeamValidationMessage[];
}

export function getTeamValidationState(
  selectedPokemon: (Pokemon | null)[],
  teamName: string,
): TeamValidationState {
  const filledSlots = selectedPokemon.filter((pokemon) => pokemon !== null).length;
  const duplicatePokemonIds = getDuplicatePokemonIds(selectedPokemon);
  const errors: TeamValidationMessage[] = [];

  if (!teamName.trim()) {
    errors.push({
      id: "team-name",
      title: "Falta el nombre del equipo",
      description:
        "Escribe un nombre claro para identificar el equipo antes de crearlo.",
    });
  }

  if (filledSlots !== 6) {
    const missingSlots = 6 - filledSlots;
    errors.push({
      id: "team-slots",
      title: "Tu equipo necesita 6 Pokémon",
      description:
        missingSlots > 0
          ? `Completa ${missingSlots} slot${missingSlots > 1 ? "s" : ""} más para poder crear el equipo.`
          : "Quita un Pokémon para dejar el equipo con un total válido de 6 integrantes.",
    });
  }

  if (duplicatePokemonIds.length > 0) {
    errors.push({
      id: "duplicate-pokemon",
      title: "Pokémon repetido",
      description:
        "No puedes usar el mismo Pokémon más de una vez en el mismo equipo.",
    });
  }

  return {
    isValid: errors.length === 0,
    filledSlots,
    errors,
  };
}

export function getSelectionFeedback(
  selectedPokemon: (Pokemon | null)[],
  pokemon: Pokemon,
  selectedPosition: number | null,
): TeamValidationMessage | null {
  if (selectedPosition === null) {
    return {
      id: "select-slot",
      title: "Primero elige un slot",
      description:
        "Toca uno de los espacios del equipo para asignar el Pokémon seleccionado.",
    };
  }

  const existingIndex = selectedPokemon.findIndex((slot) => slot?.id === pokemon.id);

  if (existingIndex !== -1 && existingIndex !== selectedPosition - 1) {
    return {
      id: "duplicate-selection",
      title: "Pokémon ya seleccionado",
      description:
        "Ese Pokémon ya está en otro slot del equipo. Elige otro o quita el anterior primero.",
    };
  }

  return null;
}

function getDuplicatePokemonIds(selectedPokemon: (Pokemon | null)[]) {
  const seenIds = new Set<string | number>();
  const duplicateIds = new Set<string | number>();

  selectedPokemon.forEach((pokemon) => {
    if (!pokemon?.id) {
      return;
    }

    if (seenIds.has(pokemon.id)) {
      duplicateIds.add(pokemon.id);
      return;
    }

    seenIds.add(pokemon.id);
  });

  return Array.from(duplicateIds);
}
