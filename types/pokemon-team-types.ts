import { Pokemon } from "./pokemon-types";

export interface TeamStats {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
  total: number;
}

export interface PokemonStatEntry {
  name?: string;
  value?: number;
  base_stat?: number;
  stat?: {
    name?: string;
    url?: string;
  };
}

export interface TeamPokemonSlot {
  pokemon: Pokemon;
  position: number; // 1-6
}

export interface PokemonTeam {
  id: string;
  name: string;
  description?: string;
  pokemon: TeamPokemonSlot[];
  stats: TeamStats;
  createdAt: Date;
}
