# PokéNext | Pokédex Application

PokéNext es una aplicación web moderna construida con **Next.js 14** y **TypeScript** para explorar y analizar datos de Pokémon. Integra la **PokéAPI** pública para ofrecer detalles completos de todos los Pokémon a través de generaciones (I-IX), con una interfaz responsiva y mobile-first.

El proyecto está desplegado en producción, con base de datos en la nube, autenticación real y un pipeline de CI/CD que corre lint, build y pruebas automatizadas en cada PR.

---

## Demo

🔗 **[Ver aplicación en vivo](https://pokenextjs-gilt.vercel.app/)**

---

## Key Features

* **Complete Catalog:** Explora más de 1,000 Pokémon con carga progresiva.
* **Advanced Filters:** Combina filtros por generación (I-IX), tipo, juego asociado y búsqueda por texto.
* **Detailed Stats & Evolutions:** Gráficos visuales de estadísticas, características físicas y cadenas de evolución.
* **Authentication:** Login y gestión de usuarios con Clerk.
* **Dark Mode:** Soporte nativo de modo claro/oscuro respetando las preferencias del sistema.
* **Responsive Design:** Diseño mobile-first construido con Tailwind CSS v4 y shadcn/ui.

## Tech Stack

### Frontend

* Next.js 14+ (App Router)
* TypeScript
* Tailwind CSS v4
* shadcn/ui

### Backend & Data

* PostgreSQL
* Prisma ORM 7 (con `@prisma/adapter-pg`)
* Clerk (autenticación)
* Hono *(explorando su uso como capa de API)*

### Testing & Quality

* Playwright — pruebas end-to-end
* ESLint

### CI/CD

* GitHub Actions — corre lint, build y pruebas de Playwright automáticamente en cada push y pull request.

## Getting Started

### Prerequisites

* Node.js 18+
* pnpm o npm
* Una base de datos PostgreSQL (recomendado: [Neon](https://neon.tech))
* Cuenta de [Clerk](https://clerk.com) para autenticación

### Installation

Clona el repositorio:

```bash
git clone https://github.com/JhonXmario/PokeNext.git
cd PokeNext
```

Instala las dependencias:

```bash
pnpm install
# o
npm install
```

Configura las variables de entorno (crea un archivo `.env` basado en `.env.example`):

```bash
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

Ejecuta el servidor de desarrollo:

```bash
pnpm dev
# o
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

### Running Tests

```bash
pnpm exec playwright test
```

## Roadmap / Future Work

* [ ] Herramienta de comparación lado a lado entre Pokémon.
* [✔️] Lista de Pokémon favoritos por usuario.
* [ ] Acceso offline con mejoras de caché local.
* [ ] Ampliar cobertura de pruebas end-to-end.

---

Desarrollado por **Jhon Diaz** — TSU en Informática.

[LinkedIn](www.linkedin.com/in/jhon-díaz-02a811311) · [GitHub](https://github.com/JhonXmario)
