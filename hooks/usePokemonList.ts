"use client";

import { useState, useEffect, useMemo } from 'react'
import type { UsePokemonListProps } from '@/types/pokemonTypes'
import { filterPokemons, paginate, getAvailableTypes } from '@/utils/pokemonUtils'

export function usePokemonList({ initialPokemons, itemsPerPage = 20 }: UsePokemonListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const filteredPokemons = useMemo(() =>
    filterPokemons(initialPokemons, searchTerm, selectedType),
    [initialPokemons, searchTerm, selectedType]
  )

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const currentPokemons = useMemo(() =>
    paginate(filteredPokemons, currentPage, itemsPerPage),
    [filteredPokemons, currentPage, itemsPerPage]
  );

  const availableTypes = useMemo(() =>
    getAvailableTypes(initialPokemons),
    [initialPokemons]
  )

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType])

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
