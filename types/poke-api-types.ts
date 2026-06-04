// Interfaces para tipar las respuestas de PokeAPI y evitar el uso de 'any'

export interface PokeApiNamedResource {
  name: string;
  url: string;
}

export interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiNamedResource[];
}

export interface PokeApiAbility {
  ability: PokeApiNamedResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokeApiType {
  slot: number;
  type: PokeApiNamedResource;
}

export interface PokeApiPokemonResponse {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
  types: PokeApiType[];
  abilities: PokeApiAbility[];
}

export interface SimplePokemonDetail {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprite: PokeApiPokemonResponse["sprites"];
  types: string;
  habilities: string;
}

export interface SearchPokemonResult {
  id: number;
  name: string;
  sprite: string;
}

export interface EnhancedPokemon {
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
