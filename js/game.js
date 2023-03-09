// SET VARIABLES
let canvas;
let world = 0;

// TAKEOVER
let keyboard = new Keyboard();
let play_sound = new Audio('./audio/gamesound.mp3');

// SOUND
play_sound.loop = true;

// ARRAYS
let elementIds = [
    'fullScreenEnter',
    'fullScreenExit',
    'canvas',
    'mb-canvas',
    'mb-btn',
];

/**
 * FUNCTION TO START GAME BY CLICK
 */
function startGame() {
    handleGame();
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    keyboard.mobileEvents();
}

// 
function toggleScreens(showIds, hideIds) {
    showIds.forEach(id => document.getElementById(id).classList.remove('d-none'));
    hideIds.forEach(id => document.getElementById(id).classList.add('d-none'));
}

// 
function handleGame() {
    toggleScreens(['mb-canvas', 'canvas', 'mb-btn', 'controls', 'mb-hud'], ['start-screen', 'instruction']);
}

// 
function showStartScreen() {
    toggleScreens(['instruction', 'start-screen'], ['win-screen', 'lost-screen', 'mb-canvas', 'mb-hud']);
}

/**
 * ENABLE SOUND
 */
function mute() {
    let mute = document.getElementById('mute');
    let loud = document.getElementById('volume');

    mute.classList.remove('d-none');
    loud.classList.add('d-none');

    play_sound.pause();
}

/**
 *  ABLE SOUND
 */
function volumeUp() {
    let mute = document.getElementById('mute');
    let loud = document.getElementById('volume');

    mute.classList.add('d-none');
    loud.classList.remove('d-none');

    play_sound.play();
}

/**
 * OPEN FULLSCREEN
 */
function openFullScreen() {
    let fullScreen = document.getElementById('window');
    for (let elementId of elementIds) {
        let element = document.getElementById(elementId);
        if (element) {
            if (elementId === 'fullScreenEnter') {
                element.classList.add('d-none');
            } else if (elementId === 'fullScreenExit') {
                element.classList.remove('d-none');
            } else if (elementId === 'canvas') {
                element.classList.add('w-100');
            } else if (elementId === 'mb-canvas') {
                element.classList.add('mb-canvas_fs');
            } else if (elementId === 'mb-btn') {
                element.classList.add('mb-btn_sec');
            }
        }
    }
    enterFullScreen(fullScreen);
}

function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {//FOR INTERNETEXPLORER11
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {//IOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * FUNCTION FOR EXIT FULLSCREEN
 */
function exitFullScreen() {
    let elements = elementIds.map(id => document.getElementById(id));
    let fullScreen = document.getElementById('window');
    let fullScreenExit = document.getElementById('fullScreenExit');
    elements.forEach(element => element.classList.remove('d-none', 'w-100', 'mb-canvas_fs', 'mb-btn_sec'));
    fullScreenExit.classList.add('d-none');
    closeFullScreen(fullScreen);
  }

function closeFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}