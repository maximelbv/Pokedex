import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import './page.scss'
import Family from '../../components/Family/Family';
import ReturnHome from '../../components/GoBackBtn/ReturnHome';

const Page = () => {

    const currentPokemon = window.location.pathname.substring(1);

    const [pokemon, setPokemon] = useState([]);

    const [family, setFamily] = useState({
        first: undefined,
        second: undefined,
        third: undefined
    })

    // const [types, setTypes] = useState([])

    // const [typeDetails, setTypeDetails] = useState([]) 

    const style = `Page ${pokemon.types && pokemon.types[0].type.name}`

    useEffect(async () => {

        await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`)
            .then(res => {
                setPokemon(res.data);
                // setTypes(res.data.types);
                axios.get(res.data.species.url)  
                .then(res => { 
                    axios.get(res.data.evolution_chain.url)
                        .then(async res => { 
                        
                            let first = res.data.chain ? res.data.chain.species.name : undefined; 
                            let second = res.data.chain.evolves_to[0] ? res.data.chain.evolves_to[0].species.name : undefined; 
                            let third = res.data.chain.evolves_to[0] ? (res.data.chain.evolves_to[0].evolves_to[0] ? res.data.chain.evolves_to[0].evolves_to[0].species.name : undefined) : undefined;
                        
                            await setFamily({
                                first: first, 
                                second: second,
                                third: third,
                            }) 
                            // console.log(family)    

                        })

                })
                .catch(err => {console.log(err)})
            })
            .catch(err => {console.log(err)})
    }, [])

    // useEffect(async () => {

    //     await types.map(t => {
    //          axios.get(t.type.url)
    //             .then(res => {
    //                 setTypeDetails(currentlist => [...currentlist, res.data])
    //             })  
    //             .catch(err => {console.log(err)})
    //     })

    // }, [])

    function convert(str) {
            if (str.length >= 2) {
                return str.slice(0, -1) + ',' + str.slice(-1); 
            } else if (str.length <= 1) {
                return str.slice(0, -1) + '0,' + str.slice(-1); 
            }    
    }

    return (
        <div className={style}>

            <div className='pageHeader'>
                <ReturnHome />
                <Header />
            </div>
            
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

                {/* <div className='dmgRelations'>
                    <div className='weakness'>
                        {typeDetails.map((t) => {
                            t.damage_relations.double_damage_from.map((d) => {
                                console.log(d.name) 
                            }) 
                        })}
                    </div>
                </div> */}

                <Family family={ family && family } />

            </div>
            
        </div>
    );
}

export default Page;