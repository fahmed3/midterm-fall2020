import React from "react";
import { places } from "./data";
import { Link } from "react-router-dom";

function Countries() {
  return (
    <div className="Countries">
      <h1>Countries</h1>
      <ul>
        {places.map((place, i) => (
          <Link to={`/wordcloud/${places[i]}`} key={i}>
            {places[i]} <br />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Countries;
