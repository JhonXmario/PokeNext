"use client"

import { useState, useEffect, useMemo } from "react"
import { UsePokemonListProps } from "../types/pokemonTypes"

export function useAdvancedPokemonList({ initialPokemons, itemsPerPage = 20 }: UsePokemonListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedGeneration, setSelectedGeneration] = useState("")
  const [selectedGame, setSelectedGame] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Filtrar Pokémon basado en todos los criterios
  const filteredPokemons = useMemo(() => {
    return initialPokemons.filter((pokemon) => {
      const matchesSearch =
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.abilities.some((ability) => ability.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesType = selectedType === "" || pokemon.types.includes(selectedType)

      const matchesGeneration = selectedGeneration === "" || pokemon.generation.toString() === selectedGeneration

      const matchesGame = selectedGame === "" || (pokemon.games && pokemon.games.includes(selectedGame))

      return matchesSearch && matchesType && matchesGeneration && matchesGame
    })
  }, [initialPokemons, searchTerm, selectedType, selectedGeneration, selectedGame])

  // Calcular paginación
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPokemons = filteredPokemons.slice(startIndex, endIndex)

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedType, selectedGeneration, selectedGame])

  // Obtener opciones disponibles
  const availableTypes = useMemo(() => {
    const types = new Set<string>()
    initialPokemons.forEach((pokemon) => {
      pokemon.types.forEach((type) => types.add(type))
    })
    return Array.from(types).sort()
  }, [initialPokemons])

  const availableGenerations = useMemo(() => {
    const generations = new Set<number>()
    initialPokemons.forEach((pokemon) => {
      generations.add(pokemon.generation)
    })
    return Array.from(generations).sort((a, b) => a - b)
  }, [initialPokemons])

  const availableGames = useMemo(() => {
    const games = new Set<string>()
    initialPokemons.forEach((pokemon) => {
      if (pokemon.games) {
        pokemon.games.forEach((game) => games.add(game))
      }
    })
    return Array.from(games).sort()
  }, [initialPokemons])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedType("")
    setSelectedGeneration("")
    setSelectedGame("")
  }

  return {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    selectedGeneration,
    setSelectedGeneration,
    selectedGame,
    setSelectedGame,
    currentPage,
    setCurrentPage,
    currentPokemons,
    totalPages,
    availableTypes,
    availableGenerations,
    availableGames,
    isLoading,
    setIsLoading,
    totalResults: filteredPokemons.length,
    clearAllFilters,
  }
}
