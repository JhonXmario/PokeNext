import { POKEMON_GENERATIONS, POKEMON_GAMES } from "../constants/pokemon-data";
import type {
  EnhancedPokemon,
  SearchPokemonResult,
  SimplePokemonDetail,
  PokeApiListResponse,
  PokeApiPokemonResponse,
} from "../types/poke-api-types";

// Función auxiliar para procesar promesas por lotes (batching) y evitar saturar la red / API
async function batchPromises<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  batchSize: number = 50,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
  }
  return results;
}

// Obtener detalles de un Pokémon por nombre o ID
export async function getPokemon(
  name: string,
): Promise<SimplePokemonDetail | null> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
      { cache: "force-cache" },
    );
    if (!response.ok) {
      console.error(`Error al capturar los datos de ${name}`);
      return null;
    }
    const data: PokeApiPokemonResponse = await response.json();
    return {
      id: data.id,
      name: data.name,
      weight: data.weight,
      height: data.height,
      sprite: data.sprites,
      types: data.types.map((typeInfo) => typeInfo.type.name).join(", "),
      habilities: data.abilities
        .map((abilityInfo) => abilityInfo.ability.name)
        .join(", "),
    };
  } catch (error) {
    console.error("Error capturando datos de los pokemons: ", error);
    return null;
  }
}

// Buscar Pokémon por nombre (con sugerencias)
export async function searchPokemonByName(
  query: string,
): Promise<SearchPokemonResult[]> {
  if (!query.trim()) return [];

  try {
    // Almacenamos en caché la lista completa de pokemons para búsquedas instantáneas
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1025`,
      { cache: "force-cache" },
    );
    const data: PokeApiListResponse = await response.json();

    const filtered = data.results
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 8)
      .map((pokemon) => {
        const id = pokemon.url.split("/").filter(Boolean).pop();
        return {
          id: parseInt(id || "0"),
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
      });

    return filtered;
  } catch (error) {
    console.error("Error buscando pokémons: ", error);
    return [];
  }
}

// Obtener lista de Pokémon con detalles adicionales (para la Pokédex)
export async function getEnhancedPokemons(
  limit: number = 1025,
  offset: number = 0,
): Promise<EnhancedPokemon[]> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      { cache: "force-cache" },
    );
    const data: PokeApiListResponse = await response.json();

    // Procesamos en lotes concurrentes (concurrencia de 50) para evitar Rate Limiting y saturación de Sockets
    const pokemons = await batchPromises(
      data.results,
      async (pokemon) => {
        let pokemonResponse: Response | null = null;
        let attempt = 0;
        while (attempt < 3) {
          try {
            pokemonResponse = await fetch(pokemon.url, {
              cache: "force-cache",
            });
            if (pokemonResponse.ok) break;
          } catch (err) {
            console.error(
              `Intento ${attempt + 1}: fallido capturando a: ${pokemon.name}`,
              err,
            );
          }
          attempt++;
        }
        if (!pokemonResponse || !pokemonResponse.ok) {
          console.error(
            `La operacion ha fallado obteniendo los datos de: ${pokemon.name} despues de 3 intentos fallidos`,
          );
          return null;
        }
        const pokemonData: PokeApiPokemonResponse =
          await pokemonResponse.json();

        // Determinar generación según el ID
        let generation = 0;
        for (const gen of POKEMON_GENERATIONS) {
          const [start, end] = gen.range.split("-").map((n) => parseInt(n));
          if (end) {
            if (pokemonData.id >= start && pokemonData.id <= end) {
              generation = gen.id;
              break;
            }
          } else {
            // Para la última generación ("906+")
            if (pokemonData.id >= start) {
              generation = gen.id;
              break;
            }
          }
        }

        // Determinar juegos según la generación
        const games = POKEMON_GAMES.filter(
          (g) => g.generation === generation,
        ).map((g) => g.id);

        return {
          id: pokemonData.id,
          name: pokemonData.name,
          sprite:
            pokemonData.sprites.other["official-artwork"].front_default ||
            pokemonData.sprites.front_default ||
            `/placeholder.svg?height=128&width=128&query=${pokemonData.name}`,
          types: pokemonData.types.map((t) => t.type.name),
          abilities: pokemonData.abilities.map((a) => a.ability.name),
          height: pokemonData.height,
          weight: pokemonData.weight,
          generation,
          games,
        };
      },
      50, // tamaño del lote
    );

    // Filtramos elementos nulos para retornar únicamente pokemons válidos
    return pokemons.filter((p): p is EnhancedPokemon => p !== null);
  } catch (error) {
    console.error("Error capturando datos de los pokemons: ", error);
    return [];
  }
}
