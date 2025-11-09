class AudioEventSyncer {

    constructor() {
        /**
        * @type {boolean} isPlaying = true if current audio source is playing. false otherwise
        */
        this.isPlaying = false;

        /**
        * @type {number} _eventPointer = NyaNyaNyaNya
        */
        this._eventPointer = 0;

        /**
        * @type {DOMHighResTimeStamp} domStart - Start time of the audio in relation to the Document Origin.
        */
        this.performanceStart = 0;

        /**
        * @type {double} start - Start time of the audio in relation to the audio clock.
        */
        this.start = 0;

        /**
        * @type {number} duration - Total duraiton of the audio in milliseconds
        */
        this.duration = 0;

        /**
        * @type {number} cursorPosition - Current audio time position in milliseconds
        */
        this.cursorPosition = 0;


        /**
        * @type {number} offset = Offset in seconds
        */
        this.offset = 0;

        /**
        * @type {number} time - Audio time
        */
        this.time = 0;

        /**
        * @type {number} domTimePosition = Current audio position in relation to the document's timeline
        */
        this.performanceTime = 0;

        /**
        * @type {AudioSyncedEvent[]} events - The events omegalul
        */
        this.events = [];

        try {
            this.audioContext = new (AudioContext || webkitAudioContext)(
                {
                    latencyHint: "interactive"
                }
            );
        } catch(e) {
            throw new Error("Web Audio API is not supported in this browser");
        }
    }

    // TODO: There is no logic for when the audio ends
    _tick = (timestamp) => {
        // Update times
        this._updateTimes();
        const cursorPosition = this.cursorPosition;

        // The audio finished playing so stop the ticks
        if (cursorPosition >= this.duration) {
            console.log("AUDIO WITH DURATION %i ENDED AT %i", this.duration, cursorPosition);

            return
        }

        // Check if it's time to trigger scheduled events
        while (this._eventPointer < this.events.length) {
            const currentEvent = this.events[this._eventPointer];
            if (cursorPosition < currentEvent.time) {
                break;
            }

            // Trigger the event!... if you can of course
            // const { time, handler } = currentEvent;
            const { time, handler, track , type } = currentEvent;
            try {
                // handler(time); // Execute the event logic implemented by the user
                // handler(time, elapsedTime - time); // Execute the event logic implemented by the user
                handler(time, cursorPosition - time, track, type); // Execute the event logic implemented by the user
            }
            catch (error) {
                // FIX: throw the error from the handler so the user can debug the code... and just exit this code gracefully or smth
                // console.log(error);
                throw new Error(`Event at ${time} had an error: ${error}`);
                continue;
            }
            this._eventPointer++;
        }

        requestAnimationFrame(this._tick);
    };


    play(offset = 0) {
        if (this.isPlaying) return;

        if (!this.audioLoaded) {
            throw new Error("Load audio to play");
        }

        if (!this.eventsLoaded) {
            throw new Error("Can't play without events");
        }
        console.log("Starting time %i", this.audioContext.currentTime * 1000);

        // Save the starting point in the audio clock
        const audioStartTimestamp = this.audioContext.currentTime;
        this.source.start(audioStartTimestamp + offset);
        this.start = audioStartTimestamp * 1000;
        this._startAudioLoop();

        this.performanceStart = performance.now();
        this.offset = offset * 1000;
        this.isPlaying = true;
    }


    /**
    * Set the events
    * @param {AudioSyncedEvent[]} events - the modufoqu events.
    */
    setEvents(events) {
        // TODO:
        // Check last event time no greater than audio length
        this.events = this._validateEvents(events);
        this.eventsLoaded = true;
    }


    _validateEvents(events) {
        if (!this.audioLoaded) {
            throw new Error("There must be an audio sorce to have events");
        }

        if (!(events instanceof Array)) {
            throw new Error("Events must be an array");
        }

        if (events.length === 0) {
            throw new Error("There must be at least one event");
        }

        for (const event of events) {
            if (!Object.hasOwn(event, "time")) {
                throw new Error("Missing time property");
            }

            if (!Object.hasOwn(event, "handler")) {
                throw new Error("Missing handler property");
            }

            if (typeof event.handler !== "function") {
                throw new Error("Handler must be a callable");
            }

            if (event.time < 0) {
                throw new Error("Event time too low");
            }
        }

        // Im guessing that events are ordered by time. That is a no no
        const lastEvent = events[events.length - 1];
        if (lastEvent.time > this.duration) {
            throw new Error("Last event outside time range");

        }

        return events
    }


    _startAudioLoop() {
        requestAnimationFrame(this._tick);
    }


    /**
    * Set the events
    * @param {File} audioFile - the modufoqu events.
    */
    async loadAudio(audioFile) {
        if (!(audioFile instanceof File)) return;

        const arrayBuffer = await audioFile.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        this.duration = source.buffer.duration * 1000;

        this.source = source;
        this.audioLoaded = true;

        return this
    }


    _updateTimes() {
        const actxts = this.audioContext.getOutputTimestamp();

        const elapsedCT = (actxts.contextTime * 1000) - this.start;
        const elapsedCTNoOffset = elapsedCT - this.offset;
        this.cursorPosition = elapsedCT >= 0 ? elapsedCT : 0;
        // console.log("LAST TIME UPDATE %i %i", actxts.contextTime * 1000, this.start);
        this.time = elapsedCTNoOffset >= 0 ? elapsedCTNoOffset : 0;

        const elapsedPT = actxts.performanceTime - this.performanceStart;
        this.performanceTime = elapsedPT >= 0 ? elapsedPT : 0;
    }


    _updateDomTimePosition() {
        const { performanceTime } = this.audioContext.getOutputTimestamp();
        // console.log("Time in document: ", performanceTime);
        this.performanceTime = performanceTime;

        return performanceTime
    }


    createSilenceBuffer(duration) {
        const sampleRate = this.source.buffer.sampleRate;
        const bufferLength = duration * sampleRate;

        const buffer = this.audioContext.createBuffer(1, bufferLength, sampleRate);

        return buffer
    }


    // addStartSilence(duration = 0) {
    //     if (this.audioLoaded == false) {
    //         return
    //     }

    //     console.log("Adding Starting Silence");
    //     const audioSampleRate = this.source.buffer.sampleRate;
    //     const silenceLength = duration * audioSampleRate;

    //     const newLength = silenceLength + this.source.buffer.length;
    //     const bufferWithSilence = this.audioContext.createBuffer(1, newLength, audioSampleRate);

    //     const originalData = this.source.buffer.getChannelData(0);
    //     const bufferData = bufferWithSilence.getChannelData(0);
    //     for (let i = 0; i < newLength; i++) {
    //         bufferData[i + silenceLength] = originalData[i];
    //     }

    //     // this.source.buffer = bufferWithSilence;
    //     const newSource = this.audioContext.createBufferSource();
    //     newSource.buffer = bufferWithSilence;
    //     newSource.connect(this.audioContext.destination);
    //     this.source = newSource;
    // }
}