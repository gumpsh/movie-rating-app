import { useEffect, useRef } from "react";
import "../index.css";

export default function Search({ onSetTitle, query }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputRef.current) return;
      if (e.code === "Enter") {
        inputRef.current.focus();
        onSetTitle("");
      }
    }
    document.addEventListener("keydown", callback);

    return () => document.addEventListener("keydown", callback);
  }, [onSetTitle]);

  return (
    <input
      ref={inputRef}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetTitle(e.target.value)}
    />
  );
}
