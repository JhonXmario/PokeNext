"use client";

import {
  PhysicalFeature,
  AbilitiesList,
  PokemonDescriptionText,
  PokemonTypeBadges,
} from "./index";
import { usePokemonDescription } from "@/hooks/use-pokemon-description";
import type {
  PokemonDetail,
  PokemonSpecies,
} from "@/types/pokemon-details-types";

interface PokemonDescriptionProps {
  pokemon: PokemonDetail;
  species: PokemonSpecies | null;
}

export default function PokemonDescription({
  pokemon,
  species,
}: PokemonDescriptionProps) {
  const { description, genus } = usePokemonDescription(species);

  return (
    <div className="pokemon-card h-full">
      <div className="p-6">
        {/* Nombre y categoría */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold capitalize text-gray-900 dark:text-white mb-2">
            {pokemon.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{genus}</p>
        </div>

        {/* Tipos */}
        <PokemonTypeBadges types={pokemon.types} />

        {/* Medidas físicas */}
        <PhysicalFeature height={pokemon.height} weight={pokemon.weight} />

        {/* Habilidades */}
        <AbilitiesList abilities={pokemon.abilities} />

        {/* Descripción de la Pokédex */}
        <PokemonDescriptionText description={description} />
      </div>
    </div>
  );
}
