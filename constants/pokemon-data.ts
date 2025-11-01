import {
  FaFire,
  FaShieldAlt,
  FaBolt,
  FaHeart,
  FaEye,
  FaTachometerAlt,
} from "react-icons/fa";

export const POKEMON_GENERATIONS = [
  { id: 1, name: "Generación I", region: "Kanto", range: "1-151" },
  { id: 2, name: "Generación II", region: "Johto", range: "152-251" },
  { id: 3, name: "Generación III", region: "Hoenn", range: "252-386" },
  { id: 4, name: "Generación IV", region: "Sinnoh", range: "387-493" },
  { id: 5, name: "Generación V", region: "Unova", range: "494-649" },
  { id: 6, name: "Generación VI", region: "Kalos", range: "650-721" },
  { id: 7, name: "Generación VII", region: "Alola", range: "722-809" },
  { id: 8, name: "Generación VIII", region: "Galar", range: "810-905" },
  { id: 9, name: "Generación IX", region: "Paldea", range: "906+" },
];

export const POKEMON_GAMES = [
  { id: "red-blue", name: "Rojo/Azul", generation: 1, color: "bg-red-500" },
  { id: "yellow", name: "Amarillo", generation: 1, color: "bg-yellow-500" },
  {
    id: "gold-silver",
    name: "Oro/Plata",
    generation: 2,
    color: "bg-yellow-600",
  },
  { id: "crystal", name: "Cristal", generation: 2, color: "bg-cyan-500" },
  {
    id: "ruby-sapphire",
    name: "Rubí/Zafiro",
    generation: 3,
    color: "bg-red-600",
  },
  { id: "emerald", name: "Esmeralda", generation: 3, color: "bg-green-600" },
  {
    id: "diamond-pearl",
    name: "Diamante/Perla",
    generation: 4,
    color: "bg-blue-600",
  },
  { id: "platinum", name: "Platino", generation: 4, color: "bg-gray-600" },
  {
    id: "black-white",
    name: "Negro/Blanco",
    generation: 5,
    color: "bg-gray-800",
  },
  { id: "x-y", name: "X/Y", generation: 6, color: "bg-blue-500" },
  { id: "sun-moon", name: "Sol/Luna", generation: 7, color: "bg-orange-500" },
  {
    id: "sword-shield",
    name: "Espada/Escudo",
    generation: 8,
    color: "bg-purple-600",
  },
  {
    id: "scarlet-violet",
    name: "Escarlata/Violeta",
    generation: 9,
    color: "bg-pink-600",
  },
];

export const POKEMON_TYPE_COLORS: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

export const STATS_CONFIG = {
  hp: {
    icon: FaHeart,
    name: "PS",
    color: "bg-red-500",
  },
  attack: {
    icon: FaFire,
    name: "Ataque",
    color: "bg-orange-500",
  },
  defense: {
    icon: FaShieldAlt,
    name: "Defensa",
    color: "bg-blue-500",
  },
  "special-attack": {
    icon: FaBolt,
    name: "At. Especial",
    color: "bg-purple-500",
  },
  "special-defense": {
    icon: FaEye,
    name: "Def. Especial",
    color: "bg-green-500",
  },
  speed: {
    icon: FaTachometerAlt,
    name: "Velocidad",
    color: "bg-yellow-500",
  },
} as const;

export const getStatRating = (value: number) => {
  if (value >= 150)
    return { rating: "Excelente", color: "text-green-600 dark:text-green-400" };
  if (value >= 120)
    return { rating: "Muy bueno", color: "text-blue-600 dark:text-blue-400" };
  if (value >= 90)
    return { rating: "Bueno", color: "text-yellow-600 dark:text-yellow-400" };
  if (value >= 60)
    return { rating: "Regular", color: "text-orange-600 dark:text-orange-400" };
  return { rating: "Bajo", color: "text-red-600 dark:text-red-400" };
};
