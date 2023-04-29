import { useEffect, useState } from 'react';
import { getPokemonDetail } from '../api';
import { useLocation, Link } from 'react-router-dom';
import './PokemonDetail.css'

const PokemonDetail = () => {
    const [PokemonData, setPokemonData] = useState([])
    const id = useLocation().state.id;
    const name = useLocation().state.name;

    useEffect(() => {
        getPokemonDetail(id).then((result) => {
            const temp = {
                id: result.id,
                name: result.name,
                image: result.sprites.other.dream_world.front_default,
                height: result.height,
                weight: result.weight,
                types: result.types,
                stats: result.stats,
                abilities: result.abilities
            }
            setPokemonData(temp)
        })
    }, [])

    const Capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const PokemonDetail = () => {
        return(
            <div className='PokemonDetailWrapper'>
                <div className="PokemonDetailWrapper-left">
                    <div className='PokemonDetail-imagebg'>
                        <img
                            className='PokemonDetail-image'
                            src={PokemonData.image}
                        />
                    </div>
                    <h1 className='PokemonDetail-title'>Types</h1>
                    <div className='type-Container'>
                    {
                        PokemonData.types !== undefined && PokemonData.types.map((data) => {
                            return(
                                <div className='type-Wrapper'>
                                    <h1 className='types-val'>{Capitalize(data.type.name)}</h1>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <div className="PokemonDetailWrapper-right">
                    <div className='PokemonDetailProfile'>
                        <div className='PokemonDetail-hw'>
                            <h1 className='title-profile'>Height (cm)</h1>
                            <h1 className='hw-desc'>{PokemonData.height * 10}</h1>

                            <h1 className='title-profile'>Abilities</h1>
                            {
                                PokemonData.abilities !== undefined && PokemonData.abilities.map((data) => {
                                    return(
                                        <h1 className='ability-profile'>• {Capitalize(data.ability.name)}</h1>
                                    )
                                })
                            }
                        </div>
                        <div className='PokemonDetail-hw'>
                            <h1 className='title-profile'>Weight (kg)</h1>
                            <h1 className='hw-desc'>{PokemonData.weight *0.1}</h1>
                        </div>
                    </div>

                    <div className='PokemonDetail-stats'>
                        <h1 className='PokemonDetail-title'>Stats</h1>
                        <div className='PokemonGraph-Wrapper'>
                            {
                                PokemonData.stats !== undefined && PokemonData.stats.map((stat) => {
                                    const height = stat.base_stat/150*200
                                    return(
                                        <div>
                                            <h1 className='PokemonDetail-statnum'>{stat.base_stat}</h1>
                                            <div style={{ width: 55, height: height, backgroundColor: '#30a7d7' }}></div>
                                        </div>
                                        
                                    )
                                })
                            }
                        </div>

                        <div className='PokemonStat-Wrapper'>
                        <h1 className='PokemonDetail-stat'>Hp</h1>
                        <h1 className='PokemonDetail-stat'>Attack</h1>
                        <h1 className='PokemonDetail-stat'>Defense</h1>
                        <h1 className='PokemonDetail-stat'>Special Attack</h1>
                        <h1 className='PokemonDetail-stat'>Special Defense</h1>
                        <h1 className='PokemonDetail-stat'>Speed</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="PokemonDetail">
            <Link className='title' to="/">Pokedex</Link>
            <h1 className='PokemonDetail-id'>#{id.toString().padStart(4,'0')}</h1>
            <h1 className='PokemonDetail-name'>{name}</h1>
            <PokemonDetail />
        </div>
    );
}

export default PokemonDetail;