import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, Card, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import * as d3 from 'd3';
import '../style/AiData.css';
function TimeSlider({ onDateTimeChange }) {
    const sliderRef = useRef();
    const [selectedTime, setSelectedTime] = useState(new Date(2024, 6, 8, 6, 0)); // Default to 6:00 AM
    const [width, setWidth] = useState(window.innerWidth);
    const [selectedDate, setSelectedDate] = useState("7/8/2024"); // Start with formatted date

    const handleSelect = (eventKey) => {
        setSelectedDate(eventKey);
    };

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const svg = d3.select(sliderRef.current);
        svg.selectAll('*').remove(); // Clear previous elements

        const margin = { left: 50, right: 50 };
        const sliderWidth = width - margin.left - margin.right; // Adjust width based on margins

        const timeScale = d3.scaleTime()
            .domain([new Date(2024, 6, 8, 6, 0), new Date(2024, 6, 8, 24, 0)]) // Time from 6:00 to 24:00
            .range([0, sliderWidth]);

        const axis = d3.axisBottom(timeScale)
            .ticks(d3.timeHour.every(1)) // Tick every hour
            .tickFormat(d3.timeFormat('%H' + ':00')); // Format hour

        svg.append('g')
            .attr('transform', `translate(${margin.left}, ${70 / 2})`)
            .call(axis);

        const handle = svg.append('circle')
            .attr('cx', margin.left + timeScale(selectedTime))
            .attr('cy', 70 / 2)
            .attr('r', 8)
            .attr('fill', '#FF2551')
            .call(d3.drag()
                .on('drag', function (event) {
                    const newX = Math.max(0, Math.min(sliderWidth, event.x - margin.left));
                    const newTime = timeScale.invert(newX);
                    handle.attr('cx', margin.left + timeScale(newTime));
                    setSelectedTime(newTime);
                })
            );

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', 70)
            .attr('text-anchor', 'middle')
            .text(d3.timeFormat('%H' + ':00')(selectedTime));

    }, [selectedTime, width]);

    useEffect(() => {
        onDateTimeChange(selectedDate, selectedTime);
    }, [selectedDate, selectedTime, onDateTimeChange]);

    // Format date to MM/DD/YYYY
    const dateFormat = d3.timeFormat("%-m/%-d/%Y");

    // Generate array of dates from July 8, 2024 to August 8, 2024
    const dateOptions = [];
    const startDate = new Date(2024, 6, 8);
    const endDate = new Date(2024, 7, 8);
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        dateOptions.push(dateFormat(d)); // Format each date as MM/DD/YYYY
    }

    return (
        <div>
            <div className="data-breakdown-dropdown mb-3 padding-tb-sm">
                <Dropdown onSelect={handleSelect} className="custom-dropdown w-100">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100">
                        {selectedDate}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                        {dateOptions.map((date) => (
                            <Dropdown.Item className="dropdown-item" key={date} eventKey={date}>
                                {date}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Time Slider */}
            <svg ref={sliderRef} width={width} height={70}></svg>

            {/* Display selected date and time */}
            <p className='primary-subtxt'>Selected Date: {selectedDate}</p>
            <p className='primary-subtxt'>Selected Time: {d3.timeFormat('%H' + ':00')(selectedTime)}</p>
        </div>
    );
}

export default TimeSlider;
