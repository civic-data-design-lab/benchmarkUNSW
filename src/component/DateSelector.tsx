import React, { useState, useEffect, useRef } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { PauseFill, PlayFill } from "react-bootstrap-icons";
import "../style/DateSelector.css";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import WeatherVertical from "./WeatherVertical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import questionCircle from "../assets/Symbols/question-circle.svg";

// Helper functions to format date and time
// Converts a number representing an hour to a 12-hour format with AM/PM
function convertNumberToHour(number) {
  const hours = Math.floor(number);
  const formattedHours = (hours === 0 ? 12 : hours % 12)
    .toString()
    .padStart(2, "0");
  const meridiemSuffix = hours >= 12 ? "PM" : "AM";
  return `${formattedHours}:00 ${meridiemSuffix}`;
}

// Formats a Date object into a string like "July 10"
function dateToString(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  return `${month} ${day}`;
}

// Converts a Date object into YYYY-MM-DD format for easier data handling
function formatDateForValue(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// TimeSlider component allows selecting and playing through hours of the day
const TimeSlider = ({ setTargetHour, setCurrentHour, currentHour }) => {
  const [isPlaying, setIsPlaying] = useState(true); // Controls play/pause state for the slider

  // Handles the automatic progression of time when "playing"
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentHour((prev) => (prev >= 23 ? 6 : prev + 1)); // Reset to 6 AM if reaching midnight
      }, 200);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isPlaying, setCurrentHour]);

  // Update the target hour based on slider position
  useEffect(() => {
    setTargetHour(currentHour);
  }, [currentHour, setTargetHour]);

  // Handle slider value change manually
  const handleSliderChange = (event) =>
    setCurrentHour(Number(event.target.value));

  // Toggle between play and pause
  const togglePlay = () => setIsPlaying(!isPlaying);

  // Function to convert hour to 24-hour format string
  const convertTo24HourFormat = (hour) => {
    return `${hour.toString().padStart(2, "0")}:00`;
  };

  return (
    <div className="container-fluid time-slider-container">
      <div className="row align-items-center">
        {/* Play/Pause Button */}
        <div className="col-2 d-flex align-items-center play-pause-button-container">
          <Button
            onClick={togglePlay}
            variant="danger"
            className="play-pause-button"
          >
            {isPlaying ? <PauseFill /> : <PlayFill />}
          </Button>
        </div>

        {/* Spacer Column */}
        <div className="spacer"></div>

        {/* Time Slider */}
        <div className="col position-relative time-slider">
          {/* Current Hour Box */}
          <div
            className="current-hour-box"
            style={{
              left: `calc(${((currentHour - 6) / 17) * 100}% + (${
                8 - ((currentHour - 6) / 17) * 16
              }px))`,
            }}
          >
            {convertTo24HourFormat(currentHour)}
          </div>
          <input
            type="range"
            className="form-range custom-slider"
            value={currentHour}
            min={6}
            max={23}
            step={1}
            onChange={handleSliderChange}
          />
          <div className="slider-label d-flex justify-content-between">
            <span>6:00</span>
            <span>24:00</span>
          </div>
          {/* Ticks */}
          <div className="slider-ticks">
            {Array.from({ length: 18 }, (_, i) => (
              <div
                key={i}
                className="tick"
                style={{
                  left: `calc(${(i / 17) * 100}% + (${8 - (i / 17) * 16}px))`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// DateDropdown component allows selecting dates from two predefined date ranges
function DateDropdown({ setTargetDate, currentHour }) {
  const [selectedDate, setSelectedDate] = useState(
    formatDateForValue(new Date(2024, 6, 10)) // Default start date: July 10, 2024
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controls dropdown open state

  // Generates two sets of dates: July 10–16, 2024, and July 24–August 6, 2024
  const generateDates = () => {
    const dates = [];

    // Add July 10–16, 2024
    let startDate1 = new Date(2024, 6, 10);
    let endDate1 = new Date(2024, 6, 16);
    while (startDate1 <= endDate1) {
      dates.push(new Date(startDate1));
      startDate1.setDate(startDate1.getDate() + 1);
    }

    // Add July 24–August 6, 2024
    let startDate2 = new Date(2024, 6, 24);
    let endDate2 = new Date(2024, 7, 6);
    while (startDate2 <= endDate2) {
      dates.push(new Date(startDate2));
      startDate2.setDate(startDate2.getDate() + 1);
    }
    // console.log("Generated Dates:", dates); // Log generated dates
    return dates;
  };

  const dates = generateDates(); // Array of valid dates

  // Handle date selection from the dropdown
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTargetDate(date); // Update parent component with new date
    // console.log("Selected Date:", date); // Log selected date
  };

  // Handle dropdown open/close state for smooth transitions
  const handleDropdownToggle = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  return (
    <div className="w-100">
      <DropdownButton
        id="date-dropdown"
        title={`${dateToString(
          new Date(
            new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)
          )
        )}, ${convertNumberToHour(currentHour || 6)}`}
        variant="outline-danger"
        style={{ backgroundColor: "#FFDAE2", border: "none", color: "#FF2551" }}
        onToggle={handleDropdownToggle}
      >
        {/* Map over generated dates to populate the dropdown menu */}
        {dates.map((date, index) => (
          <Dropdown.Item
            key={index}
            className="custom-dropdown-item"
            onClick={() => handleDateChange(formatDateForValue(date))}
          >
            {`${dateToString(date)}, ${convertNumberToHour(currentHour || 6)}`}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}

// DateSelector component combines the date dropdown, time slider, and weather component
const DateSelector = ({
  setTargetHour,
  setTargetDate,
  targetDate,
  targetHour,
}) => {
  const [hour, setHour] = useState(6); // Holds the current hour state
  const [isTooltipVisible, setIsTooltipVisible] = useState(false); // State to manage tooltip visibility
  const tooltipRef = useRef(null); // Ref to track the tooltip element

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  // Hide tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsTooltipVisible(false);
      }
    };

    if (isTooltipVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTooltipVisible]);

  return (
    <div className="date-selector-container">
      {/* Horizontal Button Icon */}
      <div className="horizontal-button-icon">
        <FontAwesomeIcon icon={faMinus} size="2x" />
      </div>

      <div className="main-content">
        {/* WeatherVertical with fixed width and 100% height */}
        <div className="weather-vertical-container">
          <WeatherVertical targetDate={targetDate} targetHour={targetHour} />
        </div>

        {/* DateDropdown and TimeSlider with flexible width */}
        <div className="date-time-container">
          {/* DateDropdown */}
          <div className="date-dropdown-container">
            <DateDropdown setTargetDate={setTargetDate} currentHour={hour} />
          </div>

          {/* TimeSlider */}
          <div className="time-slider-container">
            <TimeSlider
              setTargetHour={setTargetHour}
              setCurrentHour={setHour}
              currentHour={hour}
            />
          </div>
        </div>

        {/* Question Mark Icon */}
        <div className="tooltip-container">
          <img
            src={questionCircle}
            alt="Question Circle"
            className="question-circle-icon"
            onClick={toggleTooltip}
          />
          {isTooltipVisible && (
            <div ref={tooltipRef} className="tooltip-box">
              You can select a date and time to see the vision sensor data for
              that specific time along with the weather data.
              <div className="tooltip-arrow" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
