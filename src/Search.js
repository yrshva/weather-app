import React, {useState, CSSProperties, useEffect } from 'react';
import GridLoader from "react-spinners/GridLoader";
import DatalistInput from 'react-datalist-input';
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import Forecast from './Forecast';
import 'react-datalist-input/dist/styles.css';
import "./Search.css";



export default function Search() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)"
  };
  let [input, setInput] = useState('');
  let [city, setCity] = useState(null);
  let [units, setUnits] = useState("metric");
  let [loaded, setLoaded] = useState(false);
  let [weatherData, setWeatherData] = useState(null);
  function showWeatherData(response) {
    setWeatherData({
      coordinates: response.data.coord,
      name: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      temp_min: response.data.main.temp_min,
      temp_max: response.data.main.temp_max,
      timezone: response.data.timezone,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description
    });
    setLoaded(true);
  }
  function getWeatherData(){
    const apiKey = "c558530bb05c403b5dd2f204254ec041";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeatherData);
    axios.get(apiUrl).catch((data,status)=>{
      alert("Please enter correct city");
      setLoaded(false);
    })
  }
  function showCity(response){
    setCity(response.data.city);
  }
  function showCurrentLocation() {
    let apiKey = `RwmHPc7UO6BPu8h9UQkb`;
    let apiUrl = `https://extreme-ip-lookup.com/json/?key=${apiKey}`
    axios.get(apiUrl).then((showCity));
    axios.get(apiUrl).catch((data, status) => {
      console.log("Something went wrong");
    });
  }
  function updateInput(event) {
    setInput(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setCity(input);
    setInput('');
  }
  function handleCurrentLocation(event){
    event.preventDefault();
    showCurrentLocation();
  }
  function showFahrenheit (event){
    event.preventDefault();
    setUnits("imperial");
  }
  function showCelsius (event){
    event.preventDefault();
    setUnits("metric");
  }
  useEffect(()=>{
    setTimeout(()=>{
      if(city!=null){
        getWeatherData();
      }else{
        showCurrentLocation();
      }
    },500)   
  }, [city])
  if (loaded) {
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
            onChange={updateInput}
            value={input}
          />
          <input className="searchButton" type="submit" value="Search" />
          <br />
          <a href="/" onClick={handleCurrentLocation}>Show current location weather</a>
        </form>
      </div>
      <CurrentWeather weather={weatherData} units={units}/>
      <Forecast coordinates={weatherData.coordinates} units={units}/>
    </div>
  );
}else{
  return <div style={{width:"100%", height:"100vh"}}>
    <GridLoader color={"#a8d3f7"} loading={true} cssOverride={override} size={30} />
    </div>
}
}
