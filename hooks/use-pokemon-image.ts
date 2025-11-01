import { useState, useMemo } from "react";
import type { PokemonDetail } from "@/types/pokemon-details-types";

export const usePokemonImage = (pokemon: PokemonDetail, isShiny: boolean) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const currentSprite = useMemo(() => {
    if (isShiny) {
      return (
        pokemon.sprites.other?.["official-artwork"]?.front_shiny ||
        pokemon.sprites.front_shiny
      );
    }
    return (
      pokemon.sprites.other?.["official-artwork"]?.front_default ||
      pokemon.sprites.front_default
    );
  }, [pokemon, isShiny]);

  return {
    currentSprite,
    imageLoaded,
    imageError,
    setImageLoaded,
    setImageError,
  };
};
