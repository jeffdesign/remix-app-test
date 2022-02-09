import { LoaderFunction, useLoaderData } from "remix"
import styles from "~/routes/pokemon/style.css"
interface Pokemon {
  id: string
  name: string
  img: {
    url: string
  }
}

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async ({ params }): Promise<Pokemon> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${params.name}`
  const json = await fetch(url)

  if (!json.ok) {
    throw new Response("Not Found", { status: 404 })
  } else {
    const data = await json.json()
    return {
      id: data.id,
      name: data.name,
      img: {
        url: data.sprites.front_default,
      },
    }
  }
}

export default function Name() {
  const pokemon: Pokemon = useLoaderData()
  return (
    <div>
      <div className="card">
        <img className="img" src={pokemon.img.url}></img>
        <h2>{pokemon.name}</h2>
      </div>
      <pre>{JSON.stringify(pokemon, null, 2)}</pre>
    </div>
  )
}
