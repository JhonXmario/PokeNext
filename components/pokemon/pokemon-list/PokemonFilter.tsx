"use client"

import { FaSearch, FaTimes, FaFilter, FaGamepad, FaStar, FaLayerGroup } from "react-icons/fa"
import FilterDropdown from "./FilterDropdown"
import FilterButtonGroup from "./FilterButtonGroup"
import { POKEMON_GENERATIONS, POKEMON_GAMES, POKEMON_TYPE_COLORS } from "@/constants/pokemon-data"
import type { PokemonFiltersProps } from "@/types/pokemon-types"

const icons = [
  FaSearch,
  FaTimes,
  FaFilter,
  FaGamepad,
  FaStar,
  FaLayerGroup,
].map(
  icon => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>
);

const [Search, Times, Filter, Gamepad, Star, LayerGroup] = icons;

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
  const hasActiveFilters = searchTerm || selectedType || selectedGeneration || selectedGame

  // Preparar opciones para dropdowns
  const generationOptions = [
    { value: "", label: "Todas las generaciones" },
    ...POKEMON_GENERATIONS.filter((gen) => availableGenerations.includes(gen.id)).map((gen) => ({
      value: gen.id.toString(),
      label: `${gen.name} (${gen.region})`,
    })),
  ]

  const gameOptions = [
    { value: "", label: "Todos los juegos" },
    ...POKEMON_GAMES.filter((game) => availableGames.includes(game.id)).map((game) => ({
      value: game.id,
      label: game.name,
    })),
  ]

  // Preparar opciones para botones de tipo
  const typeOptions = availableTypes.map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
    color: POKEMON_TYPE_COLORS[type] || "bg-gray-400",
  }))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Filtros Avanzados</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              <Times className="w-4 h-4" />
              <span>Limpiar todo</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Búsqueda */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Búsqueda rápida</label>
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

        {/* Filtros en grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          maxVisible={8}
        />

        {/* Estadísticas de resultados */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <LayerGroup className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {totalResults === 1 ? "1 Pokémon encontrado" : `${totalResults} Pokémon encontrados`}
                </p>
                {hasActiveFilters && (
                  <p className="text-xs text-pink-600 dark:text-pink-400">Filtros activos aplicados</p>
                )}
              </div>
            </div>
            {hasActiveFilters && (
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {searchTerm && (
                    <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 text-xs rounded-full">
                      Búsqueda
                    </span>
                  )}
                  {selectedType && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                      Tipo
                    </span>
                  )}
                  {selectedGeneration && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                      Generación
                    </span>
                  )}
                  {selectedGame && (
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                      Juego
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
