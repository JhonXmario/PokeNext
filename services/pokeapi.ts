export async function getAllPokemon(limit: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
  return res.json()
}

export async function getPokemon(name: string) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) return null;
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      weight: data.weight,
      height: data.height,
      sprite: data.sprites,
      types: data.types.map((typeInfo: any) => typeInfo.type.name).join(', '),
      habilities: data.abilities.map((abilityInfo: any) => abilityInfo.ability.name).join(', '),
    };
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
}

export async function getPokemonDetails(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  return res.json();
}

export async function getDetailedPokemons(limit: number) {
  const data = await getAllPokemon(limit);

  const pokemons = await Promise.all(
    data.results.map(async (pokemon: { name: string }) => {
      const details = await getPokemonDetails(pokemon.name);
      return {
        name: pokemon.name,
        sprite: details.sprites.other.home.front_default,
        types: details.types.map((t: any) => t.type.name),
      };
    })
  );

  return pokemons;
}

export async function getEnhancedPokemons(limit = 900, offset = 0) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    const data = await response.json()

    const pokemons = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const pokemonResponse = await fetch(pokemon.url)
        const pokemonData = await pokemonResponse.json()

        return {
          id: pokemonData.id,
          name: pokemonData.name,
          sprite:
            pokemonData.sprites.other.home.front_default ||
            pokemonData.sprites.front_default ||
            `/placeholder.svg?height=128&width=128&query=${pokemonData.name}`,
          types: pokemonData.types.map((t: any) => t.type.name),
          abilities: pokemonData.abilities.map((a: any) => a.ability.name),
          height: pokemonData.height,
          weight: pokemonData.weight,
        }
      }),
    )

    return pokemons
  } catch (error) {
    console.error("Error fetching enhanced Pokémon data:", error)
    return []
  }
}