"use client"

import { useState, useEffect, useMemo } from "react"

interface Pokemon {
  id: number
  name: string
  sprite: string
  types: string[]
  abilities: string[]
  height: number
  weight: number
}

interface UsePokemonListProps {
  initialPokemons: Pokemon[]
  itemsPerPage?: number
}

export function usePokemonList({ initialPokemons, itemsPerPage = 20 }: UsePokemonListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Filtrar Pokémon basado en búsqueda y tipo
  const filteredPokemons = useMemo(() => {
    return initialPokemons.filter((pokemon) => {
      const pokemonAbilities = pokemon.abilities || []
      const matchesSearch =
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemonAbilities.some((ability) => ability.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesType = selectedType === "" || pokemon.types.includes(selectedType)

      return matchesSearch && matchesType
    })
  }, [initialPokemons, searchTerm, selectedType])

  // Calcular paginación
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPokemons = filteredPokemons.slice(startIndex, endIndex)

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedType])

  // Obtener todos los tipos únicos
  const availableTypes = useMemo(() => {
    const types = new Set<string>()
    initialPokemons.forEach((pokemon) => {
      pokemon.types.forEach((type) => types.add(type))
    })
    return Array.from(types).sort()
  }, [initialPokemons])

  return {
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
    setIsLoading,
    totalResults: filteredPokemons.length,
  }
}
