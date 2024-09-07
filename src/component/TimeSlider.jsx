import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, Card, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import * as d3 from 'd3';

function TimeSlider({ width = 500, height = 70 }) {
    const sliderRef = useRef();
    const [selectedTime, setSelectedTime] = useState(new Date(2024, 6, 8, 6, 0)); // Default to 6:00 AM
    const [selectedDate, setSelectedDate] = useState("2024-07-08");

    useEffect(() => {
        const svg = d3.select(sliderRef.current);
        svg.selectAll('*').remove(); // Clear previous elements

        // Define the time scale (6:00 AM to 24:00)
        const timeScale = d3.scaleTime()
            .domain([new Date(2024, 6, 8, 6, 0), new Date(2024, 6, 8, 24, 0)]) // Time from 6:00 to 24:00
            .range([0, width - 50]); // Slider range

        // Create the axis
        const axis = d3.axisBottom(timeScale)
            .ticks(d3.timeHour.every(2)) // Tick every 2 hours
            .tickFormat(d3.timeFormat('%H:%M')); // Hour and minute format

        // Append axis to the SVG
        svg.append('g')
            .attr('transform', `translate(25, ${height / 2})`)
            .call(axis);

        // Create the slider handle
        const handle = svg.append('circle')
            .attr('cx', timeScale(selectedTime))
            .attr('cy', height / 2)
            .attr('r', 8)
            .attr('fill', '#007bff')
            .call(d3.drag()
                .on('drag', function (event) {
                    const newX = Math.max(0, Math.min(width - 50, event.x - 25));
                    const newTime = timeScale.invert(newX);
                    handle.attr('cx', timeScale(newTime));
                    setSelectedTime(newTime);
                })
            );

        // Text to display selected time
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height)
            .attr('text-anchor', 'middle')
            .text(d3.timeFormat('%H:%M')(selectedTime));

    }, [selectedTime, width, height]);

    // Function to handle the date change from dropdown
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    // Create the array of dates from July 8, 2024 to August 8, 2024
    const dateOptions = [];
    const startDate = new Date(2024, 6, 8);
    const endDate = new Date(2024, 7, 8);
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        dateOptions.push(d.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    }

    return (
        <div>
            {/* Dropdown to select date */}
            <div>
                <label>Select Date: </label>
                <select value={selectedDate} onChange={handleDateChange}>
                    {dateOptions.map(date => (
                        <option key={date} value={date}>
                            {date}
                        </option>
                    ))}
                </select>
            </div>

            {/* Time Slider */}
            <svg ref={sliderRef} width={width} height={height}></svg>

            {/* Display selected date and time */}
            <p>Selected Date: {selectedDate}</p>
            <p>Selected Time: {d3.timeFormat('%H:%M')(selectedTime)}</p>
        </div>
    );
}

export default TimeSlider;