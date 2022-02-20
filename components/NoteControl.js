import {useMIDINote} from "@react-midi/hooks";
import {useEffect, useState} from "react";
import {midiKeyIndex} from "../modules/MidiKeyIndex";
import { detect } from "@tonaljs/chord-detect"
import OpenWebPiano from "../modules/OpenWebPianoClass";

export default function NoteControl({hearPiano, midiInput, onMidiAction}) {
    const [notes, setNotes] = useState([]);
    const [currentChord, setCurrentChord] = useState(null);
    const [openWebPianoInstance, setOpenWebPianoInstance] = useState(null);

    const note = useMIDINote(midiInput, { channel: 1 });

    if (!openWebPianoInstance) {
        const openWebPianoUtil = new OpenWebPiano();
        openWebPianoUtil.init(new AudioContext())
        setOpenWebPianoInstance(openWebPianoUtil);
    }

    useEffect(() => {
        if (!note) return;

        if (note.velocity === 0) {
            setNotes(currentState => currentState.filter(existingNote => existingNote !== note.note));
            hearPiano && openWebPianoInstance.noteOff(note.note);
        } else if (note.velocity > 0) {
            setNotes([...notes, note.note]);
            hearPiano && openWebPianoInstance.noteOn(note.note, note.velocity);
        }
    }, [note]);

    useEffect(() => {
        onMidiAction(notes);

        //sort notes by value
        const sortedNotes = notes.sort((a, b) => a - b);

        // convert each note to a midi key index
        const midiKeyIndexNotes = sortedNotes.map(existingNote => midiKeyIndex[existingNote][1]).map(noteName => {
            // remove everything after the slash
            return noteName.split("/")[0].trim();
        });

        if (midiKeyIndexNotes.length > 0) {
            setCurrentChord(detect(midiKeyIndexNotes)[0]);
            return;
        }

        setCurrentChord(null);

    }, [notes])

    const notesString = notes.map(noteNumber => {
        return midiKeyIndex[noteNumber][1].split("/")[0].trim();
    }).join(',');

    return (
        <div className="text-center" style={{marginBottom: 20}}>
            <h1>Notes:</h1> <div style={{margin: "0 auto", backgroundColor: "#d4ffde", height: 80, overflowX: "auto", border: "2px solid black", maxWidth: 400, marginBottom: "20"}}><h1 id="noteName">{notesString}</h1></div>
            <h1>Chord:</h1> <div  style={{margin: "0 auto", width: 250, height: 55, backgroundColor: "#cad2fa", border: "2px solid black"}}><h1 style={{bottom: "50px"}}>{currentChord}</h1></div>
        </div>
    )
}