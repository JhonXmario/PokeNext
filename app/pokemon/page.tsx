import ListPokemons from '@/components/pokemon/PokemonList';
import { getEnhancedPokemons } from '@/services/pokeapi';

export default async function PokemonList() {
  const pokemons = await getEnhancedPokemons(400);
  
    return (
      <div >
        <ListPokemons
        initialPokemons={pokemons}
         />
      </div>
    );
}
