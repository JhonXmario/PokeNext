"use client";

import { useState } from "react";
import PokemonCard from "./PokemonCard";
import { FaHeart } from "react-icons/fa";
import type { Pokemon } from "@/types/pokemon-types";

const icons = FaHeart as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const Heart = icons;

interface FavoritesListProps {
  initialFavorites: Pokemon[];
}

export default function FavoritesList({
  initialFavorites,
}: FavoritesListProps) {
  const [favorites] = useState<Pokemon[]>(initialFavorites);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-10 h-10 text-pink-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Pokémon Favoritos
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Tus Pokémon favoritos guardados. Aquí puedes ver todos tus Pokémon
          seleccionados en un solo lugar.
        </p>
      </div>

      {/* Lista de Pokémon */}
      {favorites.length > 0 ? (
        <>
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total de favoritos:{" "}
              <span className="font-bold text-pink-600">
                {favorites.length}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                sprite={pokemon.sprite}
                types={pokemon.types}
                abilities={pokemon.abilities}
                height={pokemon.height}
                weight={pokemon.weight}
                isFavoriteInitial={true}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/20 rounded-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-pink-300 dark:text-pink-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Sin Pokémon favoritos
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Aún no tienes Pokémon en tu lista de favoritos. ¡Explora la Pokédex
            y agrega tus Pokémon favoritos!
          </p>
          <a
            href="/pokemon"
            className="inline-block btn-primary px-8 py-3 text-sm hover:shadow-lg transition-all duration-300 text-white bg-pink-600 hover:bg-pink-700 rounded-full"
          >
            Explorar Pokédex
          </a>
        </div>
      )}
    </div>
  );
}
