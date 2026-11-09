function Scoreboard({ score, bestScore, total }) {
  return (
    <div className="scoreboard">
      <p>
        Score: <strong>{score}</strong> / {total}
      </p>
      <p>
        Best score: <strong>{bestScore}</strong>
      </p>
    </div>
  );
}

export default Scoreboard;
