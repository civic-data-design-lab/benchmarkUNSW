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
    const [selectedOption, setSelectedOption] = useState('Select Data Breakdown');
    const handleSelect = (eventKey) => { setSelectedOption(eventKey);};

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

    return (
        <>
            <div className="aidata-page nova-mono-regular">

                {/*Time Slider*/}
                <div className="aidata-slider text-center medium-bg ">
                    <div className="time-slider">
                        <TimeSlider />
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
                                    <p className='primary-subtitle'>36%</p>
                                    <p className='primary-subtxt'>Social Index</p>
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
                                    <p className='primary-subtitle'>11</p>
                                    <p className='primary-subtxt'>socializing on site</p>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="padding-sm border-radius primary-border light-button text-center">
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
                            chartY={showDailyChart ? 'average_daily_dwell_time' : 'average_hourly_dwell_time'}
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
