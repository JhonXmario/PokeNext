import { Suspense } from "react"
import { notFound } from "next/navigation"
import Navbar from "@/components/ui/Navbar"
import FooterSection from "@/components/ui/FooterSection"
import ButtonBack from "@/components/ui/ButtonBackToList"
import DataPokemon from "@/components/pokemon/pokemon-details/DataPokemon"
import { getCompletePokemonData } from "@/services/poke-details-api"

interface Props {
  params: Promise<{ name: string }>
}

// Loading component para la página completa
function PokemonDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="pokemon-card h-64">
            <div className="p-6 animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-1/2"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function PokemonDetailPage({ params }: Props) {
  const { name } = await params

  const pokemonData = await getCompletePokemonData(name)

  if (!pokemonData?.detail) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <main className="w-full max-w-7xl mx-auto flex-1 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<PokemonDetailLoading />}>
          <DataPokemon
            pokemon={pokemonData.detail}
            species={pokemonData.species}
            evolutionChain={pokemonData.evolutionChain}
          />
        </Suspense>
      </main>
      <div >
        <ButtonBack />
      </div>
      <FooterSection />
    </div>
  )
}

// Generar metadata dinámica
export async function generateMetadata({ params }: Props) {
  const { name } = await params

  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} - Pokédex`,
    description: `Información detallada sobre ${name}, incluyendo estadísticas, evoluciones y más.`,
  }
}
