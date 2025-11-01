"use client";

import type React from "react";
import { useState } from "react";
import { FaSearch, FaTimes, FaFilter, FaGamepad, FaStar, FaLayerGroup, FaChevronDown, FaChevronUp } from "react-icons/fa";
import FilterDropdown from "./FilterDropdown";
import FilterButtonGroup from "./FilterButtonGroup";
import { POKEMON_GENERATIONS, POKEMON_GAMES, POKEMON_TYPE_COLORS } from "@/constants/pokemon-data";
import type { PokemonFiltersProps } from "@/types/pokemon-types";

const icons = [
  FaSearch,
  FaTimes,
  FaFilter,
  FaGamepad,
  FaStar,
  FaLayerGroup,
  FaChevronDown,
  FaChevronUp,
].map((icon) => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>);

const [
  Search,
  Times,
  Filter,
  Gamepad,
  Star,
  LayerGroup,
  ChevronDown,
  ChevronUp,
] = icons;

export default function AdvancedPokemonFilters({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  selectedGeneration,
  setSelectedGeneration,
  selectedGame,
  setSelectedGame,
  availableTypes,
  availableGenerations,
  availableGames,
  totalResults,
  onClearFilters,
}: PokemonFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters =
    searchTerm || selectedType || selectedGeneration || selectedGame;

  // Preparar opciones para dropdowns
  const generationOptions = [
    { value: "", label: "Todas las generaciones" },
    ...POKEMON_GENERATIONS.filter((gen) =>
      availableGenerations.includes(gen.id)
    ).map((gen) => ({
      value: gen.id.toString(),
      label: `${gen.name} (${gen.region})`,
    })),
  ];

  const gameOptions = [
    { value: "", label: "Todos los juegos" },
    ...POKEMON_GAMES.filter((game) => availableGames.includes(game.id)).map(
      (game) => ({
        value: game.id,
        label: game.name,
      })
    ),
  ];

  // Preparar opciones para botones de tipo
  const typeOptions = availableTypes.map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
    color: POKEMON_TYPE_COLORS[type] || "bg-gray-400",
  }));

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedType) count++;
    if (selectedGeneration) count++;
    if (selectedGame) count++;
    return count;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg px-3 py-2 transition-all duration-200 flex-1 sm:flex-none"
          >
            <Filter className="w-5 h-5" />
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:space-x-2">
              <span className="text-lg font-semibold">Filtros</span>
              {hasActiveFilters && (
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {getActiveFiltersCount()} activo
                  {getActiveFiltersCount() > 1 ? "s" : ""}
                </span>
              )}
            </div>
            <div className="ml-auto">
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-white/70 hover:bg-white/30"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200"
                >
                  <Times className="w-4 h-4" />
                </button>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                <Times className="w-4 h-4" />
                <span className="hidden xl:inline">Limpiar</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-white/90 text-sm">
          <div className="flex items-center space-x-2">
            <LayerGroup className="w-4 h-4" />
            <span>
              {totalResults === 1 ? "1 Pokémon" : `${totalResults} Pokémon`}
            </span>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center space-x-1">
              {searchTerm && (
                <span className="px-2 py-1 bg-white/20 text-xs rounded-full">
                  Búsqueda
                </span>
              )}
              {selectedType && (
                <span className="px-2 py-1 bg-white/20 text-xs rounded-full">
                  {selectedType}
                </span>
              )}
              {selectedGeneration && (
                <span className="px-2 py-1 bg-white/20 text-xs rounded-full">
                  Gen {selectedGeneration}
                </span>
              )}
              {selectedGame && (
                <span className="px-2 py-1 bg-white/20 text-xs rounded-full">
                  Juego
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="p-4 sm:p-6 space-y-6">
          <div className="lg:hidden">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Búsqueda rápida
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por nombre o habilidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 hover:border-pink-300 dark:hover:border-pink-600"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-colors duration-200"
                >
                  <Times className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Generación */}
            <FilterDropdown
              label="Generación"
              value={selectedGeneration}
              onChange={setSelectedGeneration}
              options={generationOptions}
              icon={<Star className="w-4 h-4" />}
              placeholder="Seleccionar generación"
            />

            {/* Juego */}
            <FilterDropdown
              label="Juego de origen"
              value={selectedGame}
              onChange={setSelectedGame}
              options={gameOptions}
              icon={<Gamepad className="w-4 h-4" />}
              placeholder="Seleccionar juego"
            />
          </div>

          {/* Tipos como botones */}
          <FilterButtonGroup
            label="Tipo de Pokémon"
            options={typeOptions}
            selectedValue={selectedType}
            onChange={setSelectedType}
            maxVisible={6}
          />

          {hasActiveFilters && (
            <div className="lg:hidden pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onClearFilters}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30 rounded-xl text-pink-600 dark:text-pink-400 text-sm font-medium transition-all duration-200"
              >
                <Times className="w-4 h-4" />
                <span>Limpiar todos los filtros</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
