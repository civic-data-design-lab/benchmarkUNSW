import React, { useState } from "react";
import { Dropdown, Card } from "react-bootstrap";
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
  return (
    <div className="light-bg padding-tb-lg select-data-break">
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
          <div className="index-tooltip top-aligned">
            <img
              src={questionCircle}
              alt="Question Circle"
              className="top-aligned-img"
              style={{ width: "18px", height: "18px", cursor: "pointer" }} // Adjust the size as needed and add cursor pointer
            />
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
