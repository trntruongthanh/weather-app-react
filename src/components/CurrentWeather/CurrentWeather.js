import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./CurrentWeather.module.scss";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function CurrentWeather({ weatherData }) {
  const { name, weather, main, wind } = weatherData;

  // Prepare weather details using the API response
  const weatherDetails = [
    {
      label: "Feels like",
      value: `${(main.feels_like - 273.15).toFixed(0)}°C`, // Convert from Kelvin to Celsius Celsius=Kelvin−273.15
    },
    { label: "Wind", value: `${wind.speed} m/s` },
    { label: "Humidity", value: `${main.humidity} %` },
    { label: "Pressure", value: `${main.pressure} hPa` },
  ];

  // Find the main weather description (e.g., "Clear", "Cloudy")
  const weatherDescription =
    weather[0]?.description || "No description available";

  const weatherIcon = images[weather[0]?.icon] || images["default"];

  // Convert temperature from Kelvin to Celsius
  const temperature = (main.temp - 273.15).toFixed(0);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("top")}>
        <div>
          <p className={cx("city")}>{name}</p>
          <p className={cx("weather-description")}>{weatherDescription}</p>
        </div>
        <img alt="weather" className={cx("weather-icon")} src={weatherIcon} />
      </div>

      <div className={cx("bottom")}>
        <p className={cx("temperature")}>{temperature}°C</p>

        <div className={cx("details")}>
          <div className={cx("parameter-row")}>
            <span className={cx("parameter-label")}>Details</span>
          </div>

          {weatherDetails.map((detail, index) => (
            <div key={index} className={cx("parameter-row")}>
              <span className={cx("parameter-label")}>{detail.label} </span>
              <span className={cx("parameter-value")}>{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

CurrentWeather.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default CurrentWeather;
