import { useEffect, useState } from "react";
import List from "./components/List";
import ListBox from "./components/ListBox";
import Logo from "./components/Logo";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import NumResults from "./components/NumResults";
import Search from "./components/Search";
import StarRating from "./components/StarRating";
import Summary from "./components/Summary";

const KEY = "1a521789";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState();
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const result = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${title}`);

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

    fetchMovies();
  }, [title]);

  function Loading() {
    return <p className="loader">Loading...</p>;
  }

  function ErrorMessage({ message }) {
    return <p className="error">{message}</p>;
  }

  async function handleSelectedMovie(id) {
    setSelectedMovieId(id);
    const watchedMovie = movies.find((m) => id === m.imdbID);
    setWatched((current) => [...current, watchedMovie]);

    try {
      setError("");
      setIsLoading(true);
      const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);

      // Bad network or server error
      if (!response.ok) throw new Error("Fetching Movie Failed");

      const data = await response.json();
      //console.log("details", data);

      // Data not found
      if (data.Response === "False") throw new Error("Movie details not found");

      setDetails(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function MovieDetails({ details }) {
    return (
      <div className="details">
        <h3>{details.Title}</h3>
        <section>
          <img src={details.Poster} alt={`${details.Title} poster`} />
          <StarRating />
        </section>
        <div className="details-overview">
          <h2>{details.Genre}</h2>
          <p>{details.Plot}</p>
        </div>
        {details?.Ratings?.map((rating, i) => (
          <Rating key={i} source={rating.Source} value={rating.Value} />
        ))}
      </div>
    );
  }

  function Rating({ source, value }) {
    return (
      <div className="rating">
        <p>
          {source}
          <span> {value}</span>
        </p>
      </div>
    );
  }

  return (
    <>
      <NavBar>
        <Logo logo="🍿" title={"usePopcorn"} />
        <Search onSetTitle={setTitle} query={title} />
        <NumResults numResults={movies && !error ? movies.length : 0} />
      </NavBar>
      <Main>
        <ListBox>
          {loading && <Loading />}
          {!loading && !error && <List list={movies} onSelect={handleSelectedMovie} />}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <ListBox>
          {loading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {selectedMovieId ? (
            <MovieDetails details={details} />
          ) : (
            <>
              <Summary watched={watched} />
              <List list={watched} />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
