import axios from "axios"

const baseUrl = process.env.REACT_APP_BASEURL

export const getPokemonList = async(i) => {
    const pokemon = await axios.get(
        `${baseUrl}/generation/${i}`
        )
    
    const temp = pokemon.data.pokemon_species
    const res = []
    for(let i=0; i<temp.length; i++){
        console.log(temp[i].url)
        const pokemonDetail = await axios.get(temp[i].url)
        res.push(pokemonDetail)
    }
    console.log(res)
    return pokemon.data.pokemon_species;
}

export const getPokemonDetail = async(id) => {
    const pokemon = await axios.get(
        `${baseUrl}/pokemon/${id}`
        )
    return pokemon.data
}