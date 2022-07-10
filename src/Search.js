import React, {useState} from 'react';
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import "./Search.css";


export default function Search() {
  const apiKey = "30c3a3303bd26fe4b2e43dfa4aeb5999";
  let [city, setCity] = useState(null);
  let [weatherData, setWeatherData] = useState({ready: false });
  function showWeatherData(response) {
    setWeatherData({
      ready: true,
      name: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      temp_min: response.data.main.temp_min,
      temp_max: response.data.main.temp_max,
      timezone: response.data.timezone,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function getWeatherData(city){
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeatherData);
    axios.get(apiUrl).catch((data, status) => {
      alert("Please type correct city");
    });
  }
  function showCurrentLocation() {
    fetch("https://extreme-ip-lookup.com/json/?key=RwmHPc7UO6BPu8h9UQkb")
      .then((res) => res.json())
      .then((response) => {  
        getWeatherData(response.city);
      })
      .catch((data, status) => {
        alert("Something went wrong");
      });
  }
  
  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getWeatherData(city);
  }
  
  if (weatherData.ready) {
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
      <CurrentWeather weather={weatherData}/>
    </div>
  );
}else{
  showCurrentLocation();
  return "Loading...";
}

}
