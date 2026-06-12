import type { Pokemon } from "@/types/pokemon-types";
import type { PokemonStatEntry, TeamStats } from "@/types/pokemon-team-types";

type TeamStatsSummary = Omit<TeamStats, "total">;

type StatKey = keyof TeamStatsSummary;

function toNumber(value: unknown): number {
  const parsedValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function createEmptyTeamStats(): TeamStats {
  return {
    hp: 0,
    attack: 0,
    defense: 0,
    spAtk: 0,
    spDef: 0,
    speed: 0,
    total: 0,
  };
}

export function calculateTeamStatsTotal(stats: TeamStatsSummary): number {
  return (
    stats.hp +
    stats.attack +
    stats.defense +
    stats.spAtk +
    stats.spDef +
    stats.speed
  );
}

function mapStatNameToKey(statName: string): StatKey | null {
  const normalizedName = statName.toLowerCase();

  switch (normalizedName) {
    case "hp":
      return "hp";
    case "attack":
      return "attack";
    case "defense":
      return "defense";
    case "special-attack":
    case "sp-attack":
    case "spatk":
    case "sp atk":
    case "special attack":
      return "spAtk";
    case "special-defense":
    case "sp-defense":
    case "spdef":
    case "sp def":
    case "special defense":
      return "spDef";
    case "speed":
      return "speed";
    default:
      return null;
  }
}

export function normalizePokemonStats(
  stats: Pokemon["stats"] | TeamStats | null | undefined,
): TeamStats {
  if (!stats) {
    return createEmptyTeamStats();
  }

  if (Array.isArray(stats)) {
    const summary = createEmptyTeamStats();

    for (const entry of stats as PokemonStatEntry[]) {
      const key = mapStatNameToKey(entry.stat?.name ?? entry.name ?? "");
      if (!key) {
        continue;
      }

      summary[key] = toNumber(entry.value ?? entry.base_stat ?? 0);
    }

    return {
      ...summary,
      total: calculateTeamStatsTotal(summary),
    };
  }

  const numericStats: TeamStatsSummary = {
    hp: toNumber(stats.hp),
    attack: toNumber(stats.attack),
    defense: toNumber(stats.defense),
    spAtk: toNumber(stats.spAtk),
    spDef: toNumber(stats.spDef),
    speed: toNumber(stats.speed),
  };

  return {
    ...numericStats,
    total: calculateTeamStatsTotal(numericStats),
  };
}
