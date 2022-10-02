let canvas;
let world = 0;
let keyboard = new Keyboard();
let play_sound = new Audio('./audio/gamesound.mp3');
play_sound.loop = true;

/**
 * function for init world by loading page
 */
function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
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
    keyboard.mobileEvents();
}

/**
 * functions for loading start screen
 */
function showStartScreen() {
    console.log('show start screen');
    document.getElementById('lost-screen').classList.add('d-none');
    document.getElementById('instruction').classList.remove('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
}

/**
 * functions for enable sound
 */
function mute() {
    let mute = document.getElementById('mute');
    let loud = document.getElementById('volume');

    mute.classList.remove('d-none');
    loud.classList.add('d-none');
    play_sound.pause();
}

/**
 * functions for able sound
 */
function volumeUp() {
    let mute = document.getElementById('mute');
    let loud = document.getElementById('volume');

    mute.classList.add('d-none');
    loud.classList.remove('d-none');
    play_sound.play();
}

/**
 * FUNCTION FOR OPEN FULLSCREEN
 */
function openFullScreen() {
    let open = document.getElementById('fullScreenEnter');
    let exit = document.getElementById('fullScreenExit');
    let fullScreen = document.getElementById('window');
    open.classList.add('d-none');
    exit.classList.remove('d-none');
    enterFullScreen(fullScreen);
}

function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * FUNCTION FOR EXIT FULLSCREEN
 */
function exitFullScreen() {
    let open = document.getElementById('fullScreenEnter');
    let exit = document.getElementById('fullScreenExit');

    open.classList.remove('d-none');
    exit.classList.add('d-none');
    closeFullScreen();
}

function closeFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}