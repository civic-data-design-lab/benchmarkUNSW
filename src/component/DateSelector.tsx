import React, { useState, useEffect, useRef } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { PauseFill, PlayFill } from "react-bootstrap-icons";
import "../style/DateSelector.css";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import WeatherVertical from "./WeatherVertical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import questionCircle from "../assets/Symbols/question-circle.svg";
import "../style/DateSelector.css"; // Make sure to import the CSS file

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

// Formats a Date object into a string like "July 10" in Sydney time
function dateToString(date: Date): string {
  const sydneyDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Australia/Sydney" })
  );
  const day = sydneyDate.getDate();
  const month = sydneyDate.toLocaleString("en-US", {
    month: "long",
    timeZone: "Australia/Sydney",
  });
  return `${month} ${day}`;
}

// Converts a Date object into YYYY-MM-DD format for easier data handling
function formatDateForValue(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// TimeSlider component allows selecting and playing through hours and minutes of the day
const TimeSlider = ({
  setTargetHour,
  setTargetMinute,
  setCurrentHour,
  setCurrentMinute,
  currentHour,
  currentMinute,
  currentDate,
  setCurrentDate,
  setTargetDate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const endDate = new Date(2024, 7, 6); // August 6, 2024 in local time

  // Handles the automatic progression of time when "playing"
  useEffect(() => {
    let interval = null;
    const updateInterval = 10; // Base interval in milliseconds

    const updateTime = () => {
      setCurrentMinute((prevMinute) => {
        const newMinute = prevMinute >= 55 ? 0 : prevMinute + 5;
        setTargetMinute(newMinute); // Update targetMinute here
        if (prevMinute >= 55) {
          setCurrentHour((prevHour) => {
            if (prevHour >= 23) {
              const nextDate = new Date(currentDate);
              nextDate.setDate(nextDate.getDate() + 1);
              nextDate.setHours(6, 0, 0, 0); // Reset to 6 AM

              // Check if we need to jump to July 24
              if (nextDate.getMonth() === 6 && nextDate.getDate() === 17) {
                nextDate.setDate(24);
              }

              if (nextDate > endDate) {
                setIsPlaying(false);
                return prevHour;
              }

              setCurrentDate(nextDate);
              console.log("Next Date: ", nextDate.toLocaleString());
              setTargetDate(formatDateForValue(nextDate));
              setTargetHour(6); // Update targetHour when changing date
              setTargetMinute(0); // Reset targetMinute when changing date
              return 6; // Reset to 6 AM for the next day
            }
            const newHour = prevHour + 1;
            setTargetHour(newHour); // Update targetHour here
            return newHour;
          });
        }
        return newMinute;
      });
    };

    if (isPlaying) {
      interval = setInterval(updateTime, updateInterval);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [
    isPlaying,
    setCurrentHour,
    setCurrentMinute,
    currentDate,
    setCurrentDate,
    setTargetDate,
    endDate,
    setTargetHour,
    setTargetMinute,
  ]);

  // Update the target hour and minute based on current values
  useEffect(() => {
    setTargetHour(currentHour);
    setTargetMinute(currentMinute);
  }, [currentHour, currentMinute, setTargetHour, setTargetMinute]);

  // Handle slider value change manually
  const handleSliderChange = (event) => {
    const totalMinutes = Number(event.target.value);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setCurrentHour(hours + 6); // Add 6 because our range starts at 6 AM
    setCurrentMinute(minutes);
  };

  // Toggle between play and pause
  const togglePlay = () => setIsPlaying(!isPlaying);

  // Function to convert hour and minute to 24-hour format string
  const convertTo24HourFormat = (hour, minute) => {
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate total minutes for the slider value
  const sliderValue = (currentHour - 6) * 60 + currentMinute;

  return (
    <div className="container-fluid" style={{ width: "100%", padding: "0px" }}>
      <div className="row align-items-center">
        {/* Play/Pause Button */}
        <div
          className="col-2 d-flex align-items-center"
          style={{ height: "100%" }}
        >
          <Button
            onClick={togglePlay}
            variant="danger"
            style={{
              backgroundColor: "#FF2551",
              border: "none",
              borderRadius: "10px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isPlaying ? <PauseFill /> : <PlayFill />}
          </Button>
        </div>

        {/* Spacer Column */}
        <div className="spacer"></div>

        {/* Time Slider */}
        <div className="col position-relative">
          {/* Current Time Box */}
          <div
            className="current-time-box"
            style={{
              left: `calc(${(sliderValue / (17 * 60)) * 100}% + (${
                8 - (sliderValue / (17 * 60)) * 16
              }px))`,
            }}
          >
            {convertTo24HourFormat(currentHour, currentMinute)}
          </div>
          <input
            type="range"
            className="form-range custom-slider"
            value={sliderValue}
            min={0}
            max={17 * 60} // 17 hours * 60 minutes
            step={5}
            onChange={handleSliderChange}
            style={{ width: "100%" }}
          />
          <div className="slider-label d-flex justify-content-between">
            <span>6:00</span>
            <span>23:00</span>
          </div>
          {/* Ticks */}
          <div className="slider-ticks" style={{ marginTop: "5px" }}>
            {Array.from({ length: 18 }, (_, i) => (
              <div
                key={i}
                className="tick"
                style={{
                  position: "absolute",
                  left: `calc(${(i / 17) * 100}% + (${8 - (i / 17) * 16}px))`,
                  transform: "translateX(-50%)",
                  height: "5px",
                  width: "0.5px",
                  backgroundColor: "#FF2551",
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
function DateDropdown({
  setTargetDate,
  currentHour,
  currentDate,
  setCurrentDate,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const dates = generateDates();

  const handleDateChange = (date) => {
    const newDate = new Date(date);
    // Batch updates together
    setCurrentDate((prevDate) => {
      // Only update targetDate if the date actually changed
      if (prevDate.getTime() !== newDate.getTime()) {
        setTargetDate(date);
      }
      return newDate;
    });
    setIsDropdownOpen(false);
  };

  const handleDropdownToggle = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  return (
    <div
      className={`date-selector-container w-100 ${
        isDropdownOpen ? "open" : ""
      }`}
    >
      <DropdownButton
        title={`${dateToString(currentDate)}, ${convertNumberToHour(
          currentHour || 6
        )}`}
        variant="outline-danger"
        onToggle={handleDropdownToggle}
        className="custom-dropdown-button"
      >
        {dates.map((date, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleDateChange(formatDateForValue(date))}
            className="custom-dropdown-item"
            style={{ position: "relative", zIndex: 1000 }} // Add relative positioning to the dropdown item
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
  setTargetMinute,
  targetDate,
  targetHour,
  targetMinute,
}) => {
  const [hour, setHour] = useState(6); // Holds the current hour state
  const [minute, setMinute] = useState(0); // Holds the current minute state
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 11)); // Start from July 10, 2024
  const [isTooltipVisible, setIsTooltipVisible] = useState(false); // State to manage tooltip visibility
  const tooltipRef = useRef(null); // Ref to track the tooltip element

  // Add useEffect to log changes in targetDate, targetHour, and targetMinute
  // useEffect(() => {
  //   console.log("Target Date:", targetDate);
  //   console.log("Target Hour:", targetHour);
  //   console.log("Target Minute:", targetMinute);
  // }, [targetDate, targetHour, targetMinute]);

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
    <div
      style={{
        backgroundColor: "#FFDAE2",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Horizontal Button Icon */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon icon={faMinus} size="2x" className="minus-icon" />
      </div>

      <div style={{ display: "flex", flex: "1", alignItems: "stretch" }}>
        {/* WeatherVertical with fixed width and 100% height */}
        <div
          style={{
            width: "50px",
            marginRight: "20px",
            height: "90%",
          }}
        >
          <WeatherVertical targetDate={targetDate} targetHour={targetHour} />
        </div>

        {/* DateDropdown and TimeSlider with flexible width */}
        <div
          style={{
            flex: "1",
            margin: "0rem 0rem 0rem 0.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* DateDropdown */}
          <div className="date-dropdown-container">
            <DateDropdown
              setTargetDate={setTargetDate}
              currentHour={hour}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />
          </div>

          {/* TimeSlider */}
          <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
            <TimeSlider
              setTargetHour={setTargetHour}
              setTargetMinute={setTargetMinute}
              setCurrentHour={setHour}
              setCurrentMinute={setMinute}
              currentHour={hour}
              currentMinute={minute}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              setTargetDate={setTargetDate}
            />
          </div>
        </div>

        {/* Question Mark Icon */}
        <div
          className="tooltip-container"
          style={{
            position: "relative", // Added to position the tooltip
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            marginLeft: "0.5rem",
          }}
        >
          <img
            src={questionCircle}
            alt="Question Circle"
            onClick={toggleTooltip} // Toggle tooltip on click\
            className="question-circle"
          />
          {isTooltipVisible && (
            <div
              ref={tooltipRef} // Attach ref to the tooltip
              className="tooltip-box"
              style={{
                backgroundColor: "#FFEFF3",
                color: "#FF2551",
                textAlign: "center",
                borderRadius: "6px",
                padding: "5px 10px",
                position: "absolute",
                zIndex: 1,
                bottom: "110%", // Position above the icon
                right: "0", // Align to the right of the icon
                opacity: 1,
                transition: "opacity 0.3s",
                fontSize: "10px",
                width: "150px",
              }}
            >
              You can select a date and time to see the vision sensor data for
              that specific time along with the weather data.
              <div
                style={{
                  position: "absolute",
                  top: "100%", // Arrow pointing down
                  right: "10px", // Position arrow at the right bottom of the square
                  borderWidth: "5px",
                  borderStyle: "solid",
                  borderColor: "#FFEFF3 transparent transparent transparent",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
