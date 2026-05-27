"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { usePokemonSearch } from "@/hooks/use-pokemon-search";
import { useRef, useEffect, useState } from "react";

interface SearchWithSuggestionsProps {
  onClose?: () => void;
  placeholder?: string;
}

const icons = [FaSearch, FaSpinner].map((icon) => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>);
const [Search, Spinner] = icons;

export function SearchWithSuggestions({
  onClose,
  placeholder = "Buscar Pokémon...",
}: SearchWithSuggestionsProps) {
  const router = useRouter();
  const { query, setQuery, results, isLoading, clearSearch } =
    usePokemonSearch();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.trim() !== "");
  };

  const handleSelectPokemon = (pokemonName: string) => {
    router.push(`/pokemon/${pokemonName}`);
    clearSearch();
    setIsOpen(false);
    onClose?.();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      handleSelectPokemon(query.toLowerCase());
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-pink-500 focus-within:bg-white dark:focus-within:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md">
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => query.trim() && setIsOpen(true)}
            className="bg-transparent py-1 px-2 outline-none text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 w-48"
            autoComplete="off"
          />
          <button
            type="submit"
            className="ml-2 text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition-colors duration-300 hover:scale-110 transform"
          >
            {isLoading ? (
              <Spinner className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4 hover:cursor-pointer" />
            )}
          </button>
        </div>

        {/* Sugerencias Dropdown */}
        {isOpen && query.trim() !== "" && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <Spinner className="w-5 h-5 animate-spin mx-auto mb-2" />
                <p className="text-sm">Buscando pokémons...</p>
              </div>
            ) : results.length > 0 ? (
              <ul className="py-2">
                {results.map((pokemon) => (
                  <li key={pokemon.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectPokemon(pokemon.name)}
                      className="w-full px-4 py-3 hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 text-left hover:cursor-pointer"
                    >
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <Image
                          src={pokemon.sprite}
                          alt={pokemon.name}
                          fill
                          className="object-contain"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = `/placeholder.svg?height=40&width=40`;
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                          {pokemon.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          #{pokemon.id.toString().padStart(4, "0")}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <p className="text-sm">No se encontraron pokémons</p>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
