import {Button, Modal} from "react-bootstrap";

export default function InviteModal({showInviteModal, onModalClose}) {
    return (
        <Modal show={showInviteModal} onHide={onModalClose} role="document">
            <Modal.Header closeButton>
                <Modal.Title>Invite Listeners</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Send the URL below to your friends so they can listen to you:</p>
                <p><input id="roomUrl" type="text" className="form-control" /></p>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <Button onClick={onModalClose} className="btn btn-default">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}