import coldBg from "./Assets/cold.jpg";
import hotBg from "./Assets/hot.jpg";
import midBg from "./Assets/mid.jpg"
import './App.css';
import Description from "./components/Description";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
import Forecast from "./components/ForecastdHourly";
import ForecastWeekly from "./components/ForecastWeekly";
import { getFormattedForecastWeather } from "./weatherService";

function App() {

  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState('Turda');
  const [Bg , setBg] = useState(hotBg)
  const [daily, setDaily] = useState([])
  const [hourly, setHourly] = useState([])

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
 
      setWeather(data);
      
      const data2 = await getFormattedForecastWeather(data.name)

      setDaily(data2.daily)
      setHourly(data2.hourly)
  

   


if ((data.temp <= 10 && units === 'metric') ) {

  setBg(coldBg);
} 

if ((data.temp >= 20 && units === 'metric')  ) {

  setBg(midBg);
} 

if ((data.temp >= 30 && units === 'metric') ) {

  setBg(hotBg);
}

    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitChange = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };



  
  return (
    <div className="App" style={{ backgroundImage: `url(${Bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
  <div className="input-container">
    <input type="text" name="city" placeholder="Enter city.." onKeyDown={enterKeyPressed} />
    <button onClick={handleUnitChange}>
      {units === "metric" ? "ºF" : "ºC"}
    </button>
  </div>
</div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
     
              </div>
              <div className="temperature">
                <h1>{weather.temp.toFixed()} º{units === 'metric' ? 'C' :'F' }</h1>
              </div>
  
            </div>
            <Forecast title="Daily Forecast"  hourly={hourly} />
            <ForecastWeekly title="Weekly Forecast" daily={daily}/>
          
            <Description weather={weather} units={units} />

          </div>
        )}

      </div>

    </div>
  );
}

export default App;