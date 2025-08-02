import Link from "next/link"

export default function HeroicSection() {
  return (
    <section className="section-hero">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Pokédex
            <span className="block text-3xl md:text-4xl font-normal mt-2 text-white/90">Gotta Catch 'Em All!</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Explora el mundo de los Pokémon con la Pokédex interactiva que he desarrollado. Descubre información detallada,
            estadísticas y curiosidades de todos tus Pokémon favoritos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/pokemon"
            className="btn-primary text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Explorar Pokédex
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 text-lg text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Saber más
          </Link>
        </div>

        <div className="flex justify-center items-center space-x-8 text-white/60 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>+1000 Pokémon</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span>Datos actualizados</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span>API oficial</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-bounce delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-white/10 rounded-full blur-xl animate-bounce delay-500"></div>
    </section>
  )
}
