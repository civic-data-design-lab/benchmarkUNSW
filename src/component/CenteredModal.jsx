import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, Card, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import * as d3 from 'd3';
function CenteredModal(props) {
    const { content, ...modalProps } = props;

    return (
        <Modal
            {...modalProps}
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
                    <p>{content}</p>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default CenteredModal;