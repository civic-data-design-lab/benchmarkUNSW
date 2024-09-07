import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, Card, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import * as d3 from 'd3';
function BarChart({ csvLocation, chartX, chartY, chartType, xTickFormat }) {
    const svgRef = useRef();
    const [data, setData] = useState([]);

    useEffect(() => {
        d3.csv(csvLocation).then(data => {
            if (chartType === 'hourly') {
                const hourData = d3.rollup(
                    data,
                    v => d3.mean(v, d => Number(d[chartY])),
                    d => Number(d[chartX])
                );

                const formattedData = Array.from(hourData, ([hour, avg]) => ({
                    [chartX]: hour,
                    [chartY]: avg
                }));

                setData(formattedData);
            } else {
                const parseDate = d3.timeParse("%m/%d/%Y");
                data.forEach(d => {
                    d[chartX] = parseDate(d[chartX]);
                    d[chartY] = Number(d[chartY]);
                });
                setData(data);
            }
        }).catch(error => {
            console.error('Error loading or parsing CSV file:', error);
        });
    }, [csvLocation, chartType, chartX, chartY]);

    useEffect(() => {
        if (data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        svg.attr("class", "aidata_activation_svg");

        const margin = {
            top: 20,
            right: 30,
            bottom: 50,
            left: 30,
        };
        const width = window.innerWidth - margin.left - margin.right;
        const svgHeight = svgRef.current.getBoundingClientRect().height;
        const height = svgHeight - margin.top - margin.bottom;
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.5)
            .domain(data.map(d => d[chartX]).sort((a, b) => a - b));

        const y = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, d3.max(data, d => d[chartY])]);

        const xAxis = d3.axisBottom(x)
            .tickFormat(xTickFormat)
            .tickSize(0);

        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis)
            .selectAll("text")
            .attr("transform", "rotate(-90) translate(-10, 10)")
            .style("text-anchor", "end")
            .style("text-align", "center");

        g.append("text")
            .attr("fill", "#000")
            .attr("y", -20)
            .attr("dy", "0.71em")
            .attr("text-anchor", "start")
            .attr("class", "chart_axis")
            .text(chartY);

        g.append("g")
            .call(d3.axisLeft(y).tickSize(0))
            .select(".domain").remove();

        g.select(".domain").remove();

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "chart_bar")
            .attr("x", d => x(d[chartX]))
            .attr("y", d => y(d[chartY]))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d[chartY]))
            .on('mouseover', function (event, d) {
                d3.select(this.parentNode)
                    .append("text")
                    .attr("class", "chart_hover")
                    .attr("x", x(d[chartX]) + x.bandwidth() / 2)
                    .attr("y", y(d[chartY]) - 10)
                    .attr("text-anchor", "middle")
                    .text((d[chartY]).toFixed(2));

            })
            .on('mouseout', function () {
                d3.selectAll(".chart_hover").remove();
            });

    }, [data, chartX, chartY]);

    return (
        <svg ref={svgRef} width={window.innerWidth} className="svg-chart" height="33vh"></svg>
    );
}

export default BarChart;