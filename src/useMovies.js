import { useEffect, useState } from "react";

const KEY = process.env.REACT_APP_OMDB_API_KEY;

export function useMovies(title, callback) {
  const [movies, setMovies] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch movies effect
  useEffect(() => {
    callback?.();

    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const result = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${title}`, { signal: controller.signal });

        // Bad network or server error
        if (!result.ok) throw new Error("Fetching Movies Failed");

        const data = await result.json();

        // Data not found
        if (data.Response === "False" && title.length >= 3) throw new Error("No Matches Found");

        setMovies(data?.Search);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    // Avoid fetch on every key stroke
    if (title.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    //handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [title, callback]);

  return { movies, loading, error };
}
