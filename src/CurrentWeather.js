import React from "react";
import "./CurrentWeather.css";

export default function CurrentWeather(props) {
  return (
    <div className="weatherTodayWrap">
      <div className="weatherTodayContainer">
        <div className="weatherPositioning">
          <div className="leftBox">
            <h2>{props.name}</h2>
            <p>Thu, 7 June</p>
          </div>
          <div className="centralBox">
            <h1>😬</h1>
          </div>
          <div className="rightBox">
            <h2>
              <span className="temperature">28</span>
              <span className="temperature-scale">℃</span>
            </h2>
            <p>
              Wind: <span></span> km/h
              <br />
              Max: <span className="temperature"></span>
              <span className="temperature-scale">°C</span> | Min:
              <span className="temperature"></span>
              <span className="temperature-scale">°C</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
