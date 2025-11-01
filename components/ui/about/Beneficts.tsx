import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const icons = [FaGithub, FaExternalLinkAlt].map(
  (icon) => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>
);

const [Github, ExternalLink] = icons;

export function Beneficts() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-pink-500 to-blue-500">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-8">
          ¿Qué hace especial a PokéNext?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold">1K+</span>
            </div>
            <h3 className="text-xl font-semibold">Pokémon Completos</h3>
            <p className="text-white/80">
              Acceso a más de 1000 Pokémon con información que mejorará a futuro
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold">100%</span>
            </div>
            <h3 className="text-xl font-semibold">Datos Oficiales</h3>
            <p className="text-white/80">
              Información extraida directamente de la PokéAPI oficial
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold">24/7</span>
            </div>
            <h3 className="text-xl font-semibold">Siempre Disponible</h3>
            <p className="text-white/80">
              Acceso instantáneo desde cualquier dispositivo, en cualquier
              momento
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <p className="text-xl text-white/90 leading-relaxed">
            PokéNext no quiere ser solo otra Pokédex. Quiere ser una experiencia
            completa que combine la diversión de los juegos con la funcionalidad
            moderna que esperas de una aplicación web actual.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/pokemon"
              className="px-8 py-4 bg-white text-pink-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explorar PokéNext
            </Link>
            <Link
              href="https://github.com/JhonXmario/PokeNext.git"
              target="_blank"
              className="flex items-center space-x-2 px-8 py-4 border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              <span>Ver en GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
