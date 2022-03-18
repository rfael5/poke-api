export async function getPokemonList() {
  //fazendo a requisição das informações na api
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=898")
  //convertendo os dados para json
  const data = await response.json()
  return data.results
}

export async function getPokemonDescription(id) {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  ).then((res) => res.json());
  return data.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, "");
}

export function getPokemonSpriteUrl(id) {
  let image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
  if (id < 10) {
      image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${id}.png`;
  }if (id >= 10 && id < 100) {
      image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${id}.png`;
  }
  return image
}