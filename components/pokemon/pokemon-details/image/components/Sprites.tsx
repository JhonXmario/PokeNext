interface AdditionalSpritesProps {
  sprites: {
    front_default?: string | null;
    back_default?: string | null;
    front_shiny?: string | null;
    back_shiny?: string | null;
  };
}

export const AdditionalSprites = ({ sprites }: AdditionalSpritesProps) => (
  <div className="grid grid-cols-2 gap-3">
    {sprites.front_default ? (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
        {/* Sprite Normal */}
        <img
          src={sprites.front_default || "/placeholder.svg"}
          alt="Sprite Normal"
          className="w-16 h-16 mx-auto mb-2"
          loading="lazy"
        />
        <span className="text-xs text-gray-600 dark:text-gray-400">
          Sprite Normal
        </span>
      </div>
    ) : (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
        <span className="text-md text-gray-600 dark:text-gray-400">
          Sprite Normal no disponible
        </span>
      </div>
    )}

    {/* Sprite Reverse */}
    {sprites.back_default ? (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
        <img
          src={sprites.back_default || "/placeholder.svg"}
          alt="Sprite Reverso"
          className="w-16 h-16 mx-auto mb-2"
          loading="lazy"
        />
        <span className="text-xs text-gray-600 dark:text-gray-400">
          Sprite Reverso
        </span>
      </div>
    ) : (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
        <span className="text-md text-gray-600 dark:text-gray-400">
          Sprite Reverso no disponible
        </span>
      </div>
    )}

    {/* Sprite Shiny */}
    {sprites.front_shiny ? (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
        <img
          src={sprites.front_shiny}
          alt="Sprite Shiny"
          className="w-16 h-16 mx-auto mb-2"
          loading="lazy"
        />
        <span className="text-xs text-gray-600 dark:text-gray-400">
          Sprite Shiny
        </span>
      </div>
    ) : (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
        <span className="text-md text-gray-600 dark:text-gray-400">
          Sprite Shiny no disponible
        </span>
      </div>
    )}

    {/* Sprite Reverse Shiny */}
    {sprites.back_shiny ? (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
        <img
          src={sprites.back_shiny}
          alt="Sprite Reverse Shiny"
          className="w-16 h-16 mx-auto mb-2"
          loading="lazy"
        />
        <span className="text-xs text-gray-600 dark:text-gray-400">
          Sprite Reverso Shiny
        </span>
      </div>
    ) : (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
        <span className="text-md text-gray-600 dark:text-gray-400">
          Sprite Reverso Shiny no disponible
        </span>
      </div>
    )}
  </div>
);
