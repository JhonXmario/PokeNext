import { POKEMON_GENERATIONS, POKEMON_GAMES } from "../constants/pokemon-data";

// Obtener detalles de un Pokémon por nombre o ID
export async function getPokemon(name: string) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
    );
    if (!response.ok) {
      console.error(`Error al capturar los datos de ${name}`);
      return null;
    }
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      weight: data.weight,
      height: data.height,
      sprite: data.sprites,
      types: data.types.map((typeInfo: any) => typeInfo.type.name).join(", "),
      habilities: data.abilities
        .map((abilityInfo: any) => abilityInfo.ability.name)
        .join(", "),
    };
  } catch (error) {
    console.error("Error capturando datos de los pokemons: ", error);
    return null;
  }
}

// Buscar Pokémon por nombre (con sugerencias)
export async function searchPokemonByName(query: string) {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1025`,
    );
    const data = await response.json();

    const filtered = data.results
      .filter((pokemon: { name: string; url: string }) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 8)
      .map((pokemon: { name: string; url: string }) => {
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

// Cache en memoria del servidor para evitar consultar de nuevo los datos estáticos de los 1025 Pokémon
let cachedEnhancedPokemons: any[] | null = null;

const CONCURRENCY_LIMIT = 80;
const POKEMON_FETCH_MAX_RETRIES = 3;

async function fetchPokemonDetails(url: string, name: string) {
  let pokemonResponse;
  let attempt = 0;

  while (attempt < POKEMON_FETCH_MAX_RETRIES) {
    try {
      pokemonResponse = await fetch(url, {
        next: { revalidate: 86400 },
      });
      if (pokemonResponse.ok) break;
    } catch (err) {
      console.error(
        `Intento ${attempt + 1}: fallido capturando a: ${name}`,
        err,
      );
    }
    attempt++;
  }

  if (!pokemonResponse || !pokemonResponse.ok) {
    console.error(
      `La operación ha fallado obteniendo los datos de: ${name} después de ${POKEMON_FETCH_MAX_RETRIES} intentos fallidos`,
    );
    return null;
  }

  return pokemonResponse.json();
}

async function fetchPokemonDetailsConcurrently(
  results: Array<{ name: string; url: string }>,
) {
  const pokemons: Array<any> = new Array(results.length);
  const executing: Promise<any>[] = [];

  const processItem = async (
    pokemon: { name: string; url: string },
    index: number,
  ) => {
    const pokemonData = await fetchPokemonDetails(pokemon.url, pokemon.name);
    if (!pokemonData) return;

    let generation = 0;
    for (const gen of POKEMON_GENERATIONS) {
      const [start, end] = gen.range.split("-").map((n) => parseInt(n));
      if (end) {
        if (pokemonData.id >= start && pokemonData.id <= end) {
          generation = gen.id;
          break;
        }
      } else {
        if (pokemonData.id >= start) {
          generation = gen.id;
          break;
        }
      }
    }

    const games = POKEMON_GAMES.filter((g) => g.generation === generation).map(
      (g) => g.id,
    );

    pokemons[index] = {
      id: pokemonData.id,
      name: pokemonData.name,
      sprite:
        pokemonData.sprites.other["official-artwork"].front_default ||
        pokemonData.sprites.front_default ||
        `/placeholder.svg?height=128&width=128&query=${pokemonData.name}`,
      types: pokemonData.types.map((t: any) => t.type.name),
      abilities: pokemonData.abilities.map((a: any) => a.ability.name),
      height: pokemonData.height,
      weight: pokemonData.weight,
      generation,
      games,
      stats: pokemonData.stats.map((s: any) => {
        const statId = s.stat.url
          .split("/")
          .filter(Boolean)
          .pop();

        return {
          name: s.stat.name,
          number: statId ? parseInt(statId, 10) : 0,
          value: s.base_stat,
          base_stat: s.base_stat,
          stat: {
            name: s.stat.name,
            url: s.stat.url,
          },
        };
      }),
    };
  };

  // Procesar por lotes (chunks) para no saturar el servidor DNS (EBUSY)
  const BATCH_SIZE = 40;
  for (let i = 0; i < results.length; i += BATCH_SIZE) {
    const batch = results.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map((pokemon, indexInBatch) => processItem(pokemon, i + indexInBatch)));
  }

  return pokemons.filter(Boolean);
}

// Obtener lista de Pokémon con detalles adicionales (para la Pokédex)
export async function getEnhancedPokemons(
  limit: number = 1025,
  offset: number = 0,
) {
  // Retornar caché en memoria si es la lista completa y ya está construida
  if (limit === 1025 && offset === 0 && cachedEnhancedPokemons) {
    return cachedEnhancedPokemons;
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      {
        next: { revalidate: 86400 },
      },
    );
    const data = await response.json();

    const pokemons = await fetchPokemonDetailsConcurrently(data.results);

    // Guardar en la caché en memoria del servidor
    if (limit === 1025 && offset === 0 && pokemons.length > 0) {
      cachedEnhancedPokemons = pokemons;
    }

    return pokemons;
  } catch (error) {
    console.error("Error capturando datos de los pokemons: ", error);
    return [];
  }
}
