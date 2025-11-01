"use client"

import { FaEyeSlash, FaSpinner } from "react-icons/fa"
import { useAbilityDescription } from "@/hooks/use-ability-description"

const EyeSlash = FaEyeSlash as unknown as React.FC<React.SVGProps<SVGSVGElement>>
const Spinner = FaSpinner as unknown as React.FC<React.SVGProps<SVGSVGElement>>

interface AbilityItemProps {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
}

export const AbilityItem = ({ ability, is_hidden }: AbilityItemProps) => {
  const { description, isLoading } = useAbilityDescription(ability.url)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg px-4 shadow-sm transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:shadow-md">
      {/* Nombre y Etiqueta de Oculta */}
      <div className="flex items-start justify-between mb-2">
        <span className="capitalize text-lg font-bold text-gray-900 dark:text-pink-400">
          {ability.name.replace("-", " ")}
        </span>
        {is_hidden && (
          <div className="flex items-center space-x-1 px-2 py-1 text-purple-600 dark:text-purple-400 ml-2">
            <EyeSlash className="w-3 h-3" />
            <span className="text-xs font-semibold">Oculta</span>
          </div>
        )}
      </div>

      {/* Descripción de la Habilidad */}
      <div className="mt-2">
        {isLoading ? (
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Spinner className="animate-spin w-4 h-4" />
            <span>Cargando descripción...</span>
          </div>
        ) : (
          description && (
            <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed border-l-4 border-pink-500 pl-3">
              {description}
            </p>
          )
        )}
      </div>
    </div>
  )
}