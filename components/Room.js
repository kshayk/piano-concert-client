import {useEffect, useState} from "react";
import {Button, Modal} from 'react-bootstrap';
import Piano from "./Piano";
import NoteControl from "./NoteControl";
import InviteModal from "./modals/InviteModal";
import CurrentListeners from "./CurrentListeners";
import {useMIDI, useMIDINotes} from "@react-midi/hooks";
import WelcomeModal from "./modals/WelcomeModal";
import socketIOClient from "socket.io-client";

export default function Room() {
    const [isComposer, setIsComposer] = useState(true);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [hearPiano, setHearPiano] = useState(true);
    const [currentListeners, setCurrentListeners] = useState(0);
    const [currentNotes, setCurrentNotes] = useState([]);

    useEffect(() => {
        setShowWelcomeModal(true);

        console.log(process.env.SOCKET_URL);
        const socket = socketIOClient(process.env.SOCKET_URL);
        socket.emit("noteOn", {
            note: "34",
            velocity: 20
        });
    }, []);

    const handleWelcomeModalClose = () => {
        setShowWelcomeModal(false);
    };

    const { inputs, outputs, hasMIDI } = useMIDI();


    const handleMidiAction = (notes) => {
        setCurrentNotes(notes);
    }

    const handleHearPianoClick = () => {
        setHearPiano(!hearPiano);
    }

    const handleInviteModalClose = () => setShowInviteModal(false);
    const handleInviteModalOpen = () => setShowInviteModal(true);

    return (
        <div style={{flexGrow: 4}}>
            <h1>pian.io</h1>

            <WelcomeModal show={showWelcomeModal} onHideWelcomeModal={handleWelcomeModalClose}/>

            <InviteModal showInviteModal={showInviteModal} onModalClose={handleInviteModalClose}/>

            <CurrentListeners currentListeners={currentListeners}/>

            {/*<span>Chrome requires a user click in order to hear the piano: <button class="btn-primary" id="hearButtonUser">Hear</button></span>*/}
            <div id="pianoHandle" className={`${isComposer ? '' : 'isHidden'} text-center`} style={{marginBottom: 20}}>
                <Button style={{marginRight: 5}} onClick={handleHearPianoClick} className={`btn ${hearPiano ? 'btn-success' : 'btn-primary'}`}>Hear piano</Button>
                <Button onClick={handleInviteModalOpen} className="btn btn-warning">Invite Listeners</Button>
            </div>

            <div className={`${isComposer ? '' : 'isHidden'} text-center`} style={{marginBottom: 20}}>
                <div>Current MIDI Input: <span style={{fontWeight: "bold"}}>{inputs.length > 0 ? inputs[0].name : 'None'}</span></div>
            </div>

            {inputs.length > 0 && <NoteControl
                hearPiano={hearPiano}
                midiInput={inputs[0]}
                onMidiAction={handleMidiAction}
            />}

            <Piano currentNotes={currentNotes}/>
        </div>
    )
}