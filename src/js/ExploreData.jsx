import React, { useEffect, useState } from "react";
import { Dropdown, Card, Row, Col, Button, Container } from "react-bootstrap";
import "../style/ExploreData.css";
import * as d3 from "d3";

import BarChart from "../component/BarChart";
import GridMap from "../component/GridMap";
import DateSelector from "../component/DateSelector";
import DataSelector from "../component/DataSelector";
import WeatherDisplay from "../component/WeatherDisplay";
import StaticMaps from "../component/StaticMaps";
import SkeletonPlayer from "../component/SkeletonPlayer";

function ExploreData() {
  const [showDailyChart, setShowDailyChart] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Socialising");
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [indexName, setIndexName] = useState("");
  const [index2, setIndex2] = useState(0);
  const [index2Name, setIndex2Name] = useState("");
  const [index3, setIndex3] = useState(0);
  const [index3Name, setIndex3Name] = useState("");
  const [targetDate, setTargetDate] = useState("2024-07-11"); // Starting date
  const [targetHour, setTargetHour] = useState(6); // Starting hour (6 AM)
  const [targetMinute, setTargetMinute] = useState(0); // Add this line

  // Map data states
  const [benchData, setBenchData] = useState(null);
  const [gridData, setGridData] = useState(null);
  const [pedestrianData, setPedestrianData] = useState(null);

  // Fetch data for maps
  useEffect(() => {
    const fetchData = async () => {
      try {
        const benchResponse = await fetch("/data/bench_data_2.json");
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
      case "Socialising":
        basePath = "/data/socializing_graph/";
        break;
      case "Staying":
        basePath = "/data/activation_graph/";
        break;
      case "Sitting":
        basePath = "/data/sitting_graph/";
        break;
      default:
        basePath = "/data/socializing_graph/";
    }
    return `${basePath}${showDailyChart ? "daily.csv" : "hourly.csv"}`;
  };

  //#endregion
  //#region update name
  const getTextForSelection = () => {
    switch (selectedOption) {
      case "Socialising":
        return "Top 3 Socialising Maps";
      case "Staying":
        return "Top 3 Staying Maps";
      case "Sitting":
        return "Top 3 Sitting Maps";
      default:
        return "Top 3 Socialising Maps";
    }
  };

  // Fetch data based on target date and hour
  useEffect(() => {
    const fetchData = async () => {
      const csvLocation = getCsvLocation(); // Get CSV location based on the selection
      const parts = csvLocation.split("/");
      const graphName = parts[2]; // Extract the specific graph type
      parts.pop();
      const newPath = parts.join("/");
      const csvUpdated = newPath + "/hourly.csv";

      let col2Name = "";
      let col3Name = "";
      let newIndexName, newIndex2Name, newIndex3Name;

      if (graphName === "socializing_graph") {
        // newIndexName = `from ${targetDate} ${targetHour}:00 to ${targetDate} ${
        //   targetHour + 1
        // }:00`;
        newIndex2Name = "socialising on site";
        newIndex3Name = "pedestrian per hour";
        col2Name = "social";
        col3Name = "ped";
      } else if (graphName === "activation_graph") {
        // newIndexName = `from ${targetDate} ${targetHour}:00 to ${targetDate} ${
        //   targetHour + 1
        // }:00`;
        newIndex2Name = "staying on site";
        newIndex3Name = "pedestrian per hour";
        col2Name = "hourly_total_staying";
        col3Name = "hourly_people";
      } else if (graphName === "sitting_graph") {
        // newIndexName = `from ${targetDate} ${targetHour}:00 to ${targetDate} ${
        //   targetHour + 1
        // }:00`;
        newIndex2Name = "sitting on site";
        newIndex3Name = "pedestrian per hour";
        col2Name = "total_hourly_sitting";
        col3Name = "total_hourly_person";
      }

      try {
        const data = await d3.csv(csvUpdated);

        // console.log(data);

        // Format the target date and target hour
        const formattedDate = d3.utcFormat("%-m/%-d/%Y")(new Date(targetDate));
        const formattedTime = targetHour.toString();

        // Parse and format the date from the CSV to ensure consistency
        const matchingData = data.find((item) => {
          const parsedCSVDate = d3.timeParse("%-m/%-d/%Y")(item.date.trim()); // Parse CSV date
          const csvFormattedDate = d3.utcFormat("%-m/%-d/%Y")(parsedCSVDate); // Format the parsed date

          return (
            csvFormattedDate === formattedDate && // Compare dates in the same format
            parseInt(item.hour) === parseInt(formattedTime) // Compare hours as integers
          );
        });

        // console.log(matchingData);

        if (matchingData) {
          // If matching data is found, update the relevant state variables
          setIndex(parseFloat(matchingData["hourly_index"]).toFixed(1));
          setIndex2(Math.round(matchingData[col2Name]));
          setIndex3(Math.round(matchingData[col3Name]));
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
  }, [targetDate, targetHour, selectedOption]);

  // Add this useEffect hook to log the values whenever they change
  // useEffect(() => {
  //   console.log("Target Date:", targetDate);
  //   console.log("Target Hour:", targetHour);
  //   console.log("Target Minute:", targetMinute);
  // }, [targetDate, targetHour, targetMinute]);

  // Render fallback while data is loading
  if (!benchData || !gridData || !pedestrianData) {
    return <div>Loading data...</div>;
  }

  return (
    <div
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="aidata-page nova-mono-regular">
        <div className="explore-map-container">
          <GridMap
            gridData={gridData}
            benchData={benchData}
            pedestrianData={pedestrianData}
            targetDate={targetDate}
            targetHour={targetHour}
            targetMinute={targetMinute}
          />
        </div>
        <div className="explore-date-selector text-center medium-bg rounded-top-corners ">
          <Row>
            <DateSelector
              setTargetHour={setTargetHour}
              setTargetDate={setTargetDate}
              setTargetMinute={setTargetMinute}
              targetDate={targetDate}
              targetHour={targetHour}
              targetMinute={targetMinute}
            />
          </Row>
        </div>

        <DataSelector
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          indexName={indexName}
          index={index}
          index2Name={index2Name}
          index2={index2}
          index3Name={index3Name}
          index3={index3}
        />

        {/* Bar Chart */}
        <div className="medium-bg nova-mono-regular">
          <Row className="aidata_daily_hourly">
            <Col xs={4} sm={4}>
              <div className="chart_button_container">
                <button
                  className={`chart_button ${showDailyChart ? "active" : ""}`}
                  onClick={() => setShowDailyChart(true)}
                  style={{ fontSize: "0.8rem" }}
                >
                  Daily
                </button>
                <button
                  className={`chart_button ${!showDailyChart ? "active" : ""}`}
                  onClick={() => setShowDailyChart(false)}
                  style={{ fontSize: "0.8rem" }}
                >
                  Hourly
                </button>
              </div>
            </Col>
            <Col xs={2} sm={2}></Col>
            <Col xs={6} sm={6}>
              <WeatherDisplay targetDate={targetDate} targetHour={targetHour} />
            </Col>
          </Row>
          <BarChart
            csvLocation={getCsvLocation()}
            chartX={showDailyChart ? "date" : "hour"}
            chartY={showDailyChart ? "daily_index" : "hourly_index"}
            chartType={showDailyChart ? "daily" : "hourly"}
            xTickFormat={
              showDailyChart ? d3.timeFormat("%b %d") : (d) => `${d}:00`
            }
            selectedDate={targetDate}
            selectedTime={targetHour}
          />
        </div>

        {/*Desc Section 1*/}
        <div
          className="light-bg padding-tb-lg"
          style={{ padding: "2rem 0.5rem 1rem 0.5rem " }}
        >
          <Container>
            <Row>
              <div className="text-center">
                <div className="dark-button primary-subtitle">
                  <p
                    style={{
                      fontSize: "1rem",
                      padding: "0.5rem",
                      marginBottom: "1rem",
                      color: "white",
                    }}
                  >
                    {selectedOption === "Socialising"
                      ? "9:00AM - 10:00AM & 4:00PM - 5:00PM"
                      : selectedOption === "Staying"
                      ? "1:00PM - 2:00PM"
                      : selectedOption === "Sitting"
                      ? "1:00PM - 2:00PM"
                      : "9:00AM - 10:00AM & 4:00PM - 5:00PM"}
                  </p>
                </div>
                <div className="dark-txt primary-txt">
                  <p>Most Common Overall Time for {selectedOption}</p>
                </div>
              </div>
            </Row>
          </Container>
        </div>

        {/*Desc Section 2*/}
        <div className="static-maps">
          <StaticMaps
            selectedOption={selectedOption}
            getTextForSelection={getTextForSelection}
          />
        </div>
        {/* 
        <div className="skeleton-player">
          <SkeletonPlayer></SkeletonPlayer>
        </div> */}
      </div>
    </div>
  );
}

export default ExploreData;
