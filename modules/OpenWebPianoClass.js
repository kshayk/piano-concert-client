export default class OpenWebPianoClass {
    context;
    convolver;
    directGain;
    convGain;
    convGainAfter;
    bufferlists;
    damper;
    sus = 0;
    sustained = [];
    notes;

    BufferLoader = (contexts, urlList, callback) => {
        let bufferLoader = {};

        bufferLoader.context = contexts;
        bufferLoader.urlList = urlList;
        bufferLoader.onload = callback;
        bufferLoader.bufferList = new Array();
        bufferLoader.loadCount = 0;
        bufferLoader.loadBuffer = async (url, index) => {
            let request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            let loader = bufferLoader;
            request.onload = async () => {
                try {
                    let audioDecoder = await loader.context.decodeAudioData(
                        request.response,
                    );

                    loader.bufferList[index] = audioDecoder;

                    if (++loader.loadCount == loader.urlList.length)
                        loader.onload(loader.bufferList);

                } catch (e) {
                    throw `Failed to decode the audio. Error: ${e}`;
                }
            }
            request.onerror = () => {
                console.error('BufferLoader: XHR error');
            }
            request.send();
        };
        bufferLoader.load = () => {
            for (let i = 0; i < bufferLoader.urlList.length; ++i)
                bufferLoader.loadBuffer(bufferLoader.urlList[i], i);
        }

        return bufferLoader;
    }

    bufferSaver = bufferlist => {
        this.bufferlists = bufferlist;
        this.damper = this.bufferlists[8];
        this.convolver.buffer = this.bufferlists[9];
    }

    equalGain = val => {
        return Math.cos((1.0 - val) * 0.5 * Math.PI);
    }

    Note = val => {
        let note = {};
        note.noteA = this.context.createBufferSource();
        note.noteB = this.context.createBufferSource();
        note.gainA = this.context.createGain();
        note.gainB = this.context.createGain();
        note.gain = this.context.createGain();
        note.biquadFilter = this.context.createBiquadFilter();
        note.biquadFilter.type = "lowpass";

        note.biquadFilter.connect(this.directGain);
        note.gain.connect(note.biquadFilter);
        note.gainA.connect(note.gain);
        note.noteA.connect(note.gainA);
        note.gainB.connect(note.gain);
        note.noteB.connect(note.gainB);

        if (val < 90) {
            note.damp = this.context.createBufferSource();
            note.damp.buffer = this.damper;
            note.damp.connect(this.directGain);
        };

        note.on = (bufA, bufB, rateA, rateB, filtFreq, gain_A, gain_B, gain_) => {

            note.noteA.buffer = this.bufferlists[bufA];
            note.noteA.playbackRate.value = rateA;
            note.biquadFilter.frequency.value = filtFreq;
            note.gainA.gain.value = gain_A;
            note.gainB.gain.value = gain_;

            if (this.bufferlists[bufB]) {
                note.noteB.buffer = this.bufferlists[bufB];
                note.noteB.playbackRate.value = rateB;
                note.gainB.gain.value = gain_B;
                note.noteB.start(0);
            } else {
                note.noteB = null;
            }
            note.noteA.start(0);
        };

        note.off = noteNumber => {
            note.noteA.stop(0);
            note.noteB.stop(0);
        }

        return note;
    }

    noteOn = (noteNumber, velocity) => {
        if ((noteNumber < 109) && (noteNumber > 20)) {
            if (this.notes[noteNumber]) {
                this.notes[noteNumber].gain.setTargetAtTime(0.0, this.context.currentTime, 1.1);
                this.notes[noteNumber].noteA.stop(this.context.currentTime + 2);
                this.notes[noteNumber].noteB.stop(this.context.currentTime + 2);
                this.notes[noteNumber].damp = null;
                this.sustained.splice(this.sustained.indexOf(noteNumber), 1);
            }

            let bufNumA = Math.floor((noteNumber - 21) / 12);
            let bufNumB = bufNumA + 1;
            let noteNum = bufNumA * 12 + 21;

            let freq = 2 ** ((noteNumber - 69) / 12) * 440;
            let velo = velocity / 127;
            let harmQuant = 20000 / freq;
            let filtFreq = freq * (2 - (noteNumber - 21) / 50) + freq * harmQuant * Math.pow(velo, 4);

            let gain_A = this.equalGain(1 - ((noteNumber - 21) % 12) / 11);
            let rate_A = Math.pow(2, (noteNumber - noteNum) / 12);
            let rate_B = 0;
            let gain_B = 0;
            let gain_ = velo ** 1.4;
            if (bufNumB < 8) {
                rate_B = Math.pow(2, (noteNumber - (noteNum + 12)) / 12);
                gain_B = 1 - gain_A;
            }
            this.notes[noteNumber] = this.Note(noteNumber);
            this.notes[noteNumber].on(bufNumA, bufNumB, rate_A, rate_B, filtFreq, gain_A, gain_B, gain_);
        }
    }

    noteOff = noteNumber => {
        if (!this.sus) {
            if (noteNumber < 90) {
                this.notes[noteNumber].gain.gain.setTargetAtTime(0.0, this.context.currentTime + 0.03, 0.08);
                this.notes[noteNumber].noteA.stop(this.context.currentTime + 2);
                this.notes[noteNumber].noteB.stop(this.context.currentTime + 2);
                this.notes[noteNumber].damp.start(0);
            }
            delete this.notes[noteNumber];
        } else {
            this.sustained.push(noteNumber);
        }
    }

    sustain = val => {
        if (val == 127) {
            this.sus = true;
            this.convGain.gain.value = 1;
            this.convGainAfter.gain.value = 1;
        } else if (val == 0) {
            this.sus = false;
            this.convGain.gain.value = 0.0;
            this.convGainAfter.gain.value = 0;
            for (let i = 0; i < this.sustained.length; i++) {
                if (this.notes[this.sustained[i]]) {
                    this.noteOff(this.sustained[i]);
                }
            }
            this.sustained = [];
        }
    }

    init = contexts => {
        this.context = contexts;
        this.convolver = this.context.createConvolver();
        this.directGain = this.context.createGain();
        this.convGain = this.context.createGain();
        this.convGainAfter = this.context.createGain();

        this.convGain.connect(this.convolver);
        this.convolver.connect(this.convGainAfter);
        this.convGainAfter.connect(this.context.destination);
        this.directGain.connect(this.context.destination);
        this.directGain.connect(this.convGain);
        this.directGain.gain.value = 0.5;
        this.convGain.gain.value = 0;
        this.convGainAfter.gain.value = 0;
        let bufferLoader = this.BufferLoader(
            this.context,
            [
                '/audio/piano/21.mp3',
                '/audio/piano/33.mp3',
                '/audio/piano/45.mp3',
                '/audio/piano/57.mp3',
                '/audio/piano/69.mp3',
                '/audio/piano/81.mp3',
                '/audio/piano/93.mp3',
                '/audio/piano/105.mp3',
                '/audio/damper.mp3',
                '/audio/Piano Impulse6.mp3'
            ],
            this.bufferSaver
        );
        bufferLoader.load();
        this.notes = new Object();
    }
}

