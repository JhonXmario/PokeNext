"use client"

import { usePokemonList } from "../../hooks/use-pokemon-list"
import PokemonCard from "./PokemonCard"
import PokemonFilters from "./PokemonFilter"
import Pagination from "../ui/Pagination"
import { FaSpinner } from "react-icons/fa"

interface Pokemon {
  id: number
  name: string
  sprite: string
  types: string[]
  abilities: string[]
  height: number
  weight: number
}

interface PokemonListProps {
  initialPokemons: Pokemon[]
  itemsPerPage?: number
}

export default function PokemonList({ initialPokemons, itemsPerPage = 20 }: PokemonListProps) {
  const {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    currentPage,
    setCurrentPage,
    currentPokemons,
    totalPages,
    availableTypes,
    isLoading,
    totalResults,
  } = usePokemonList({ initialPokemons, itemsPerPage })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pokédex </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explora la colección completa de Pokémon. Usa los filtros para encontrar exactamente lo que buscas.
        </p>
      </div>

      {/* Filtros */}
      <PokemonFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        availableTypes={availableTypes}
        totalResults={totalResults}
      />

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="w-8 h-8 text-pink-600 animate-spin" />
          <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">Cargando Pokémon...</span>
        </div>
      )}

      {/* Lista de Pokémon */}
      {!isLoading && (
        <>
          {currentPokemons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentPokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  sprite={pokemon.sprite}
                  types={pokemon.types}
                  abilities={pokemon.abilities}
                  height={pokemon.height}
                  weight={pokemon.weight}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No se encontraron Pokémon</h3>
              <p className="text-gray-600 dark:text-gray-400">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}

          {/* Paginación */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  )
}
