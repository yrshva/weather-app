import React, {useState, CSSProperties } from 'react';
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import "./Search.css";


export default function Search() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)"
  };
  const apiKey = "30c3a3303bd26fe4b2e43dfa4aeb5999";
  let [units, setUnits] = useState("metric");
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
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description
    });
  }

  function getWeatherData(){
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeatherData);
    axios.get(apiUrl).catch((data, status) => {
      alert("Please type correct city");
    });

  }
  function showCity(response){
    setCity(response.data.city);
    if(city){
      getWeatherData();
    }
    
  }
  function showCurrentLocation() {
    let apiKey = `RwmHPc7UO6BPu8h9UQkb`;
    let apiUrl = `https://extreme-ip-lookup.com/json/?key=${apiKey}`
    axios.get(apiUrl).then(showCity);
    axios.get(apiUrl).catch((data, status) => {
      alert("Something went wrong");
    });
  }
  
  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getWeatherData();
  }
  function showFahrenheit (event){
    event.preventDefault();
    setUnits("imperial");
    getWeatherData();
  }
  function showCelsius (event){
    event.preventDefault();
    setUnits("metric");
    getWeatherData();
  }
  if (weatherData.ready) {
    return (
    <div>
      <div className="searchBox">
        <div className="scale">
          <a href="/" onClick={showFahrenheit}>°F</a>
          <span> | </span>
          <a href="/" onClick={showCelsius}>°C</a>
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
      <CurrentWeather weather={weatherData} units={units}/>
    </div>
  );
}else{
  showCurrentLocation();
  return <div style={{width:"100%", height:"100vh"}}>
    <GridLoader color={"#a8d3f7"} loading={true} cssOverride={override} size={30} />
    </div>
}

}
