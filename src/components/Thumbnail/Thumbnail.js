import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Thumbnail.scss';
// import '../../styles/types.scss'
// import '../../styles/neumorphism.scss'

const Thumbnail = ({ pokemon }) => {

  const style = ` details neumorph ${pokemon.types[0].type.name}`

  return (
    <Link to={pokemon.name} style={{textDecoration: 'none'}}>
      
      <div className='Thumbnail'>

        <div className={`${pokemon.types[0].type.name}Bg imageBg`}>
          <img className='image' src={pokemon.sprites.other.home.front_default} />
        </div>
        <div className={style}>
          
            <div className='infos'>
              <p className='number'>{`#${pokemon.id}`}</p>
              <h3 className='name'>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h3>
            </div>

            <div className='types'>
              {pokemon.types.map((t, j) => 
                <div key={j} className={`type ${t.type.name+'type'}`}>
                  <div className={`typeImg ${t.type.name+'typeImg'}`}></div>
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