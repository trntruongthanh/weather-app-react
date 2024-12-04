import * as httpRequest from "../utils/httpRequest";

export const forecastWeather = async (lat, lon) => {
  try {
    const res = await httpRequest.openWeatherRequest.get("forecast", {
      params: {
        lat: lat,
        lon: lon,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
      },
    });

    // Dữ liệu trả về
    return res.data;
  } catch (error) {
    console.log("Error fetching forecast weather data:", error);
    return null;
  }
};
