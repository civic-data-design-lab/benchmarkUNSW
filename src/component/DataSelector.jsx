import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import "../style/DataSelector.css"; // Import the CSS file
import questionCircle from "../assets/Symbols/question-circle-w.svg";

const DataBreakdownDropdown = ({ selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="data-breakdown-dropdown"
      style={{ height: isOpen ? "160px" : "40px" }} // Adjust heights as needed
    >
      <Dropdown
        onSelect={setSelectedOption}
        onToggle={(isOpen) => setIsOpen(isOpen)}
      >
        <Dropdown.Toggle
          id="dropdown-basic"
          className="w-100 custom-red-dropdown"
        >
          {selectedOption}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            className="custom-dropdown-item"
            eventKey="Socialising"
          >
            Socialising
          </Dropdown.Item>
          <Dropdown.Item className="custom-dropdown-item" eventKey="Staying">
            Staying
          </Dropdown.Item>
          <Dropdown.Item className="custom-dropdown-item" eventKey="Sitting">
            Sitting
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const DataSelector = ({
  selectedOption,
  setSelectedOption,
  indexName,
  index,
  index2Name,
  index2,
  index3Name,
  index3,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setIsTooltipVisible(false);
    }
  };

  useEffect(() => {
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
      className="light-bg padding-tb-lg select-data-break"
      style={{
        height: "23vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <div className="text-center primary-subtitle">
        <p>Select Data Breakdown</p>
      </div>

      <DataBreakdownDropdown
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className="selected-index-container flex-ratio-5-7">
        <Card className="selected-index">
          <p className="index-percentage">{Math.round(index)}%</p>
          <div className="index-details">
            <p className="index-details-text">{selectedOption}</p>
            <p className="index-details-text">Index</p>
          </div>
          <div
            className="index-tooltip top-aligned"
            onClick={toggleTooltip}
            ref={tooltipRef}
          >
            <img
              src={questionCircle}
              alt="Question Circle"
              className="top-aligned-img"
              style={{ width: "18px", height: "18px", cursor: "pointer" }} // Adjust the size as needed and add cursor pointer
            />
            {isTooltipVisible && (
              <div
                className="tooltip-box"
                style={{
                  backgroundColor: "#FFEFF3",
                  color: "#FF2551",
                  textAlign: "center",
                  borderRadius: "6px",
                  padding: "5px 10px",
                  position: "absolute",
                  zIndex: 1,
                  bottom: "140%", // Position above the icon
                  right: "-10px", // Align to the right of the icon
                  opacity: 1,
                  transition: "opacity 0.3s",
                  fontSize: "10px",
                  width: "150px",
                }}
              >
                <strong>{selectedOption} index</strong> is the average
                percentage of people {selectedOption} on site, by calculating
                the number of people in the {selectedOption} and dividing it by
                the total number of people on site.
                <div
                  style={{
                    position: "absolute",
                    top: "100%", // Arrow pointing down
                    right: "14px", // Position arrow at the right bottom of the square
                    borderWidth: "5px",
                    borderStyle: "solid",
                    borderColor: "#FFEFF3 transparent transparent transparent",
                  }}
                />
              </div>
            )}
          </div>
        </Card>

        <div className="data-cards-container">
          <Card className="data-card">
            <p
              style={{
                fontSize: "1.5rem",
                margin: "0rem",
                paddingLeft: "0.5rem",
              }}
            >
              {index2}
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                margin: "0rem",
                paddingLeft: "0.5rem",
              }}
            >
              {index2Name}
            </p>
          </Card>
          <Card className="data-card" style={{ marginTop: "0.5rem" }}>
            <p
              style={{
                fontSize: "1.5rem",
                margin: "0rem",
                paddingLeft: "0.5rem",
              }}
            >
              {index3}
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                margin: "0rem",
                paddingLeft: "0.5rem",
              }}
            >
              {index3Name}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataSelector;
