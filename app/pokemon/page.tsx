import ListPokemons from "@/components/pokemon/pokemon-list/PokemonList";
import Navbar from "@/components/ui/principal/Navbar";
import FooterSection from "@/components/ui/principal/FooterSection";
import { getEnhancedPokemons } from "@/services/poke-api";

export default async function PokemonList() {
  const pokemons = await getEnhancedPokemons();

  return (
    <div>
      <Navbar />
      <ListPokemons initialPokemons={pokemons} />
      <FooterSection />
    </div>
  );
}
