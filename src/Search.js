import React, { useState } from "react";
import CurrentWeather from "./CurrentWeather";
import "./Search.css";

export default function Search() {
  let [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    alert("");
  }
  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  return (
    <div>
      <div className="searchBox">
        <div className="scale">
          <a href="/">F</a>
          <span> | </span>
          <a href="/">C</a>
        </div>
        <form autocomplete="off" onSubmit={handleSubmit}>
          <input
            className="searchField"
            type="text"
            placeholder="Enter the city"
            onChange={updateCity}
          />
          <input className="searchButton" type="submit" value="Search" />
          <br />
          <a href="/">Show current location weather</a>
        </form>
      </div>
      <CurrentWeather name={city} />;
    </div>
  );
}
