import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import GridMap from '../component/GridMap';
import { useState, useEffect } from 'react';
import gridData from '../data/map_grid.json'
import benchData from '../data/bench_data_hourly.json'
import pedestrianData from '../data/pedestrian_data_hourly.json'
import DateSelector from '../component/DateSelector';


function Home() {
    const [state, setState] = useState({
        grid: gridData,
        bench: benchData,
        pedestrian: pedestrianData,
    })

    const { grid, bench, pedestrian } = state

    const [selectedDate, setDate] = useState('2024-07-08')
    const [selectedHour, setHour] = useState(6)
    return (
        <Container style={{ margin: 0 }}>
            <Row>
                <Col >
                    <Image src="../assets/react.svg" rounded />
                    {gridData && benchData && pedestrianData &&

                        <GridMap
                            gridData={grid}
                            benchData={bench}
                            pedestrianData={pedestrian}
                            targetDate={selectedDate}
                            targetHour={selectedHour}
                        >

                        </GridMap>

                    }
                    <DateSelector
                        setTargetDate={setDate}
                        setTargetHour={setHour}
                        startDate={'2024-07-08'}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
