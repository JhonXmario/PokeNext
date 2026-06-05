import FavoritesList from "@/components/pokemon/pokemon-list/FavoriteList";
import Navbar from "@/components/ui/principal/Navbar";
import FooterSection from "@/components/ui/principal/FooterSection";
import { auth } from "@clerk/nextjs/server";
import { getUserFavorites } from "@/app/actions/favorites"; 



export default async function FavoritesPage() {
  const { userId } = await auth();
  let userFavorites: any[] = [];

  if (userId) {
    const favoritesResult = await getUserFavorites(userId);

    if (Array.isArray(favoritesResult)) {
      userFavorites = favoritesResult;
    }
  }

  return (
    <div>
      <Navbar />
      <FavoritesList initialFavorites={userFavorites} />
      <FooterSection />
    </div>
  );
}
