import type React from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/ui/FooterSection";
import { features, technologies } from "@/constants/about-data";
import { FaCode, FaHeart, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const icons = [FaCode, FaHeart, FaGithub, FaExternalLinkAlt].map(
  (icon) => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>
);

const [Code, Heart, Github, ExternalLink] = icons;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-blue-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Sobre PokéNext
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Una Pokédex moderna y completa que combina la diversión de los
            Pokémon con las últimas tecnologías web para ofrecerte la mejor
            experiencia posible.
          </p>
          <div className="flex justify-center items-center space-x-8 text-white/70 text-sm mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Proyecto Open Source</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Desarrollado con ❤️</span>
            </div>
          </div>
        </div>
      </section>

      {/* Propósito del Proyecto */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              ¿Por qué PokéNext?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Este proyecto nació de la pasión por los Pokémon y el desarrollo
              web moderno. Mi objetivo es crear la experiencia de Pokédex más
              completa y accesible disponible en la web.
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
                    Como fanático de la franquicia desde la infancia, quería
                    crear una herramienta que honrara la riqueza y complejidad
                    del mundo Pokémon.
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
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">P</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Misión del Proyecto
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Proporcionar a futuro la experiencia de Pokédex más completa, accesible
                  y moderna, combinando datos oficiales con una interfaz
                  intuitiva y un rendimiento excepcional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características Clave */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Características Principales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Descubre todas las funcionalidades que hacen de PokéNext la
              Pokédex con potencial
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tecnologías Utilizadas */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Tecnologías Utilizadas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              PokéNext está construido con las mejores herramientas y frameworks
              del ecosistema web moderno
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
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
                Acceso a más de 1000 Pokémon con información que mejorará  a futuro
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
              PokéNext no quiere ser solo otra Pokédex. Quiere ser una experiencia completa que
              combine la diversión de los juegos con la funcionalidad
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
                href="https://github.com/JhonXmario/Frontend-Pokedex/tree/dev"
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

      <FooterSection />
    </div>
  );
}
