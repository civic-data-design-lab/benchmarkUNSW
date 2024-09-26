import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../style/StaticMaps.css";

// Import all images
import socialisingImage1 from "../assets/StaticMaps/socializing1_0710_13-35.svg";
import socialisingImage2 from "../assets/StaticMaps/socializing2_0724_16-15.svg";
import socialisingImage3 from "../assets/StaticMaps/socializing3_0725_09-20.svg";
import stayingImage1 from "../assets/StaticMaps/dwelling1_0710_13-35.svg";
import stayingImage2 from "../assets/StaticMaps/dwelling2_0728_12-15.svg";
import stayingImage3 from "../assets/StaticMaps/dwelling3_0724_13-45.svg";
import sittingImage1 from "../assets/StaticMaps/sitting1_0710_13-35.svg";
import sittingImage2 from "../assets/StaticMaps/sitting2_0728_12-15.svg";
import sittingImage3 from "../assets/StaticMaps/sitting3_0725_10-15.svg";

const StaticMaps = ({ selectedOption, getTextForSelection }) => {
  // Define images based on selectedOption
  const images = {
    Socialising: [socialisingImage1, socialisingImage2, socialisingImage3],
    Staying: [stayingImage1, stayingImage2, stayingImage3],
    Sitting: [sittingImage1, sittingImage2, sittingImage3],
  };

  const renderCol = (date, image, ppl) => (
    <Col className="map-gap">
      <div>
        <Row className="date-text">{date}</Row>
        <Row className="map-image">
          <img src={image} className="static-map-image" />
        </Row>
        <Row className="index-text">
          {ppl} were {selectedOption}
        </Row>
      </div>
    </Col>
  );

  return (
    <div>
      <Row>
        <div className="static-maps-title">
          <p>{getTextForSelection()}</p>
        </div>
      </Row>
      <Row>
        {selectedOption === "Socialising" && (
          <div className="static-maps-container">
            {renderCol("July 10 Wed\n 1:35-1:40pm", images.Socialising[0], 6)}{" "}
            {renderCol("July 24 Wed\n 2:40-2:45pm", images.Socialising[1], 5)}{" "}
            {/* map needed to be changed */}
            {renderCol(
              "July 25 Thu\n 9:20-9:25pm",
              images.Socialising[2],
              4
            )}{" "}
          </div>
        )}
        {selectedOption === "Staying" && (
          <div className="static-maps-container">
            {renderCol("July 10 Wed\n 1:35-1:40pm", images.Staying[0], 6)}
            {renderCol("July 28 Wed\n 12:15-12:20pm", images.Staying[1], 6)}
            {renderCol("July 25 Thu\n 9:20-9:25pm", images.Staying[2], 5)}
            {/* map needed to be changed */}
          </div>
        )}
        {selectedOption === "Sitting" && (
          <div className="static-maps-container">
            {renderCol("July 10 Wed\n 1:35-1:40pm", images.Sitting[0], 6)}
            {renderCol("July 28 Wed\n 12:15-12:20pm", images.Sitting[1], 5)}
            {renderCol("July 25 Thu\n 10:15-10:20am", images.Sitting[2], 4)}
          </div>
        )}
      </Row>
    </div>
  );
};

export default StaticMaps;