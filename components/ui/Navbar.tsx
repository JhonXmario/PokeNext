"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { FormEvent } from "react"
import { FaSearch, FaHome, FaBars, FaTimes, FaHeart, FaList, FaRandom } from "react-icons/fa"

export default function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detectar scroll para añadir efecto de sombra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const pokemonName = form.pokemon.value.trim().toLowerCase()
    if (pokemonName) {
      router.push(`/pokemon/${pokemonName}`)
      form.reset()
      setIsMenuOpen(false) // Cerrar menú móvil después de buscar
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navigationLinks = [
    { href: "/", label: "Inicio", icon: FaHome },
    { href: "/pokemon", label: "Pokédex", icon: FaList },
    { href: "/favorites", label: "Favoritos", icon: FaHeart },
    { href: "/random", label: "Aleatorio", icon: FaRandom },
  ]

  return (
    <nav
      className={`navbar transition-all duration-300 ${
        isScrolled ? "shadow-lg backdrop-blur-sm bg-white/95 dark:bg-gray-900/95" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent group-hover:from-pink-700 group-hover:to-blue-700 transition-all duration-300">
                Pokédex
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Gotta Catch 'Em All</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => {
              const IconComponent = link.icon
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
              )
            })}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-pink-500 focus-within:bg-white dark:focus-within:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md">
                <input
                  name="pokemon"
                  type="text"
                  placeholder="Buscar Pokémon..."
                  className="bg-transparent py-1 px-2 outline-none text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 w-48"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="ml-2 text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition-colors duration-300 hover:scale-110 transform"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-pink-500 transition-all duration-300">
                  <input
                    name="pokemon"
                    type="text"
                    placeholder="Buscar Pokémon..."
                    className="bg-transparent py-1 px-2 outline-none text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 flex-1"
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="ml-2 text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition-colors duration-300"
                  >
                    <FaSearch className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Mobile Navigation Links */}
            {navigationLinks.map((link) => {
              const IconComponent = link.icon
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
              )
            })}

            {/* Mobile CTA */}
            <div className="px-3 py-2 mt-4">
              <Link
                href="/pokemon"
                onClick={closeMenu}
                className="block w-full text-center bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 px-4 rounded-full font-semibold hover:from-pink-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explorar Pokédex
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
