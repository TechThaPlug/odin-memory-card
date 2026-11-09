import { usePokemon } from "./hooks/usePokemon.js";
import Game from "./components/Game.jsx";
import "./styles/app.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Defined outside the component so the array stays the same between renders
const POKEMON_IDS = [1, 4, 6, 7, 9, 25, 39, 52, 94, 133, 143, 150];

function App() {
  const { status, pokemon, error, retry } = usePokemon(POKEMON_IDS);

  return (
    <main className="app">
      <header className="app-header">
        <h1>Pokémon Memory Game</h1>
        <p>
          Click each Pokémon only once. Click the same one twice and it's game
          over!
        </p>
      </header>

      {status === "loading" && <p className="message">Catching Pokémon…</p>}

      {status === "error" && (
        <div className="message">
          <p>Something went wrong: {error}</p>
          <button type="button" onClick={retry}>
            Try again
          </button>
        </div>
      )}

      {status === "ready" && <Game pokemon={pokemon} />}
      <SpeedInsights />
    </main>
  );
}

export default App;
