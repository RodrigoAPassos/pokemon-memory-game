import Card from "./Card";
//import "../styles/cardsBoard.css";

export default function Display({ pokemons, handleClick }) {
  
  return (
    <div className="cardsBoard">
      {pokemons.map((card) => {
        return (
          <button onClick={() => handleClick(card.id)} key={card.id}>
            <Card name={card.name} imgUrl={card.imgUrl} />
          </button>
        );
      })}
    </div>
  );
}