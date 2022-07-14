import React, {useState, useEffect, CSSProperties} from 'react';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import ForecastDay from "./ForecastDay"

import "./Forecast.css";
export default function Forecast(props) {
  const override: CSSProperties = {
    display: "block",
    margin: "auto",
    textAlign: "center"
  };
  let [forecastData,setForecastData]=useState(null);
  let [loaded, setLoaded]=useState(false);
  useEffect(()=>{
    setTimeout(()=>{
      setLoaded(false)
    },1000)},[props.coordinates])
  useEffect(()=>{
    setTimeout(()=>{
      getForecast();
  },1000)},[forecastData])
  function showForecast(response){
    console.log("you made forecast api request");
    setForecastData(response.data.daily);
    setLoaded(true);

  }
  function getForecast(){
    let apiKey = "5a9af408b5fd058bec3299087478c87e"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.coordinates.lat}&lon=${props.coordinates.lon}&exclude=current,hourly,minutely,alerts&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(showForecast);
    axios.get(apiUrl).catch((data, status) => {
      console.log("Something went wrong");
    });
  }
  
  if(loaded){
    return <div className="container">
          <div className="row d-flex justify-content-center">
            {forecastData.map(function (dailyForecast,index){
              if(index>0){
                return <ForecastDay data={dailyForecast} units={props.units}/>
              }else return null;
            })}
        </div>
      </div>
  }else {
    return <BeatLoader color={"#a8d3f7"} loading={true} cssOverride={override} size={15} />
  }
  
}

  

