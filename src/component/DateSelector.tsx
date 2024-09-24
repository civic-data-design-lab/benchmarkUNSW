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
              height: "100%", // Match the height of the slider
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
          {/* Current Hour Box */}
          <div
            className="current-hour-box"
            style={{
              position: "absolute",
              top: "-17px", // Adjusted to add more space between slider and number
              left: `calc(${((currentHour - 6) / 17) * 100}% + (${
                8 - ((currentHour - 6) / 17) * 16
              }px)`, // Adjusted to align with slider thumb
              transform: "translateX(-50%)",
              backgroundColor: "#FF2551",
              color: "#fff",
              padding: "2px 5px",
              borderRadius: "5px",
              fontSize: "10px",
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
            style={{ width: "100%" }}
          />
          <div
            className="slider-label d-flex justify-content-between"
            style={{ fontSize: "12px", marginTop: "8px" }} // Added marginTop to add space between slider and labels
          >
            <span>6:00</span>
            <span>24:00</span>
          </div>
          {/* Ticks */}
          <div className="slider-ticks" style={{ marginTop: "5px" }}>
            {" "}
            {/* Added marginTop to add space between slider and ticks */}
            {Array.from({ length: 18 }, (_, i) => (
              <div
                key={i}
                className="tick"
                style={{
                  position: "absolute",
                  left: `calc(${(i / 17) * 100}% + (${8 - (i / 17) * 16}px))`, // Adjusted to align with slider thumb
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
    return dates;
  };

  const dates = generateDates(); // Array of valid dates

  // Handle date selection from the dropdown
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTargetDate(date); // Update parent component with new date
  };

  // Handle dropdown open/close state for smooth transitions
  const handleDropdownToggle = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  return (
    <div
      className="w-100"
      style={{
        transition: "height 0.3s ease",
        height: isDropdownOpen ? "205px" : "50px",
        overflow: "hidden",
        alignItems: "center",
      }}
    >
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
        <FontAwesomeIcon icon={faMinus} size="2x" />
      </div>

      <div style={{ display: "flex", flex: "1", alignItems: "stretch" }}>
        {/* WeatherVertical with fixed width and 100% height */}
        <div
          style={{
            width: "50px",
            marginRight: "20px",
            height: "100%",
            paddingBottom: "1rem",
          }}
        >
          <WeatherVertical targetDate={targetDate} targetHour={targetHour} />
        </div>

        {/* DateDropdown and TimeSlider with flexible width */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            margin: "0rem 0rem 0rem 0.5rem",
          }}
        >
          {/* DateDropdown */}
          <div
            style={{
              flex: "1",
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <DateDropdown setTargetDate={setTargetDate} currentHour={hour} />
          </div>

          {/* TimeSlider */}
          <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
            <TimeSlider
              setTargetHour={setTargetHour}
              setCurrentHour={setHour}
              currentHour={hour}
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
            style={{ width: "25px", height: "25px", cursor: "pointer" }} // Adjust the size as needed and add cursor pointer
            onClick={toggleTooltip} // Toggle tooltip on click
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
