// create another  version for generating vsynth patches
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Instrument {
    constructor(name, roleArray) {
        this.name = name;
        this.roleArray = roleArray;
    }

    // Getter
    get randomRole() {
        return this.grabRole();
    }

    // Method
    grabRole() {
        return this.roleArray[this.getRandInt(this.roleArray.length)];
    }

    getRandInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

class PedalBoard {
    constructor(name, pedalArray) {
        this.name = name;
        this.pedalArray = pedalArray;
    }

    // Getter
    get randomPedals() {
        return this.grabPedalBoard();
    }

    // Method
    grabPedalBoard() {
        let pedalBoard = []
        for (let i = 0; i < 4; i++) {
            pedalBoard.push(this.pedalArray[this.getRandInt(this.pedalArray.length)]);
        }
        return [...new Set(pedalBoard)]
    }

    getRandInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
    
const Digitakt = new Instrument("Digitakt", ["percussion","melody","bass","harmony","asyncronous"])
const M32 = new Instrument("Mother 32", ["drone","melody","bass","self-patched/clocked","noise","arp"])
const Mk = new Instrument("MicroKorg",["drone","melody","bass","harmony","arp","noise","self-clocked"])
const Fk = new Instrument("Field Kit", ["radio","wine piezo","camcorder", "mini field recorder"]);
const Tape = new Instrument ("Tape Loops", ["harmony","drone"])
const Field = new Instrument("Field Recorder", ["pre-recorded","live-sound"]);
const Electribe = new Instrument("Electribe", ["arpeggios","drones"]);
const IPad = new Instrument("iPad",["Borderlands","Photophore","Bent.fm","Glitch Machine","Field Scraper"])
const Pedals = new PedalBoard("Pedals",["SD1","Verbzilla","Helix","Pitch Shifter","BM","DD3","DD6","SCIDMan","Rat", "Tremolo","Wah","Bass EQ","Guitar EQ","Bass Chorus"])
const instrumentList = [Digitakt,M32,Mk,Fk,Tape,Field,Electribe,IPad, Pedals]

// shuffle generator function from https://stackoverflow.com/questions/18806210/generating-non-repeating-random-numbers-in-js
function* shuffle(array) {
    var i = array.length;
    while (i--) {
        yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
    }
}

function fillGenerator(instrumentList) {
    let genArray = []
    for (let i = 0; i < instrumentList.length; i++) {
        genArray.push(i)
    }
    return genArray;
}

let shuffleArray = fillGenerator(instrumentList)

let ranNums = shuffle(shuffleArray);

function getRandomInstrument(instrumentArray, randomIndex) {
   
    let instName = instrumentArray[randomIndex].name;
    let randRole;

    if (instName !== "Pedals") {
        randRole = instrumentArray[randomIndex].randomRole;
    } else {
        randRole = instrumentArray[randomIndex].randomPedals
    }
    return `${instName}: ${randRole}`
}

function createEnsemble(instruments) {
    let ensembleList = [];
    let tempInstruments = [...instruments]
    for (let i = 0; i < ensembleSize; i++) {
        let randomNum = ranNums.next().value;
        ensembleList.push(getRandomInstrument(tempInstruments, randomNum));
    }
    let uniqueVals = [...new Set(ensembleList)]
    return uniqueVals
}

let ensembleSize = 6;

console.log(createEnsemble(instrumentList))