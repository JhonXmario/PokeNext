import { createTeamAction, deleteTeamAction, getUserTeamsAction } from "@/app/actions/teams";
import { TeamsContainer } from "@/components/pokemon/pokemon-teams/TeamContainer";
import FooterSection from "@/components/ui/principal/FooterSection";
import Navbar from "@/components/ui/principal/Navbar";
import { getEnhancedPokemons } from "@/services/poke-api";

export const metadata = {
  title: "Mis Equipos | PokéNext",
  description: "Crea y gestiona tus equipos de Pokémon",
};

export default async function TeamsPage() {
  const [pokemonList, initialTeams] = await Promise.all([
    getEnhancedPokemons(),
    getUserTeamsAction(),
  ]);

  return (
    <main>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <TeamsContainer
          initialTeams={initialTeams}
          availablePokemon={pokemonList.filter(Boolean) as any[]}
          createTeamAction={createTeamAction}
          deleteTeamAction={deleteTeamAction}
        />
      </div>
      <FooterSection />
    </main>
  );
}
