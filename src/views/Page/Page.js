import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import './page.scss'

const Page = () => {

    const currentPokemon = window.location.pathname.substring(1);

    const [pokemon, setPokemon] = useState([]);

    const [family, setFamily] = useState({
        first: undefined,
        second: undefined,
        third: undefined
    })

    const [familyFirst, setFamilyFirst] = useState()
    const [familySecond, setFamilySecond] = useState()
    const [familyThird, setFamilyThird] = useState()

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
                            console.log(family)    

                        })
                        .then(async () => {
                            family.first && axios.get(`https://pokeapi.co/api/v2/pokemon/${family.first}`)
                                .then(res => {setFamilyFirst(res.data);})
                                .catch(err => err)
                            family.second && axios.get(`https://pokeapi.co/api/v2/pokemon/${family.second}`)  
                                .then(res => {setFamilySecond(res.data);})
                                .catch(err => err)
                            family.third && axios.get(`https://pokeapi.co/api/v2/pokemon/${family.third}`)  
                                .then(res => {setFamilyThird(res.data)})
                                .catch(err => err) 
                        
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

                {/* <div className='dmgRelations'>
                    <div className='weakness'>
                        {typeDetails.map((t) => {
                            t.damage_relations.double_damage_from.map((d) => {
                                console.log(d.name) 
                            }) 
                        })}
                    </div>
                </div> */}

                <div className='family'> 

                    { (family.second !== undefined && familySecond) ? 
                        <a href={(family.first !== undefined && familyFirst) ? `${process.env.PUBLIC_URL}/${familyFirst.name}` : '/'}>
                            <img src={familyFirst.sprites.other.home.front_default} />
                            <p>{familyFirst.name}</p>
                        </a> : null
                    }

                    {
                    (family.second !== undefined && familySecond) ?
                        <a href={(family.second !== undefined && familySecond) ? `${process.env.PUBLIC_URL}/${familySecond.name}` : '/'}>
                            <img src={familySecond.sprites.other.home.front_default} />
                            <p>{familySecond.name}</p>
                        </a> : null
                    }

                    {
                    (family.third !== undefined && familyThird) ?
                        <a href={(family.third !== undefined && familyThird) ? `${process.env.PUBLIC_URL}/${familyThird.name}` : '/'}>
                            <img src={familyThird.sprites.other.home.front_default} />
                            <p>{familyThird.name}</p>
                        </a> : null
                    }
                </div>

            </div>
            
        </div>
    );
}

export default Page;