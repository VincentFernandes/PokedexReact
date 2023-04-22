import axios from "axios"

const baseUrl = process.env.REACT_APP_BASEURL

export const getPokemonList = async() => {
    const pokemon = await axios.get(
        `${baseUrl}/pokemon?limit=100&offset=0`
        )
    return pokemon.data.results
}

export const searchPokemon = async (q) => {
    const search = await axios.get(q)
    return
}