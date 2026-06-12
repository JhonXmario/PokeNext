"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { Pokemon } from "@/types/pokemon-types";
import { PokemonTeam, TeamStats } from "@/types/pokemon-team-types";
import { calculateTeamStatsTotal, createEmptyTeamStats, normalizePokemonStats } from "@/lib/pokemon-stats";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

export interface TeamPokemonInput {
  pokemon: Pokemon;
  position: number;
}

export interface CreateTeamInput {
  name: string;
  description?: string;
  pokemon: TeamPokemonInput[];
  stats: TeamStats;
}

export interface UpdateTeamInput extends CreateTeamInput {
  id: string;
}

export interface TeamActionResult {
  success: boolean;
  error?: string;
  team?: PokemonTeam;
}

async function ensureAuthenticatedUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  const fullName = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim();

  await prisma.user.upsert({
    where: { id: userId },
    update: {
      name: fullName || null,
      image: clerkUser.imageUrl,
    },
    create: {
      id: userId,
      email: email ?? `${userId}@clerk.local`,
      name: fullName || null,
      image: clerkUser.imageUrl,
    },
  });

  return userId;
}

function normalizeTeamStats(stats: TeamStats): TeamStats {
  const normalizedStats = {
    hp: Number(stats.hp) || 0,
    attack: Number(stats.attack) || 0,
    defense: Number(stats.defense) || 0,
    spAtk: Number(stats.spAtk) || 0,
    spDef: Number(stats.spDef) || 0,
    speed: Number(stats.speed) || 0,
  };

  return {
    ...normalizedStats,
    total: calculateTeamStatsTotal(normalizedStats),
  };
}

function mapStatsToTeamStats(stats: {
  hp: string;
  attack: string;
  defense: string;
  spAttack: string;
  spDefense: string;
  speed: string;
}): TeamStats {
  const normalizedStats = {
    hp: Number(stats.hp) || 0,
    attack: Number(stats.attack) || 0,
    defense: Number(stats.defense) || 0,
    spAtk: Number(stats.spAttack) || 0,
    spDef: Number(stats.spDefense) || 0,
    speed: Number(stats.speed) || 0,
  };

  return {
    ...normalizedStats,
    total: calculateTeamStatsTotal(normalizedStats),
  };
}

async function createOrGetStatsRecord(pokemon: Pokemon) {
  const baseStats = normalizePokemonStats(pokemon.stats);

  return prisma.statsPokemon.upsert({
    where: { name: pokemon.name },
    update: {
      hp: String(baseStats.hp),
      attack: String(baseStats.attack),
      defense: String(baseStats.defense),
      spAttack: String(baseStats.spAtk),
      spDefense: String(baseStats.spDef),
      speed: String(baseStats.speed),
    },
    create: {
      name: pokemon.name,
      hp: String(baseStats.hp),
      attack: String(baseStats.attack),
      defense: String(baseStats.defense),
      spAttack: String(baseStats.spAtk),
      spDefense: String(baseStats.spDef),
      speed: String(baseStats.speed),
    },
  });
}

function mapTeamRecordToPokemonTeam(team: {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  pokemonSlots: Array<{
    order: number;
    pokemonName: string;
    pokemonSprite: string | null;
    PokemonTypes: string[];
    PokemonAbilities: string[];
    stats: {
      hp: string;
      attack: string;
      defense: string;
      spAttack: string;
      spDefense: string;
      speed: string;
    };
  }>;
}): PokemonTeam {
  const pokemonSlots = team.pokemonSlots
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((slot) => ({
      position: slot.order,
      pokemon: {
        id: 0,
        name: slot.pokemonName,
        sprite: slot.pokemonSprite ?? "",
        types: slot.PokemonTypes ?? [],
        abilities: slot.PokemonAbilities ?? [],
        height: 0,
        weight: 0,
        generation: 0,
        games: [],
        stats: mapStatsToTeamStats(slot.stats),
      },
    }));

  const stats = pokemonSlots.reduce<TeamStats>(
    (acc, slot) => {
      const slotStats = slot.pokemon.stats ?? createEmptyTeamStats();

      return {
        hp: acc.hp + slotStats.hp,
        attack: acc.attack + slotStats.attack,
        defense: acc.defense + slotStats.defense,
        spAtk: acc.spAtk + slotStats.spAtk,
        spDef: acc.spDef + slotStats.spDef,
        speed: acc.speed + slotStats.speed,
        total: acc.total + slotStats.total,
      };
    },
    createEmptyTeamStats(),
  );

  return {
    id: team.id,
    name: team.name,
    description: team.description ?? undefined,
    pokemon: pokemonSlots,
    stats,
    createdAt: team.createdAt,
  };
}

export async function getUserTeamsAction() {
  const userId = await ensureAuthenticatedUser();

  if (!userId) {
    return [] as PokemonTeam[];
  }

  const teams = await prisma.team.findMany({
    where: { userId },
    include: {
      pokemonSlots: {
        orderBy: { order: "asc" },
        include: {
          stats: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return teams.map((team) =>
    mapTeamRecordToPokemonTeam({
      ...team,
      pokemonSlots: team.pokemonSlots.map((slot) => ({
        order: slot.order,
        pokemonName: slot.pokemonName,
        pokemonSprite: slot.pokemonSprite,
        PokemonTypes: slot.PokemonTypes,
        PokemonAbilities: slot.PokemonAbilities,
        stats: {
          hp: slot.stats.hp,
          attack: slot.stats.attack,
          defense: slot.stats.defense,
          spAttack: slot.stats.spAttack,
          spDefense: slot.stats.spDefense,
          speed: slot.stats.speed,
        },
      })),
    }),
  );
}

export async function createTeamAction(input: CreateTeamInput): Promise<TeamActionResult> {
  const userId = await ensureAuthenticatedUser();

  if (!userId) {
    return { success: false, error: "Debes iniciar sesión para crear equipos." };
  }

  const trimmedName = input.name.trim();

  if (!trimmedName) {
    return { success: false, error: "Ingresa un nombre para tu equipo." };
  }

  if (input.pokemon.length !== 6) {
    return { success: false, error: "Tu equipo debe tener 6 Pokémon." };
  }

  const seenPokemons = new Set<string>();
  for (const slot of input.pokemon) {
    if (!slot?.pokemon?.name) {
      return { success: false, error: "Hay un slot vacío en tu equipo." };
    }

    const key = `${slot.pokemon.name}-${slot.position}`;
    if (seenPokemons.has(key)) {
      return { success: false, error: "No puedes repetir el mismo Pokémon en el equipo." };
    }
    seenPokemons.add(key);
  }

  try {
    const normalizedStats = normalizeTeamStats(input.stats);
    const createdTeam = await prisma.team.create({
      data: {
        name: trimmedName,
        description: input.description?.trim() || null,
        userId,
        pokemonSlots: {
          create: await Promise.all(
            input.pokemon
              .slice()
              .sort((a, b) => a.position - b.position)
              .map(async (slot) => {
                const statsRecord = await createOrGetStatsRecord(slot.pokemon);

                return {
                  order: slot.position,
                  pokemonId: statsRecord.id,
                  pokemonName: slot.pokemon.name,
                  pokemonSprite: slot.pokemon.sprite ?? null,
                  PokemonTypes: slot.pokemon.types ?? [],
                  PokemonAbilities: slot.pokemon.abilities ?? [],
                };
              }),
          ),
        },
      },
      include: {
        pokemonSlots: {
          orderBy: { order: "asc" },
          include: { stats: true },
        },
      },
    });

    revalidatePath("/teams");

    return {
      success: true,
      team: mapTeamRecordToPokemonTeam({
        ...createdTeam,
        pokemonSlots: createdTeam.pokemonSlots.map((slot) => ({
          order: slot.order,
          pokemonName: slot.pokemonName,
          pokemonSprite: slot.pokemonSprite,
          PokemonTypes: slot.PokemonTypes,
          PokemonAbilities: slot.PokemonAbilities,
          stats: {
            hp: slot.stats.hp,
            attack: slot.stats.attack,
            defense: slot.stats.defense,
            spAttack: slot.stats.spAttack,
            spDefense: slot.stats.spDefense,
            speed: slot.stats.speed,
          },
        })),
      }),
    };
  } catch (error) {
    console.error("Error al crear el equipo:", error);
    return { success: false, error: "No se pudo crear el equipo. Inténtalo de nuevo." };
  }
}

export async function updateTeamAction(input: UpdateTeamInput): Promise<TeamActionResult> {
  const userId = await ensureAuthenticatedUser();

  if (!userId) {
    return { success: false, error: "Debes iniciar sesión para editar equipos." };
  }

  const trimmedName = input.name.trim();

  if (!trimmedName) {
    return { success: false, error: "Ingresa un nombre para tu equipo." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.teamPokemon.deleteMany({ where: { teamId: input.id } });
      await tx.team.update({
        where: { id: input.id, userId },
        data: {
          name: trimmedName,
          description: input.description?.trim() || null,
        },
      });

      for (const slot of input.pokemon.slice().sort((a, b) => a.position - b.position)) {
        const statsRecord = await createOrGetStatsRecord(slot.pokemon);

        await tx.teamPokemon.create({
          data: {
            teamId: input.id,
            order: slot.position,
            pokemonId: statsRecord.id,
            pokemonName: slot.pokemon.name,
            pokemonSprite: slot.pokemon.sprite ?? null,
            PokemonTypes: slot.pokemon.types ?? [],
            PokemonAbilities: slot.pokemon.abilities ?? [],
          },
        });
      }
    });

    revalidatePath("/teams");

    const updatedTeam = await prisma.team.findUnique({
      where: { id: input.id },
      include: {
        pokemonSlots: {
          orderBy: { order: "asc" },
          include: { stats: true },
        },
      },
    });

    if (!updatedTeam) {
      return { success: false, error: "No se encontró el equipo actualizado." };
    }

    return {
      success: true,
      team: mapTeamRecordToPokemonTeam({
        ...updatedTeam,
        pokemonSlots: updatedTeam.pokemonSlots.map((slot) => ({
          order: slot.order,
          pokemonName: slot.pokemonName,
          pokemonSprite: slot.pokemonSprite,
          PokemonTypes: slot.PokemonTypes,
          PokemonAbilities: slot.PokemonAbilities,
          stats: {
            hp: slot.stats.hp,
            attack: slot.stats.attack,
            defense: slot.stats.defense,
            spAttack: slot.stats.spAttack,
            spDefense: slot.stats.spDefense,
            speed: slot.stats.speed,
          },
        })),
      }),
    };
  } catch (error) {
    console.error("Error al actualizar el equipo:", error);
    return { success: false, error: "No se pudo actualizar el equipo. Inténtalo de nuevo." };
  }
}

export async function deleteTeamAction(teamId: string): Promise<TeamActionResult> {
  const userId = await ensureAuthenticatedUser();

  if (!userId) {
    return { success: false, error: "Debes iniciar sesión para eliminar equipos." };
  }

  try {
    await prisma.team.delete({
      where: { id: teamId, userId },
    });

    revalidatePath("/teams");
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el equipo:", error);
    return { success: false, error: "No se pudo eliminar el equipo." };
  }
}
