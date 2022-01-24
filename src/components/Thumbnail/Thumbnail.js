import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Thumbnail.scss';
import '../../styles/types.scss'
import '../../styles/neumorphism.scss'

const Thumbnail = ({ pokemon }) => {

  const style = ` details neumorph ${pokemon.types[0].type.name}`

  return (
    <Link to={pokemon.name} style={{textDecoration: 'none'}}>
      <div className='Thumbnail' key={pokemon.name}>
            
        <img className='image' src={pokemon.sprites.other.home.front_default} />

        <div className={style}>

            <p className='number'>#{pokemon.id} - </p>

            <h3 className='name'>{pokemon.name}</h3>

            <div className='types'>
              {pokemon.types.map((t) => 
                <div className={`type ${t.type.name+'type'}`}>
                  <div className={`typeImg ${t.type.name+'typeImg'}`} background-image={`../../assets/icons/${t.type.name}.svg`}></div>
                  <p className='typeName'>{t.type.name}</p>
                </div>
              )}
            </div>

        </div>

      </div>
    </Link>
  )
};


export default Thumbnail;