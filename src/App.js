import { useEffect, useState } from 'react';
import './App.css';
import { getPokemonList, getPokemonDetail } from "./api"
import { Link } from 'react-router-dom';

let genRomawi = ['','I','II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
const genData = [];
const genOffset = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
};
const genLoadData = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true
};
const color_type = {
  'normal': '#A8A878',
  'fighting': '#C03028',
  'flying': '#A890F0',
  'poison': '#A040A0',
  'ground': '#E0C068',
  'rock': '#B8A038',
  'bug': '#A8B820',
  'ghost': '#705898',
  'steel': '#B8B8D0',
  'fire': '#F08030',
  'water': '#6890F0',
  'grass': '#78C850',
  'electric': '#F8D030',
  'psychic': '#F85888',
  'ice': '#98D8D8',
  'dragon': '#7038F8',
  'dark': '#705848',
  'fairy': '#EE99AC',
};

let changePage = false;

const App = () => {
  const [Pokemon, setPokemon] = useState([])
  const [Search, setSearch] = useState([])
  const [offset, setOffset] = useState(0)
  const [Gen, setGen] = useState(1)
  const baseImgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
  
  useEffect(() => {
    if((genData[Gen] === undefined || genLoadData[Gen])){
      if(changePage && genData[Gen] !== undefined){
        setPokemon(genData[Gen])
      }else{
        setPokemon([])
        getPokemon()
      }
    }else{
      setPokemon(genData[Gen])
    }
  }, [offset, Gen])

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight
      if (currentHeight + 1 >= scrollHeight) {
        genOffset[Gen] += 20
        changePage = false;
        setOffset(genOffset[Gen])
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset])

  const Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getPokemon = async() => {
    const response1 = await getPokemonList(Gen)
    sorter(response1)
    if(genData[Gen] === undefined){
      genData[Gen] = []
    }
    let len = offset+19
    if(len > response1.length-1){
      len = response1.length-1
      genLoadData[Gen] = false
    }

    for(let i=offset; i<=len; i++){
      const response2 = await getPokemonDetail(response1[i].id)
      genData[Gen].push(response2)
    }
    setPokemon(genData[Gen])
  }

  const handleClick = () => {
    changePage = true
  }

  const PokemonList = () => {
    return Pokemon.sort((a,b) => a.id - b.id).filter(item => item.name.startsWith(Search)).map((data, i) => {
      return(
        <Link
          to= "/PokemonDetail"
          state= {{
            data: data
          }}
          onClick={handleClick}
          className='Pokemon-wrapper'
          key={data.id}
        >
          <img
            className='Pokemon-image'
            src={`${baseImgUrl}/${data.id}.png`}
          />
          <h1 className='Pokemon-id'>{`#${data.id.toString().padStart(4,'0')}`}</h1>
          <div className='Pokemon-nametype-wrapper'>
            <div className='Pokemon-name'>{Capitalize(data.name)}</div>
            <div className='Pokemon-type-wrapper'>
              {
                data.types !== undefined && data.types.map((types) => {
                  return(
                    <p style={{ backgroundColor: color_type[types.type.name] }} className='Pokemon-type'>{Capitalize(types.type.name)}</p>
                  )
                })
              }
            </div>
          </div>
        </Link>
      )
    })
  }

  const search = (q) => {
    setSearch(q)
  }

  const genChange = (i) => {
    changePage = true;
    setGen(i)
    setOffset(genOffset[i])
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
        <h1>PokeDex</h1>
        <input
        placeholder='cari pokemon'
        className='Pokemon-search'
        onChange={({ target }) => search(target.value)}
        />
        <h1 className='Pokemon-title-gen'>Generation {genRomawi[Gen]}</h1>
        <div className='Pokemon-gen-wrapper'>
          <button className='Pokemon-gen-opt' style={{ backgroundColor: Gen === 1 ? '#CACACA' : 'white' }} onClick={() => genChange(1)}>I</button>
          <button className='Pokemon-gen-opt' style={{ backgroundColor: Gen === 2 ? '#CACACA' : 'white' }} onClick={() => genChange(2)}>II</button>
          <button className='Pokemon-gen-opt' style={{ backgroundColor: Gen === 3 ? '#CACACA' : 'white' }} onClick={() => genChange(3)}>III</button>
          <button className='Pokemon-gen-opt' style={{ backgroundColor: Gen === 4 ? '#CACACA' : 'white' }} onClick={() => genChange(4)}>IV</button>
          <button className='Pokemon-gen-opt' style={{ backgroundColor: Gen === 5 ? '#CACACA' : 'white' }} onClick={() => genChange(5)}>V</button>
          <button className='Pokemon-gen-opt' style={{ backgroundColor: Gen === 6 ? '#CACACA' : 'white' }} onClick={() => genChange(6)}>VI</button>
          <button className='Pokemon-gen-opt' style={{ backgroundColor: Gen === 7 ? '#CACACA' : 'white' }} onClick={() => genChange(7)}>VII</button>
          <button className='Pokemon-gen-opt' style={{ backgroundColor: Gen === 8 ? '#CACACA' : 'white' }} onClick={() => genChange(8)}>VIII</button>
          <button className='Pokemon-gen-opt' style={{ backgroundColor: Gen === 9 ? '#CACACA' : 'white' }} onClick={() => genChange(9)}>IX</button>
        </div>
        <div className='Pokemon-container'>
          <PokemonList />
        </div>
      </header>
    </div>
  );
}

export default App;