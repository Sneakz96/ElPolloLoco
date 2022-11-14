class ThrowableObject extends MoveableObject {

    //SET VARIABLES
    groundPosition = 320;
    height = 90;
    width = 75;
    throwDirection = 1;

    //CONDITION
    bottleHitsChicken = false;
    isBroken = false;
    bottleHitted = false;

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

    constructor(x, y, direction) {
        super().loadImage(this.IMAGE);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SALSA_SPLASH);
        this.throw();
        this.x = x;
        this.y = y;
        this.throwDirection = direction;
    }

    /**
     * THROW ANIMATION
     */
    throw() {
        this.speed_Y = 20;//FALLGESCHWINDIGKEIT
        this.applyGravity();
        this.animation();
        this.checkDirection();
    }

    /**
     * CHECK THROW DIRECTION
     */
    checkDirection() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.x += (this.throwDirection * 15);
            };
        }, 60);
    }

    animation() {
        this.SPLASH_SOUND.pause();
        let clearBottle = setInterval(() => {
            if (!this.bottleHitsChicken && !this.isBroken && !this.bottleHitted) {
                this.playAnimation(this.IMAGES_ROTATION);
                this.bottleHitted = false;
            } else if (this.bottleHitsChicken || this.isBroken || this.bottleHitted) {
                this.stopBottleAndSplash();
                this.bottleHitted = true;
                clearInterval(clearBottle);
            };
        }, 60);
    }

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