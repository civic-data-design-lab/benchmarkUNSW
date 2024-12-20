import React, { useEffect, useRef, useState } from "react";
import {
  Feature,
  FeatureCollection,
  Geometry,
  Polygon,
  Position,
} from "geojson";
import useWindowSize from "../hooks/useWindowSize";
import benchIcon from "../assets/Symbols/BENCH ICON_R.svg";
import treeIcon from "../assets/Symbols/TREE.svg";
import labels from "../assets/Symbols/labels.svg";
import * as d3 from "d3";

import "../style/GridMap.css";

interface GridProps {
  gridData: FeatureCollection;
  benchData: FeatureCollection;
  pedestrianData: FeatureCollection;
  targetDate: string;
  targetHour: number;
  targetMinute: number;
}

/**
 *
 * @param jsonData a geojson object
 *
 * @param date the day for which the data should be retrieved from
 *
 * @param hour the hour at which the data should be retrieved from
 * @returns a geojson object with features at the specified time
 */

function getDataAtTime(
  jsonData: FeatureCollection,
  date: string,
  hour: number,
  minute: number
): FeatureCollection {
  // console.log(`Filtering data for date :${date}, hour: ${hour}`);
  const formattedHour = hour.toString().padStart(2, "0"); // Ensure two-digit hour format

  const filteredFeatures: Array<Feature> = jsonData.features.filter(
    (feature: Feature) => {
      const fiveMinTime: Date = new Date(feature.properties!["5min"]);

      const targetTime: Date = new Date(date);
      targetTime.setDate(targetTime.getDate() + 1);
      targetTime.setHours(Number(formattedHour), 0, 0, 0); // Set the exact hour and reset minutes and seconds
      targetTime.setMinutes(minute);

      // console.log("Five Min Time: ", fiveMinTime);
      // console.log("Target Time: ", targetTime);

      const timemask: boolean = targetTime.getTime() === fiveMinTime.getTime();
      return timemask;
    }
  );

  const filteredData: FeatureCollection = {
    type: "FeatureCollection",
    features: filteredFeatures,
  };

  // console.log("Filtered Data: ", filteredData);

  return filteredData;
}

const GridMap: React.FC<GridProps> = ({
  gridData,
  benchData,
  pedestrianData,
  targetDate,
  targetHour,
  targetMinute,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  const [hourlyBenchData, setBenchData] = useState<FeatureCollection>(
    getDataAtTime(benchData, targetDate, targetHour, targetMinute)
  );
  const [hourlyPedestrianData, setPedestrianData] = useState<FeatureCollection>(
    getDataAtTime(pedestrianData, targetDate, targetHour, targetMinute)
  );
  const { width, height } = useWindowSize();

  // useEffect to filter the data and render the grid/map when the date or hour changes
  useEffect(() => {
    if (!gridData || !benchData || !pedestrianData) return;

    // Asynchronously update the bench and pedestrian data
    const updateData = async () => {
      const filteredBenchData = getDataAtTime(
        benchData,
        targetDate,
        targetHour,
        targetMinute
      );
      const filteredPedestrianData = getDataAtTime(
        pedestrianData,
        targetDate,
        targetHour,
        targetMinute
      );
      setBenchData(filteredBenchData);
      setPedestrianData(filteredPedestrianData);
    };

    // console.log("Target Date: ", targetDate);
    // console.log("Target Hour: ", targetHour);
    // console.log("Target Minute: ", targetMinute);
    updateData(); // Trigger async update for data
  }, [
    targetDate,
    targetHour,
    targetMinute,
    benchData,
    pedestrianData,
    gridData,
  ]);

  // useEffect to render the grid/map when the data is loaded
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
    const svgWidth = width * 0.9;
    const svgHeight = height * 0.7;

    const benchLength: number = 15;
    const pedestrianCircleRadius: number = 5;
    const haloRadius: number = 20;

    // Calculate the centroid of the gridData
    const centroid = d3.geoCentroid(gridData);

    // Define the projection and path generator
    const projection = d3
      .geoMercator()
      .center(centroid) // Center the projection on the centroid
      .fitSize([svgWidth, svgHeight], gridData);
    const path = d3.geoPath().projection(projection);

    const scaleFactor = width > 650 ? 1.4 : 1;

    g.selectAll("*").remove();

    // Render the GeoJSON grid
    g.append("g")
      .attr("transform", "rotate(-10)")
      .selectAll("path")
      .attr("id", "grid")
      .data(gridData["features"])
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#FF2953")
      .attr("stroke-width", 0.5);

    g.append("image")
      .attr("transform", "rotate(-10)")
      .attr("xlink:href", () => treeIcon)
      .attr("x", projection([151.22859788, -33.91781167])[0] - 50 * scaleFactor)
      .attr("y", projection([151.22859788, -33.91781167])[1] - 50 * scaleFactor)
      .attr("width", 100 * scaleFactor)
      .attr("height", 100 * scaleFactor)
      .attr("fill", "#FF2551")
      .attr("stroke", "none")
      .attr("stroke-width", 0.5);

    g.append("image")
      .attr("transform", "rotate(-10)")
      .attr("xlink:href", () => treeIcon)
      .attr("x", projection([151.22863602, -33.91781669])[0] - 50 * scaleFactor)
      .attr("y", projection([151.22863602, -33.91781669])[1] - 50 * scaleFactor)
      .attr("width", 100 * scaleFactor)
      .attr("height", 100 * scaleFactor)
      .attr("fill", "#FF2551")
      .attr("stroke", "none")
      .attr("stroke-width", 0.5);

    g.append("image")
      .attr("transform", "rotate(-10)")
      .attr("xlink:href", () => treeIcon)
      .attr("x", projection([151.22862254, -33.9177743])[0] - 50 * scaleFactor)
      .attr("y", projection([151.22862254, -33.9177743])[1] - 50 * scaleFactor)
      .attr("width", 100 * scaleFactor)
      .attr("height", 100 * scaleFactor)
      .attr("fill", "#FF2551")
      .attr("stroke", "none")
      .attr("stroke-width", 0.5);

    // Render benches or "No data" message
    if (hourlyBenchData.features.length > 0) {
      g.append("g")
        .attr("transform", "rotate(-10)")
        .selectAll("image")
        .data(hourlyBenchData.features)
        .enter()
        .append("image")
        .attr(
          "x",
          (d) =>
            projection(d.geometry.coordinates)[0] -
            (benchLength * 1.7 * scaleFactor) / 2
        )
        .attr(
          "y",
          (d) =>
            projection(d.geometry.coordinates)[1] -
            (benchLength * 1.7 * scaleFactor) / 2
        )
        .attr("xlink:href", () => benchIcon)
        .attr("width", benchLength * 1.7 * scaleFactor)
        .attr("height", benchLength * 1.7 * scaleFactor)
        .attr("fill", "#FF2551")
        .attr("stroke", "none")
        .attr("stroke-width", 0.5);
    } else {
    }

    g.append("g")
      .attr("transform", "rotate(-10)")
      .selectAll("circle")
      .data(hourlyPedestrianData.features)
      .enter()
      .append("circle")
      .attr("cx", (d) => projection(d.geometry.coordinates)[0])
      .attr("cy", (d) => projection(d.geometry.coordinates)[1])
      .attr("r", pedestrianCircleRadius * 8 * scaleFactor)
      .attr("fill", (d) =>
        d.properties.socializing === true ? "#FF2551" : "#FFFFFF"
      )
      .attr("stroke", "none")
      .attr("opacity", 0.3)
      .attr("stroke-width", 0.5);

    g.append("g")
      .attr("transform", "rotate(-10)")
      .selectAll("circle")
      .data(hourlyPedestrianData.features)
      .enter()
      .append("circle")
      .attr("cx", (d) => projection(d.geometry.coordinates)[0])
      .attr("cy", (d) => projection(d.geometry.coordinates)[1])
      .attr("r", pedestrianCircleRadius * 1.2 * scaleFactor)
      .attr("fill", (d) =>
        d.properties.category_sitting === "sitting" ? "#FF2551" : "none"
      )
      .attr("stroke", (d) =>
        d.properties.category_sitting === "sitting" ? "#FF2551" : "#FF2551"
      )
      .attr("stroke-width", 1);

    // Add zoom and pan functionality
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
  }, [hourlyBenchData, hourlyPedestrianData, gridData, width, height]);

  const viewBox =
    width > 650
      ? `${width * 0.27} -${height * 0.35} ${width * 0.4} ${height * 1.1}`
      : `-${width * 0.01} -${height * 0.15} ${width * 1.2} ${height * 0.85}`;

  // Add this function to reset the view
  function resetView() {
    const svg = d3.select(svgRef.current);
    const g = d2.select(gRef.current);

    // Reset the zoom transformation
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(svgWidth / 2, svgHeight / 2).scale(1)
      );
  }

  return (
    <div className="grid-container" style={{ position: "relative" }}>
      <button
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
        }}
        onClick={resetView}
      >
        Center View
      </button>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        <g ref={gRef}>{/* Grid will be rendered here */}</g>
      </svg>
      {hourlyBenchData.features.length === 0 && (
        <p
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#FF2551",
            fontSize: "0.7rem",
            textAlign: "center",
            margin: 0,
            width: "100%",
            fontWeight: "normal",
          }}
        >
          No Bench Location Data
        </p>
      )}
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          textAlign: "center",
        }}
      >
        <img
          src={labels}
          alt="labels"
          style={{
            height: "40px",
            width: "100%",
            backgroundColor: "transparent",
            position: "absolute",
            bottom: "0px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
};

export default GridMap;
