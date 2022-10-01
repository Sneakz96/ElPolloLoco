let canvas;
let world = 0;
let keyboard = new Keyboard();
let play_sound = new Audio('./audio/gamesound.mp3');
play_sound.loop = true;

/**
 * function for init world by loading page
 */
function init(){
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    keyboard.mobileEvents();
}

/**
 * function for start the game by clicking on picture
 */
function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('instruction').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('controls').classList.remove('d-none');
    init();
    //console.log(this.world.startWorld);
}

/**
 * functions for loading start screen
 */
function showStartScreen(){
    console.log('show start screen');
    document.getElementById('lost-screen').classList.add('d-none');
    document.getElementById('instruction').classList.remove('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
}

/**
 * functions for enable sound
 */
function mute(){
    let mute = document.getElementById('mute');
    let loud = document.getElementById('volume');

    mute.classList.remove('d-none');
    loud.classList.add('d-none');
    play_sound.pause();
}

/**
 * functions for able sound
 */
function volumeUp(){
    let mute = document.getElementById('mute');
    let loud = document.getElementById('volume');

    mute.classList.add('d-none');
    loud.classList.remove('d-none');
    play_sound.play();
}
