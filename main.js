/**
* ---------------------------------------------------------
*
* GAME CODE STARTS FROM HERE
*
* ---------------------------------------------------------
*/


// Types

/**
* @typedef GameEvent
* @type {Object}
* @property {number} time - The level map
* @property {number} type - The level map
* @property {number} track - The level map
*/


/**
* @typedef LevelMap
* @type {Object}
* @property {string} name - The level map
* @property {string} difficulty - The level map
* @property {string} author - The level map
* @property {GameEvent[]} events - The level map
*/



// Global Variables / Game Settings

let drawOnActualLeve = true;

/** @type {LevelMap} */
const map = {
    "name": "Shoujo Shuumatsu Ryokou - More One Night (Assertive Hardcore Bootleg)",
    "difficulty": "Easy",
    "author": "cloudUser98",
    "events": [
        {
            "time": 730,
            "track": 3,
            "type": 2
        }
    ]
}

// let upperTrack = document.getElementById("track-1").firstChild;
// let rightTrack = document.getElementById("track-3").firstChild;
// let bottomTrack = document.getElementById("track-4").firstChild;
// let leftTrack = document.getElementById("track-2").firstChild;
// let activeTrack = upperTrack;

let game = document.getElementById("game");
let currentRotationValue = 0;

/** @const {number} NOTE_DURATION - Duration in seconds of the note animation */
// const NOTE_SPEED = 0.6; // FIX: name it NOTE SPEED or smthng
const audioSystem = new AudioEventSyncer();

const audioFileInput = document.getElementById("audio-file");
audioFileInput.addEventListener("change", async function(event) {
    const NOTE_SPEED = parseFloat(document.getElementById("note-speed").value);

    const timeConstant = 100 / (60 * NOTE_SPEED);
    const currentNotes = [];

    var gridCenter = document.getElementById("grid-center");
    var scoreLabel = document.getElementById("scores");
    function updateAndDrawNotes(timestamp) {
        // gameClock = timestamp - gameCLockStart;
        // console.log("Game Clock: %i", gameClock);

        // console.log(gameEvents);
        // Get current time of song if has progressed
        const currentAudioTime = syncSystem.systemTime;
        if (!(gameAudioTime <= currentAudioTime)) {
            return null// time hasn't changed so move on
        }

        // update the game audio time with the current song time
        gameAudioTime = currentAudioTime;

        // Iterate over all current notes and update them
        let positionedAfterTurn = false;
        let removeIndex = [];
        for (let i = 0; i < currentNotes.length; i++) {
            // Get the note
            let note = currentNotes[i];
            // note.style.zIndex = i;

            if (note.dataset.delete === "true") {

                const [completedNote] = currentNotes.splice(i, 1);
                completedNote.remove();

                continue
            }


            // Get the note type
            const weType = note.dataset.type;

            // It's a turn
            if (weType == "4" || weType == "5") {
                if (!positionedAfterTurn) { // first turn
                    positionedAfterTurn = true;
                    note.style.zIndex = 1;
                } else {
                    note.style.zIndex = 0;
                }

                // Get current turn position (the padding)
                // const rightPadding = getComputedStyle(note).paddingRight;
                let rightPadding = note.style.paddingRight;
                if (!rightPadding) { // FIX: why tho?
                    rightPadding = "0%";
                }
                const rightPaddingValue = rightPadding.slice(0, -1);
                const rightPaddingNumber = parseFloat(rightPaddingValue);
                // Check if the turn arrived already
                if (rightPaddingNumber >= 150) {
                    // Make the turn
                    if (weType == "5") {
                        currentRotationValue = currentRotationValue + 90;
                        game.style.transform = `rotate(${currentRotationValue}deg)`;
                    }

                    if (weType == "4") {
                        currentRotationValue = currentRotationValue - 90;
                        game.style.transform = `rotate(${currentRotationValue}deg)`;
                    }

                    // Then delete the note
                    removeIndex.push(i);
                } else {
                    // Calculate the new position (padding)
                    const newPosition = rightPaddingNumber + timeConstant;
                    // Assign the new padding (move the element)
                    note.style.paddingRight = `${newPosition}%`;
                }

            }
            // Normal note
            else {
                if (positionedAfterTurn) {
                    note.style.zIndex = 0;
                } else {
                    note.style.zIndex = 3;
                }

                const top = parseFloat(note.style.right.slice(0, -1));
                // Check if the note arrived already
                if (top >= 150) {
                    // console.log("Deleting a note\r\nnote: %s\r\ncontext: %i", note.dataset.position, syncSystem.time());
                    // Delete the note
                    removeIndex.push(i);
                } else {
                    const newPosition = top + timeConstant;
                    note.style.right = `${newPosition}%`;
                }
            }

        }

        // Remove the "completed" notes
        for (index of removeIndex) {
            // console.log("Removing Index: ", index);
            const [completedNote] = currentNotes.splice(index, 1);
            // console.log(completedNote);
            if (completedNote) {
                completedNote.remove();
            }

            scoreLabel.innerText = "MISS";
        }

        requestAnimationFrame(updateAndDrawNotes);
    }


    // // Starting level global variables
    // let gameTime = 0;
    let gameAudioTime = 0;
    // let startOfAnimation = performance.now();
    var gameClock = 0;
    var gameCLockStart = performance.now();
    requestAnimationFrame(updateAndDrawNotes);

    var gameEvents = [];
    function jejeje(time, offset, track, type) {
        // console.log("WAOS TYPE: ", type);
        const note = createNote(time, offset, type, track);
        currentNotes.push(note);
        gameEvents.push(offset + timeConstant * 100);
    }

    audioFile = this.files[0];
    syncSystem = new AudioEventSyncer();
    syncSystem.loadAudio(audioFile)
        .then((system) => {
            console.log("Song loaded ", syncSystem.duration);
            syncSystem.setEvents(
                [
                    {
                        "time": 0,
                        "track": 1,
                        "type": 1,
                        "handler": jejeje
                    },
                    {
                        "time": 1500,
                        "track": 1,
                        "type": 1,
                        "handler": jejeje
                    },
                    {
                        "time": 3000,
                        "track": 1,
                        "type": 1,
                        "handler": jejeje
                    },
                    {
                        "time": 5000,
                        "track": 1,
                        "type": 1,
                        "handler": jejeje
                    },
                ]
            );

            window.onkeydown = (event) => {
                // FIX: race conditions
                event.preventDefault();

                // Exit if there are no notes to judge
                if (currentNotes.length === 0) {
                    return null
                }

                const keyTime = event.timeStamp; // DOM High Resolution TS
                // const elapsedTime = timeStamp.performanceTime - keypressTime;
                const callbackDelay = performance.now() - keyTime;
                const keyPosition = syncSystem.getTime() - callbackDelay;

                const MAX_POSITIVE_DISTANCE = 200;
                const MAX_NEGATIVE_DISTANCE = -100;

                const note = currentNotes[0];
                const notePosition = parseInt(note.dataset.position);

                const distance = notePosition - keyPosition;
                console.log("KEY PRESS DATA:\r\nsong position: %i\r\nkey at: %i\r\nnote on: %i\r\ndistance: %i",
                    syncSystem.getTime(),
                    keyPosition,
                    notePosition,
                    distance
                );
                // Check if the distance between the key event and the note is
                // judgeable
                if (
                    distance > MAX_POSITIVE_DISTANCE
                    || distance < MAX_NEGATIVE_DISTANCE
                ) {
                    return null
                }


                function scoreDistance(distance) {
                    const JUDGE_SCORES = {
                        excellent: [-20, 120],
                        good:      [121, 220],
                        bad:       [-120, -21]
                    }

                    let score = null;
                    for (const scoreToJudge in JUDGE_SCORES) {
                        const [min, max] = JUDGE_SCORES[scoreToJudge];

                        if (distance >= min && distance <= max) {
                            scoreLabel.innerText = scoreToJudge;
                            score = scoreToJudge;
                        }
                    }

                    return score
                }

                const score = scoreDistance(distance);
                console.log("Score: %i", score);
                note.dataset.delete = true;

                // NOTE: Maybe we do need to listen to holds for long notes
                // if (keyDownEvent.repeat) { // We don't listen to holded keystrokes or do we?
                //     return
                // }
            };

            syncSystem.play(NOTE_SPEED);
            // syncSystem.play();

            // setInterval(() => console.log("Audio Time: ", syncSystem.time), 500);
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


const loadedNoteImage = null;
function createNote(time, offset, type, track) {
    // if (type != "4" && type !== "5") {
    //     return null
    // }
    // if (track == undefined) {
    //     throw new Error("No track provided");
    // }

    // const trackIdentifier = `track-${track}`;
    // console.log(trackIdentifier);
    const trackContainer = document.getElementById("track-3").firstChild;
    console.log("trackContainer");
    // console.log(trackContainer);

    const note = document.createElement("div");
    note.className = "note";
    note.setAttribute("data-type", type);
    note.setAttribute("data-position", time);
    note.setAttribute("data-offset", offset);
    note.setAttribute("data-delete", false);
    // note.setAttribute("hidden", true);
    // note.style.top = "0%";
    note.style.right = "0%";
    // if (track == 1 || track == 4) {
    //     note.style.top = "0%";
    // } else {
    //     note.style.top = "0%";
    // }

    const image = document.createElement("img");
    image.className = "fullcontainer";
    // image.src = "https://placehold.co/100";
    image.src = "note.png";
    if (type == "4") {
        note.className = "turn";
        image.src = "turn.png";
        note.append(image);
    }
    if (type == "5") {
        note.className = "turn";
        image.src = "turn.png";
        image.style.transform = "scaleY(-1)";
        note.append(image);
    }
    note.append(image);

    // console.log("Adding Note")
    trackContainer.append(note);
    console.log("Note dataset: ", note.dataset);

    return note
}