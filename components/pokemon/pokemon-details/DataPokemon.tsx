"use client"

import { Suspense } from "react"
import PokemonImage from "./image/ImageCard"
import PokemonDescription from "./descriptions/DescriptionCard"
import PokemonEvolution from "./evolutive-chain/EvolutiveChainCard"
import PokemonStatistics from "./statistics/StatisticsCard"
import type { PokemonDetail, PokemonSpecies, EvolutionChain } from "@/types/pokemon-details-types"

interface DataPokemonProps {
  pokemon: PokemonDetail
  species: PokemonSpecies | null
  evolutionChain: EvolutionChain | null
}

// Componentes de loading
function LoadingCard({ title }: { title: string }) {
  return (
    <div className="pokemon-card h-full">
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-1/2"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Permitir prop extraPaddingBottom para agregar espacio si el footer está muy cerca
export default function DataPokemon({ pokemon, species, evolutionChain, extraPaddingBottom }: DataPokemonProps & { extraPaddingBottom?: boolean }) {
  return (
    <div className={`py-8${extraPaddingBottom ? ' pb-32' : ''}`}>
      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna izquierda */}
        <div className="flex flex-col space-y-8">
          {/* Imagen del Pokémon - Superior izquierda */}
          <div className="flex-1">
            <Suspense fallback={<LoadingCard title="Imagen" />}>
              <PokemonImage pokemon={pokemon} />
            </Suspense>
          </div>

          {/* Cadena evolutiva - Inferior izquierda */}
          <div className="flex-1">
            <Suspense fallback={<LoadingCard title="Evoluciones" />}>
              <PokemonEvolution evolutionChain={evolutionChain} currentPokemon={pokemon.name} />
            </Suspense>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col space-y-8">
          {/* Descripción - Superior derecha */}
          <div className="flex-1">
            <Suspense fallback={<LoadingCard title="Descripción" />}>
              <PokemonDescription pokemon={pokemon} species={species} />
            </Suspense>
          </div>

          {/* Estadísticas - Inferior derecha */}
          <div className="flex-1">
            <Suspense fallback={<LoadingCard title="Estadísticas" />}>
              <PokemonStatistics pokemon={pokemon} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Efectos visuales sutiles */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-pink-200/10 dark:bg-pink-800/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-24 h-24 bg-blue-200/10 dark:bg-blue-800/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>
    </div>
  )
}
