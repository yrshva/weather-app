import React, {useState, CSSProperties} from 'react';
import axios from 'axios';
import GridLoader from "react-spinners/GridLoader";
import ForecastDay from "./ForecastDay"

import "./Forecast.css";

export default function Forecast(props) {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)"
  };
  let [forecastData,setForecastData]=useState(null);
  let [loaded, setLoaded]=useState(false);
  function showForecast(response){
    setForecastData(response.data.daily);
    setLoaded(true);
  }
  if(loaded){
    return <div className="container">
          <div class="row d-flex justify-content-center">
            {forecastData.map(function (dailyForecast,index){
              if(index>0){
                console.log(dailyForecast);
                return <ForecastDay data={dailyForecast} units={props.units}/>
              }else return null;
            })}
        </div>
      </div>
  }else {
    let apiKey = "c558530bb05c403b5dd2f204254ec041"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.coordinates.lat}&lon=${props.coordinates.lon}&exclude=current,hourly,minutely,alerts&appid=${apiKey}&units=${props.units}`
    console.log("API URL", apiUrl);
    axios.get(apiUrl).then(showForecast);
    axios.get(apiUrl).catch((data, status) => {
      console.log("Something went wrong");
    });
    return <div style={{width:"100%", height:"100vh"}}>
    <GridLoader color={"#a8d3f7"} loading={true} cssOverride={override} size={30} />
    </div>
  }
  
}

  

