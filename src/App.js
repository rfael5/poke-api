import './App.css';
import {useEffect, useState} from 'react';
import './styles.css'
import {getPokemonList, getPokemonSpriteUrl, getPokemonDescription} from './utils'

function App() {
  const [list, setPokemonList] = useState(null)
  const [selectedPokemon, setSelectedPokemon] = useState(1)
  const [description, setDescription] = useState(1)

  //Seta o pokemon selecionado no select
  function handleSelect(e) {
    setSelectedPokemon(e.target.value)
  }

  //Configuração dos botões para mudar de pokemon
  //Caso o parâmetro seja 0, ele vai para o pokemon anterior
  //Caso o parâmetro seja 1, ele vai para o pokemon seguinte
  function togglePokemon(id) {
    if (id === 0) {setSelectedPokemon(Number(selectedPokemon) - 1)}
    if (id === 1) {setSelectedPokemon(Number(selectedPokemon) + 1)}
  }

  //Cada vez que q selectedPokemon for mudado, esse useEffect será executado, chamando a função getList.
  useEffect(() => {
    async function getList() {
      try{
        //Essa variável recebe os valores da API de pokemons
        const list = await getPokemonList()
        setPokemonList(list)
        //Essa variável recebe as descrições dos pokemons
        const description = await getPokemonDescription(selectedPokemon)
        setDescription(description)
      }catch(e){
        console.log(e)
      }
    }
    getList()
  }, [selectedPokemon])

  return (
    <div className="App">
      <select onChange={handleSelect} value={selectedPokemon}>
        {list?.map((pokemon, index) => (
          <option key={index + 1} value={index + 1}>{pokemon.name}</option>
        ))}
      </select>
      <img 
        src={getPokemonSpriteUrl(selectedPokemon)}
        alt='pokemon'
      />
      <p>{description}</p>
      <button onClick={() => togglePokemon(0)}>Prev</button>
      <button onClick={() => togglePokemon(1)}>Next</button>

      <div class='cards'>
        {list?.map((pokemon, index) => (
          <div>
            <img
              src={getPokemonSpriteUrl(index + 1)}
              alt='pokemon' 
            />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;
