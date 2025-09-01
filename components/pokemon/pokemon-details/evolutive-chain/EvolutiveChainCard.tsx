// components/pokemon/pokemon-data/evolution/EvolutiveChainCard.tsx
"use client"

import { EvolutionChainDisplay } from "./components/ChainDisplay"
import { EvolutionEmptyState } from "./components/EmptyState"
import { useEvolutionChain } from "@/hooks/use-pokemon-evolution"
import type { EvolutionChain } from "@/types/pokemon-details-types"

interface PokemonEvolutionProps {
  evolutionChain: EvolutionChain | null
  currentPokemon: string
}

export default function PokemonEvolution({ evolutionChain, currentPokemon }: PokemonEvolutionProps) {
  const { evolutionStages, loading } = useEvolutionChain(evolutionChain, currentPokemon)

  if (!evolutionChain || evolutionStages.length <= 1) {
    return <EvolutionEmptyState />
  }

  return (
    <div className="pokemon-card h-full">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Cadena Evolutiva</h3>
        <EvolutionChainDisplay stages={evolutionStages} />
      </div>
    </div>
  )
}