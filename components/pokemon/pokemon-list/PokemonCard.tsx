"use client";

import type React from "react";
import { PokemonCardProps } from "@/types/pokemon-types";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRuler, FaWeight } from "react-icons/fa";
import { POKEMON_TYPE_TRANSLATIONS } from "@/constants/pokemon-data";
import { useAuth, useClerk } from "@clerk/nextjs";
import { toggleFavoriteAction } from "@/app/actions/favorites"; 

const icons = [FaHeart, FaRegHeart, FaRuler, FaWeight].map(
  (icon) => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>,
);

const [Heart, RegHeart, Ruler, Weight] = icons;

export default function PokemonCard({
  id,
  name,
  sprite,
  types = [],
  abilities = [],
  height,
  weight,
  isFavoriteInitial = false,
}: PokemonCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteInitial);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsFavorite(isFavoriteInitial);
  }, [isFavoriteInitial]);

  // Clerk hooks para controlar la sesión en el cliente
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el click acceda al <Link> de la tarjeta

    // Si no está logueado, abre el modal de inicio de sesión de Clerk
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    if (isPending || !id) return;

    try {
      setIsPending(true);

      // Llamada directa al Server Action pasando los datos
      const result = await toggleFavoriteAction({
        id,
        name,
        sprite,
        types,
        abilities,
        weight,
        height,
      });

      if (result.success) {
        setIsFavorite(result.isFavorite ?? false);
      } else {
        alert("Hubo un problema al guardar tu favorito: " + result.error);
      }
    } catch (error) {
      console.error("Error al ejecutar la acción de favoritos:", error);
    } finally {
      setIsPending(false);
    }
  };

  const formatId = (id?: number) => {
    return id ? `#${id.toString().padStart(3, "0")}` : "";
  };

  return (
    <div className="pokemon-card group transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
      {/* Header con ID y favorito */}
      <div className="flex justify-between items-center p-4 pb-2">
        <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
          {formatId(id)}
        </span>
        <button
          onClick={toggleFavorite}
          disabled={isPending}
          className={`text-pink-500 hover:text-pink-600 transition-colors duration-300 hover:scale-110 transform ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"
          }`}
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {isFavorite ? (
            <Heart className="w-5 h-5" />
          ) : (
            <RegHeart className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Imagen del Pokémon */}
      <div className="relative px-4 pb-2">
        <div className="w-full h-32 flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden">
          {!imageLoaded && (
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
          )}
          <div className={`relative w-24 h-24 transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}>
            <Image
              src={
                sprite || "/placeholder.svg?height=128&width=128&query=pokemon"
              }
              alt={name}
              fill
              sizes="96px"
              className="object-contain"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>

      {/* Información del Pokémon */}
      <div className="px-4 pb-4">
        <h3 className="text-lg font-bold capitalize text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
          {name}
        </h3>

        {/* Tipos */}
        <div className="flex flex-wrap gap-1 mb-3">
          {types.map((type) => (
            <span
              key={type}
              className={`type-badge type-${type} text-xs px-2.5 py-1 font-semibold rounded-md shadow-sm capitalize`}
            >
              {POKEMON_TYPE_TRANSLATIONS[type.toLowerCase()] || type}
            </span>
          ))}
        </div>

        {/* Estadísticas básicas */}
        <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Ruler className="w-3 h-3" />
            <span>{height ? (height / 10).toFixed(1) : "0.0"}m</span>
          </div>
          <div className="flex items-center space-x-1">
            <Weight className="w-3 h-3" />
            <span>{weight ? (weight / 10).toFixed(1) : "0.0"}kg</span>
          </div>
        </div>

        {/* Habilidades */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Habilidades:
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 capitalize line-clamp-2">
            {abilities.slice(0, 2).join(", ")}
            {abilities.length > 2 && "..."}
          </p>
        </div>

        {/* Botón de acción */}
        <Link href={`/pokemon/${name}`} className="block">
          <button className="w-full btn-primary text-sm py-2 group-hover:shadow-lg transition-all duration-300 hover:cursor-pointer">
            Ver detalles
          </button>
        </Link>
      </div>
    </div>
  );
}
