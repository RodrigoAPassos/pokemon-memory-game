import { useState, useEffect } from 'react';
import { v4 as uuid } from "uuid";
import Scoreboard from './components/Scoreboard';
import Display from './components/Display';
import './App.css'

function App() {
  //state for score
  const [score, setScore] = useState({
    bestScore: 0,
    myScore: 0
  });
  const [pokemons, setPokemons] = useState([]);

  async function createPokemon(id) {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}`);
    if (!pokemon.ok) return "ERROR";
    const pokemonJson = await pokemon.json();
    return {
      name: pokemonJson.name,
      imgUrl: pokemonJson.sprites.other["official-artwork"].front_default,
      id: uuid(),
      clicked: false,
    };
  }

  async function getPokemons (turn = 0) {
    //for increasing number of pokemons
    let cardsLength = [5, 10, 15, 20];

    //create an increasing length list of pokemons to be displayed
    const cardsPromises = Array(cardsLength[turn])
      .fill(null)
      .map((_, index) => createPokemon(index));
    const cardsArray = await Promise.all(cardsPromises);
    //console.log(cardsArray);
    return cardsArray;
  }

  useEffect(() => {
    async function fetchAndFillArray() {

      if (pokemons.length === 0) {
        const cardsArrayFilled = await getPokemons();
        setPokemons(cardsArrayFilled);
      }else if (pokemons.every(pokemon => pokemon.clicked === true) && pokemons.length === 5) {
        const cardsArrayFilled = await getPokemons(1);
        setPokemons(cardsArrayFilled);
      }else if (pokemons.every(pokemon => pokemon.clicked === true) && pokemons.length === 10) {
        const cardsArrayFilled = await getPokemons(2);
        setPokemons(cardsArrayFilled);
      }else if (pokemons.every(pokemon => pokemon.clicked === true) && pokemons.length === 15) {
        const cardsArrayFilled = await getPokemons(3);
        setPokemons(cardsArrayFilled);
      }else if (pokemons.every(pokemon => pokemon.clicked === true) && pokemons.length === 20) {
        console.log("Winner!");
      }
    }
    fetchAndFillArray();
  }, [score])

  const shufflePokemons = (pokemonsList) => {
    let randomIndex;
    const pokemonsShuffled = [];
    while (pokemonsShuffled.length !== pokemonsList.length) {
      randomIndex = Math.floor(Math.random() * pokemonsList.length);
      if (pokemonsShuffled.every(pokemon => pokemon.name !== pokemonsList[randomIndex].name)) {
        pokemonsShuffled.push(pokemonsList[randomIndex]);
      }else continue;
    }
    return pokemonsShuffled;
  }

  const handleClick = (pokemonClickedId) => {
    const currentScore = score.myScore;
    const currentPokemon = pokemons.find((pokemon) => pokemon.id === pokemonClickedId);

    //if pokemon already clicked -> set all to unclicked and zero score
    if (currentPokemon.clicked) {
      setPokemons(
        shufflePokemons(
          pokemons.map((pokemon) => {
            return {...pokemon, clicked: false}
          })
        )
      )
      setScore({...score, myScore: 0})
      return;
    }else {
      //correct click
      setPokemons(
        shufflePokemons(
          pokemons.map((pokemon) => {
            if (pokemon.name === currentPokemon.name) {
              return {...pokemon, clicked: true}
            }
            return pokemon;
          })
        )
      );
      //if new score < best score, update score
      if (score.myScore + 1 <= score.bestScore) {
        setScore({...score, myScore: currentScore + 1});
      }else {
        //if new score > best score, update best score
        setScore({
          ...score,
          myScore: currentScore + 1,
          bestScore: score.bestScore + 1
        })
      }
    }
  }
  

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className='header-desc'>
            <h1>Memory Game - Pokemons</h1>
            <p>Get points by clicking in unclicked pokemons! The number of pokemons will increase as you get points!</p>
          </div>
          <Scoreboard scoreboard = {score} />
        </header>
        <div className='App-main'>
          <Display pokemons = {pokemons} handleClick = {handleClick} />
        </div>
        <footer className='App-footer'>Developed by RodrigoAPassos</footer>
      </div>
    </>
  )
}

export default App
