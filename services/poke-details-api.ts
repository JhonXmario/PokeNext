import type {
  PokemonDetail,
  PokemonSpecies,
  EvolutionChain,
} from "../types/pokemon-details-types";

export async function getPokemonDetail(
  name: string
): Promise<PokemonDetail | null> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error capturando detalles de Pokémon:", error);
    return null;
  }
}

export async function getPokemonSpecies(
  url: string
): Promise<PokemonSpecies | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error capturando especie de Pokémon:", error);
    return null;
  }
}

export async function getEvolutionChain(
  url: string
): Promise<EvolutionChain | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error capturando cadena evolutiva de Pokémon:", error);
    return null;
  }
}

export async function getCompletePokemonData(name: string) {
  try {
    const pokemonDetail = await getPokemonDetail(name);
    if (!pokemonDetail) return null;

    const [species, evolutionChain] = await Promise.all([
      getPokemonSpecies(pokemonDetail.species.url),
      getPokemonSpecies(pokemonDetail.species.url).then((species) =>
        species ? getEvolutionChain(species.evolution_chain.url) : null
      ),
    ]);

    return {
      detail: pokemonDetail,
      species,
      evolutionChain,
    };
  } catch (error) {
    console.error(
      "Error capturando datos completos del Pokémon (valio madres):",
      error
    );
    return null;
  }
}

// Función para obtener el ID de un Pokémon por su nombre
export const getPokemonIdByName = async (
  pokemonName: string
): Promise<number> => {
  try {
    // Primero busco en localStorage/cache
    const cachedId = localStorage.getItem(`pokemon-id-${pokemonName}`);
    if (cachedId) return parseInt(cachedId);

    // Si no está en cache, hago la llamada a la API
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error(`Pokémon ${pokemonName} not found`);
    }

    const data = await response.json();
    const id = data.id;

    // Guardo en cache para futuras consultas
    localStorage.setItem(`pokemon-id-${pokemonName}`, id.toString());

    return id;
  } catch (error) {
    console.error(`Error fetching ID for ${pokemonName}:`, error);

    // Fallback: intento obtener el ID de la URL de la especie
    const speciesResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
    );
    if (speciesResponse.ok) {
      const speciesData = await speciesResponse.json();
      return speciesData.id;
    }

    // Último fallback: devuelve 1 (Bulbasaur)
    return 1;
  }
};
