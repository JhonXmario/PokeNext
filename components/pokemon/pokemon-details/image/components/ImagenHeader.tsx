import { FaStar, FaRegStar } from "react-icons/fa"

interface PokemonImageHeaderProps {
  pokemonId: number
  isShiny: boolean
  onToggleShiny: () => void
}

const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const RegStar = FaRegStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

export const PokemonImageHeader = ({ pokemonId, isShiny, onToggleShiny }: PokemonImageHeaderProps) => {
  const formatId = (id: number) => `#${id.toString().padStart(3, "0")}`

  return (
    <div className="flex justify-between items-center mb-6">
      <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">
        {formatId(pokemonId)}
      </span>
      <button
        onClick={onToggleShiny}
        className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-all duration-300 hover:scale-105 hover:cursor-pointer"
        title={isShiny ? "Ver normal" : "Ver shiny"}
      >
        {isShiny ? <Star className="w-4 h-4" /> : <RegStar className="w-4 h-4" />}
        <span className="text-sm font-medium">{isShiny ? "Shiny" : "Normal"}</span>
      </button>
    </div>
  )
}