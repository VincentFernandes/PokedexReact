import axios from "axios"

const baseUrl = process.env.REACT_APP_BASEURL

export const getPokemonList = async(i) => {
    const pokemon = await axios.get(
        `${baseUrl}/generation/${i}`
        )
    return pokemon.data.pokemon_species;
}

export const getPokemonDetail = async(id) => {
    const pokemon = await axios.get(
        `${baseUrl}/pokemon/${id}`
        )
    return pokemon.data
}

export const getPokemonSpecies = async(id) => {
    const pokemon = await axios.get(
        `${baseUrl}/pokemon-species/${id}`
        )
    return pokemon.data
}