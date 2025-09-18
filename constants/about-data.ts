import { FaRocket, FaDatabase, FaMobile, FaSearch } from "react-icons/fa";

const icons = [FaRocket, FaDatabase, FaMobile, FaSearch].map(
  (icon) => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>
);

const [Rocket, Database, Mobile, Search] = icons;

export const features = [
  {
    icon: Search,
    title: "Búsqueda Avanzada",
    description:
      "Encuentra cualquier Pokémon por nombre, tipo o generación con el sistema de filtros.",
  },
  {
    icon: Database,
    title: "Datos Oficiales",
    description:
      "Información actualizada directamente de la PokéAPI oficial con estadísticas, habilidades y evoluciones.",
  },
  {
    icon: Mobile,
    title: "Diseño Responsivo",
    description:
      "Experiencia optimizada para todos los dispositivos, desde móviles hasta pantallas de escritorio.",
  },
  {
    icon: Rocket,
    title: "Rendimiento Óptimo",
    description:
      "Construido con Next.js para una navegación rápida y fluida.",
  },
];

export const technologies = [
  {
    name: "Next.js 15",
    description: "Framework React para aplicaciones web modernas",
  },
  {
    name: "TypeScript",
    description: "Tipado estático para mayor robustez del código",
  },
  {
    name: "Tailwind CSS",
    description: "Framework CSS utilitario para diseño responsivo",
  },
  {
    name: "PokéAPI",
    description: "API oficial con datos completos de Pokémon",
  },
  {
    name: "React Icons",
    description: "Biblioteca de iconos para una interfaz intuitiva",
  },
];
