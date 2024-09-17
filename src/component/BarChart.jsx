import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function BarChart({
  csvLocation,
  chartX,
  chartY,
  chartType,
  xTickFormat,
  selectedDate,
  selectedTime,
}) {
  const svgRef = useRef();
  const rootRef = useRef(); // Reference to the root div
  const [data, setData] = useState([]);
  const [chartWidth, setChartWidth] = useState(0); // State for dynamic width

  // Fetch CSV data and set chart data based on chartType
  useEffect(() => {
    d3.csv(csvLocation)
      .then((data) => {
        if (chartType === "hourly") {
          const formattedDate = d3.utcFormat("%-m/%-d/%Y")(
            new Date(selectedDate)
          );

          const filteredData = data.filter((d) => {
            const csvDate = d3.utcFormat("%-m/%-d/%Y")(new Date(d["date"])); // Ensure date is formatted from the CSV properly
            return csvDate === formattedDate;
          });

          setData(filteredData); // Update data after filtering
          // console.log(filteredData);
        } else {
          const parseDate = d3.timeParse("%m/%d/%Y");
          data.forEach((d) => {
            d[chartX] = parseDate(d[chartX]);
            d[chartY] = Number(d[chartY]);
          });
          setData(data);
          // console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error loading or parsing CSV file:", error);
      });
  }, [csvLocation, chartType, chartX, chartY, selectedDate]); // Added `selectedDate` as a dependency

  // Calculate the chart width based on the root div's width
  useEffect(() => {
    const handleResize = () => {
      if (rootRef.current) {
        setChartWidth(rootRef.current.getBoundingClientRect().width);
      }
    };

    // Set initial width
    handleResize();

    // Add event listener for window resize to update width
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render the chart based on the data
  useEffect(() => {
    if (data.length === 0 || chartWidth === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("class", "aidata_activation_svg");

    const margin = {
      top: 20,
      right: 30,
      bottom: 50,
      left: 30,
    };
    const width = chartWidth - margin.left - margin.right; // Adjusted width to root div
    const svgHeight = svgRef.current.getBoundingClientRect().height;
    const height = svgHeight - margin.top - margin.bottom;
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.5)
      .domain(data.map((d) => d[chartX]).sort((a, b) => a - b));

    const y = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(data, (d) => d[chartY])]);

    const xAxis = d3.axisBottom(x).tickFormat(xTickFormat).tickSize(0);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-90) translate(-10, 10)")
      .style("text-anchor", "end");

    g.append("text")
      .attr("fill", "#000")
      .attr("y", -20)
      .attr("dy", "0.71em")
      .attr("text-anchor", "start")
      .attr("class", "chart_axis")
      .text(chartY);

    g.append("g").call(d3.axisLeft(y).tickSize(0)).select(".domain").remove();

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", (d) => {
        const formattedDate = d3.utcFormat("%-m/%-d/%Y")(
          new Date(selectedDate)
        );
        const formattedTime = selectedTime.toString();

        if (chartType === "hourly" && Number(d[chartX]) === formattedTime) {
          return "chart_bar_selected";
        } else if (
          chartType === "daily" &&
          d3.timeFormat("%-m/%-d/%Y")(new Date(d[chartX])) === formattedDate
        ) {
          return "chart_bar_selected";
        }
        return "chart_bar";
      })
      .attr("x", (d) => x(d[chartX]))
      .attr("y", (d) => y(d[chartY]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d[chartY]))
      .on("mouseover", function (event, d) {
        d3.select(this.parentNode)
          .append("text")
          .attr("class", "chart_hover")
          .attr("x", x(d[chartX]) + x.bandwidth() / 2)
          .attr("y", y(d[chartY]) - 10)
          .attr("text-anchor", "middle")
          .text(d[chartY].toFixed(2));
      })
      .on("mouseout", function () {
        d3.selectAll(".chart_hover").remove();
      });
  }, [data, chartX, chartY, selectedDate, selectedTime, chartWidth]);

  return (
    <div ref={rootRef} style={{ width: "100%" }}>
      {" "}
      {/* Root div that controls width */}
      <svg
        ref={svgRef}
        width="100%" // SVG width will adjust based on the root div
        className="svg-chart"
        height="33vh"
      ></svg>
    </div>
  );
}

export default BarChart;
