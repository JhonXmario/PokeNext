import { technologies } from "@/constants/about-data";

export function Technologies() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Tecnologías Utilizadas
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            PokéNext está construido con las mejores herramientas y frameworks
            del ecosistema web moderno
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {tech.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
