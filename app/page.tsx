import HeroSection from '@/components/ui/principal/HeroSection';
import FooterSection from '@/components/ui/principal/FooterSection';
import Navbar from "@/components/ui/principal/Navbar";
export default async function PokemonList() {

  return (
    <div >
      <Navbar />
      <HeroSection />
      <FooterSection />
    </div>
  );
}
