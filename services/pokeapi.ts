export async function getPokemon(name: string) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) {
      console.error(`Failed to fetch details for ${name}`);
      return null;
    }
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
    console.error("Error capturando datos de los pokemons: ", error);
    return null;
  }
}


export async function getEnhancedPokemons(limit: number = 1025, offset: number = 0) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    const data = await response.json()

    const pokemons = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        let pokemonResponse;
        let attempt = 0;
        while (attempt < 3) {
          try {
            pokemonResponse = await fetch(pokemon.url);
            if (pokemonResponse.ok) break;
          } catch (err) {
            console.error(`Attempt ${attempt + 1}: Failed to fetch ${pokemon.name}`, err);
          }
          attempt++;
        }
        if (!pokemonResponse || !pokemonResponse.ok) {
          console.error(`Failed to fetch details for ${pokemon.name} after 3 attempts`);
          return null;
        }
        const pokemonData = await pokemonResponse.json();

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
    console.error("Error capturando datos de los pokemons: ", error)
    return []
  }
}