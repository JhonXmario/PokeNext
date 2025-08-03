import HeroSection from '@/components/ui/HeroSection';
import FooterSection from '@/components/ui/FooterSection';
import Navbar from "@/components/ui/Navbar";
export default async function PokemonList() {

  return (
    <div >
      <Navbar />
      <HeroSection />
      <FooterSection />
    </div>
  );
}
