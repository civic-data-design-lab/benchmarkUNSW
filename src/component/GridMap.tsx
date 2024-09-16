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
import * as d3 from "d3";

interface GridProps {
  gridData: FeatureCollection;
  benchData: FeatureCollection;
  pedestrianData: FeatureCollection;
  targetDate: string;
  targetHour: number;
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
  hour: number
): FeatureCollection {
  // console.log(`Filtering data for date :${date}, hour: ${hour}`);
  const formattedHour = hour.toString().padStart(2, "0"); // Ensure two-digit hour format

  const filteredFeatures: Array<Feature> = jsonData.features.filter(
    (feature: Feature) => {
      const fiveMinTime: Date = new Date(feature.properties!["5min"]);

      const targetTime: Date = new Date(date);
      targetTime.setDate(targetTime.getDate() + 1);
      targetTime.setHours(Number(formattedHour), 0, 0, 0); // Set the exact hour and reset minutes and seconds

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
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [hourlyBenchData, setBenchData] = useState<FeatureCollection>(
    getDataAtTime(benchData, targetDate, targetHour)
  );
  const [hourlyPedestrianData, setPedestrianData] = useState<FeatureCollection>(
    getDataAtTime(pedestrianData, targetDate, targetHour)
  );
  const [shadowGeoData, setShadowGeoData] = useState<FeatureCollection | null>(
    null
  );
  const { width, height } = useWindowSize();

  // useEffect to filter the data and render the grid/map when the date or hour changes
  useEffect(() => {
    if (!gridData || !benchData || !pedestrianData) return;

    // Fetch shadow data from remote or local source
    fetch("/data/shadows.geojson") // Adjust the path according to your file location
      .then((response) => response.json())
      .then((data) => setShadowGeoData(data))
      .catch((error) => console.error("Error loading shadow data: ", error));

    // Asynchronously update the bench and pedestrian data
    const updateData = async () => {
      const filteredBenchData = getDataAtTime(
        benchData,
        targetDate,
        targetHour
      );
      const filteredPedestrianData = getDataAtTime(
        pedestrianData,
        targetDate,
        targetHour
      );
      setBenchData(filteredBenchData);
      setPedestrianData(filteredPedestrianData);
    };

    updateData(); // Trigger async update for data
  }, [targetDate, targetHour, benchData, pedestrianData, gridData]);

  // console.log(
  //   "Filtered Bench Data: ",
  //   filteredBenchData,
  //   targetDate,
  //   targetHour
  // );
  // console.log(
  //   "Filtered Pedestrian Data: ",
  //   filteredPedestrianData,
  //   targetDate,
  //   targetHour
  // );

  // useEffect to render the grid/map when the data is loaded
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const svgWidth = width * 0.9;
    const svgHeight = height * 0.7;

    const benchLength: number = 15;
    const pedestrianCircleRadius: number = 5;
    const haloRadius: number = 20;

    // Define the projection and path generator
    const projection = d3
      .geoMercator()
      .fitSize([svgWidth, svgHeight], gridData);
    const path = d3.geoPath().projection(projection);

    // Remove any existing content before rendering
    svg.selectAll("*").remove();

    if (shadowGeoData) {
      svg
        .append("g")
        .attr("transform", "rotate(-10)")
        .selectAll("path")
        .data(shadowGeoData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#808080")
        .attr("fill-opacity", 0.01)
        .attr("stroke", "none")
        .attr("stroke-width", 0.5);
    }

    // if (shadowGeoData) {
    //   // Define the pattern in the <defs> section
    //   const defs = svg.append("defs");

    //   defs
    //     .append("pattern")
    //     .attr("id", "shadowPattern")
    //     .attr("patternUnits", "userSpaceOnUse")
    //     .attr("width", 10) // Width of the pattern tile
    //     .attr("height", 10) // Height of the pattern tile
    //     .append("rect") // Define the shape of the pattern (e.g., lines, dots, etc.)
    //     .attr("width", 10)
    //     .attr("height", 10)
    //     .attr("fill", "#808080");

    //   // Optionally, add a diagonal line pattern
    //   defs
    //     .append("pattern")
    //     .attr("id", "diagonalStripes")
    //     .attr("patternUnits", "userSpaceOnUse")
    //     .attr("width", 4)
    //     .attr("height", 4)
    //     .append("path")
    //     .attr("d", "M 0,4 l 4,-4") // Diagonal line
    //     .attr("stroke", "#808080")
    //     .attr("stroke-width", 1);

    //   // Apply the pattern to the fill of the shadow polygons
    //   svg
    //     .append("g")
    //     .attr("transform", "rotate(-10)")
    //     .selectAll("path")
    //     .data(shadowGeoData.features)
    //     .enter()
    //     .append("path")
    //     .attr("d", path)
    //     .attr("fill", "url(#diagonalStripes)") // Use the pattern ID here
    //     .attr("fill-opacity", 0.5)
    //     .attr("stroke", "none")
    //     .attr("stroke-width", 0.5);
    // }

    // Render the GeoJSON grid
    svg
      .append("g")
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

    svg
      .append("image")
      .attr("transform", "rotate(-10)")
      .attr("xlink:href", () => treeIcon)
      .attr("x", projection([151.22859788, -33.91781167])[0] - 50)
      .attr("y", projection([151.22859788, -33.91781167])[1] - 50)
      .attr("width", 100) // Radius of the point
      .attr("height", 100) // Radius of the point
      .attr("fill", "#FF2551") // Color of the point
      .attr("stroke", "none")
      .attr("stroke-width", 0.5);

    svg
      .append("image")
      .attr("transform", "rotate(-10)")
      .attr("xlink:href", () => treeIcon)
      .attr("x", projection([151.22863602, -33.91781669])[0] - 50)
      .attr("y", projection([151.22863602, -33.91781669])[1] - 50)
      .attr("width", 100) // Radius of the point
      .attr("height", 100) // Radius of the point
      .attr("fill", "#FF2551") // Color of the point
      .attr("stroke", "none")
      .attr("stroke-width", 0.5);

    console.log("Bench Data: ", hourlyBenchData.features);

    svg
      .append("g")
      .attr("transform", "rotate(-10)")
      .selectAll("image")
      .data(hourlyBenchData.features)
      .enter()
      .append("image")
      .attr(
        "x",
        (d) => projection(d.geometry.coordinates)[0] - (benchLength * 1.7) / 2
      )
      .attr(
        "y",
        (d) => projection(d.geometry.coordinates)[1] - (benchLength * 1.7) / 2
      )
      .attr("xlink:href", () => benchIcon)
      .attr("width", benchLength * 1.7) // Radius of the point
      .attr("height", benchLength * 1.7) // Radius of the point
      .attr("fill", "#FF2551") // Color of the point
      .attr("stroke", "none")
      .attr("stroke-width", 0.5);

    // console.log("Pedestrian Data: ", hourlyPedestrianData.features);

    svg
      .append("g")
      .attr("transform", "rotate(-10)")
      .selectAll("circle")
      .data(hourlyPedestrianData.features)
      .enter()
      .append("circle")
      .attr("cx", (d) => projection(d.geometry.coordinates)[0])
      .attr("cy", (d) => projection(d.geometry.coordinates)[1])
      .attr("r", pedestrianCircleRadius * 8) // Radius of the point
      .attr("fill", (d) =>
        d.properties.socializing === true ? "#FF2551" : "#FFFFFF"
      ) // Color of the point
      .attr("stroke", "none")
      .attr("opacity", 0.3)
      .attr("stroke-width", 0.5);

    svg
      .append("g")
      .attr("transform", "rotate(-10)")
      .selectAll("circle")
      .data(hourlyPedestrianData.features)
      .enter()
      .append("circle")
      .attr("cx", (d) => projection(d.geometry.coordinates)[0])
      .attr("cy", (d) => projection(d.geometry.coordinates)[1])
      .attr("r", pedestrianCircleRadius * 1.2) // Radius of the point
      .attr("fill", (d) =>
        d.properties.category_sitting === "sitting" ? "#FF2551" : "none"
      )
      .attr("stroke", (d) =>
        d.properties.category_sitting === "sitting" ? "none" : "#FF2551"
      )
      .attr("stroke-width", 1);
  }, [hourlyBenchData, hourlyPedestrianData, gridData, width, height]);

  return (
    <div
      style={{
        // backgroundImage: `
        // linear-gradient(90deg, #FEBECD 1px, transparent 1px),
        // linear-gradient(180deg, #FEBECD 1px, transparent 1px)`,
        // backgroundSize: '4px 4px', /* adjust the spacing between the lines */
        backgroundColor: "#FDB5C5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 0,
      }}
    >
      <svg
        ref={svgRef}
        width={width * 1}
        height={height * 0.7}
        viewBox={`${width * 0.1} ${10} ${width * 1.05} ${height * 0.6}`}
      >
        {/* Grid will be rendered here */}
      </svg>
    </div>
  );
};

export default GridMap;
