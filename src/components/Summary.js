export default function Summary({ watched }) {
  function average(arr) {
    return arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
  }

  const avgImdbRating = average(watched.map((movie) => Number(movie?.imdbRating))).toFixed(2);
  const avgUserRating = average(watched.map((movie) => Number(movie?.userRating))).toFixed(2);
  const avgRuntime = average(watched.map((movie) => Number(parseInt(movie?.Runtime)))).toFixed(2);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
