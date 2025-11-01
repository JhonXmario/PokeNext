import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPaypal,
} from "react-icons/fa";
import Image from "next/image";

const icons = [FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPaypal].map(
  (icon) => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>
);

const [Github, Linkedin, Instagram, Envelope, Paypal] = icons;

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo.png"
                alt="PokéNext Logo"
                width={50}
                height={50}
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                PokéNext
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Una Pokédex moderna construida con Next.js y la PokéAPI oficial.
              Explora el fascinante mundo de los Pokémon con datos actualizados
              y una interfaz intuitiva.
            </p>

            {/* Redes sociales */}
            <div className="flex space-x-4">
              <Link
                href="https://github.com/JhonXmario"
                target="_blank"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/jhon-mario-diaz-02a811311"
                target="_blank"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400" />
              </Link>
              <Link
                href="https://www.instagram.com/jhonmarioxyz"
                target="_blank"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400" />
              </Link>
            </div>
          </div>

          {/* Apoyo economico */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contribución
            </h4>
            <ul className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                ¿Te gusta mi PokéNext? ¡Considera apoyar el desarrollo con una
                contribución voluntaria!
              </p>
              <li>
                <Link
                  href="https://paypal.me/JhonMarioXYZ"
                  target="_blank"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors duration-300"
                  aria-label="Donar via PayPal"
                >
                  <Paypal className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contacto
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Envelope className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <Link
                  href="mailto:jhondiaz8462@gmail.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  jhondiaz8462@gmail.com
                </Link>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ¿Tienes alguna sugerencia o encontraste un error?
                <br />
                ¡No dudes en contactarme!
              </p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} PokéNext. Todos los derechos reservados.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400 dark:text-gray-600">
                Powered by{" "}
                <Link
                  href="https://pokeapi.co"
                  target="_blank"
                  className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                >
                  PokéAPI
                </Link>{" "}
                <Link
                  href="https://nextjs.org/"
                  target="_blank"
                  className="text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                >
                  Next.JS
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
