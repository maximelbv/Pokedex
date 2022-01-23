import { useState, useEffect } from 'react';
import Thumbnail from '../../components/Thumbnail/Thumbnail';
import './home.scss'
import '../../styles/neumorphism.scss'
import Darkmodebtn from '../../components/DarkModeBtn/DarkModeBtn';

function Home() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [searchTerm, setSearchTerm] = useState();



  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        setAllPokemons(currentlist => [...currentlist, data])

      });
    }
    createPokemonObject(data.results)

  } 

  // function darkMode() {
  //   if (document.querySelector('.darkModeInput').checked==true) {
  //     document.querySelector('body').classList.add('darkMode')
  //   }
  //   else if (document.querySelector('.darkModeInput').checked==false) {
  //     document.querySelector('body').classList.remove('darkMode').classList.add('lightMode')
  //   }
  // }

  useEffect(() => {
    getAllPokemons()
  }, []);

  return (
    <div className="Home">

      <h1>Pokédex</h1>

      <input 
        type='text' 
        className='searchInput neumorph' 
        placeholder='Search ...'
        onChange={(event) => {setSearchTerm(event.target.value); console.log(searchTerm)}}>
        
      </input>

      {/* <label>Dark mode<input className='darkModeInput' type='checkbox' onChange={() => {darkMode()}}></input></label> */}
      <Darkmodebtn />

      <div className="pokemonContainer">
        <div className="allContainer">

          { allPokemons.filter((val) => {
            if (searchTerm == undefined) {
              return val
            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          }).map(pokemon => 
           <Thumbnail pokemon={pokemon}/> 
          )}

        </div>
        <button className="loadMore neumorph" onClick={() => getAllPokemons()}>Load more</button>
      </div>

    </div>
  );
}

export default Home;