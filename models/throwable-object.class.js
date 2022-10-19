class ThrowableObject extends MoveableObject {

    //SET VARIABLES
    groundPosition = 320;
    height = 80;
    width = 60;

    //CONDITION
    bottleHitsChicken = false;
    isBroken = false;

    //SOUNDS
    THROW_BOTTLE_SOUND = new Audio('./audio/bottle-throwing.mp3');
    SPLASH_SOUND = new Audio('./audio/smashing-glass.mp3');

    //IMAGES
    IMAGE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SALSA_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, world) {
        super().loadImage(this.IMAGE);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SALSA_SPLASH);
        this.throw();
        this.x = x;
        this.y = y;
        this.world = world;
        this.speed = 0.15;
    }

    /**
     * THROW ANIMATION -> LOAD ALL IMAGES TO ROTATE
     */
    throw() {
        this.speed_Y = 20;//FALLGESCHWINDIGKEIT
        this.applyGravity();
        this.animation();
    }

    animation() {
        this.SPLASH_SOUND.pause();
        let clearBottle = setInterval(() => {
            this.x += 18;//WEITE
            if (!this.bottleHitsChicken && !this.isBroken) {
                this.playAnimation(this.IMAGES_ROTATION);
            } else if (this.bottleHitsChicken || this.isBroken) {
                this.stopBottleAndSplash();
                clearInterval(clearBottle);
            }
        }, 60)
    };

    /**
     * STOP -> SHOW SPLASH IMAGE & PLAY SOUND
     */
    stopBottleAndSplash() {
        this.playAnimation(this.IMAGES_SALSA_SPLASH);
        this.playSplashSound();
    }

    /**
     * SOUND FUNCTIONS 
     */
    playSplashSound() {
        this.SPLASH_SOUND.volume = 0.8;
        this.SPLASH_SOUND.play();
    }

    playThrowingSound() {
        this.THROW_BOTTLE_SOUND.play();
        this.THROW_BOTTLE_SOUND.volume = 0.3;
    }
}