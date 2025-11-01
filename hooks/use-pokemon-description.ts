import { PokemonSpecies } from "@/types/pokemon-details-types";

export const usePokemonDescription = (species: PokemonSpecies | null) => {
  const getDescription = () => {
    if (!species) return "Descripción no disponible";

    const spanishEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === "es"
    );
    const englishEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );

    const description =
      spanishEntry?.flavor_text ||
      englishEntry?.flavor_text ||
      "Descripción no disponible";
    return description.replace(/\f/g, " ").replace(/\n/g, " ");
  };

  const getGenus = () => {
    if (!species) return "Pokémon";

    const spanishGenus = species.genera.find(
      (genus) => genus.language.name === "es"
    );
    const englishGenus = species.genera.find(
      (genus) => genus.language.name === "en"
    );

    return spanishGenus?.genus || englishGenus?.genus || "Pokémon";
  };

  return {
    description: getDescription(),
    genus: getGenus(),
  };
};
