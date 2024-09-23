import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../style/WeatherVertical.css";

import RainyIcon from "../assets/symbols/Rainy.svg";
import ClearIcon from "../assets/symbols/Clear.svg";
import CloudyIcon from "../assets/symbols/Cloudy.svg";

function WeatherVertical({ targetDate, targetHour }) {
  const [weatherData, setWeatherData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch the weather data
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
      // Format the date and hour for comparison
      const formattedDate = targetDate; // Assuming the targetDate is in 'YYYY-MM-DD' format
      const formattedHour = targetHour.toString().padStart(2, "0"); // Ensure the hour is in HH format

      // Create a timestamp string like '2024-07-10 15:00:00'
      const targetTimestamp = `${formattedDate} ${formattedHour}:00:00`;

      // Find the matching weather data based on the timestamp
      const matchedWeather = weatherData.find(
        (item) => item.timestamp === targetTimestamp
      );

      setCurrentWeather(matchedWeather || null);
    }
  }, [weatherData, targetDate, targetHour]);

  if (!currentWeather) {
    return <div>Loading weather data...</div>;
  }

  // Extract the weather information from the matched entry
  const { temperature, percent_humidity, conditions } = currentWeather;

  // Function to determine which icon to display
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
      return OtherIcon;
    }
  };

  const WeatherIcon = getWeatherIcon(); // Get the correct SVG icon

  return (
    <Card className="weather-card">
      <Card.Body>
        <div className="weather-info">
          <p>{Math.round(((temperature - 32) * 5) / 9)} °C</p>
          <div className="weather-icon-container">
            <img
              src={WeatherIcon}
              alt="Weather Icon"
              className="weather-icon"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default WeatherVertical;
