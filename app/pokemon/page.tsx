import ListPokemons from "@/components/pokemon/PokemonList";
import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/ui/FooterSection";
import { getEnhancedPokemons } from "@/services/pokeapi";

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
