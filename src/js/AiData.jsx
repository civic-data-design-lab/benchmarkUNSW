import React, { useEffect, useState } from "react";
import { Dropdown, Card, Row, Col, Button, Container } from "react-bootstrap";
import "../style/AiData.css";
import * as d3 from "d3";

import social1 from "../assets/AiData/social1.png";
import social2 from "../assets/AiData/social2.png";
import social3 from "../assets/AiData/social3.png";
import dwell1 from "../assets/AiData/dwell1.png";
import dwell2 from "../assets/AiData/dwell2.png";
import dwell3 from "../assets/AiData/dwell3.png";
import bench1 from "../assets/AiData/bench1.png";
import bench2 from "../assets/AiData/bench2.png";
import bench3 from "../assets/AiData/bench3.png";

import CenteredModal from "../component/CenteredModal";
import BarChart from "../component/BarChart";
import GridMap from "../component/GridMap";
import DateSelector from "../component/DateSelector";

function AiData() {
  const [activeModal, setActiveModal] = useState(null);
  const [showDailyChart, setShowDailyChart] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Social Interaction");
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [indexName, setIndexName] = useState("");
  const [index2, setIndex2] = useState(0);
  const [index2Name, setIndex2Name] = useState("");
  const [index3, setIndex3] = useState(0);
  const [index3Name, setIndex3Name] = useState("");
  const [targetDate, setTargetDate] = useState("2024-07-10"); // Starting date
  const [targetHour, setTargetHour] = useState(6); // Starting hour (6 AM)

  // Map data states
  const [benchData, setBenchData] = useState(null);
  const [gridData, setGridData] = useState(null);
  const [pedestrianData, setPedestrianData] = useState(null);

  // Fetch data for maps
  useEffect(() => {
    const fetchData = async () => {
      try {
        const benchResponse = await fetch("/data/bench_data.json");
        const benchJson = await benchResponse.json();
        setBenchData(benchJson);

        const gridResponse = await fetch("/data/map_grid.json");
        const gridJson = await gridResponse.json();
        setGridData(gridJson);

        const pedestrianResponse = await fetch("/data/pedestrian_data.json");
        const pedestrianJson = await pedestrianResponse.json();
        setPedestrianData(pedestrianJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // No dependency array here ensures it runs only on mount

  // Update content dynamically
  const getCsvLocation = () => {
    let basePath = "";
    switch (selectedOption) {
      case "Social Interaction":
        basePath = "/data/socializing_graph/";
        break;
      case "Space Activation":
        basePath = "/data/activation_graph/";
        break;
      case "Benches":
        basePath = "/data/bench_graph/";
        break;
      default:
        basePath = "/data/socializing_graph/";
    }
    return `${basePath}${showDailyChart ? "daily.csv" : "hourly.csv"}`;
  };

  //#endregion
  //#region update images
  const getImages = () => {
    switch (selectedOption) {
      case "Social Interaction":
        return [social1, social2, social3];
      case "Space Activation":
        return [dwell1, dwell2, dwell3];
      case "Benches":
        return [bench1, bench2, bench3];
      default:
        return [social1, social2, social3];
    }
  };
  const images = getImages();

  //#endregion
  //#region update name
  const getTextForSelection = () => {
    switch (selectedOption) {
      case "Social Interaction":
        return "High Social Index Rate Formations";
      case "Space Activation":
        return "Top 3 Dwell Index Maps";
      case "Benches":
        return "Top 3 Seating Index Maps";
      default:
        return "High Social Index Rate Formations";
    }
  };

  // Fetch data based on target date and hour
  useEffect(() => {
    const fetchData = async () => {
      const csvLocation = getCsvLocation();
      const parts = csvLocation.split("/");
      const graphName = parts[2];
      parts.pop();
      const newPath = parts.join("/");
      const csvUpdated = newPath + "/hourly.csv";

      let col2Name = "";
      let col3Name = "";
      let newIndexName, newIndex2Name, newIndex3Name;

      if (graphName === "socializing_graph") {
        newIndexName = "Social Index";
        newIndex2Name = "Socializing on site";
        newIndex3Name = "Pedestrians per hour";
        col2Name = "social";
        col3Name = "ped";
      } else if (graphName === "activation_graph") {
        newIndexName = "Dwell Index";
        newIndex2Name = "Dwelling > 5min";
        newIndex3Name = "Pedestrians per hour";
        col2Name = "total";
        col3Name = "average";
      } else if (graphName === "bench_graph") {
        newIndexName = "Bench Index";
        newIndex2Name = "Seating time (min)";
        newIndex3Name = "Pedestrians per hour";
        col2Name = "social";
        col3Name = "ped";
      }

      try {
        const data = await d3.csv(csvUpdated);

        // console.log("Data loaded:", data);

        // Use UTC functions to avoid timezone-related shifts for the date
        const formattedDate = d3.utcFormat("%-m/%-d/%Y")(new Date(targetDate));
        const formattedTime = targetHour.toString(); // Use targetHour directly for hour

        // Debugging: Log the formatted date and time to ensure correctness
        console.log("Formatted Date:", formattedDate); // Should now correctly show '7/10/2024'
        console.log("Formatted Time:", formattedTime); // This should now reflect the correct hour value, like '6' or '19'

        const matchingData = data.find(
          (item) =>
            item.date.trim() === formattedDate &&
            parseInt(item.hour) === parseInt(formattedTime) // Parse hour to number for comparison
        );

        if (matchingData) {
          console.log("Matched Data Item:", matchingData);

          setIndex(parseFloat(matchingData["index"]).toFixed(2));
          setIndex2(matchingData[col2Name]);
          setIndex3(matchingData[col3Name]);
          setIndexName(newIndexName);
          setIndex2Name(newIndex2Name);
          setIndex3Name(newIndex3Name);
        } else {
          console.warn(
            "No matching data found for",
            formattedDate,
            formattedTime
          );
        }
      } catch (error) {
        console.error("Error loading or parsing CSV file:", error);
      }
    };

    fetchData();
  }, [targetDate, targetHour]);

  // Render fallback while data is loading
  if (!benchData || !gridData || !pedestrianData) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="aidata-page nova-mono-regular">
      {/* GridMap */}
      <GridMap
        gridData={gridData}
        benchData={benchData}
        pedestrianData={pedestrianData}
        targetDate={targetDate}
        targetHour={targetHour}
      />

      <Row className="aidata-slider text-center medium-bg">
        <Col xs={12}>
          <DateSelector
            setTargetHour={setTargetHour}
            setTargetDate={setTargetDate}
            targetDate={targetDate}
            targetHour={targetHour}
          />
        </Col>
      </Row>

      {/* Data Breakdown */}
      <div className="light-bg padding-tb-lg">
        <div className="text-center primary-subtitle mb-3">
          <p>Select Data Breakdown</p>
        </div>
        <div className="data-breakdown-dropdown mb-3">
          <Dropdown
            onSelect={setSelectedOption}
            className="custom-dropdown w-100"
          >
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="w-100"
            >
              {selectedOption}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <Dropdown.Item eventKey="Social Interaction">
                Social Interaction
              </Dropdown.Item>
              <Dropdown.Item eventKey="Space Activation">
                Space Activation
              </Dropdown.Item>
              <Dropdown.Item eventKey="Benches">Benches</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Card className="mb-3 border-radius dark-button">
          <Row className="padding-sm align-items-center text-center">
            <Col xs={10}>
              <p className="primary-subtitle">{index}%</p>
              <p className="primary-subtxt">{indexName}</p>
            </Col>
          </Row>
        </Card>

        <Row>
          <Col>
            <Card className="padding-sm border-radius primary-border light-button text-center">
              <p className="primary-subtitle">{index2}</p>
              <p className="primary-subtxt">{index2Name}</p>
            </Card>
          </Col>
          <Col>
            <Card className="padding-sm border-radius primary-border light-button text-center">
              <p className="primary-subtitle">{index3}</p>
              <p className="primary-subtxt">{index3Name}</p>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Chart Button */}
      <div className="chart_button nova-mono-regular">
        <Button
          variant="primary"
          className="chart_button"
          onClick={() => setShowDailyChart(!showDailyChart)}
        >
          {showDailyChart ? "Daily" : "Hourly"}
        </Button>
      </div>

      {/* Bar Chart */}
      <div className="medium-bg nova-mono-regular">
        <BarChart
          csvLocation={getCsvLocation()}
          chartX={showDailyChart ? "date" : "hour"}
          chartY={showDailyChart ? "daily" : "hourly"}
          chartType={showDailyChart ? "daily" : "hourly"}
          xTickFormat={
            showDailyChart ? d3.timeFormat("%b %d") : (d) => `${d}:00`
          }
          selectedDate={targetDate}
          selectedTime={targetHour}
        />
      </div>

      {/*Desc Section 1*/}
      <>
        <div className="light-bg padding-tb-lg">
          <Container>
            <Row>
              <div className="text-center">
                <div className="dark-button primary-subtitle">
                  <p>4:00 PM</p>
                </div>
                <div className="dark-txt primary-txt">
                  <p>Most Common Overall Time for Socializing</p>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </>

      {/*Desc Section 2*/}
      <>
        <div className="medium-bg padding-tb-lg">
          <Container>
            <Row>
              <div className="text-center nova-mono-regular primary-subtitle">
                <p>{getTextForSelection()}</p>
              </div>
            </Row>
            <Row>
              <Col>
                <div className="text-center primary-subtxt">
                  <Row className="align-items-center justify-content-center">
                    July 4, 1:00pm
                  </Row>
                  <Row className="align-items-center justify-content-center">
                    <img src={images[0]} />
                  </Row>
                  <Row className="align-items-center justify-content-center">
                    S.I.:38%
                  </Row>
                </div>
              </Col>
              <Col>
                <div className="text-center primary-subtxt">
                  <Row className="align-items-center justify-content-center">
                    July 8, 11:00am
                  </Row>
                  <Row className="align-items-center justify-content-center">
                    <img src={images[1]} />
                  </Row>
                  <Row className="align-items-center justify-content-center">
                    S.I.:20%
                  </Row>
                </div>
              </Col>
              <Col>
                <div className="text-center primary-subtxt">
                  <Row className="align-items-center justify-content-center">
                    July 25, 3:30pm
                  </Row>
                  <Row className="align-items-center justify-content-center">
                    <img src={images[2]} />
                  </Row>
                  <Row className="align-items-center justify-content-center">
                    S.I.:17%
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    </div>
  );
}

export default AiData;
