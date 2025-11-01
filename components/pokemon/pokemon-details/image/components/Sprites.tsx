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

    {/* Sprite Reverse */}
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
      <img
        src={sprites.back_default || "/placeholder.svg"}
        alt="Sprite Reverse"
        className="w-16 h-16 mx-auto mb-2"
        loading="lazy"
      />
      <span className="text-xs text-gray-600 dark:text-gray-400">
        Sprite Reverse
      </span>
    </div>

    {/* Sprite Shiny */}
    {sprites.front_shiny && (
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
    )}

    {/* Sprite Reverse Shiny */}
    {sprites.back_shiny && (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
        <img
          src={sprites.back_shiny}
          alt="Sprite Reverse Shiny"
          className="w-16 h-16 mx-auto mb-2"
          loading="lazy"
        />
        <span className="text-xs text-gray-600 dark:text-gray-400">
          Sprite Reverse Shiny
        </span>
      </div>
    )}
  </div>
);
