import { useEffect, useState } from "react";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export function usePokemon(ids) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({
    status: "loading",
    pokemon: [],
    error: "",
  });

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const results = await Promise.all(
          ids.map(async (id) => {
            const response = await fetch(API_URL + "/" + id);

            if (!response.ok) {
              throw new Error("Request failed with status " + response.status);
            }

            const data = await response.json();

            return {
              id: data.id,
              name: data.name,
              image:
                data.sprites.other["official-artwork"].front_default ??
                data.sprites.front_default,
            };
          }),
        );

        if (!ignore) {
          setState({ status: "ready", pokemon: results, error: "" });
        }
      } catch (error) {
        if (!ignore) {
          setState({ status: "error", pokemon: [], error: error.message });
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [ids, attempt]);

  function retry() {
    setState({ status: "loading", pokemon: [], error: "" });
    setAttempt((current) => current + 1);
  }

  return { ...state, retry };
}
