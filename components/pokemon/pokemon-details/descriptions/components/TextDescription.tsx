interface PokemonDescriptionTextProps {
  description: string;
}

export const PokemonDescriptionText = ({
  description,
}: PokemonDescriptionTextProps) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
      Descripción de la Pokédex
    </h3>
    <div className="bg-gradient-to-r from-pink-50 to-blue-50 dark:from-pink-900/20 dark:to-blue-900/20 rounded-lg p-4 border-l-4 border-pink-500">
      <p className="text-gray-800 dark:text-gray-200 leading-relaxed italic">
        "{description}"
      </p>
    </div>
  </div>
);
