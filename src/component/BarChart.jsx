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
      top: 25,
      right: 5,
      bottom: 70, // Increased bottom margin to accommodate x-axis labels
      left: 30, // Increased left margin to accommodate y-axis labels
    };
    const width = chartWidth - margin.left - margin.right; // Adjusted width to root div
    const height = (width * 9) / 21; // Calculate height based on 16:9 aspect ratio
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.4)
      .domain(data.map((d) => d[chartX]).sort((a, b) => a - b));

    const y = d3.scaleLinear().rangeRound([height, 0]).domain([0, 100]); // Set y-axis limit to 100

    const xAxis = d3.axisBottom(x).tickFormat(xTickFormat).tickSize(0);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(90) translate(20, -5.5)")
      .style("text-anchor", "middle")
      .style("font-family", "Nova Mono, monospace")
      .style("font-size", "10px")
      .style("fill", (d, i) =>
        chartType === "daily" && i >= 14 ? "#FB718D" : "#FF2551"
      ); // Change color for ticks from 15th to last only if chartType is "daily"

    g.append("g")
      .call(d3.axisLeft(y).tickSize(0).tickValues([0, 25, 50, 75, 100]))
      .selectAll("text")
      .style("font-family", "'Nova Mono', monospace") // Apply "Nova Mono", monospace for y-axis
      .style("font-size", "12px") // Adjust the font size as needed
      .style("text-align", "left");

    g.selectAll(".domain").remove();
    g.selectAll(".tick line").remove();

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
      .style("stroke", (d, i) => {
        if (chartType === "daily" && i >= 14) {
          return "#FB718D"; // New color for bars from 15th to last
        }
        return "#FF2551"; // Default color for other bars
      })
      .style("stroke-width", "1px")
      .style("fill", (d) => {
        const formattedDate = d3.utcFormat("%-m/%-d/%Y")(
          new Date(selectedDate)
        );

        // Condition for hourly chart type and matching selectedTime
        if (chartType === "hourly" && Number(d[chartX]) === selectedTime) {
          return "#FF2551"; // Red color for selected hour
        }
        // Condition for daily chart type and matching selected date
        else if (
          chartType === "daily" &&
          d3.timeFormat("%-m/%-d/%Y")(new Date(d[chartX])) === formattedDate
        ) {
          return "#FF2551"; // Specific color for selected date
        }
        return "#FFFFFF"; // Default color for other bars
      })
      .attr("height", (d) => height - y(d[chartY]))
      .on("mouseover", function (event, d) {
        d3.select(this.parentNode).append("g").attr("class", "chart_hover");

        g.append("rect")
          .attr("class", "chart_hover_background")
          .attr("x", x(d[chartX]) + x.bandwidth() / 2 - 20)
          .attr("y", y(d[chartY]) - 25)
          .attr("width", 40)
          .attr("height", 20)
          .attr("rx", 10)
          .attr("ry", 10);

        g.append("text")
          .attr("class", "chart_hover_text")
          .attr("x", x(d[chartX]) + x.bandwidth() / 2)
          .attr("y", y(d[chartY]) - 10)
          .attr("text-anchor", "middle")
          .text(Math.round(d[chartY]) + "%");
      })
      .on("mouseout", function () {
        d3.selectAll(".chart_hover").remove();
        d3.selectAll(".chart_hover_text").remove();
        d3.selectAll(".chart_hover_background").remove();
      });

    // Display hover effect for selectedDate or selectedTime by default
    const defaultHoverData = data.find((d) => {
      const formattedDate = d3.utcFormat("%-m/%-d/%Y")(new Date(selectedDate));
      return (
        (chartType === "hourly" && Number(d[chartX]) === selectedTime) || // Check for selectedTime match in hourly chart
        (chartType === "daily" &&
          d3.timeFormat("%-m/%-d/%Y")(new Date(d[chartX])) === formattedDate)
      );
    });

    if (defaultHoverData) {
      g.append("rect")
        .attr("class", "chart_hover_background")
        .attr("x", x(defaultHoverData[chartX]) + x.bandwidth() / 2 - 20)
        .attr("y", y(defaultHoverData[chartY]) - 25)
        .attr("width", 40)
        .attr("height", 20)
        .attr("rx", 10)
        .attr("ry", 10);

      g.append("text")
        .attr("class", "chart_hover_text")
        .attr("x", x(defaultHoverData[chartX]) + x.bandwidth() / 2)
        .attr("y", y(defaultHoverData[chartY]) - 10)
        .attr("text-anchor", "middle")
        .text(Math.round(defaultHoverData[chartY]) + "%");
    }

    // Add text and line below x-axis labels for daily chart
    if (chartType === "daily") {
      const textYPosition = height + 55; // Position for the text below x-axis labels
      const lineYPosition = height + 52; // Position for the line below x-axis labels

      // Find the x position for the first tick
      const firstTickData = data[0];
      const firstTickXPosition = firstTickData ? x(firstTickData[chartX]) : 0;

      const fifteenthTickData = data[14];
      const fifteenthTickXPosition = fifteenthTickData
        ? x(fifteenthTickData[chartX])
        : 0;

      // Add text at the first tick position
      g.append("text")
        .attr("x", firstTickXPosition)
        .attr("y", textYPosition)
        .attr("text-anchor", "left")
        .style("font-family", "Nova Mono, monospace")
        .style("font-size", "12px")
        .style("fill", "#FF2551")
        .text("with benches");

      g.append("line")
        .attr("x1", firstTickXPosition + 90)
        .attr("y1", lineYPosition)
        .attr("x2", fifteenthTickXPosition - 10)
        .attr("y2", lineYPosition)
        .attr("stroke", "#FF2551")
        .attr("stroke-width", 1);

      g.append("line")
        .attr("x1", fifteenthTickXPosition - 10)
        .attr("y1", lineYPosition - 5)
        .attr("x2", fifteenthTickXPosition - 10)
        .attr("y2", lineYPosition + 5)
        .attr("stroke", "#FF2551")
        .attr("stroke-width", 1);

      g.append("text")
        .attr("x", fifteenthTickXPosition)
        .attr("y", textYPosition)
        .attr("text-anchor", "left")
        .style("font-family", "Nova Mono, monospace")
        .style("font-size", "12px")
        .style("fill", "#FB718D")
        .text("no benches");

      g.append("line")
        .attr("x1", fifteenthTickXPosition + 80)
        .attr("y1", lineYPosition)
        .attr("x2", width - 15)
        .attr("y2", lineYPosition)
        .attr("stroke", "#FB718D")
        .attr("stroke-width", 1);

      g.append("line")
        .attr("x1", width - 15)
        .attr("y1", lineYPosition - 5)
        .attr("x2", width - 15)
        .attr("y2", lineYPosition + 5)
        .attr("stroke", "#FB718D")
        .attr("stroke-width", 1);
    }
  }, [data, chartX, chartY, selectedDate, selectedTime, chartWidth, chartType]);

  return (
    <div ref={rootRef} style={{ width: "100%", zIndex: "200" }}>
      {" "}
      {/* Root div that controls width */}
      <svg
        ref={svgRef}
        width="100%" // SVG width will adjust based on the root div
        className="svg-chart"
        height={(chartWidth * 9) / 21 + 80} // Set height based on 16:9 aspect ratio and additional margin
      ></svg>
    </div>
  );
}

export default BarChart;
