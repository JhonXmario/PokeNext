import { useState, useEffect } from "react";
import { getPokemonIdByName } from "@/services/poke-details-api";
import type { EvolutionChain } from "@/types/pokemon-details-types";

export interface EvolutionStage {
  name: string;
  sprite: string;
  isCurrent: boolean;
}

export const useEvolutionChain = (
  evolutionChain: EvolutionChain | null,
  currentPokemon: string
) => {
  const [evolutionStages, setEvolutionStages] = useState<EvolutionStage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutionStages = async () => {
      if (!evolutionChain) {
        setLoading(false);
        return;
      }

      try {
        const stages = await parseEvolutionChain(
          evolutionChain,
          currentPokemon
        );
        setEvolutionStages(stages);
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionStages();
  }, [evolutionChain, currentPokemon]);

  return { evolutionStages, loading };
};

const parseEvolutionChain = async (
  chain: EvolutionChain,
  currentPokemon: string
): Promise<EvolutionStage[]> => {
  const stages: EvolutionStage[] = [];

  // Función recursiva para recorrer la cadena evolutiva
  const traverseChain = async (currentStage: any) => {
    const pokemonId = await getPokemonIdByName(currentStage.species.name);

    stages.push({
      name: currentStage.species.name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
      isCurrent: currentStage.species.name === currentPokemon,
    });

    // Recorrer evoluciones siguientes
    for (const evolution of currentStage.evolves_to) {
      await traverseChain(evolution);
    }
  };

  await traverseChain(chain.chain);
  return stages;
};
