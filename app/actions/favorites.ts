"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

interface ToggleFavoriteInput {
  id: number;
  name: string;
  sprite: string | null;
  types: string[];
  abilities: string[];
  weight: number | null;
  height: number | null;
}

export async function toggleFavoriteAction(pokemon: ToggleFavoriteInput) {
  // Verificar autenticación desde el servidor
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "No autenticado" };
  }

  try {
    // Sincronizar el usuario con la Base de Datos (Upsert)
    // Obtenemos los datos extendidos de Clerk para rellenar la tabla User
    const clerkUser = await currentUser();
    if (!clerkUser)
      return { success: false, error: "Usuario no encontrado en Clerk" };

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const fullName =
      `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim();

    await prisma.user.upsert({
      where: { id: userId },
      update: {
        name: fullName || null,
        image: clerkUser.imageUrl,
      },
      create: {
        id: userId,
        email: email,
        name: fullName || null,
        image: clerkUser.imageUrl,
      },
    });

    // 3. Verificar si el Pokémon ya está en favoritos (Llave primaria compuesta)
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_pokemonId: {
          userId: userId,
          pokemonId: pokemon.id,
        },
      },
    });

    if (existingFavorite) {
      // Si ya existe, lo removemos (Unfavorite)
      await prisma.favorite.delete({
        where: {
          userId_pokemonId: {
            userId: userId,
            pokemonId: pokemon.id,
          },
        },
      });

      // Purga la caché de Next.js para actualizar la interfaz inmediatamente
      revalidatePath("/");
      return { success: true, isFavorite: false };
    } else {
      // Si no existe, lo creamos (Favorite)
      await prisma.favorite.create({
        data: {
          userId: userId,
          pokemonId: pokemon.id,
          pokemonName: pokemon.name,
          pokemonSprite: pokemon.sprite,
          pokemonTypes: pokemon.types,
          pokemonAbilities: pokemon.abilities,
          pokemonWeight: pokemon.weight,
          pokemonHeight: pokemon.height,
        },
      });

      revalidatePath("/");
      return { success: true, isFavorite: true };
    }
  } catch (error) {
    console.error("Error en toggleFavoriteAction:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}

export async function getUserFavorites(userId: string) {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      orderBy: { pokemonId: "asc" },
    });

    return favorites.map(
      ({
        pokemonTypes,
        pokemonId,
        pokemonName,
        pokemonSprite,
        pokemonAbilities,
        pokemonHeight,
        pokemonWeight,
      }) => ({
        id: pokemonId,
        name: pokemonName,
        sprite: pokemonSprite,
        types: pokemonTypes,
        abilities: pokemonAbilities,
        height: pokemonHeight,
        weight: pokemonWeight,
      }),
    );
  } catch (error) {
    console.error("Error al obtener favoritos del usuario:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}
