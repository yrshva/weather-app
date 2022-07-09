import React, {useState} from 'react';
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import "./Search.css";


export default function Search() {
  let [city, setCity] = useState(null);
  let [weatherData, setWeatherData] = useState(null);

  function showCurrentLocation() {
    fetch("https://extreme-ip-lookup.com/json/?key=RwmHPc7UO6BPu8h9UQkb")
      .then((res) => res.json())
      .then((response) => {  
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${response.city}&appid=c558530bb05c403b5dd2f204254ec041&units=metric`;
        axios.get(apiUrl).then(showWeatherData);
        
      })
  }
  function showWeatherData(response) {
    setWeatherData(response.data);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c558530bb05c403b5dd2f204254ec041&units=metric`;
    axios.get(apiUrl).then(showWeatherData);
    axios.get(apiUrl).catch((data, status) => {
      alert("Please type correct city");
      showCurrentLocation();
    });
  }
  function showWeather(){
    if (weatherData){
      return <CurrentWeather weather={weatherData}/>
    }
    else{
      showCurrentLocation();
    }
  }
  return (
    <div>
      <div className="searchBox">
        <div className="scale">
          <a href="/">F</a>
          <span> | </span>
          <a href="/">C</a>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit}>
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
      {showWeather()}
    </div>
  );
}
