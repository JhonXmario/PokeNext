export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
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
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedType: string
  setSelectedType: (type: string) => void
  availableTypes: string[]
  totalResults: number
}

export interface PokemonCardProps {
  id: number
  name: string
  sprite: string
  types: string[]
  abilities: string[]
  height: number
  weight: number
}