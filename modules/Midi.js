var selectMIDI  = null;
var selectMIDIo = null;
var midiAccess  = null;
var midiIn      = null;
var midiOut     = null;

function midiMessageReceived( ev ) {
    let cmd = ev.data[0] >> 4;
    let channel = ev.data[0] & 0xf;
    let noteNumber = ev.data[1];
    let velocity = ev.data[2];

    //make sure you emit and make sound only if the composer is using a keyboard.
    if(isComposer) {
        if (channel == 9)
            return
        if (cmd == 8 || ((cmd == 9) && (velocity == 0))) { // with MIDI, note on with velocity zero is the same as note off
            // note off
            removePressedClass(noteNumber);

            socket.emit('pressMidiKey', {t: MIDITYPEOFF, n: `${noteNumber}`, r: roomId});

            if (hearPiano) {
                openWebPiano.noteOff(noteNumber);
            }
        } else if (cmd == 9) {
            // note on
            addPressedClass(noteNumber);
            socket.emit('pressMidiKey', {t: MIDITYPEON, n: `${noteNumber}`, v: velocity, r: roomId});

            if (hearPiano && isComposer) {
                openWebPiano.noteOn(noteNumber, velocity);
            }
        } else if (cmd == 11) {
            //controller( noteNumber, velocity);
            if (noteNumber == 64) {
                socket.emit('pressMidiKey', {t: MIDITYPESUSTAIN, v: velocity, r: roomId});
                if (hearPiano && isComposer) {
                    openWebPiano.sustain(velocity);
                }
            }
        }
    }


    // } else if (cmd == 14) {
    //   // pitch wheel
    //   pitchWheel( ((velocity * 128.0 + noteNumber)-8192)/8192.0 );
    // } else if ( cmd == 10 ) {  // poly aftertouch
    //   polyPressure(noteNumber,velocity/127)
    // } else {
    //     // console.log("" + ev.data[0] + " " + ev.data[1] + " " + ev.data[2])
    // }
}

function selectMIDIIn( ev ) {
    if (midiIn)
        midiIn.onmidimessage = null;
    var id = ev.target[ev.target.selectedIndex].value;
    if ((typeof(midiAccess.inputs) == "function"))   //Old Skool MIDI inputs() code
        midiIn = midiAccess.inputs()[ev.target.selectedIndex];
    else
        midiIn = midiAccess.inputs.get(id);
    if (midiIn)
        midiIn.onmidimessage = midiMessageReceived;
}

export function onMIDIStarted( midi ) {
    let midiAccess = midi;
    let selectMIDI=document.getElementById("midiIn");
    let selectMIDIo=document.getElementById("midiOut");
    midi.onstatechange = midiConnectionStateChange;
    populateMIDIInSelect(selectMIDI);
    populateMIDIOutSelect();
    selectMIDI.onchange = selectMIDIIn;
    selectMIDIo.onchange = selectMIDIOut;
}

export function midiConnectionStateChange( e ) {
    console.log("connection: " + e.port.name + " " + e.port.connection + " " + e.port.state );
    populateMIDIInSelect();
    populateMIDIOutSelect();
}

export function populateMIDIInSelect() {
    // clear the MIDI input select
    selectMIDI.options.length = 0;
    if (midiIn && midiIn.state=="disconnected")
        midiIn=null;
    var firstInput = null;

    var inputs=midiAccess.inputs.values();
    for ( var input = inputs.next(); input && !input.done; input = inputs.next()){
        input = input.value;
        if (!firstInput)
            firstInput=input;
        var str=input.name.toString();
        var preferred = !midiIn && ((str.indexOf("USB") != -1)||(str.indexOf("Keyboard") != -1)||(str.indexOf("keyboard") != -1)||(str.indexOf("KEYBOARD") != -1));

        // if we're rebuilding the list, but we already had this port open, reselect it.
        if (midiIn && midiIn==input)
            preferred = true;

        selectMIDI.appendChild(new Option(input.name,input.id,preferred,preferred));
        if (preferred) {
            midiIn = input;
            midiIn.onmidimessage = midiMessageReceived;
        }
    }
    if (!midiIn) {
        midiIn = firstInput;
        if (midiIn)
            midiIn.onmidimessage = midiMessageReceived;
    }
}

export function populateMIDIOutSelect() {
    // clear the MIDI input select
    selectMIDIo.options.length = 0;
    if (midiOut && midiOut.state=="disconnected")
        midiOut=null;
    var firstOutput = null;

    var outputs=midiAccess.outputs.values();
    for ( var output = outputs.next(); output && !output.done; output = outputs.next()){
        output = output.value;
        if (!firstOutput)
            firstOutput=output;
        selectMIDIo.appendChild(new Option(output.name,output.id,false,false));
    }
    if (!midiOut) {
        midiOut = firstOutput;
    }
}

export function onMIDISystemError( err ) {
    //document.getElementById("synthbox").className = "error";
    console.log( "MIDI not initialized - error encountered:" + err.code );
}