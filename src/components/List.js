import Movie from "./Movie";
import WatchedMovie from "./WatchedMovie";

export default function List({ list, onSelect }) {
  return (
    <ul className="list">
      {list.map((m, i) =>
        list[i].runtime ? (
          <WatchedMovie key={m.imdbID} movie={m} />
        ) : (
          <Movie key={m.imdbID} movie={m} onSelect={() => onSelect(m.imdbID)} />
        )
      )}
    </ul>
  );
}
