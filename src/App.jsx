import { useState } from 'react';
import Scoreboard from './components/Scoreboard';
import Display from './components/Display';
import './App.css'

function App() {
  //state for score
  const [score, setScore] = useState({
    bestScore: 0,
    myScore: 0
  });
  const [pokemons, setPokemons] = useState([{
    name: '',
    imgUrl: '',
    clicked: false
  }]);

  async function createPokemon(id) {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}`);
    if (!pokemon.ok) return "ERROR";
    const pokemonJson = await pokemon.json();
    return {
      name: pokemonJson.name,
      imgUrl: pokemonJson.sprites.other["official-artwork"].front_default,
      clicked: false,
    };
  }

  async function getPokemons (pokemonsList = [], turn = 0) {
    //for increasing number of pokemons
    let cardsLength = [5, 10, 15, 20];

    //create an increasing length list of pokemons to be displayed
    switch (turn) {
      case 0:
        const cardsPromises = Array(cardsLength[turn])
        .fill(null)
        .map((_, index) => createPokemon(index));
        const cardsArray = await Promise.all(cardsPromises);
      return cardsArray;
    }
  }

  useEffect(() => {
    async function fetchAndFillArray() {
      const cardsArrayFilled = await getPokemons();
      setCardsInformation(cardsArrayFilled);
    }
    fetchAndFillArray();
  }, [score])
  

  return (
    <>
      <div className="App">
        <header className="App-header">Memory Game - Pokemon 1st Gen
          <div className='App-logo'></div>
        </header>
        <div className='App-main'>
          <Scoreboard scoreboard = {scoreStats} />
          <Display score = {scoreStats} set = {setStats} />
        </div>
        <footer className='App-footer'>Developed by RodrigoAPassos</footer>
      </div>
    </>
  )
}

export default App
