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

    function convert(str) {
            if (str.length >= 2) {
                return str.slice(0, -1) + ',' + str.slice(-1);
            } else if (str.length <= 1) {
                return str.slice(0, -1) + '0,' + str.slice(-1);
            }    
    }

    // if (pokemon.height) console.log(typeof pokemon.height.toString())
    return (
        <div className={style}>

            <Header />

            <div className='content'>

                <div className={pokemon.types && `${pokemon.types[0].type.name}Bg imageBg`}>
                    {pokemon.sprites && (<img className='image' src={pokemon.sprites.other.home.front_default} />)}
                </div>
                
                <h1 className='name'>{pokemon.name && pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h1>

                <h2 className='number'>{`#${pokemon.id}`}</h2>

                <div className='types'>
                    {pokemon.types && pokemon.types.map((t, j) => 
                    <div key={j} className={`type ${t.type.name+'type'}`}>
                    <div className={`typeImg ${t.type.name+'typeImg'}`}></div>
                    <p className='typeName'>{t.type.name}</p>
                    </div>
                    )}
                </div>

                <div className='mensurations'>
                    <div className='height'>
                        <p>{`${pokemon.height && convert(pokemon.height.toString())} m`}</p>
                        <p className='infoName'>Height</p>
                    </div>
                    <div className='weight'>
                        <p>{`${pokemon.weight && convert(pokemon.weight.toString())} kg`}</p>
                        <p className='infoName'>Weight</p>
                    </div>
                </div>

            </div>
            
        </div>
    );
}

export default Page;