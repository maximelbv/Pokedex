import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './views/Home/Home';
import Page from './views/Page/Page';
import NotFound from './views/NotFound/NotFound'

function App() {

  const [allPokemons, setAllPokemons] = useState([]);

  const getAllPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1118')
    const data = await res.json()
    setAllPokemons(data.results)

  } 

  useEffect(() => {
    getAllPokemons()
  }, []);

  // allPokemons.map(pokemon => {console.log(pokemon.name)})

  return (

      <BrowserRouter forceRefresh >
        <Routes>
          <Route path = "/" element={<Home />}/>
          <Route path='*' element={<NotFound />}/>
          {
            allPokemons.map(pokemon => 
              <Route key={`${pokemon.name} Page`} path ={pokemon.name} element={<Page />}/>
            )
          }
          
        </Routes>
      </BrowserRouter>

  );
}

export default App;
