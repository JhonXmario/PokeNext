// components/pokemon/pokemon-data/description/components/AbilitiesList.tsx
import { FaEyeSlash } from "react-icons/fa"

interface AbilitiesListProps {
  abilities: Array<{
    ability: {
      name: string
    }
    is_hidden: boolean
  }>
}

const EyeSlash = FaEyeSlash as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

export const AbilitiesList = ({ abilities }: AbilitiesListProps) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
      Habilidades
    </h3>
    <div className="space-y-2">
      {abilities.map((abilityInfo, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3"
        >
          <span className="capitalize font-medium text-gray-900 dark:text-white">
            {abilityInfo.ability.name.replace("-", " ")}
          </span>
          {abilityInfo.is_hidden && (
            <div className="flex items-center space-x-1 text-purple-600 dark:text-purple-400">
              <EyeSlash className="w-3 h-3" />
              <span className="text-xs font-medium">Oculta</span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)