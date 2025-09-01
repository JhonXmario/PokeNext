interface MainPokemonImageProps {
  sprite: string | null
  pokemonName: string
  isShiny: boolean
  imageLoaded: boolean
  imageError: boolean
  onImageLoad: () => void
  onImageError: () => void
}

export const MainPokemonImage = ({
  sprite,
  pokemonName,
  isShiny,
  imageLoaded,
  imageError,
  onImageLoad,
  onImageError
}: MainPokemonImageProps) => (
  <div className="relative mb-6">
    <div className="w-full h-80 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden relative">
      {/* Loading skeleton */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* Error state */}
      {imageError && (
        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mb-2"></div>
          <span className="text-sm">Imagen no disponible</span>
        </div>
      )}

      {/* Imagen del Pokémon */}
      {sprite && (
        <img
          src={sprite}
          alt={`${pokemonName} ${isShiny ? "shiny" : "normal"}`}
          className={`w-64 h-64 object-contain transition-all duration-500 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } ${isShiny ? "drop-shadow-lg filter hue-rotate-15" : ""}`}
          onLoad={onImageLoad}
          onError={onImageError}
        />
      )}

      {/* Efecto de brillo para shiny */}
      {isShiny && imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/5 to-transparent animate-pulse"></div>
      )}
    </div>
  </div>
)