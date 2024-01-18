//import "../styles/card.css";

export default function Card({ imgUrl, name }) {
  return (
    <div className="card">
      <img src={imgUrl} />
      <p>{name}</p>
    </div>
  );
}