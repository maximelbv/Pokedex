import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Family.scss';
 
const Family = ( family ) => { 


    const [familyFirst, setFamilyFirst] = useState()
    const [familySecond, setFamilySecond] = useState()
    const [familyThird, setFamilyThird] = useState() 

    useEffect(() => {    
        family.family.first && axios.get(`https://pokeapi.co/api/v2/pokemon/${family.family.first}`)
            .then(res => {setFamilyFirst(res.data);})
            .catch(err => err)
        family.family.second && axios.get(`https://pokeapi.co/api/v2/pokemon/${family.family.second}`)  
            .then(res => {setFamilySecond(res.data);})
            .catch(err => err)
        family.family.third && axios.get(`https://pokeapi.co/api/v2/pokemon/${family.family.third}`)  
            .then(res => {setFamilyThird(res.data)})
            .catch(err => err) 
    }, [family ? family.family : null]);
 
    return (
        <div className='Family'>
            { (family.family.second !== undefined && familySecond) ? 
                <a href={(family.family.first !== undefined && familyFirst) ? `${process.env.PUBLIC_URL}/${familyFirst.name}` : '/'}>
                    <img src={familyFirst.sprites && familyFirst.sprites.other.home.front_default} />
                    <p>{familyFirst.name}</p>
                </a> : null
            }

            {
            (family.family.second !== undefined && familySecond) ?
                <a href={(family.family.second !== undefined && familySecond) ? `${process.env.PUBLIC_URL}/${familySecond.name}` : '/'}>
                    <img src={familySecond.sprites && familySecond.sprites.other.home.front_default} />
                    <p>{familySecond.name}</p>
                </a> : null
            }

            {
            (family.family.third !== undefined && familyThird) ?
                <a href={(family.family.third !== undefined && familyThird) ? `${process.env.PUBLIC_URL}/${familyThird.name}` : '/'}>
                    <img src={familyThird.sprites && familyThird.sprites.other.home.front_default} />
                    <p>{familyThird.name}</p>
                </a> : null 
            }
        </div>

    );
}

export default Family;
