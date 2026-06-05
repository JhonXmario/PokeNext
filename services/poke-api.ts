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

const POKEMON_FETCH_BATCH_SIZE = 20;
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
      `La operacion a fallado obteniendo los datos de: ${name} despues de ${POKEMON_FETCH_MAX_RETRIES} intentos fallidos`,
    );
    return null;
  }

  return pokemonResponse.json();
}

async function fetchPokemonDetailsInBatches(
  results: Array<{ name: string; url: string }>,
) {
  const pokemons: Array<any> = [];

  for (
    let index = 0;
    index < results.length;
    index += POKEMON_FETCH_BATCH_SIZE
  ) {
    const batch = results.slice(index, index + POKEMON_FETCH_BATCH_SIZE);
    const batchResponses = await Promise.all(
      batch.map(async (pokemon) => {
        const pokemonData = await fetchPokemonDetails(
          pokemon.url,
          pokemon.name,
        );
        if (!pokemonData) return null;

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
          types: pokemonData.types.map((t: any) => t.type.name),
          abilities: pokemonData.abilities.map((a: any) => a.ability.name),
          height: pokemonData.height,
          weight: pokemonData.weight,
          generation,
          games,
        };
      }),
    );

    pokemons.push(...batchResponses.filter(Boolean));
  }

  return pokemons;
}

// Obtener lista de Pokémon con detalles adicionales (para la Pokédex)
export async function getEnhancedPokemons(
  limit: number = 1025,
  offset: number = 0,
) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      {
        next: { revalidate: 86400 },
      },
    );
    const data = await response.json();

    const pokemons = await fetchPokemonDetailsInBatches(data.results);

    return pokemons;
  } catch (error) {
    console.error("Error capturando datos de los pokemons: ", error);
    return [];
  }
}
