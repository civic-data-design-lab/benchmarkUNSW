import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import "../style/DataSelector.css"; // Import the CSS file
import questionCircle from "../assets/Symbols/question-circle-w.svg";

const DataBreakdownDropdown = ({ selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`data-dropdown-container ${isOpen ? "open" : ""}`}>
      <Dropdown
        onSelect={setSelectedOption}
        onToggle={(isOpen) => setIsOpen(isOpen)}
        className="data-dropdown"
      >
        <Dropdown.Toggle className="data-dropdown-toggle">
          {selectedOption}
        </Dropdown.Toggle>
        <Dropdown.Menu className="data-dropdown-menu">
          <Dropdown.Item eventKey="Socialising" className="data-dropdown-item">
            Socialising
          </Dropdown.Item>
          <Dropdown.Item eventKey="Staying" className="data-dropdown-item">
            Staying
          </Dropdown.Item>
          <Dropdown.Item eventKey="Sitting" className="data-dropdown-item">
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
    <div className="light-bg padding-tb-lg select-data-break">
      <div className="text-center primary-subtitle data-selector-title">
        Select Data Breakdown
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
              className="index-tooltip-img"
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
                  bottom: "140%",
                  right: "-10px",
                  opacity: 1,
                  transition: "opacity 0.3s",
                  fontSize: "10px",
                  width: "150px",
                }}
              >
                {selectedOption === "Socialising" ? (
                  <>
                    We assume that if people stay within 1m of each other for
                    more than 2mins, they are <strong>socialising</strong>. And{" "}
                    <strong>socialising index</strong> is the average percentage
                    of people engaged in socialising on site.
                  </>
                ) : selectedOption === "Staying" ? (
                  <>
                    We assume that if people stay within the research area for
                    more than 5mins, they are <strong>staying</strong>. And{" "}
                    <strong>{selectedOption} index</strong> is the average
                    percentage of people {selectedOption.toLowerCase()} on site.
                  </>
                ) : (
                  <>
                    <strong>{selectedOption} index</strong> is the average
                    percentage of people {selectedOption.toLowerCase()} on site.
                  </>
                )}
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: "14px",
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
            <div className="data-card-index">{index2}</div>
            <div className="data-card-name">{index2Name}</div>
          </Card>
          <Card className="data-card" style={{ marginTop: "0.5rem" }}>
            <div className="data-card-index">{index3}</div>
            <div className="data-card-name">{index3Name}</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataSelector;
