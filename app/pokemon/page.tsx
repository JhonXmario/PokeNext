import ListPokemons from "@/components/pokemon/pokemon-list/PokemonList";
import Navbar from "@/components/ui/principal/Navbar";
import FooterSection from "@/components/ui/principal/FooterSection";
import { getEnhancedPokemons } from "@/services/poke-api";
import { auth } from "@clerk/nextjs/server";
import { getUserFavorites } from "@/app/actions/favorites";

export default async function PokemonList() {
  const pokemons = await getEnhancedPokemons();
  const { userId } = await auth();

  let favoriteIds = new Set<number>();

  if (userId) {
    const favoritesResult = await getUserFavorites(userId);
    if (Array.isArray(favoritesResult)) {
      favoriteIds = new Set(favoritesResult.map((favorite) => favorite.id));
    }
  }

  const pokemonsWithFavoriteStatus = pokemons.map((pokemon) => ({
    ...pokemon,
    isFavoriteInitial: favoriteIds.has(pokemon.id),
  }));

  return (
    <div>
      <Navbar />
      <ListPokemons initialPokemons={pokemonsWithFavoriteStatus} />
      <FooterSection />
    </div>
  );
}
