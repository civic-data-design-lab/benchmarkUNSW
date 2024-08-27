import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function Home() {
    return (
        <Container>
            <Row>
                <Col xs={6} md={4}>
                    <Image src="../assets/react.svg" rounded />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
