// components/pokemon/pokemon-data/evolution/components/EvolutionStageItem.tsx
import { useState } from "react"

interface EvolutionStageItemProps {
  stage: {
    name: string
    sprite: string
    isCurrent: boolean
  }
}

export const EvolutionStageItem = ({ stage }: EvolutionStageItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className={`relative p-4 rounded-xl transition-all duration-300 ${
        stage.isCurrent
          ? "bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/30 dark:to-blue-900/30 ring-2 ring-pink-500 scale-105"
          : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
      }`}
    >
      {/* Indicador de Pokémon actual */}
      {stage.isCurrent && (
        <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
          Actual
        </div>
      )}

      <div className="flex flex-col items-center space-y-3">
        {/* Imagen */}
        <div className="w-20 h-20 flex items-center justify-center">
          {!imageLoaded && !imageError && (
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
          )}
          <img
            src={stage.sprite}
            alt={stage.name}
            className={`w-16 h-16 object-contain transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0 absolute"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>

        {/* Nombre */}
        <span className="text-sm font-semibold capitalize text-gray-900 dark:text-white">
          {stage.name}
        </span>
      </div>
    </div>
  )
}