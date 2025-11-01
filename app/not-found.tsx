import Link from "next/link";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import ButtonBack from "@/components/ui/ButtonBackToList";
import Navbar from "@/components/ui/principal/Navbar";
import FooterSection from "@/components/ui/principal/FooterSection";

const Home = FaHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center px-6 py-8 sm:py-20">
        <div className="max-w-lg mx-auto">
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
            alt="Pokémon no encontrado"
            width={200}
            height={200}
            className="mx-auto mb-4"
            priority
          />
          <h1 className="text-5xl md:text-6xl font-extrabold text-pink-600 dark:text-pink-400 mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            ¡Pokémon Perdido!
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
            Oops... Parece que el Pokémon que buscas se ha escondido muy bien o
            la página no existe. No te preocupes, ¡puedes volver a intentarlo!
          </p>

          <Link
            href="/pokemon"
            className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Volver a la Pokédex</span>
          </Link>
        </div>
      </section>
      <ButtonBack />
      <FooterSection />
    </>
  );
}
