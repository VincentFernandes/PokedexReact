import { useEffect, useState } from 'react';
import './App.css';
import { getPokemonList, searchPokemon } from "./api"

let gen = 1;
let genRom = 'I';
const genData = [];

const App = () => {
  const [Pokemon, setPokemon] = useState([])
  const baseImgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world'

  useEffect(() => {
    getPokemonList(gen).then((result) => {
      genData[gen] = result
      sorter(genData[gen])
      setPokemon(genData[gen])
    })
  }, [])

  const PokemonList = () => {
    return Pokemon.map((data, i) => {
      return(
        <div className='Pokemon-wrapper' key={i}>
          <img
            className='Pokemon-image'
            src={`${baseImgUrl}/${data.id}.svg`}
          />
          <h1 className='Pokemon-id'>{`#${data.id}`}</h1>
          <div className='Pokemon-name'>{data.name}</div>
        </div>
      )
    })
  }

  const search = (q) => {
    console.log({ q })
  }

  const genChange = (i) => {
    gen = i;

    if(gen === 1){ genRom = 'I' } else
    if(gen === 2){ genRom = 'II' } else
    if(gen === 3){ genRom = 'III' } else
    if(gen === 4){ genRom = 'IV' } else
    { genRom = 'V' }

    if(genData[gen] == undefined){
      console.log('masuk und')
      getPokemonList(gen).then((result) => {
        genData[gen] = result
        sorter(genData[gen])
        setPokemon(genData[gen])
      })
    }else{
      setPokemon(genData[gen])
    }
  }

  const sorter = (data) => {
    let size = data.length
    for(let i=0; i<size; i++){
      let id = data[i].url.replace('https://pokeapi.co/api/v2/pokemon-species/','')
      id = id.replace('/','')
      data[i].id = id
    }
    data.sort((a,b) => a.id - b.id)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokedex</h1>
        <input
        placeholder='cari pokemon'
        className='Pokemon-search'
        onChange={({ target }) => search(target.value)}
        />
        <h1 className='Pokemon-title-gen'>Generation {genRom}</h1>
        <div className='Pokemon-gen-wrapper'>
          <button className='Pokemon-gen-opt' onClick={() => genChange(1)}>I</button>
          <button className='Pokemon-gen-opt' onClick={() => genChange(2)}>II</button>
          <button className='Pokemon-gen-opt' onClick={() => genChange(3)}>III</button>
          <button className='Pokemon-gen-opt' onClick={() => genChange(4)}>IV</button>
          <button className='Pokemon-gen-opt' onClick={() => genChange(5)}>V</button>
          {/* <button className='Pokemon-gen-opt' onClick={() => genChange(6)}>VI</button>
          <button className='Pokemon-gen-opt' onClick={() => genChange(7)}>VII</button>
          <button className='Pokemon-gen-opt' onClick={() => genChange(8)}>VIII</button>
          <button className='Pokemon-gen-opt' onClick={() => genChange(9)}>IX</button> */}
        </div>
        <div className='Pokemon-container'>
          <PokemonList />
        </div>
      </header>
    </div>
  );
}

export default App;