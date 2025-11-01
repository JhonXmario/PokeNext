# PokéNext - Documentación

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Propósito y Visión](#propósito-y-visión)
3. [Características Principales](#características-principales)
4. [Público Objetivo](#público-objetivo)
5. [Requisitos Previos](#requisitos-previos)
6. [Instalación y Configuración](#instalación-y-configuración)
7. [Guía de Uso](#guía-de-uso)
8. [Tecnologías Implementadas](#tecnologías-implementadas)
9. [API y Servicios](#api-y-servicios)
10. [Componentes Principales](#componentes-principales)
11. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introducción

**PokéNext** es una aplicación web moderna y de alto rendimiento construida con **Next.js 14** que proporciona una experiencia interactiva completa para explorar y consultar información detallada sobre Pokémon. La aplicación integra la API pública de PokéAPI para acceder a datos actualizados sobre todas las generaciones de Pokémon, desde la Generación I (Kanto) hasta la Generación IX (Paldea).

La plataforma está diseñada con un enfoque mobile-first, asegurando una experiencia óptima en todos los dispositivos, desde smartphones hasta computadoras de escritorio. Implementa tecnologías modernas de desarrollo frontend como React 18, TypeScript, Tailwind CSS v4 y componentes reutilizables de shadcn/ui.

---

## Propósito y Visión

### Propósito Principal

PokéNext tiene como objetivo proporcionar a entusiastas de Pokémon, desarrolladores y jugadores una plataforma accesible, intuitiva y visualmente atractiva para:

- **Explorar la Base de Datos Completa**: Acceder a información sobre más de 1,000 Pokémon catalogados
- **Obtener Datos Detallados**: Consultar estadísticas, habilidades, tipos, evoluciones y otra información específica de cada Pokémon
- **Analizar Estadísticas**: Visualizar gráficamente las estadísticas base de cada Pokémon para facilitar comparaciones
- **Filtrar y Buscar Eficientemente**: Localizar rápidamente Pokémon por generación, tipo, juego asociado u otros criterios

### Visión a Largo Plazo

Convertir PokéNext en una de las referencias estándar para consultas rápidas sobre Pokémon, con posibles expansiones futuras que incluyan:

- Comparativas de Pokémon lado a lado
- Sistemas de puntuación y clasificación
- Comunidades y funcionalidades de usuarios
- Integración con redes sociales
- Aplicaciones móviles nativas

---

## Características Principales

### 1. **Listado Completo de Pokémon**

- Visualización de más de 1,000 Pokémon en un catálogo interactivo
- Cartas de Pokémon con información esencial (ID, nombre, tipos, sprite)
- Carga progresiva y optimizada de datos
- Interfaz responsive que se adapta a todos los tamaños de pantalla

### 2. **Página de Detalles Completa**

Cada Pokémon tiene una página dedicada que incluye:

- **Sección de Imagen**: Visualización de sprites officialescon alternativas de diferentes generaciones
- **Datos Físicos**: Altura, peso y otras características morfológicas
- **Estadísticas Base**: Visualización en gráficos de PS, Ataque, Defensa, At. Especial, Def. Especial y Velocidad
- **Información de Tipos**: Clasificación de tipos con indicadores visuales por color
- **Habilidades**: Listado completo de habilidades con descripciones
- **Cadena Evolutiva**: Representación visual de las evoluciones con imágenes y nombres

### 3. **Sistema de Filtrado Avanzado**

- Filtrar por **generación** (9 generaciones disponibles)
- Filtrar por **tipo** (18 tipos diferentes)
- Filtrar por **juego** (13 títulos principales)
- Búsqueda de texto libre por nombre
- Combinación de múltiples filtros simultáneamente

### 4. **Paginación Inteligente**

- Navegación eficiente a través del catálogo completo
- Soporte para diferentes cantidades de elementos por página
- Indicadores de posición actual en el catálogo
- Acceso rápido a páginas específicas

### 5. **Modo Oscuro Nativo**

- Soporte completo para tema claro y oscuro
- Respeta las preferencias del sistema operativo
- Colores optimizados para reducir fatiga visual

### 6. **Información sobre la Aplicación**

- Sección "Saber mas" con propósito, características y tecnologías
- Documentación inline sobre beneficios para diferentes audiencias
- Enlaces a recursos externos y referencias técnicas

---

## Público Objetivo

### Usuarios Primarios

1. **Entusiastas de Pokémon**
   - Jugadores activos de títulos Pokémon
   - Fans de cualquier edad interesados en el universo Pokémon

2. **Jugadores Competitivos**
   - Jugadores de Pokémon Competitive
   - Analistas de metagame
   - Personas que necesitan comparar estadísticas para estrategias

3. **Desarrolladores**
   - Desarrolladores de bots y aplicaciones relacionadas con Pokémon
   - Estudiantes de desarrollo web que desean aprender Next.js
   - Investigadores de datos del universo Pokémon

### Usuarios Secundarios

4.**Educadores**

- Docentes que utilizan Pokémon como herramienta didáctica
- Instructores de programación usando la app como ejemplo

5.**Streamers y Content Creators**

- Creadores de contenido sobre Pokémon
- Streamers que necesitan referencias rápidas

---

### Stack Tecnológico

| Categoría | Tecnología | Versión | Propósito |
|-----------|-----------|---------|----------|
| **Framework Frontend** | React | 18.2.0 | Renderización de UI y componentes |
| **Meta-Framework** | Next.js | 14.2.5 | Enrutamiento, SSR, optimizaciones |
| **Lenguaje** | TypeScript | 5.x | Type-safety y mejor DX |
| **CSS Framework** | Tailwind CSS | 4.1.11 | Estilos utilities y responsive design |
| **UI Components** | shadcn/ui | Latest | Componentes accesibles pre-construidos |
| **Iconografía** | React Icons + Heroicons | 5.5.0 / 2.2.0 | Iconos SVG reutilizables |
| **Backend Ligero (Sin uso por el momento)** | Hono | 4.8.9 | Middleware y rutas del servidor |
| **Procesamiento CSS** | PostCSS | 8.5.6 | Procesamiento y prefijos automáticos |

---

## Requisitos Previos

### Para Usuarios

- **Navegador moderno** (Chrome, Firefox, Safari, Edge de última versión)
- **Conexión a Internet** activa (para acceder a PokéAPI)
- **JavaScript habilitado** en el navegador

### Para Desarrolladores

- **Node.js** versión 16.x o superior
- **npm** o **pnpm** como gestor de paquetes
- **Git** para clonar el repositorio
- **Editor de código** (VSCode recomendado)
- **Conocimientos básicos de**:
  - React y JSX
  - Next.js
  - TypeScript
  - Tailwind CSS

---

## Instalación y Configuración

### Paso 1: Clonar el Repositorio

\`\`\`bash
git clone <repository-url>
cd repository-name
\`\`\`

### Paso 2: Instalar Dependencias

Con **npm**:
\`\`\`bash
npm install
\`\`\`

Con **pnpm** (recomendado para mejor rendimiento):
\`\`\`bash
pnpm install
\`\`\`

### Paso 3: Ejecutar en Desarrollo

\`\`\`bash
npm run dev

O

pnpm dev
\`\`\`

La aplicación estará disponible en `http://localhost:3000`

### Paso 4: Construcción para Producción

\`\`\`bash
npm run build
npm run start
\`\`\`

### Verificación de Instalación

Para verificar que todo está correctamente configurado:

1. Navega a `http://localhost:3000`
2. Deberías ver la página de inicio con el logo y navegación
3. Haz clic en "Pokémon" para acceder al listado
4. Verifica que se cargan los datos desde PokéAPI

---

## Guía de Uso

### Para Usuarios Finales

#### 1. Explorar el Catálogo

1. **Acceder a la lista de Pokémon**:
   - Haz clic en el botón "Pokédex" en la navegación
   - Espera a que se carguen los datos (máximo 10-15 segundos en la primera carga)

2. **Navegar entre páginas**:
   - Usa los botones de paginación en la parte inferior
   - Salta directamente a un número de página específico

3. **Buscar un Pokémon**:
   - Escribe el nombre en el campo de búsqueda

#### 2. Filtrar por Criterios

- **Por Generación**: Selecciona una generación (I-IX) del dropdown
- **Por Tipo**: Elige un tipo (Normal, Fuego, Agua, etc.)
- **Por Juego**: Filtra por títulos específicos (Rojo/Azul, Sol/Luna, etc.)

#### 3. Ver Detalles de un Pokémon

1. Haz clic en cualquier tarjeta de Pokémon
2. Accederás a una página con:
   - Galería de imágenes y sprites
   - Estadísticas visuales
   - Descripción de tipos y habilidades
   - Cadena de evolución completa

3. Usa el botón "Regresar" para regresar al listado

### Para Desarrolladores

#### 1. Estructurar Nuevas Páginas

\`\`\`typescript
// app/mi-ruta/page.tsx
import Navbar from "@/components/ui/principal/Navbar";
import FooterSection from "@/components/ui/principal/FooterSection";

export default function MiPagina() {
  return (
    <div>
      <Navbar />
      {/*Tu contenido aquí*/}
      <FooterSection />
    </div>
  );
}
\`\`\`

#### 2. Crear Componentes Reutilizables

\`\`\`typescript
// components/[carpeta_destinada_al_tipo_de_componente]/MiComponente.tsx

interface MiComponenteProps {
  className?: string;
  children: React.ReactNode;
}

export default function MiComponente({
  className,
  children
}: MiComponenteProps) {
  return (
    <div className="p-4 rounded-lg", className>
      {children}
    </div>
  );
}
\`\`\`

#### 3. Consumir la API de Pokémon

\`\`\`typescript
// services/mi-servicio.ts
import { getPokemon, getEnhancedPokemons } from "@/services/poke-api";

// Obtener un Pokémon específico
const pokemon = await getPokemon("pikachu");

// Obtener lista mejorada
const pokemons = await getEnhancedPokemons(20, 0); // limit=20, offset=0
\`\`\`

---

## Tecnologías Implementadas

### Frontend Framework

**React 18.2.0*

- Virtual DOM para renderización eficiente
- Hooks para manejo de estado y efectos
- Server Components en combinación con Client Components

**Next.js 14.2.5*

- App Router para enrutamiento moderno
- Server-Side Rendering (SSR) para SEO
- Static Generation donde es posible
- Optimización de imágenes automática
- API Routes para el backend ligero

**TypeScript 5.x*

- Type safety completo
- Interfaces y tipos personalizados
- Mejor experiencia de desarrollo con autocompletado
- Detección temprana de errores

### Estilos y UI

**Tailwind CSS 4.1.11*

- Utilidades CSS first
- Responsive design con prefijos (sm:, md:, lg:)
- Dark mode nativo
- Temas personalizables
- Sistema de colores consistente

### Iconografía

**React Icons 5.5.0** + **Heroicons 2.2.0**

- Miles de iconos disponibles
- Componentes React reutilizables
- Tamaños escalables
- Soporte para temas

### Utilidades

**Hono 4.8.9*

- Lightweight web framework
- Middleware para route handlers
- Performance optimizado

**PostCSS 8.5.6*

- Processamiento de CSS
- Prefijos automáticos
- Soporte para nuevas características CSS

---

## API y Servicios

### PokéAPI Integration

#### Endpoints Utilizados

1. **GET /pokemon**
   - **Descripción**: Obtiene listado paginado de Pokémon
   - **Parámetros**: `limit` (cantidad), `offset` (posición)
   - **Respuesta**: Lista de Pokémon con URLs para más detalles

2. **GET /pokemon/{id|name}**
   - **Descripción**: Obtiene datos detallados de un Pokémon específico
   - **Parámetros**: ID numérico o nombre
   - **Respuesta**: Estadísticas, sprites, tipos, habilidades

3. **GET /pokemon-species/{id|name}**
   - **Descripción**: Obtiene información de la especie
   - **Parámetros**: ID o nombre
   - **Respuesta**: Descripción, ciclo de vida, cadena evolutiva

4. **GET /evolution-chain/{id}**
   - **Descripción**: Obtiene la cadena evolutiva completa
   - **Parámetros**: ID de la cadena
   - **Respuesta**: Árbol de evoluciones con condiciones

### Reintentos y Manejo de Errores

- **Política de Reintentos**: 3 intentos por Pokémon en caso de fallo
- **Fallback**: Imágenes placeholder cuando no hay sprite disponible
- **Logging**: Errores registrados en consola para debugging

---

## Componentes Principales

### Layout Components

#### `Navbar`

- Navegación principal con links a secciones
- Toggle de tema claro/oscuro
- Logo de la aplicación
- Responsive en mobile

#### `HeroSection`

- Bienvenida y contexto de la aplicación
- CTA (Call-To-Action) al catálogo

#### `FooterSection`

- Enlaces útiles
- Información de copyright
- Créditos a PokéAPI

### Componentes de Listado

#### `PokemonList`

- Gestor principal del catálogo
- Integración con filtros y paginación
- Renderización de tarjetas

#### `PokemonCard`

- Visualización individual de cada Pokémon
- Imagen, nombre, tipos, ID
- Link a página de detalles

#### `PokemonFilter`

- UI para seleccionar criterios de filtrado
- Dropdowns para generación, tipo, juego
- Campo de búsqueda por nombre

#### `Pagination`

- Navegación entre páginas
- Indicador de página actual
- Botones prev/next

### Componentes de Detalles

#### `DataPokemon`

- Layout principal de la página de detalles
- Orquesta todos los sub-componentes

#### `ImageCard`

- Galería de sprites
- Imagen oficial en alta resolución
- Alternativas de diferentes formas

#### `StatisticsCard`

- Gráfico de barras para estadísticas
- Puntuaciones de rating
- Comparativa visual

#### `DescriptionCard`

- Información de tipos y colores
- Listado de habilidades
- Características físicas

#### `EvolutiveChainCard`

- Visualización de la cadena evolutiva
- Imágenes y nombres de evoluciones
- Métodos de evolución

---

## Preguntas Frecuentes

### General

**P: ¿PokéNext es una aplicación oficial de Pokémon?**
R: No, PokéNext es una aplicación fan-made no oficial que utiliza PokéAPI, una API pública de datos sobre Pokémon. Respeta todos los términos de servicio de Pokémon Company.

**P: ¿Hay algún costo para usar PokéNext?**
R: No, PokéNext es completamente gratuita y siempre lo será.

**P: ¿Dónde se alojan mis datos?**
R: Los datos se cargan desde PokéAPI (servidores públicos) y se almacenan temporalmente en tu navegador. No almacenamos información personal.

### Técnico

**P: ¿Por qué Next.js en lugar de Create React App?**
R: Next.js ofrece:

- Server-Side Rendering para mejor SEO
- Rendimiento optimizado automáticamente
- API Routes integradas
- Mejor experiencia de desarrollo

**P: ¿Cómo funciona el filtrado?**
R: El filtrado se realiza en el cliente usando combinaciones de:

- Tipos (18 tipos Pokémon)
- Generaciones (9 generaciones)
- Juegos (13 títulos)
- Búsqueda de texto por nombre

**P: ¿Qué sucede si la API de Pokémon cae?**
R: La aplicación mostrará un mensaje amable indicando que no puede cargar datos. Se implementan reintentos automáticos (3 intentos).

### Desarrollo

**P: ¿Puedo contribuir al proyecto?**
R: Sí, si el repositorio es público. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

**P: ¿Cómo agrego un nuevo componente?**
R:

1. Crea el archivo en la carpeta apropiada (`components/nombre/Nombre.tsx`)
2. Define las props con TypeScript
3. Aplica Tailwind CSS para estilos
4. Exporta desde `index.ts` si es necesario

**P: ¿Cómo creo una nueva página?**
R:

1. Crea una carpeta en `app/mi-ruta/`
2. Dentro, crea `page.tsx`
3. Define el componente (puede ser async)
4. Importa Navbar y FooterSection
5. Navega usando el componente Link de Next.js

### Performance

**P: ¿Por qué tarda en cargar la primera vez?**
R: En la primera carga, se descargan datos de 1,025 Pokémon desde PokéAPI. Esto toma 5-15 segundos según conexión de red. Las cargas posteriores son más rápidas gracias al caché del navegador.

**P: ¿Funciona offline?**
R: No, requiere conexión a Internet para acceder a PokéAPI. El caché del navegador almacena algunos datos localmente.

---

## Soporte y Contacto

### Reportar Bugs

Si encuentras un bug, por favor:

1. Verifica que no esté reportado en Issues
2. Proporciona pasos para reproducir
3. Incluye versión del navegador
4. Captura de pantalla si es visual

### Solicitar Features

Para solicitar nuevas características:

1. Abre una Issue con etiqueta `enhancement`
2. Describe el caso de uso
3. Explica los beneficios esperados

### Contacto Directo

- **Email**: [jhond2648@gmail.com]

---

**Créditos**:

- Datos de Pokémon: [PokéAPI](https://pokeapi.co)
- Imágenes: [Pokémon Official Artwork]
- Componentes UI: [shadcn/ui](https://ui.shadcn.com)

---

## Conclusión

PokéNext representa una aplicación moderna y profesional que demuestra las mejores prácticas en desarrollo web contemporáneo. Combina tecnologías de punta (Next.js 14, React 18, TypeScript, Tailwind CSS v4) con una interfaz intuitiva y accesible para usuarios de todas las edades.

Ya sea que seas un entusiasta de Pokémon, un desarrollador buscando aprender, o simplemente alguien explorando la web moderna, PokéNext ofrece una experiencia memorable y educativa.

**Desarrollado con ❤️ para la comunidad Pokémon*

---

*Versión de documentación: 1.0*  
*Última actualización: Noviembre 2025*  
*Para comentarios o sugerencias, por favor abre una Issue en el repositorio.*
