import { FaCode, FaHeart } from "react-icons/fa";
import Image from "next/image";

const icons = [FaCode, FaHeart].map(
  (icon) => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>
);

const [Code, Heart] = icons;

export function PurposeAndMision() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            ¿Por qué PokéNext?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Este proyecto nació de la pasión por los Pokémon y el desarrollo web
            moderno. Mi objetivo es crear la experiencia de Pokédex más completa
            y accesible disponible en la web.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Pasión por los Pokémon
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Como fanático de la franquicia desde la infancia, quería crear
                  una herramienta que honrara la riqueza y complejidad del mundo
                  Pokémon.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Aprendizaje Continuo
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Este proyecto me permite explorar y dominar las últimas
                  tecnologías del desarrollo web mientras creo algo útil y
                  divertido.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <div className="text-center">
              <Image
                src="/logo.png"
                alt="PokéNext Logo"
                width={50}
                height={50}
                className="w-20 h-20 object-contain flex items-center justify-center mx-auto mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Misión del Proyecto
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Proporcionar a futuro la experiencia de Pokédex más completa,
                accesible y moderna, combinando datos oficiales con una interfaz
                intuitiva y un rendimiento excepcional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
