import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import './page.scss'

const Page = () => {

    const currentPokemon = window.location.pathname.substring(1);

    const [pokemon, setPokemon] = useState([]);

    const style = `Page ${pokemon.types && pokemon.types[0].type.name}`

    useEffect(async () => {

        await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`)
            .then(res => {
                console.log(res.data);
                setPokemon(res.data);
            })
            .catch(err => {console.log(err)})
    }, [])

    return (
        <div className={style}>

            <Header />

            <div className='content'>

                {pokemon.sprites && (<img className='image' src={pokemon.sprites.other.home.front_default} />)}

                <h1 className='name'>{pokemon.name && pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h1>

                <div className='infos'>
                    <p>{pokemon.height}</p>
                    {/* <p>{(pokemon.moves && pokemon.moves.length > 0) ? pokemon.moves[0].move.name : null}</p> */}
                </div>

            </div>
            
        </div>
    );
}

export default Page;