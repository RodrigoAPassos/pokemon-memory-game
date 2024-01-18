import { useEffect } from "react";

export default function Scoreboard({ scoreboard }) {
  return (
    <div className="scoreContainer">
      <p>Score: {scoreboard.myScore}</p>
      <p>Best Score: {scoreboard.bestScore}</p>
    </div>
  );
}