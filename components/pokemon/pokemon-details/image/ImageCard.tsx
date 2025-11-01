"use client"

import { useState } from "react"
import { PokemonImageHeader, MainPokemonImage, AdditionalSprites } from "./index"
import { usePokemonImage } from "@/hooks/use-pokemon-image"
import type { PokemonDetail } from "@/types/pokemon-details-types"

interface PokemonImageProps {
  pokemon: PokemonDetail
}

export default function PokemonImage({ pokemon }: PokemonImageProps) {
  const [isShiny, setIsShiny] = useState(false)
  const { currentSprite, imageLoaded, imageError, setImageLoaded, setImageError } = 
    usePokemonImage(pokemon, isShiny)

  const toggleShiny = () => setIsShiny(prev => !prev)

  return (
    <div className="pokemon-card h-full">
      <div className="p-6">
        {/* Header con ID y toggle shiny */}
        <PokemonImageHeader 
          pokemonId={pokemon.id} 
          isShiny={isShiny} 
          onToggleShiny={toggleShiny} 
        />

        {/* Imagen principal */}
        <MainPokemonImage
          sprite={currentSprite}
          pokemonName={pokemon.name}
          isShiny={isShiny}
          imageLoaded={imageLoaded}
          imageError={imageError}
          onImageLoad={() => setImageLoaded(true)}
          onImageError={() => setImageError(true)}
        />

        {/* Sprites adicionales */}
        <AdditionalSprites sprites={pokemon.sprites} />
      </div>
    </div>
  )
}