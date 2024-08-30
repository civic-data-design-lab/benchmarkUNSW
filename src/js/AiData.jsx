import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../style/AiData.css';

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

function AiData() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <div className="aidata-page">
            <div class="text-center">
                <Button variant="light" onClick={() => setModalShow(true)}>
                    Launch vertically centered modal
                </Button>
            </div>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                />

            <div>
                <h1>Home Page</h1>
                <p>Welcome to the AI Data Page!</p>
        </div>
        </div>
        </>
    );
}

export default AiData;
