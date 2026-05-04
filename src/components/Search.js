import { useEffect, useRef } from "react";
import "../index.css";
import { UseKeyDown } from "../useKeyDown";

export default function Search({ onSetTitle, query }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  UseKeyDown("Enter", function () {
    // If already focused - return
    if (document.activeElement === inputRef.current) return;

    inputRef.current.focus();
    onSetTitle("");
  });

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
