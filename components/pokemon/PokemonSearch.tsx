'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Pokemon {
  name: string
  sprite: string
  types: string[]
}

export default function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  const handleSearch = async () => {
    // Implementar búsqueda real más adelante
    const mockData: Pokemon = {
      name: searchTerm.toLowerCase(),
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png`,
      types: ['electric']
    }
    setPokemon(mockData)
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Busca un Pokémon..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Buscar
        </button>
      </div>
      
      {pokemon && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <Image 
              src={pokemon.sprite} 
              alt={pokemon.name}
              width={96}
              height={96}
              className="object-contain"
            />
            <div>
              <h3 className="text-xl font-bold capitalize">{pokemon.name}</h3>
              <div className="flex gap-2 mt-2">
                {pokemon.types.map(type => (
                  <span 
                    key={type} 
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}