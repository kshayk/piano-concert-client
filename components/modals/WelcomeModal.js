import {Button, Modal} from "react-bootstrap";

export default function WelcomeModal({show, onHideWelcomeModal}) {
    return (
        <Modal show={show} onHide={onHideWelcomeModal}>
            <Modal.Header>
                <Modal.Title>Welcome!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Please enjoy your stay and share this website if you find it fun :)</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHideWelcomeModal} className="btn btn-primary">Let&apos;s go!</Button>
            </Modal.Footer>
        </Modal>
    )
}