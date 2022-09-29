let canvas;
let world = 0;
let keyboard = new Keyboard();
let play_sound = new Audio('./audio/gamesound.mp3');
play_sound.loop = true;
 
function init(){
    canvas = document.getElementById('canvas');
    this.initLevel();
    world = new World(canvas, keyboard);
    
}

function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('instruction').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('controls').classList.remove('d-none');
    
    //this.level.startWorld();
}

document.addEventListener("keydown", (e) =>{
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

document.addEventListener("keyup", (e) =>{
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * functions for loading start screen
 */
function showStartScreen(){
    debugger;
    document.getElementById('lost-screen').classList.add('d-none');
    document.getElementById('instruction').classList.remove('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
}

/**
 * functions for able/enable sound
 */
function mute(){
    let mute = document.getElementById('mute');
    let loud = document.getElementById('volume');

    mute.classList.remove('d-none');
    loud.classList.add('d-none');
    play_sound.pause();
}

function volumeUp(){
    let mute = document.getElementById('mute');
    let loud = document.getElementById('volume');

    mute.classList.add('d-none');
    loud.classList.remove('d-none');
    play_sound.play();
}