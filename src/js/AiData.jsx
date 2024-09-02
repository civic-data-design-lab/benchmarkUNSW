import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../style/AiData.css';
import * as d3 from 'd3';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Toggle the slider below to visualize different bench configurations and interactions on the site through time.
                    Swipe on the pull-up tab to see key take-aways and different data breakdowns.
                    Social Index = people socializing on site / total pedestrians on site.
                </p>
            </Modal.Body>
        </Modal>
    );
}

function MyBarChart({ csvLocation, chartX, chartY }) {
    const svgRef = useRef();
    const [data, setData] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);


    useEffect(() => {

        const parseDate = d3.timeParse("%Y-%m-%d");

        d3.csv(csvLocation).then(data => {

            data.forEach(d => {
                d[chartX] = parseDate(d[chartX]);
                if (!d[chartX]) {
                    console.error(`Invalid number format for chartX: ${d[chartX]}`);
                }
                d[chartY] = Number(d[chartY]);
                if (isNaN(d[chartY])) {
                    console.error(`Invalid number format for chartY: ${d[chartY]}`);
                    d[chartY] = 0;
                }
            });
            console.log(data);
            setData(data);
        }).catch(error => {
            console.error('Error loading or parsing CSV file:', error);
        });
    }, [csvLocation]);

    useEffect(() => {
        if (data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        svg.attr("class", "aidata_activation_svg");

        const margin = { top: 30, right: 30, bottom: 30, left: 30 };
        const width = window.innerWidth - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);


        const x = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.5)
            .domain(data.map(d => d[chartX]));

        const y = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, d3.max(data, d => d[chartY])]);

        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x)
                .tickSize(0) // Remove tick marks
                .tickFormat(d3.timeFormat("%b %d"))) // Format dates as "Abbreviated Month Day"
            .selectAll("text")
            .attr("transform", "rotate(-90) translate(-10, 10)") // Rotate and move down
            .style("text-anchor", "end")
            .style("text-align", "center")


        g.append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
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
                    .attr("class", "bar_label")
                    .attr("text-anchor", "middle") 
                    .text(d[chartY]);
            })
            .on('mouseout', function () {
                d3.selectAll(".bar_label").remove();
            });


    }, [data]);

    return (
        <svg ref={svgRef} width={window.innerWidth} height={323}></svg>
    );
}

function AiData() {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <div className="aidata-page">
                <div className="text-center">
                    <Button variant="light" onClick={() => setModalShow(true)}>
                        Launch vertically centered modal
                    </Button>
                </div>

                <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />

                <div>
                    <h1>Home Page</h1>
                    <p>Welcome to the AI Data Page!</p>
                </div>
                <div className="aidata_activation nova-mono-regular">
                    <MyBarChart
                        csvLocation='/data/activation_graph/daily_dwell_index.csv'
                        chartX='date' chartY='daily_people'/>
                </div>
            </div>
        </>
    );
}

export default AiData;
