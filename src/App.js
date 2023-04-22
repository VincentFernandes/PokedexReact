import { useEffect, useState } from 'react';
import './App.css';
import { getPokemonList, searchPokemon } from "./api"


const App = () => {
  const [Pokemon, setPokemon] = useState([])
  const baseImgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

  useEffect(() => {
    getPokemonList().then((result) => {
      setPokemon(result)
    })
  }, [])

  const PokemonList = () => {
    return Pokemon.map((data, i) => {
      return(
        <div className='Pokemon-wrapper' key={i}>
          <img
            className='Pokemon-image'
            src={`${baseImgUrl}/${i+1}.png`}
          />
          <div className='Pokemon-name'>{data.name}</div>
        </div>
      )
    })
  }

  const search = (q) => {
    console.log({ q })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vin</h1>
        <input
        placeholder='cari pokemon'
        className='Pokemon-search'
        onChange={({ target }) => search(target.value)}
        />
        <div className='Pokemon-container'>
          <PokemonList />
        </div>
      </header>
    </div>
  );
}

export default App;
