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

import CenteredModal from '../component/CenteredModal';
import BarChart from '../component/BarChart';
import TimeSlider from '../component/TimeSlider';


function AiData() {
    const [activeModal, setActiveModal] = useState(null);
    const handleShowModal = (modalName) => { setActiveModal(modalName);};
    const handleCloseModal = () => { setActiveModal(null);};
    const [showDailyChart, setShowDailyChart] = useState(true);
    const [selectedOption, setSelectedOption] = useState('Social Interaction');
    const handleSelect = (eventKey) => { setSelectedOption(eventKey);};
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [indexName, setIndexName] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [index2Name, setIndex2Name] = useState(0);
    const [index3, setIndex3] = useState(0);
    const [index3Name, setIndex3Name] = useState(0);

    // Update Content Dynamically
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
                basePath = '/data/bench_graph/';
                break;
            default:
                basePath = '/data/socializing_graph/';
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

    //#region fetch data update social index
    const fetchData = async (date, time) => {
        const csvLocation = getCsvLocation();
        const parts = csvLocation.split('/');
        const graphName = parts[2];
        parts.pop();
        const newPath = parts.join('/');
        const csvUpdated = newPath + "/hourly.csv";
        //console.log(graphName);
        let col2Name = null;
        let col3Name = null;


        if (graphName === 'socializing_graph') {
            setIndexName("Social Index");
            setIndex2Name("Socializing on site");
            setIndex3Name("Pedestrians per hour");
            col2Name = "social";
            col3Name = "ped";
        }
        else if (graphName === 'activation_graph') {
            setIndexName("Dwell Index");
            setIndex2Name("Dwelling > 5min");
            setIndex3Name("Pedestrians per hour");
            col2Name = "total";
            col3Name = "average";
        }
        else if (graphName === 'bench_graph') {
            setIndexName("Bench Index");
            setIndex2Name("seating time (min)");
            setIndex3Name("Pedestrians per hour");
            col2Name = "social";
            col3Name = "ped";
        } 

        try
        {
            
            d3.csv(csvUpdated).then(data => {
                setData(data);
            }).catch(error => {
                console.error('Error loading or parsing CSV file:', error);
            });
            const formattedDate = d3.timeFormat("%-m/%-d/%Y")(new Date(date));
            const formattedTime = d3.timeFormat('%-H')(new Date(time));
            //console.log(date, time, formattedDate, formattedTime);

            for (let i = 0; i < data.length; i++) {
                //console.log(data[i].date, data[i].hour, formattedDate, formattedTime)
                if (data[i].date === formattedDate && data[i].hour === formattedTime) {
                    let index = (parseFloat(data[i]['index'])).toFixed(2);
                    setIndex(index);
                    let index2 = data[i][col2Name]
                    setIndex2(index2);
                    let index3 = data[i][col3Name]
                    setIndex3(index3);

                    console.log(csvUpdated, col2Name, col3Name, index, index2, index3);
                    return;
                }
            }
        } catch (error) {
            console.error('Error loading or parsing CSV file:', error);
        }
    };

    // Function to trigger data fetching on date/time change
    const handleDateTimeChange = (date, time) => {
        //console.log('Date:', date, 'Time:', time); // Debugging log
        fetchData(date, time); // Call fetchData with the new date and time
    };


    //#endregion

    return (
        <>
            <div className="aidata-page nova-mono-regular">

                {/*Time Slider*/}
                <div className="aidata-slider text-center medium-bg ">
                    <div className="time-slider">
                        <TimeSlider onDateTimeChange={handleDateTimeChange} />
                    </div>
                </div>


                {/*<div>*/}
                {/*    <div className="text-center">*/}
                {/*        <Button variant="light" onClick={() => handleShowModal('main')}>*/}
                {/*            Show me How to*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*    <CenteredModal*/}
                {/*        show={activeModal === 'main'}*/}
                {/*        onHide={handleCloseModal}*/}
                {/*        content="Toggle the slider below to visualize different bench configurations */}
                {/*         and interactions on the site through time. Swipe on the pull-up */}
                {/*         tab to see key take-aways and different data breakdowns. */}
                {/*         Social Index = people socializing on site / total pedestrians on site."/>*/}
                {/*</div>*/}

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

                        <Card className="mb-3 border-radius dark-button">
                            <Row className="padding-sm align-items-center text-center">
                                <Col xs={10}>
                                    <p className='primary-subtitle'>{index}%</p>
                                    <p className='primary-subtxt'>{indexName}</p>
                                </Col>
                                <Col xs={2}>
                                    <Button variant="outline-light" size="sm" style={{ borderRadius: '50%' }}
                                        onClick={() => handleShowModal('info')}> i </Button>
                                    <CenteredModal
                                        show={activeModal === 'info'}
                                        onHide={handleCloseModal}
                                        content="Social index is hahahha" />
                                </Col>
                            </Row>
                        </Card>

                        <Row>
                            <Col>
                                <Card className="padding-sm border-radius primary-border light-button text-center">
                                    <p className='primary-subtitle'>{index2}</p>
                                    <p className='primary-subtxt'>{index2Name}</p>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="padding-sm border-radius primary-border light-button text-center">
                                    <p className='primary-subtitle'>{index3}</p>
                                    <p className='primary-subtxt'>{index3Name}</p>
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
                <div className="medium-bg nova-mono-regular">
                    <BarChart
                        csvLocation={getCsvLocation()}
                        chartX={showDailyChart ? 'date' : 'hour'}
                        chartY={showDailyChart ? 'daily' : 'hourly'}
                        chartType={showDailyChart ? 'daily' : 'hourly'}
                        xTickFormat={showDailyChart ? d3.timeFormat("%b %d") : d => `${d}:00`}
                    />
                </div>
                </>

                {/* Conditionally render Space Activation Chart */}
                <>
                {selectedOption === 'Space Activation' && (
                    <div className="medium-bg nova-mono-regular">
                        <BarChart
                            csvLocation={getCsvLocation()}
                            chartX={showDailyChart ? 'date' : 'hour'}
                            chartY={showDailyChart ? 'average' : 'average'}
                            chartType={showDailyChart ? 'daily' : 'hourly'}
                            xTickFormat={showDailyChart ? d3.timeFormat("%b %d") : d => `${d}:00`}
                        />
                    </div>
                    )}
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
