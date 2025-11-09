/**
* @typedef AudioSyncedEvent
* @type {object}
* @property {number} time - The time for the event.
* @property {(time: number) => void} trigger - The event to trigger.
*/


class AudioTimeEventSyncer {
    // TODO:
    // * Delete audio context on class liberation
    // 
    return fales

    _tickCallback = (timestamp) => {
        const { contextTime, performanceTime } = this._actx.getOutputTimestamp();
        const passedTime = (contextTime * 1000)- this.startTime;

        this.time = passedTime / 1000;

        // console.log("audio buffer passed time: ", `${passedTime}ms`);

        let nextScheduledEvent = this.events[0];
        while (passedTime >= nextScheduledEvent.time) {
            nextScheduledEvent.trigger(
                nextScheduledEvent.time,
                passedTime - nextScheduledEvent.time
            );

            this.events.shift();
            nextScheduledEvent = this.events[0];
        }

        this._setNextTick();
    };


    constructor() {
        this.isPlaying = false;

        /**
        * @type {number} time = Current audio time position in seconds
        */
        this.time = 0;

        /**
        * @type {AudioSyncedEvent[]}
        */
        this.events = [];

        try {
            this._actx = new (AudioContext || webkitAudioContext)();
        } catch(e) {
            throw new Error("Web Audio API is not supported in this browser");
        }
    }


    play() {
        if (!(this.audioLoaded && this.eventsLoaded)) {
            throw new Error("Please load an audio file before playing the controller");
        }

        this.startTime = this._actx.getOutputTimestamp().contextTime * 1000;
        this.source.start();

        this._setNextTick();

        this.isPlaying = true;
    }


    /**
    * Set the events
    * @param {AudioSyncedEvent[]} events - the modufoqu events.
    */
    setEvents(events) {
        // TODO:
        // Check last event time no greater than audio length

        this.events = events;
        this.eventsLoaded = true;
    }


    _setNextTick() {
        requestAnimationFrame(this._tickCallback)
    }


    /**
    * Set the events
    * @param {File} audioFile - the modufoqu events.
    */
    async loadAudio(audioFile) {
        const arrayBuffer = await audioFile.arrayBuffer();
        const audioBuffer = await this._actx.decodeAudioData(arrayBuffer);
        const source = this._actx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this._actx.destination);

        this.source = source;
        this.audioLoaded = true;
    }
}


/**
*mySongSyncer = new EventSyncer("my_song.mp3");
*myAudioSyncer = new EventSyncer("audio.mp3");
*
*
*mySongSyncer.setEvents([
*{
*"time": 1,
*"event": function(audioTime) {
*console.log(audioTime);
*},
*}
*])
*
*/

/**
* @param {CustomEvent[]} events
* @param {number} events.time
* @param {(time: number) => void} events.trigger
*/

let syncSystem = undefined;

const audioFileInput = document.getElementById("audio-file");
audioFileInput.addEventListener("change", function(event) {
    const timeConstant = 100 / 60;
    const currentNotes = [];

    function drawNotes(timestamp) {
        // console.log("KEY FRAME LOG: ", currentNotes);

        for (const note of currentNotes) {
            // console.log("NOTE: ", note);
            const top = parseFloat(note.style.top.slice(0, -1));

            if (top < 100) {
                const newPosition = top + timeConstant;
                console.log("TOP: ", note.style.top, top);
                console.log("new position: ", newPosition);
                note.style.top = `${newPosition}%`;
                console.log("NEW TOP", note.style.top);
            } else {
                // Delete the note
            }
        }

        requestAnimationFrame(drawNotes);
    }

    requestAnimationFrame(drawNotes);

    const audioFile = this.files[0];
    syncSystem = new AudioTimeEventSyncer();
    syncSystem.loadAudio(audioFile)
        .then(() => {
            console.log("Song loaded");
            syncSystem.setEvents(
                [
                    {
                        "trigger": (time, offset) =>
                        {
                            const note = createNote();
                            currentNotes.push(note);
                        },
                        "time": 25
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 1083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 1260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 1436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 1613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 1789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 1966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 2142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 2319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 2495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 2672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 3907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 4260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 4260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 4613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 4613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 4966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 5319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 5319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 5672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 6024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 6024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 6377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 6730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 6730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 7083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 7436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 7436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 7789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 8142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 8142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 8495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 8848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 8848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 9201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 9554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 9554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 9907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 9907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 10083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 10260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 10436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 10613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 10789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 10966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 11142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 11319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 11495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 11672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 11848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 12024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 12201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 12377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 12730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 12907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 13083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 13260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 13436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 13613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 13789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 13966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 14142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 14319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 14495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 14672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 14848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 15024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 15201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 15377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 15554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 15554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 15907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 15907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 16083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 16260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 16260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 16613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 16613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 16789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 16966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 16966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 17142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 17319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 17319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 17495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 17672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 17672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 18024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 18024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 18201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 18377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 18377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 18554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 18730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 18730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 18907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 19083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 19083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 19436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 19436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 19613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 19789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 19789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 19966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 20142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 20319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 20495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 20495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 20848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 20848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 21024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 21201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 21201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 21554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 21730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 21907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 21907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 22260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 22260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 22436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 22613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 22613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 22789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 22966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 22966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 23142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 23319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 23319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 23672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 23672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 23848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 24024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 24024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 24377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 24377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 24554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 24730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 24730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 24907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 25083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 25083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 25260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 25436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 25436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 25613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 25613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 25789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 25789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 25966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 25966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 26142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 26142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 26319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 26495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 26848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 26848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 27024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 27201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 27377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 27554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 27730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 27907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 28083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 28260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 28436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 28613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 28789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 28966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 29142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 29319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 29495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 29672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 29848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 30024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 30201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 30377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 30554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 30730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 30907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 31083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 31260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 31436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 31613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 31789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 31966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 32142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 32319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 32495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 32495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 32672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 32848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 32848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 33024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 33201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 33377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 33554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 33554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 33730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 33907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 34083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 34260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 34260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 34436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 34613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 34789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 34966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 34966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 35142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 35319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 35319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 35495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 35672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 35848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 36024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 36024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 36201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 36377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 36554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 36730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 36730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 36907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 37083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 37083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 37260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 37436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 37436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 37789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 37966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 38142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 38142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 38319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 38495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 38495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 38672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 38848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 38848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 39024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 39201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 39201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 39377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 39554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 39554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 39730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 39907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 39907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 40083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 40260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 40260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 40613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 40613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 40789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 40966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 40966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 41142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 41319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 41319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 41495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 41672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 41672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 41848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 42024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 42024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 42201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 42377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 42377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 42554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 42730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 42730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 42907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 43083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 43083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 43260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 43436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 43436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 43613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 43789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 43789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 43966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 44142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 44142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 44319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 44495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 44495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 44672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 44848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 44848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 45024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 45201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 45201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 45377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 45554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 45554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 45730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 45907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 45907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 46260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 46260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 46436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 46613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 46613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 46789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 46966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 46966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 47142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 47319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 47319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 47495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 47672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 47672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 47848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 48024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 48024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 48201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 48377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 48377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 48554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 48730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 48730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 49083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 49260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 49436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 49436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 49613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 49789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 49789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 49966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 50142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 50230
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 50319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 50495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 50495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 50672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 50760
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 50848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 50848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 51024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 51201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 51201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 51377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 51554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 51554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 51730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 51907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 51907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 52083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 52260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 52260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 52436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 52613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 52613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 52789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 52877
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 52966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 53142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 53319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 53319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 53495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 53672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 53672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 53848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 54024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 54024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 54201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 54377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 54377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 54554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 54554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 54730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 54730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 55083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 55083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 55260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 55436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 55436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 55613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 55789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 55877
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 55966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 56142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 56142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 56319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 56407
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 56495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 56495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 56672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 56848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 56848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 57024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 57201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 57201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 57377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 57554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 57554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 57730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 57907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 57907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 58083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 58260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 58260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 58436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 58613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 58613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 58789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 58966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 58966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 59142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 59319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 59319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 59495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 59672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 59672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 59848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 60024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 60024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 60377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 60730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 60907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 61083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 61260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 61436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 62142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 62142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 62319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 62495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 62495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 62672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 62848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 62848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 63113
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 63201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 63201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 63377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 63554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 63554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 63730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 63907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 63907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 64083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 64260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 64260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 64613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 64789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 64966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 64966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 65319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 65319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 65495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 65672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 65672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 66024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 66024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 66201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 66377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 66377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 66554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 66730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 66730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 66907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 67083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 67083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 67436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 67436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 67613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 67789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 67789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 68142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 68142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 68319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 68495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 68495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 68848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 68848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 69201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 69201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 69377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 69554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 69554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 69730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 69907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 69907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 70260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 70260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 70436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 70613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 70613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 70966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 70966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 71142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 71319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 71319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 71672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 71672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 71848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 72024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 72024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 72201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 72377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 72377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 72554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 72730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 72730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 73083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 73083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 73260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 73436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 73436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 73789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 73789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 73966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 74142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 74142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 74495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 74495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 74848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 74848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 75024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 75024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 75201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 75201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 75377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 75377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 75554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 75554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 75730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 75907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 76260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 76260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 76436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 76613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 76789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 76966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 77142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 77319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 77495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 77672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 77848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 78024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 78201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 78377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 78554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 78730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 78907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 79083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 79260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 79436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 79613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 79789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 79966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 80142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 80319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 80495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 80672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 80848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 81024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 81201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 81377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 81554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 81730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 81907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 81907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 82083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 82260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 82260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 82436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 82613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 82789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 82966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 82966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 83142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 83319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 83495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 83672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 83672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 83848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 84024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 84201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 84377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 84377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 84554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 84730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 84730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 84907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 85083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 85260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 85436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 85436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 85613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 85789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 85966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 86142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 86142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 86319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 86495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 86495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 86672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 86848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 86848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 87201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 87377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 87554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 87554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 87730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 87907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 87907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 88083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 88260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 88260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 88436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 88613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 88613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 88789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 88966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 88966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 89142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 89319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 89319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 89495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 89672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 89672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 90024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 90024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 90201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 90377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 90377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 90554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 90730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 90730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 90907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 91083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 91083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 91260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 91436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 91436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 91613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 91789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 91789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 91966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 92142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 92142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 92319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 92495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 92495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 92672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 92848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 92848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 93024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 93201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 93201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 93377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 93554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 93554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 93730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 93907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 93907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 94083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 94260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 94260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 94436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 94613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 94613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 94789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 94966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 94966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 95142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 95319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 95319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 95672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 95672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 95848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 96024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 96024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 96201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 96377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 96377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 96554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 96730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 96730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 96907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 97083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 97083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 97260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 97436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 97436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 97613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 97789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 97789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 97966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 98142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 98142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 98495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 98495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 98672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 98848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 98848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 99024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 99201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 99201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 99377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 99554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 99554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 99730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 99907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 99907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 100083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 100260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 100260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 100436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 100613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 100613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 100789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 100966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 100966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 101319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 101319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 101495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 101672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 101672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 101848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 102024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 102024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 102201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 102377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 102377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 102554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 102730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 102730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 102907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 103083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 103083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 103260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 103436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 103436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 103613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 103789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 103789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 103966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 104142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 104142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 104319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 104495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 104495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 104672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 104848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 104848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 105024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 105201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 105201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 105377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 105554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 105554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 105730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 105907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 105907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 106083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 106260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 106436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 106789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 106966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 106966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 107142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 107319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 107319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 107495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 107672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 107672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 107848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 108024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 108024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 108201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 108377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 108377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 108554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 108730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 108730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 108907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 109083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 109083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 109260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 109436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 109436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 109789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 110142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 110495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 110672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 110760
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 110848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 111024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 111201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 111377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 111554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 112260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 112436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 112613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 112789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 112966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 113142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 113319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 113495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 113672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 113848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 114024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 114201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 114377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 115083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 115083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 115260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 115436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 115613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 115789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 115789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 115966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 116142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 116319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 116495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 116495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 116672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 116848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 116848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 117024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 117201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 117201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 117907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 117907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 118083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 118260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 118436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 118613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 118613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 118789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 118966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 119142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 119319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 119319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 119495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 119672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 119672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 119848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 120024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 120024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 120730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 120730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 120907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 121083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 121260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 121436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 121436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 121613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 121789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 121966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 122142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 122142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 122319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 122495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 122672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 122848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 122848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 123554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 123554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 123730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 123907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 124083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 124260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 124260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 124436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 124613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 124789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 124966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 125142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 125319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 125495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 125672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 126024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 126201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 126377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 126377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 126730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 126730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 126907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 127083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 127083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 127260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 127436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 127436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 127613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 127789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 127789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 127966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 128142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 128142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 128319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 128495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 128495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 128848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 128848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 129024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 129201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 129201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 129377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 129554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 129554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 129730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 129907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 129907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 130083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 130260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 130260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 130436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 130613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 130613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 130789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 130966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 130966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 131142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 131319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 131319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 131495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 131672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 131672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 131848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 132024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 132024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 132201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 132377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 132377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 132554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 132730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 132730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 132907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 133083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 133083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 133260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 133436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 133436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 133613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 133789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 133789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 133966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 134142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 134142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 134495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 134495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 134672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 134848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 134848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 135024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 135201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 135201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 135377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 135554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 135554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 135730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 135907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 135907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 136083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 136260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 136260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 136436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 136613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 136613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 136789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 136966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 136966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 137319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 137495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 137672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 137672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 137848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 138024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 138024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 138201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 138377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 138466
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 138554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 138730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 138730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 138907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 138995
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 139083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 139083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 139260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 139436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 139436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 139613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 139789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 139789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 139966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 140142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 140142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 140319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 140495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 140495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 140672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 140848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 140848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 141024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 141113
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 141201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 141377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 141554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 141554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 141730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 141907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 141907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 142083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 142260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 142260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 142436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 142613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 142613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 142966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 142966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 143142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 143319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 143319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 143495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 143672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 143672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 143848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 144024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 144113
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 144201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 144377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 144377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 144554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 144642
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 144730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 144730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 144907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 145083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 145083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 145260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 145436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 145436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 145613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 145789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 145789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 145966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 146142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 146142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 146319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 146495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 146495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 146672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 146848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 146848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 147024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 147201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 147201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 147377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 147554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 147554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 147730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 147907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 147907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 148083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 148260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 148260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 148613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 148966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 149142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 149319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 149495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 149672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 149848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 150024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 150377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 150377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 150554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 150730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 150730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 150907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 151083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 151083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 151260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 151436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 151436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 151613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 151789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 151789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 151966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 152142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 152142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 152319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 152495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 152495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 152672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 152848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 152848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 153201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 153201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 153377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 153554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 153554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 153730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 153907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 153907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 154083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 154260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 154260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 154436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 154613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 154613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 154789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 154966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 154966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 155142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 155319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 155319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 155495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 155672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 155672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 155848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 156024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 156024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 156201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 156377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 156377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 156554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 156730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 156730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 156907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 157083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 157083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 157260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 157436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 157436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 157613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 157789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 157789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 157966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 158142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 158142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 158319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 158495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 158495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 158848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 158848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 159024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 159201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 159201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 159377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 159554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 159554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 159730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 159907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 159907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 160083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 160260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 160260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 160613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 160613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 160789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 160966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 160966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 161142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 161230
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 161319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 161495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 161672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 161672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 161848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 162024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 162024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 162201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 162377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 162377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 162554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 162730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 162730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 162907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 163083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 163083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 163260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 163436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 163436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 163613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 163789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 163789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 163966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 164142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 164142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 164495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 164495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 164672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 164848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 164848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 165024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 165201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 165201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 165377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 165554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 165554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 165730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 165907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 165907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 166083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 166260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 166260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 166436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 166613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 166613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 166789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 166966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 166966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 167142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 167319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 167319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 167495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 167672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 167672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 167848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 168024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 168024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 168201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 168377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 168377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 168554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 168730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 168730
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 168907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 169083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 169083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 169260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 169436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 169436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 169613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 169789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 169789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 170142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 170142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 170319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 170495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 170495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 170672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 170848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 170848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 171024
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 171201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 171201
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 171377
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 171554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 171554
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 171907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 171907
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 172083
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 172260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 172260
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 172436
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 172613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 172613
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 172789
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 172966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 172966
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 173142
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 173319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 173319
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 173495
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 173672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 173672
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 173848
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 173936
                    },
                    {
                        "trigger": (time, offset) => console.log(offset),
                        "time": 174024
                    }
                    ].map(({time, trigger}) => {
                        return {"time": time - 1000, "trigger": trigger }
                    })
            );

            syncSystem.play();

            setInterval(() => console.log("Audio Time: ", syncSystem.time), 500);
        });
}, false); // STUDY: what does "false" do?

// const audioFileInput2 = document.getElementById("audio-file2");
// audioFileInput2.addEventListener("change", function(event) {
//     const audioFile = this.files[0];
//     syncSystem = new AudioTimeEventSyncer(audioFile);
// }, false); // STUDY: what does "false" do?

const stepsFileInput = document.getElementById("steps-file");
stepsFileInput.addEventListener("change", function(event) {
}, false);


const track = document.getElementById("tempId");
function testAnimation() {
    const note = document.createElement("div");
    note.className = "note";
    note.style.top = "0%";
    track.append(note);

    const image = document.createElement("img");
    image.className = "fullcontainer";
    image.src = "https://placehold.co/100";
    note.append(image);

    note.animate([
        { top: "0%" },
        { top: "100%" }
    ],
    { duration: 1000, iterations: 1 })
}


function createNote() {
    const note = document.createElement("div");
    note.className = "note";
    note.style.top = "0%";

    const image = document.createElement("img");
    image.className = "fullcontainer";
    image.src = "https://placehold.co/100";
    note.append(image);

    return note
}