-- AlterTable
ALTER TABLE "team_pokemons" ADD COLUMN     "pokemon_abilities" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "pokemon_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "stats_pokemon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "attack" TEXT NOT NULL,
    "defense" TEXT NOT NULL,
    "sp_attack" TEXT NOT NULL,
    "sp_defense" TEXT NOT NULL,
    "speed" TEXT NOT NULL,

    CONSTRAINT "stats_pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stats_pokemon_name_key" ON "stats_pokemon"("name");

-- AddForeignKey
ALTER TABLE "team_pokemons" ADD CONSTRAINT "team_pokemons_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "stats_pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
