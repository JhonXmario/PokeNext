interface PokemonTypeBadgesProps {
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export const PokemonTypeBadges = ({ types }: PokemonTypeBadgesProps) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
      Tipo
    </h3>
    <div className="flex flex-wrap gap-2">
      {types.map((typeInfo, index) => (
        <span
          key={index}
          className={`type-badge type-${typeInfo.type.name} px-4 py-2 text-sm font-semibold`}
        >
          {typeInfo.type.name}
        </span>
      ))}
    </div>
  </div>
);
