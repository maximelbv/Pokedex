import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {

    const currentPokemon = window.location.pathname.substring(1);

    const [pokemon, setPokemon] = useState([]);

    const getInfos = async () => {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`)
            .then ((res) => {setPokemon(res.data)});

    }

    useEffect(() => {
        getInfos();
        console.log(pokemon);
    }, []);

    return (
        <div>
            <h1>{pokemon.name}</h1>
            {/* <img src={pokemon.sprites.other.home.front_default} /> */}
        </div>
    );
}

export default Page;
