import { FaRuler, FaWeight } from "react-icons/fa"

interface PhysicalFeatureProps {
  height: number
  weight: number
}

const icons = [
  FaRuler,
  FaWeight,
].map(
  icon => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>
);
const [Ruler, Weight] = icons;

export const PhysicalFeature = ({ height, weight }: PhysicalFeatureProps) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
      Características físicas
    </h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Ruler className="w-4 h-4 text-pink-600 dark:text-pink-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Altura</span>
        </div>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {(height / 10).toFixed(1)}m
        </span>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Weight className="w-4 h-4 text-pink-600 dark:text-pink-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Peso</span>
        </div>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {(weight / 10).toFixed(1)}kg
        </span>
      </div>
    </div>
  </div>
)