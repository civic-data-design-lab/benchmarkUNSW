import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, Card, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import '../style/AiData.css';
import * as d3 from 'd3';
import social1 from '../assets/AiData/social1.png';
import social2 from '../assets/AiData/social2.png';
import social3 from '../assets/AiData/social3.png';
import dwell1 from '../assets/AiData/dwell1.png';
import dwell2 from '../assets/AiData/dwell2.png';
import dwell3 from '../assets/AiData/dwell3.png';
import bench1 from '../assets/AiData/bench1.png';
import bench2 from '../assets/AiData/bench2.png';
import bench3 from '../assets/AiData/bench3.png';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    How to
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="nova-mono-regular">
                    <p>
                        Toggle the slider below to visualize different bench configurations and interactions on the site through time.
                        Swipe on the pull-up tab to see key take-aways and different data breakdowns.
                        Social Index = people socializing on site / total pedestrians on site.
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
}

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

function SectionTwo({ }) {
}

function AiData() {
    const [modalShow, setModalShow] = useState(false);
    const [showDailyChart, setShowDailyChart] = useState(true);
    const [selectedOption, setSelectedOption] = useState('Select Data Breakdown');

    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
    };


    //#region update CSV
    const getCsvLocation = () => {
        let basePath = '';
        switch (selectedOption) {
            case 'Social Interaction':
                basePath = '/data/socializing_graph/';
                break;
            case 'Space Activation':
                basePath = '/data/activation_graph/';
                break;
            case 'Benches':
                basePath = '/data/activation_graph/';
                break;
            default:
                basePath = '/data/activation_graph/';
        }
        return `${basePath}${showDailyChart ? 'daily.csv' : 'hourly.csv'}`;
    };
    //#endregion
    //#region update images
    const getImages = () => {
        switch (selectedOption) {
            case 'Social Interaction':
                return [social1, social2, social3];
            case 'Space Activation':
                return [dwell1, dwell2, dwell3];
            case 'Benches':
                return [bench1, bench2, bench3];
            default:
                return [social1, social2, social3];
        }
    };
    const images = getImages();
    //#endregion
    //#region update name
    const getTextForSelection = () => {
        switch (selectedOption) {
            case 'Social Interaction':
                return 'High Social Index Rate Formations';
            case 'Space Activation':
                return 'Top 3 Dwell Index Maps';
            case 'Benches':
                return 'Top 3 Seating Index Maps';
            default:
                return 'High Social Index Rate Formations';
        }
    };
    //#endregion

    useEffect(() => {
        console.log('Selected Option:', selectedOption);
        console.log('Images:', images);
    }, [selectedOption]);

    return (
        <>
            <div className="aidata-page nova-mono-regular">
                <div>
                    <div className="text-center">
                        <Button variant="light" onClick={() => setModalShow(true)}>
                            Show me How to
                        </Button>
                    </div>
                    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
                </div>

                {/*Data breakdown*/}
                <>
                    <div className="light-bg padding-tb-lg">
                        <div className="text-center primary-subtitle mb-3">
                            <p>Select Data Breakdown</p>
                        </div>

                        <div className="data-breakdown-dropdown mb-3">
                            <Dropdown onSelect={handleSelect} className="custom-dropdown w-100">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100">
                                    {selectedOption}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100">
                                    <Dropdown.Item className="dropdown-item" eventKey="Social Interaction">Social Interaction</Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item" eventKey="Space Activation">Space Activation</Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item" eventKey="Benches">Benches</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <Card className="mb-3 border-radius dark-button align-items-center text-center">
                            <Row className="padding-sm">
                                <Col>
                                    <p className='primary-subtitle'>36%</p>
                                    <p className='primary-subtxt'>Social Index</p>
                                </Col>
                                <Col className="text-end padding-md">
                                    <Button variant="outline-light" size="sm" style={{ borderRadius: '50%' }}>i</Button>
                                </Col>
                            </Row>
                        </Card>

                        <Row>
                            <Col>
                                <Card className="border-radius primary-border light-button text-center">
                                    <p className='primary-subtitle'>11</p>
                                    <p className='primary-subtxt'>socializing on site</p>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="border-radius primary-border light-button text-center">
                                    <p className='primary-subtitle'>27</p>
                                    <p className='primary-subtxt'>pedestrians per hour</p>
                                </Card>
                            </Col>
                        </Row>

                    </div>
                </>


                {/*Chart Button*/}
                <>
                <div className="chart_button nova-mono-regular">
                    <Button variant="primary" className="chart_button"
                        onClick={() => setShowDailyChart(!showDailyChart)}>
                        {showDailyChart ? 'Hourly' : 'Daily'}
                    </Button>
                </div>
                </>


                {/*Bar Chart*/}
                <>
                <div className="aidata_activation nova-mono-regular">
                    <BarChart
                        csvLocation={getCsvLocation()}
                        chartX={showDailyChart ? 'date' : 'hour'}
                        chartY={showDailyChart ? 'daily' : 'hourly'}
                        chartType={showDailyChart ? 'daily' : 'hourly'}
                        xTickFormat={showDailyChart ? d3.timeFormat("%b %d") : d => `${d}:00`}
                    />
                </div>
                </>

                {/*Desc Section 1*/}
                <>
                    <div className="light-bg padding-tb-lg">
                        <Container>
                            <Row>
                                <div className="text-center">
                                    <div className="dark-button primary-subtitle">
                                        <p>4:00 PM</p>
                                    </div>
                                    <div className="dark-txt primary-txt">
                                        <p>Most Common Overall Time for Socializing</p>
                                    </div>
                                </div>
                            </Row>
                        </Container>
                    </div>
                </>

                {/*Desc Section 2*/}
                <>
                    <div className="medium-bg padding-tb-lg">
                        <Container>
                            <Row>
                                <div className="text-center nova-mono-regular primary-subtitle">
                                    <p>{getTextForSelection()}</p>
                                </div>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="text-center primary-subtxt">
                                        <Row className="align-items-center justify-content-center">July 4, 1:00pm</Row>
                                        <Row className="align-items-center justify-content-center"><img src={images[0]} /></Row>
                                        <Row className="align-items-center justify-content-center">S.I.:38%</Row>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="text-center primary-subtxt">
                                        <Row className="align-items-center justify-content-center">July 8, 11:00am</Row>
                                        <Row className="align-items-center justify-content-center"><img src={images[1]} /></Row>
                                        <Row className="align-items-center justify-content-center">S.I.:20%</Row>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="text-center primary-subtxt">
                                        <Row className="align-items-center justify-content-center">July 25, 3:30pm</Row>
                                        <Row className="align-items-center justify-content-center"><img src={images[2]} /></Row>
                                        <Row className="align-items-center justify-content-center">S.I.:17%</Row>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </>

            </div>
        </>
    );
}

export default AiData;
