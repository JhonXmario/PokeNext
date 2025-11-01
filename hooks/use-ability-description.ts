import { useState, useEffect } from "react";

interface AbilityApiResponse {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
  }>;
}

interface UseAbilityDescriptionResult {
  description: string | null;
  isLoading: boolean;
}

/**
 * Hook para obtener la descripción de una habilidad desde su URL.
 * Prioriza la descripción en español ('es'), y recurre al inglés ('en').
 * @param url La URL de la habilidad de PokeAPI.
 */
export const useAbilityDescription = (
  url: string
): UseAbilityDescriptionResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setDescription("URL de habilidad no disponible.");
      setIsLoading(false);
      return;
    }

    const fetchAbilityDescription = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error("No se pudo obtener la habilidad.");

        const data: AbilityApiResponse = await response.json();

        // 1. Buscar descripción en Español ('es')
        let desc = data.flavor_text_entries.find(
          (txt) => txt.language.name === "es"
        )?.flavor_text;

        // 2. Si no hay en español, buscar en Inglés ('en')
        if (!desc) {
          desc = data.flavor_text_entries.find(
            (txt) => txt.language.name === "en"
          )?.flavor_text;
        }

        // Limpiar el texto: Eliminar saltos de línea y espacios extra
        const cleanedDesc = desc
          ? desc
              .replace(/(\n|\f|\r)/g, " ")
              .replace(/\s+/g, " ")
              .trim()
          : "Descripción no disponible.";

        setDescription(cleanedDesc);
      } catch (error) {
        console.error("Error al cargar descripción de habilidad:", error);
        setDescription("Error al cargar la descripción.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbilityDescription();
  }, [url]);

  return { description, isLoading };
};
