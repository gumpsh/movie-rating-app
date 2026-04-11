import "../index.css";

export default function Search({ onSetTitle, query }) {
  //const [query, setQuery] = useState("");
  //const inputRef = useRef();

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetTitle(e.target.value)}
      //onKeyDown={(e) => (e.key === "Enter" ? onSetTitle(e.target.value) : null)}
    />
  );
}
