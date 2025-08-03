import type { Pokemon } from '@/types/pokemonTypes';

export function filterPokemons(pokemons: Pokemon[], search: string, type: string): Pokemon[] {
  const filterSearch = search.toLowerCase();
  return pokemons.filter(pokemon => {
    const abilities = pokemon.abilities || [];
    const matchesSearch =
      pokemon.name.toLowerCase().includes(filterSearch) ||
      abilities.some(ability => ability.toLowerCase().includes(filterSearch));
    const matchesType = type === '' || pokemon.types.includes(type);
    return matchesSearch && matchesType;
  });
}

export function paginate(pokemons: Pokemon[], currentPage: number, itemsPerPage: number): Pokemon[] {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return pokemons.slice(start, end);
}

export function getAvailableTypes(pokemons: Pokemon[]): string[] {
  const typesSet = new Set<string>();
  pokemons.forEach(p => p.types.forEach(t => typesSet.add(t)));
  return Array.from(typesSet).sort();
}
