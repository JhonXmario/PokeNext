import Image from 'next/image'

const featuredPokemon = [
  { id: 25, name: 'pikachu' },
  { id: 6, name: 'charizard' },
  { id: 150, name: 'mewtwo' },
  { id: 94, name: 'gengar' },
]

export default function FeaturedPokemon() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
        Pokémon Destacados
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredPokemon.map(pokemon => (
          <div 
            key={pokemon.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-4">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                width={200}
                height={200}
                className="w-full h-auto object-contain"
              />
              <h3 className="text-center mt-3 font-medium capitalize text-gray-800 dark:text-white">
                {pokemon.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}