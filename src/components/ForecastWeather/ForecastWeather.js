import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames/bind";
import styles from "./ForecastWeather.module.scss";

import images from "../../assets/images";

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { forecastWeather } from "../../services/forecastWeatherService";

const cx = classNames.bind(styles);

/*
Accordion component giúp hiển thị danh sách nội dung mà người dùng có thể mở rộng hoặc thu gọn. Accordion thường được sử dụng để tối ưu hóa giao diện,
cho phép hiển thị nhiều thông tin trong một không gian hạn chế. 

Prop allowZeroExpanded trong thư viện react-accessible-accordion có nhiệm vụ cho phép tất cả các mục trong Accordion có thể được thu gọn hoàn toàn, 
nghĩa là không có mục nào được mở.
*/

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function ForecastWeather({ forecastData }) {
  const { name } = forecastData.city;

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <label className={cx("title")}>7-Day Forecast for {name}</label>

      <Accordion allowZeroExpanded>
        {forecastData.list.slice(0, 7).map((item, index) => {
          const { dt, main, weather, clouds, wind } = item;

          const weatherIcon = images[weather[0]?.icon] || images["default"];

          const descriptionWeather = weather[0].description;

          const tempMin = (main.temp_min - 273.15).toFixed(2); // Convert Kelvin to Celsius and round to 2 decimal places
          const tempMax = (main.temp_max - 273.15).toFixed(2);
          const feelsLike = (main.feels_like - 273.15).toFixed(0);

          return (
            <AccordionItem key={dt}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className={cx("daily-item")}>
                    <img
                      src={weatherIcon}
                      alt="weather"
                      className={cx("icon-small")}
                    />
                    <label className={cx("day")}>{forecastDays[index]} </label>
                    <label className={cx("description")}>
                      {descriptionWeather}
                    </label>
                    <label className={cx("min-max")}>
                      {" "}
                      {tempMin}°C / {tempMax}°C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className={cx("daily-details")}>
                  <div className={cx("details-item")}>
                    <label>Pressure:</label>
                    <label>{main.pressure} hPa</label>
                  </div>

                  <div className={cx("details-item")}>
                    <label>Humidity:</label>
                    <label>{main.humidity}%</label>
                  </div>

                  <div className={cx("details-item")}>
                    <label>Cloud:</label>
                    <label>{clouds.all}%</label>
                  </div>

                  <div className={cx("details-item")}>
                    <label>Wind:</label>
                    <label>{wind.speed} m/s</label>
                  </div>

                  <div className={cx("details-item")}>
                    <label>Sea level:</label>
                    <label>{main.sea_level}m</label>
                  </div>

                  <div className={cx("details-item")}>
                    <label>Feel like:</label>
                    <label>{feelsLike}°C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}

ForecastWeather.propTypes = {
  forecastData: PropTypes.object.isRequired,
};

export default ForecastWeather;
