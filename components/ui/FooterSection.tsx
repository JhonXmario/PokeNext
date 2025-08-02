import Link from "next/link"
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa"

export default function FooterSection() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Pokédex</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Una Pokédex moderna y completa construida con Next.js y la PokéAPI oficial. Explora el fascinante mundo de
              los Pokémon con datos actualizados y una interfaz intuitiva.
            </p>

            {/* Redes sociales */}
            <div className="flex space-x-4">
              <Link
                href="https://github.com"
                target="_blank"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400" />
              </Link>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enlaces rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/pokemon"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  Pokédex
                </Link>
              </li>
              <li>
                <Link
                  href="/types"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  Tipos
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <Link
                  href="mailto:contact@pokedex.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  contact@pokedex.com
                </Link>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ¿Tienes alguna sugerencia o encontraste un error?
                <br />
                ¡No dudes en contactarnos!
              </p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Pokédex. Todos los derechos reservados.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
              >
                Privacidad
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
              >
                Términos
              </Link>
              <span className="text-gray-400 dark:text-gray-600">
                Powered by{" "}
                <Link
                  href="https://pokeapi.co"
                  target="_blank"
                  className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
                >
                  PokéAPI
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
