//SET VARIABLES
let canvas;
let world = 0;

//TAKEOVER
let keyboard = new Keyboard();
let play_sound = new Audio('./audio/gamesound.mp3');

//SOUND
play_sound.loop = true;

/**
 * FUNCTION TO INIT BY ONLOAD
 */
function init() {
    console.log('show start screen');
}

/**
 * FUNCTION TO START GAME BY CLICK
 */
function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('instruction').classList.add('d-none');
    document.getElementById('mb-canvas').classList.remove('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('mb-btn').classList.remove('d-none');
    document.getElementById('controls').classList.remove('d-none');
    document.getElementById('mb-hud').classList.remove('d-none');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    keyboard.mobileEvents();
    console.log('you started the game');
}

/**
 * FUNCTION TO LOAD START SCREEN
 */
function showStartScreen() {
    console.log('show start screen');
    document.getElementById('win-screen').classList.add('d-none');
    document.getElementById('lost-screen').classList.add('d-none');
    document.getElementById('mb-canvas').classList.add('d-none');
    document.getElementById('mb-hud').classList.add('d-none');
    document.getElementById('instruction').classList.remove('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
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
    const elementIds = [
      'fullScreenEnter',
      'fullScreenExit',
      'canvas',
      'mb-canvas',
      'mb-btn',
    ];
  
    for (const elementId of elementIds) {
      const element = document.getElementById(elementId);
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
  
    let fullScreen = document.getElementById('window');
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
    let open = document.getElementById('fullScreenEnter');
    open.classList.remove('d-none');

    let exit = document.getElementById('fullScreenExit');
    exit.classList.add('d-none');

    let canvas = document.getElementById('canvas');
    canvas.classList.remove('w-100');

    let mb_Canvas = document.getElementById('mb-canvas')
    mb_Canvas.classList.remove('mb-canvas_fs');

    let mb_Buttons = document.getElementById('mb-btn');
    mb_Buttons.classList.remove('mb-btn_sec');
    let fullScreen = document.getElementById('window');
    closeFullScreen(fullScreen);
}

function closeFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        //open.classList.remove('d-none');
    }
}