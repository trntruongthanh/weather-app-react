import { useState } from "react";
import "./App.css";

import * as currentWeatherService from "./services/currentWeatherService";
import * as forecastWeatherService from "./services/forecastWeatherService";

import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from "./components/ForecastWeather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    try {
      const currentWeatherData = await currentWeatherService.currentWeather(
        lat,
        lon
      );
      const forecastWeatherData = await forecastWeatherService.forecastWeather(
        lat,
        lon
      );

      setCurrentWeather(currentWeatherData);

      setForecastWeather(forecastWeatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  console.log("currentWeatherData: ", currentWeather);
  console.log("forecastWeatherData: ", forecastWeather);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />

      {currentWeather && <CurrentWeather weatherData={currentWeather} />}

      {forecastWeather && <ForecastWeather forecastData={forecastWeather} />}
    </div>
  );
}

export default App;
