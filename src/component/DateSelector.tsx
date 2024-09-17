import React, { useState, useEffect } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { PauseFill, PlayFill } from "react-bootstrap-icons";
import "../style/DateSelector.css";
import WeatherVertical from "./WeatherVertical";

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
  const [isPlaying, setIsPlaying] = useState(false); // Controls play/pause state for the slider

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

  return (
    <div className="container-fluid" style={{ width: "100%", padding: "0px" }}>
      <div className="row align-items-center">
        {/* Play/Pause Button */}
        <div className="col-2 d-flex">
          <Button
            onClick={togglePlay}
            variant="danger"
            style={{
              backgroundColor: "#FF2551",
              border: "none",
              borderRadius: "50%",
            }}
          >
            {isPlaying ? <PauseFill /> : <PlayFill />}
          </Button>
        </div>

        {/* Time Slider */}
        <div className="col-10">
          <input
            type="range"
            className="form-range"
            value={currentHour}
            min={6}
            max={23}
            step={1}
            onChange={handleSliderChange}
          />
          <div
            className="slider-label d-flex justify-content-between"
            style={{ fontSize: "12px" }}
          >
            <span>6:00</span>
            <span>24:00</span>
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
  const [hour, setHour] = useState(0); // Holds the current hour state

  return (
    <div style={{ backgroundColor: "#FFDAE2", padding: "10px", width: "100%" }}>
      {/* Row 1: WeatherVertical and DateDropdown */}
      <div className="row">
        <div className="col-md-6" style={{ marginBottom: "20px" }}>
          <WeatherVertical targetDate={targetDate} targetHour={targetHour} />
        </div>
        <div className="col-md-6">
          <DateDropdown setTargetDate={setTargetDate} currentHour={hour} />
        </div>
      </div>

      {/* Row 2: TimeSlider */}
      <div className="row mt-2">
        <div className="col-md-12">
          <TimeSlider
            setTargetHour={setTargetHour}
            setCurrentHour={setHour}
            currentHour={hour}
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
