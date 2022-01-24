import React from 'react';
import { Link } from 'react-router-dom';
import './Thumbnail.scss';
import '../../styles/types.scss'

const Thumbnail = ({ pokemon }) => {

  const style = `neumorph details ${pokemon.types[0].type.name}`

  function checkIfType(type) {
    if (!type) {return 'nothing'}
    else {return type}
  }

  return (
    <Link to={pokemon.name} style={{textDecoration: 'none'}}>
      <div className='Thumbnail' key={pokemon.name}>
            
        <img className='image' src={pokemon.sprites.other.home.front_default} />

        <div className={style}>
            <p className='number'>#{pokemon.id} - </p>
            <h3 className='name'>{pokemon.name}</h3>
            <p className='type'>{pokemon.types[0].type.name}</p>
            <p className='type2'>{() => {checkIfType(pokemon.types[1].type.name)}}</p>

        </div>

      </div>
    </Link>
  )
};


export default Thumbnail;