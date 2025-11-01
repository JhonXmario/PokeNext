import { FaQuestionCircle } from "react-icons/fa"

const QuestionCircle = FaQuestionCircle as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
export const EvolutionEmptyState = () => (
  <div className="pokemon-card h-full">
    <div className="p-6 flex flex-col items-center justify-center text-center h-full">
      <QuestionCircle className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sin evoluciones</h3>
      <p className="text-gray-600 dark:text-gray-400">
        Este Pokémon no tiene evoluciones conocidas.
      </p>
    </div>
  </div>
)