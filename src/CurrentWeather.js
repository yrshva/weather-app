import React from 'react';
import "./CurrentWeather.css";

export default function CurrentWeather(props) {
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
    return <div className="weatherTodayWrap">
    <div className="weatherTodayContainer">
      <div className="weatherPositioning">
        <div className="leftBox">
          <h2>{props.weather.name}</h2>
          <p>Local time:<br/>{currentTime()}</p>
        </div>
        <div className="centralBox">
          <h1><img src = {props.weather.icon} alt={props.weather.description} width={80}/></h1>
        </div>
        <div className="rightBox">
          <h2>
            <span className="temperature">{Math.round(props.weather.temperature)}</span>
            <span className="temperature-scale">℃</span>
          </h2>
          <p>
            Wind: <span></span>{Math.round(props.weather.wind)} km/h
            <br />
            Max: <span className="temperature">{Math.round(props.weather.temp_max)}</span>
            <span className="temperature-scale">°C</span> | Min:
            <span className="temperature">{Math.round(props.weather.temp_min)}</span>
            <span className="temperature-scale">°C</span>
          </p>
        </div>
      </div>
    </div>
  </div>
}
