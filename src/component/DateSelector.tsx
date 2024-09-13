import React, { useState, useEffect } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { PauseFill, PlayFill } from "react-bootstrap-icons";
import "../style/DateSelector.css";
import WeatherVertical from "./WeatherVertical";

// Helper functions to format date and time
function convertNumberToHour(number) {
  const hours = Math.floor(number);
  const formattedHours = (hours === 0 ? 12 : hours % 12)
    .toString()
    .padStart(2, "0");
  const meridiemSuffix = hours >= 12 ? "PM" : "AM";
  return `${formattedHours}:00 ${meridiemSuffix}`;
}

function dateToString(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  return `${month} ${day}`;
}

function formatDateForValue(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// TimeSlider component
const TimeSlider = ({ setTargetHour, setCurrentHour, currentHour }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentHour((prev) => (prev >= 23 ? 6 : prev + 1));
      }, 200);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, setCurrentHour]);

  useEffect(() => {
    setTargetHour(currentHour);
  }, [currentHour, setTargetHour]);

  const handleSliderChange = (event) =>
    setCurrentHour(Number(event.target.value));
  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="container-fluid" style={{ width: "100%", padding: "0px" }}>
      <div className="row align-items-center">
        {/* Button with a width of 2 columns */}
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

        {/* Slider with a width of 10 columns */}
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
            {" "}
            <span>6:00</span>
            <span>24:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// DateDropdown component
function DateDropdown({ setTargetDate, currentHour }) {
  const [selectedDate, setSelectedDate] = useState(
    formatDateForValue(new Date(2024, 6, 10))
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const generateDates = () => {
    const dates = [];
    let startDate1 = new Date(2024, 6, 10);
    let endDate1 = new Date(2024, 6, 16);
    while (startDate1 <= endDate1) {
      dates.push(new Date(startDate1));
      startDate1.setDate(startDate1.getDate() + 1);
    }
    let startDate2 = new Date(2024, 6, 24);
    let endDate2 = new Date(2024, 7, 6);
    while (startDate2 <= endDate2) {
      dates.push(new Date(startDate2));
      startDate2.setDate(startDate2.getDate() + 1);
    }
    return dates;
  };

  const dates = generateDates();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTargetDate(date);
  };

  const handleDropdownToggle = (isOpen) => {
    setIsDropdownOpen(isOpen); // Track dropdown state for styling
  };

  return (
    <div
      className="w-100"
      style={{
        transition: "height 0.3s ease", // Smooth height transition
        height: isDropdownOpen ? "205px" : "50px", // Change height when open
        overflow: "hidden", // Prevent overflow when collapsed
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
        style={{
          backgroundColor: "#FFDAE2",
          border: "none",
          color: "#FF2551",
        }}
        onToggle={handleDropdownToggle}
      >
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

// DateSelector component with 2x2 grid layout
const DateSelector = ({
  setTargetHour,
  setTargetDate,
  targetDate,
  targetHour,
}) => {
  const [hour, setHour] = useState(0);

  return (
    <div style={{ backgroundColor: "#FFDAE2", padding: "10px", width: "100%" }}>
      {/* First row with WeatherVertical and DateDropdown */}
      <div className="row">
        <div className="col-md-6" style={{ marginBottom: "20px" }}>
          <WeatherVertical targetDate={targetDate} targetHour={targetHour} />
        </div>
        <div className="col-md-6">
          <DateDropdown setTargetDate={setTargetDate} currentHour={hour} />
        </div>
      </div>

      {/* Second row with TimeSlider */}
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
