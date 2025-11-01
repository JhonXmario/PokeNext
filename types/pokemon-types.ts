import type React from "react";
export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
  generation: number;
  games: string[];
}
export interface UsePokemonListProps {
  initialPokemons: Pokemon[];
  itemsPerPage?: number;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
}

export interface PokemonFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedGeneration: string;
  setSelectedGeneration: (generation: string) => void;
  selectedGame: string;
  setSelectedGame: (game: string) => void;
  availableTypes: string[];
  availableGenerations: number[];
  availableGames: string[];
  totalResults: number;
  onClearFilters: () => void;
}

export interface FilterDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  icon: React.ReactNode;
  placeholder: string;
}

export interface FilterButtonGroupProps {
  label: string;
  options: Array<{ value: string; label: string; color?: string }>;
  selectedValue: string;
  onChange: (value: string) => void;
  maxVisible?: number;
}

export interface PokemonCardProps {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
}
