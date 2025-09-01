import { FaArrowRight } from "react-icons/fa"
import { EvolutionStageItem } from "./StageItem"
import type { EvolutionStage } from "@/hooks/use-pokemon-evolution"

interface EvolutionChainDisplayProps {
  stages: EvolutionStage[]
}

const ArrowRight = FaArrowRight as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

export const EvolutionChainDisplay = ({ stages }: EvolutionChainDisplayProps) => (
  <div className="flex flex-col space-y-6">
    {stages.map((stage, index) => (
      <div key={stage.name} className="flex flex-col items-center">
        <EvolutionStageItem stage={stage} />
        
        {/* Flecha de evolución */}
        {index < stages.length - 1 && (
          <div className="flex items-center justify-center my-4">
            <div className="bg-gradient-to-r from-pink-500 to-blue-500 p-2 rounded-full">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
)