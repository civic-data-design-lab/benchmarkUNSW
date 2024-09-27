import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../style/WeatherDisplay.css";

import RainyIcon from "../assets/symbols/Rainy_R.svg";
import ClearIcon from "../assets/symbols/Clear_R.svg";
import CloudyIcon from "../assets/symbols/Cloudy_R.svg";
import { Dropdown, Row, Col, Button, Container } from "react-bootstrap";
function WeatherDisplay({ targetDate, targetHour }) {
  const [weatherData, setWeatherData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("/data/hourly_weather_data.json");
        const json = await response.json();
        setWeatherData(json);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (weatherData) {
      const formattedDate = targetDate;
      const formattedHour = targetHour.toString().padStart(2, "0");
      const targetTimestamp = `${formattedDate} ${formattedHour}:00:00`;
      const matchedWeather = weatherData.find(
        (item) => item.timestamp === targetTimestamp
      );
      setCurrentWeather(matchedWeather || null);
    }
  }, [weatherData, targetDate, targetHour]);

  if (!currentWeather) {
    return <div>Loading weather data...</div>;
  }

  const { temperature, percent_humidity, conditions } = currentWeather;

  const getWeatherIcon = () => {
    if (conditions.includes("Rain")) {
      return RainyIcon;
    } else if (conditions.includes("Clear")) {
      return ClearIcon;
    } else if (
      conditions.includes("Overcast") ||
      conditions.includes("Cloud") ||
      conditions.includes("Partially cloudy")
    ) {
      return CloudyIcon;
    } else {
      return ClearIcon; // Default icon
    }
  };

  const WeatherIcon = getWeatherIcon();
  const formattedTemperature = Math.round(((temperature - 32) * 5) / 9);

  const formatDate = (dateString) => {
    const options = {
      month: "long",
      day: "numeric",
      timeZone: "Australia/Sydney",
    };
    const date = new Date(dateString); // Create a Date object
    const formattedDate = date.toLocaleDateString("en-AU", options); // Format date in Sydney time
    const [day, month] = formattedDate.split(" "); // Split the formatted date
    return `${month} ${day}`; // Return in "Month Day" format
  };

  return (
    <Row className="weather-card-chart">
      <Col
        sm={6}
        xs={6}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="date-container">
          <p style={{ margin: "0px" }}>{formatDate(targetDate)}</p>
        </div>
      </Col>
      <Col
        sm={6}
        xs={6}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderLeft: "2px solid #FF2551",
          height: "100%",
        }}
      >
        {" "}
        <div className="weather-icon-container">
          <img src={WeatherIcon} alt="Weather Icon" className="weather-icon" />
        </div>
        <div>
          {" "}
          <p
            style={{ paddingRight: "10px", margin: "0px", fontSize: "0.9rem" }}
          >
            {formattedTemperature} °C
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default WeatherDisplay;
