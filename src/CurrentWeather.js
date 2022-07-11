import React from 'react';
import WeatherIcon from './WeatherIcon';
import "./CurrentWeather.css";


export default function CurrentWeather(props) {
  console.log(props.units);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function currentTime(){
      let now = new Date();
      let dt = new Date((new Date().getTime())+(props.weather.timezone+(now.getTimezoneOffset()*60))*1000)
      let day = days[dt.getDay()];
      let month = months[dt.getMonth()];
      let minutes=dt.getMinutes();
      let houres = dt.getHours();
      if (minutes<10){
        minutes = `0${minutes}`;
      }
      if(houres<10){
        houres = `0${houres}`;
      }
      return (`${day}, ${dt.getDate()} ${month} ${houres}:${minutes}`);  
    }
    const unitsMapping = {
      "imperial": "°F",
      "metric": "°C"
    }
    return <div className="weatherTodayWrap">
    <div className="weatherTodayContainer">
      <div className="weatherPositioning">
        <div className="leftBox">
          <h2>{props.weather.name}</h2>
          <p>Local time:<br/>{currentTime()}</p>
        </div>
        <div className="centralBox">
          <h1><WeatherIcon icon={props.weather.icon} description={props.weather.description}/></h1>
        </div>
        <div className="rightBox">
          <h2>
            <span className="temperature">{Math.round(props.weather.temperature)}</span>
            <span className="temperature-scale">{unitsMapping[props.units]}</span>
          </h2>
          <p>
            Wind: <span></span>{Math.round(props.weather.wind)} km/h
            <br />
            Max: <span className="temperature">{Math.round(props.weather.temp_max)}</span>
            <span className="temperature-scale">{unitsMapping[props.units]}</span> | Min:
            <span className="temperature"> {Math.round(props.weather.temp_min)}</span>
            <span className="temperature-scale">{unitsMapping[props.units]}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
}
