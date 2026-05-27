"use client";
import { useState, useEffect, useCallback } from "react";
import { searchPokemonByName } from "@/services/poke-api";

interface SearchResult {
  id: number;
  name: string;
  sprite: string;
}

export function usePokemonSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      setIsLoading(true);
      const searchResults = await searchPokemonByName(query);
      setResults(searchResults);
      setIsLoading(false);
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [query]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    clearSearch,
  };
}
