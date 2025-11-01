export function HeroicSection() {
  return (
    <section className="bg-gradient-to-r from-pink-500 to-blue-500 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Sobre PokéNext
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Una Pokédex moderna y completa que combina la diversión de los Pokémon
          con las últimas tecnologías web para ofrecerte la mejor experiencia
          posible.
        </p>
        <div className="flex justify-center items-center space-x-8 text-white/70 text-sm mt-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>Proyecto Open Source</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span>Desarrollado con ❤️</span>
          </div>
        </div>
      </div>
    </section>
  );
}
