import axios from "axios";

// console.log("Base URL:", process.env.REACT_APP_WEATHER_BASE_URL);
// console.log("Open Weather Base URL:", process.env.REACT_APP_OPEN_WEATHER_BASE_URL);

const rapidAPIRequest = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_BASE_URL,
});

const openWeatherRequest = axios.create({
  baseURL: process.env.REACT_APP_OPEN_WEATHER_BASE_URL,
});

export const getRapidAPIWeather = async (path, option = {}) => {
  try {
    const response = await rapidAPIRequest.get(path, option);
    return response;
  } catch (error) {
    console.error("HTTP GET Error:", error);
    throw error;
  }
};

export const getOpenWeather = async (path, option = {}) => {
  try {
    const response = await openWeatherRequest.get(path, option);
    return response;
  } catch (error) {
    console.error("HTTP GET Error:", error);
    throw error;
  }
};

export { rapidAPIRequest, openWeatherRequest };
