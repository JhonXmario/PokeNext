"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FaHome,
  FaBars,
  FaTimes,
  FaList,
  FaRandom,
  FaInfoCircle,
} from "react-icons/fa";
import { SearchWithSuggestions } from "./SearchWithSuggestions";

const icons = [
  FaHome,
  FaBars,
  FaTimes,
  FaList,
  FaRandom,
  FaInfoCircle,
].map((icon) => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>);

const [Home, Bars, Times, List, Random, InfoCircle] = icons;

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para añadir efecto de sombra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRandom = () => {
    const randomID = Math.floor(Math.random() * 1025) + 1;
    router.push(`/pokemon/${randomID}`);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationLinks: {
    href: string;
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[] = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/about", label: "Saber mas", icon: InfoCircle },
    { href: "/pokemon", label: "Pokédex", icon: List },
    /* { href: "/favorites", label: "Favoritos", icon: Heart }, */
  ];

  return (
    <nav
      className={`navbar transition-all duration-300 ${
        isScrolled
          ? "shadow-lg backdrop-blur-sm bg-white/85 dark:bg-gray-900/85"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="flex items-center space-x-3">
                <Image
                  src="/logo.png"
                  alt="PokéNext Logo"
                  width={50}
                  height={50}
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent group-hover:from-pink-700 group-hover:to-blue-700 transition-all duration-300">
                PokéNext
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Gotta Catch 'Em All
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 group relative"
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">{link.label}</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                </Link>
              );
            })}
            {/* Botón Aleatorio Desktop */}
            <button
              onClick={handleRandom}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 group relative hover:cursor-pointer"
            >
              <Random className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Aleatorio</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block">
            <SearchWithSuggestions />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <Times className="w-6 h-6" />
              ) : (
                <Bars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <SearchWithSuggestions
                placeholder="Buscar Pokémon..."
                onClose={() => setIsMenuOpen(false)}
              />
            </div>

            {/* Mobile Navigation Links */}
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 group"
                >
                  <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            {/* Botón Aleatorio Móvil */}
            <button
              onClick={handleRandom}
              className="flex items-center space-x-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 group w-full"
            >
              <Random className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Aleatorio</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
