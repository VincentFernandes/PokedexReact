import { useEffect, useState } from 'react';
import { getPokemonSpecies } from '../api';
import { useLocation, Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import './PokemonDetail.css'

let text_entries = ''
const PokemonDetail = () => {
    const [PokemonDataSpecies, setPokemonDataSpecies] = useState([])
    const [FlavorText, setFlavorText] = useState(0)
    const [PokemonColor, setPokemonColor] = useState('red')
    const PokemonData = useLocation().state.data
    const pokemonStats = PokemonData.stats
    const AnimatedDiv = animated.div;
    let maxStat = 0
    let total = 0
    for(let i=0; i<pokemonStats.length; i++){
        if(maxStat < pokemonStats[i].base_stat){ maxStat = pokemonStats[i].base_stat }
        total+= pokemonStats[i].base_stat

    }
    const baseImgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
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

    const colorsAbility = {
        'overgrow': "#78C850",
        'chlorophyll': "#78C850",
        'blaze': "#F08030",
        'solar-power': "#F08030",
        'torrent': "#6890F0",
        'rain-dish': "#6890F0",
        'shield-dust': "#6890F0",
        'run-away': "#A8A878",
        'shed-skin': "#A8B820",
        'compound-eyes': "#A8B820",
        'tinted-lens': "#A8B820",
        'swarm': "#A8B820",
        'sniper': "#6890F0",
        'keen-eye': "#A890F0",
        'tangled-feet': "#A8A878",
        'big-pecks': "#F8D030",
        'guts': "#A8A878",
        'hustle': "#F08030",
        'intimidate': "#F08030",
        'unnerve': "#20A048",
        'static': "#F8D030",
        'lightning-rod': "#F8D030",
        'sand-veil': "#E0C068",
        'sand-rush': "#E0C068",
        'poison-point': "#A040A0",
        'rivalry': "#7038F8",
        'sheer-force': "#C03028",
        'cute-charm': "#EE99AC",
        'magic-guard': "#F85888",
        'friend-guard': "#EE99AC",
        'unaware': "#A8A878",
        'flash-fire': "#F08030",
        'competitive': "#6890F0",
        'frisk': "#C86890",
        'drought': "#F08030",
        'inner-focus': "#C03028",
        'infiltrator': "#A890F0",
        'stench': "#A040A0",
        'effect-spore': "#78C850",
        'dry-skin': "#6890F0",
        'damp': "#6890F0",
        'wonder-skin': "#8C888C",
        'arena-trap': "#E0C068",
        'sand-force': "#E0C068",
        'pickup': "#C86890",
        'technician': "#A8A878",
        'limber': "#F8D030",
        'cloud-nine': "#A8A878",
        'swift-swim': "#6890F0",
        'vital-spirit': "#8C888C",
        'anger-point': "#F08030",
        'defiant': "#F08030",
        'justified': "#C03028",
        'synchronize': "#F85888",
        'water-absorb': "#6890F0",
        'no-guard': "#C03028",
        'steadfast': "#C03028",
        'gluttony': "#20A048",
        'clear-body': "#B8B8D0",
        'liquid-ooze': "#A040A0",
        'rock-head': "#B8A038",
        'sturdy': "#B8A038",
        'flame-body': "#F08030",
        'oblivious': "#F85888",
        'own-tempo': "#F85888",
        'regenerator': "#FF0000",
        'magnet-pull': "#B8B8D0",
        'analytic': "#A8A878",
        'early-bird': "#A890F0",
        'hydration': "#6890F0",
        'ice-body': "#98D8D8",
        'thick-fat': "#F08030",
        'sticky-hold': "#A040A0",
        'poison-touch': "#A040A0",
        'power-of-alchemy': "#8C888C",
        'shell-armor': "#6890F0",
        'skill-link': "#A8A878",
        'overcoat': "#A8B820",
        'levitate': "#A890F0",
        'cursed-body': "#F85888",
        'weak-armor': "#B8A038",
        'insomnia': "#8C888C",
        'forewarn': "#F85888",
        'soundproof': "#A8A878",
        'aftermath': "#A040A0",
        'harvest': "#20A048",
        'battle-armor': "#B8A038",
        'reckless': "#C92112",
        'unburden': "#F85888",
        'iron-fist': "#C03028",
        'neutralizing-gas': "#A040A0",
        'hyper-cutter': "#F08030",
        'natural-cure': "#78C850",
        'serene-grace': "#A8A878",
        'healer': "#A8A878",
        'leaf-guard': "#78C850",
        'scrappy': "#A8A878",
        'water-veil': "#6890F0",
        'illuminate': "#F8D030",
        'screen-cleaner': "#F85888",
        'mold-breaker': "#B8A038",
        'moxie': "#F08030",
        'rattled': "#A8A878",
        'filter': "#F85888",
        'imposter': "#A8A878",
        'anticipation': "#C03028",
        'volt-absorb': "#F8D030",
        'quick-feet': "#F85888",
        'trace': "#F85888",
        'download': "#F08030",
        'pressure': "#7038F8",
        'adaptability': "#6890F0",
        'immunity': "#A040A0",
        'snow-cloak': "#98D8D8",
        'marvel-scale': "#F8D030",
        'multiscale': "#A890F0",
      };

    useEffect(() => {
        getPokemonData()
    }, [])

    const getPokemonData = async() => {
        const res = await getPokemonSpecies(PokemonData.id)
        text_entries = res.flavor_text_entries[0].flavor_text
        const colorChange = {
            'black': '#607d8b',
            'blue': '#81d4fa',
            'brown': '#bcaaa4',
            'gray': '#a6a6a6',
            'green': '#81c784',
            'pink': '#f8bbd0',
            'purple': '#ad8ee7',
            'red': '#ff8a80',
            'white': '#d5dbe1',
            'yellow': '#ffd600'
        }
        setPokemonColor(colorChange[res.color.name])
        setPokemonDataSpecies(res)
    }

    const gaugehp = useSpring({
        backgroundColor: PokemonColor,
        width: pokemonStats[0].base_stat/maxStat*250,
        from: { width: 0 },
        config: {
            duration: 1000,
        }
    });

    const gaugeattack = useSpring({
        backgroundColor: PokemonColor,
        width: pokemonStats[1].base_stat/maxStat*250,
        from: { width: 0 },
        config: {
            duration: 1000,
        }
    });

    const gaugedefense = useSpring({
        backgroundColor: PokemonColor,
        width: pokemonStats[2].base_stat/maxStat*250,
        from: { width: 0 },
        config: {
            duration: 1000,
        }
    });

    const gaugespecialattack = useSpring({
        backgroundColor: PokemonColor,
        width: pokemonStats[3].base_stat/maxStat*250,
        from: { width: 0 },
        config: {
            duration: 1000,
        }
    });

    const gaugespecialdefense = useSpring({
        backgroundColor: PokemonColor,
        width: pokemonStats[4].base_stat/maxStat*250,
        from: { width: 0 },
        config: {
            duration: 1000,
        }
    });

    const gaugespeed = useSpring({
        backgroundColor: PokemonColor,
        width: pokemonStats[5].base_stat/maxStat*250,
        from: { width: 0 },
        config: {
            duration: 1000,
        }
    });

    const Capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const flavorClick = (i) => {
        text_entries = PokemonDataSpecies.flavor_text_entries[i+8].flavor_text
        setFlavorText(i)
    }

    const PokemonProfile = () => {
        return(
            <div className='PokemonDetail-profile'>
                <div className='Pokemon-profile-title'>
                    <div className='Pokemon-title-wrap'><h1 className='profile-title'>ID</h1></div>
                    <div className='Pokemon-title-wrap'><h1 className='profile-title'>Height</h1></div>
                    <div className='Pokemon-title-wrap'><h1 className='profile-title'>Weight</h1></div>
                    <div className='Pokemon-title-wrap'><h1 className='profile-title'>Abilites</h1></div>
                    <div className='Pokemon-title-wrap'><h1 className='profile-title'>Type</h1></div>
                    <div className='Pokemon-title-wrap'><h1 className='profile-title'>Forms</h1></div>
                </div>

                <div className='Pokemon-profile-desc'>
                    <div className='Pokemon-title-desc'><h1 className='profile-desc'>{`#${PokemonData.id.toString().padStart(4,'0')}`}</h1></div>
                    <div className='Pokemon-title-desc'><h1 className='profile-desc'>{`${PokemonData.height/10} m`}</h1></div>
                    <div className='Pokemon-title-desc'><h1 className='profile-desc'>{`${PokemonData.weight/10} kg`}</h1></div>
                    <div className='profile-abilities'>
                        {
                            PokemonData.abilities.map((data) => {
                                return(
                                    <div style={{ backgroundColor: colorsAbility[data.ability.name] }} className='Pokemon-title-desc'>
                                        <h1 className='ability'>{Capitalize(data.ability.name)}</h1>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className='profile-abilities'>
                        {
                            PokemonData.types.map((data) => {
                                return(
                                    <div style={{ backgroundColor: color_type[data.type.name] }} className='Pokemon-title-desc'>
                                        <h1 className='ability'>{Capitalize(data.type.name)}</h1>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className='profile-abilities'>
                        {
                            PokemonDataSpecies.varieties !== undefined && PokemonDataSpecies.varieties.map((data) => {
                                return(
                                    <div style={{ backgroundColor: PokemonColor }} className='Pokemon-title-desc'>
                                        <h1 className='ability'>{Capitalize(data.pokemon.name)}</h1>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    const PokemonStatus = () => {
        return(
            <div className='PokemonDetail-status'>
                <h1 className='PokemonDetail-status-title'>Status</h1>
                    <div className='Status-wrapper'>
                        <h1 className='title-status'>Hp</h1>
                        <div className='gauge-background'>
                            <AnimatedDiv style={gaugehp}
                                className='status-gauge'>
                                {pokemonStats[0].base_stat}
                            </AnimatedDiv>
                        </div>
                    </div>

                    <div className='Status-wrapper'>
                        <h1 className='title-status'>Attack</h1>
                        <div className='gauge-background'>
                            <AnimatedDiv style={gaugeattack}
                                className='status-gauge'>
                                {pokemonStats[1].base_stat}
                            </AnimatedDiv>
                        </div>
                    </div>

                    <div className='Status-wrapper'>
                        <h1 className='title-status'>Defense</h1>
                        <div className='gauge-background'>
                            <AnimatedDiv style={gaugedefense}
                                className='status-gauge'>
                                {pokemonStats[2].base_stat}
                            </AnimatedDiv>
                        </div>
                    </div>

                    <div className='Status-wrapper'>
                        <h1 className='title-status'>Sp.Attack</h1>
                        <div className='gauge-background'>
                            <AnimatedDiv style={gaugespecialattack}
                                className='status-gauge'>
                                {pokemonStats[3].base_stat}
                            </AnimatedDiv>
                        </div>
                    </div>

                    <div className='Status-wrapper'>
                        <h1 className='title-status'>Sp.Defense</h1>
                        <div className='gauge-background'>
                            <AnimatedDiv style={gaugespecialdefense}
                                className='status-gauge'>
                                {pokemonStats[4].base_stat}
                            </AnimatedDiv>
                        </div>
                    </div>

                    <div className='Status-wrapper'>
                        <h1 className='title-status'>Speed</h1>
                        <div className='gauge-background'>
                            <AnimatedDiv style={gaugespeed}
                                className='status-gauge'>
                                {pokemonStats[5].base_stat}
                            </AnimatedDiv>
                        </div>
                    </div>

                    <div className='Status-wrapper'>
                        <h1 className='title-status'>Total</h1>
                        <h1 className='profile-desc'>{total}</h1>
                    </div>

                    <div className='div-test'/>
            </div>
        )
    }

    return (
        <div className="PokemonDetail">
            <div style={{ backgroundColor: PokemonColor }} className='header'>
                <Link className='title' to="/">PokeDex</Link>
            </div>
            <h1 className='PokemonDetail-name'>{Capitalize(PokemonData.name)}</h1>
            <h1 className='PokemonDetail-id'>#{PokemonData.id.toString().padStart(4,'0')}</h1>
            <h1 className='PokemonDetail-flavortext'>{text_entries}</h1>
            
            <div className='flavor-wrapper'>
                <div className='flavor-bg' style={{ borderColor: FlavorText === 0 ? '#6d6d6d' : 'white' }}>
                    <img
                        className='flavor'
                        src={`https://cdn.discordapp.com/attachments/960081828541255693/1101864496647131196/icons8-pokeball-50.png`}
                        onClick={() => flavorClick(0)}
                    />
                </div>
                <div className='flavor-bg' style={{ borderColor: FlavorText === 1 ? '#6d6d6d' : 'white' }}>
                    <img
                        className='flavor'
                        src={`https://media.discordapp.net/attachments/960081828541255693/1101864496340942878/icons8-pokeball-50_1.png`}
                        onClick={() => flavorClick(1)}
                    />
                </div>
            </div>

            <div className='PokemonDetail-container'>
                <PokemonProfile />
                <div className='PokemonDetail-image'>
                    <img
                        className='Pokemon-sprites'
                        src={`${baseImgUrl}/${PokemonData.id}.png`}
                    />
                </div>
                <PokemonStatus />
            </div>
        </div>
    );
}

export default PokemonDetail;