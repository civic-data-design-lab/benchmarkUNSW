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

function MyBarChart() {
    const svgRef = useRef();
    const [data, setData] = useState([]);

    useEffect(() => {
        const parseDate = d3.timeParse("%Y-%m-%d");

        d3.csv('/data/activation_graph/daily_dwell_index.csv').then(data => {
            data.forEach(d => {
                d.date = parseDate(d.date); // Parse the date using the date parser
                if (!d.date) {
                    console.error(`Invalid date format: ${d.date}`);
                }
                d.daily_people = Number(d.daily_people); // Ensure daily_people is a number
                if (isNaN(d.daily_people)) {
                    console.error(`Invalid number format for daily_people: ${d.daily_people}`);
                    d.daily_people = 0; // Handle NaN values by setting them to 0 or another default value
                }
            });
            console.log(data); // Debugging: Log the parsed data
            setData(data);
        }).catch(error => {
            console.error('Error loading or parsing CSV file:', error);
        });
    }, []);

    useEffect(() => {
        if (data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.1)
            .domain(data.map(d => d.date));

        const y = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, d3.max(data, d => d.daily_people)]);

        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Daily People");

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.date))
            .attr("y", d => y(d.daily_people))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.daily_people));
    }, [data]);

    return (
        <svg ref={svgRef} width={960} height={500}></svg>
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

                <MyBarChart />
            </div>
        </>
    );
}

export default AiData;
