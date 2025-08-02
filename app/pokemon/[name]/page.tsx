import { getPokemon } from "@/services/pokeapi";
import ButtonBack from "@/components/ui/ButtonBackToList";
type Props = {
  params: { name: string }
}

export default async function PokemonDetail({ params }: Props) {
  const data = await getPokemon(params.name)
  if (!data) return <div>No encontrado</div>

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.sprite.front_default} alt={data.name} width={120} />
      <p>Peso: {data.weight}</p>
      <p>Altura: {data.height}</p>
      <p>Tipos: {data.types}</p>
      <p>Habilidades: {data.habilities}</p>
      {/* Aquí va el botón para marcar como favorito que hare despues*/}
      <form action={`/api/favoritos`} method="POST">
        <input type="hidden" name="pokemon" value={data.name} />
        <button type="submit">Agregar a favoritos</button>
      </form>
      <ButtonBack />
    </div>
  )
}
