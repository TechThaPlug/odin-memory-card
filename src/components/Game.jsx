import { useState } from "react";
import Scoreboard from "./Scoreboard.jsx";
import Card from "./Card.jsx";
import { shuffle } from "../utils/shuffle.js";
import "../styles/game.css";

function Game({ pokemon }) {
  const [cards, setCards] = useState(() => shuffle(pokemon));
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [status, setStatus] = useState("playing");

  const score = clickedIds.length;

  function handleCardClick(id) {
    if (status !== "playing") {
      return;
    }

    if (clickedIds.includes(id)) {
      setStatus("lost");
      return;
    }

    const nextClicked = [...clickedIds, id];

    setClickedIds(nextClicked);
    setBestScore(Math.max(bestScore, nextClicked.length));
    setCards(shuffle(cards));

    if (nextClicked.length === cards.length) {
      setStatus("won");
    }
  }

  function playAgain() {
    setClickedIds([]);
    setStatus("playing");
    setCards(shuffle(cards));
  }

  return (
    <>
      <Scoreboard score={score} bestScore={bestScore} total={cards.length} />

      {status !== "playing" && (
        <div className="result" role="status">
          <p>
            {status === "won"
              ? "You remembered them all! 🎉"
              : "Game over! You scored " + score + "."}
          </p>
          <button type="button" onClick={playAgain}>
            Play again
          </button>
        </div>
      )}

      <ul className="card-grid">
        {cards.map((card) => (
          <li key={card.id}>
            <Card
              card={card}
              onSelect={handleCardClick}
              disabled={status !== "playing"}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Game;
