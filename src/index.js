import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import App from "./App-v1";
import StarRating from "./components/StarRating";
import "./index.css";

function Test() {
  const [filmRating, setFilmRating] = useState(0);
  return (
    <div>
      <StarRating color="blue" maxRating={10} setFilmRating={setFilmRating} />
      <p>This film was rated {filmRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
