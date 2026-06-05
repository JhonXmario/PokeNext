-- AlterTable
ALTER TABLE "favorites" ADD COLUMN     "pokemon_abilities" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "pokemon_height" DOUBLE PRECISION,
ADD COLUMN     "pokemon_weight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "team_pokemons" ADD COLUMN     "pokemon_types" TEXT[] DEFAULT ARRAY[]::TEXT[];
