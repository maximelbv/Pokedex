import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './views/Home/Home';
import Page from './views/Page/Page';

function App() {

  const [allPokemons, setAllPokemons] = useState([]);

  const getAllPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const data = await res.json()
    setAllPokemons(data.results)

  } 

  useEffect(() => {
    getAllPokemons()
  }, []);

  // allPokemons.map(pokemon => {console.log(pokemon.name)})

  return (

      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Home />}/>
          <Route path ='bulbasaur' element={<Page />}/>
          <Route path ='ivysaur' element={<Page />}/>
          {
            allPokemons.map(pokemon => 
              <Route path ={pokemon.name} element={<Page />}/>
            )
          }
          
        </Routes>
      </BrowserRouter>

  );
}

export default App;
