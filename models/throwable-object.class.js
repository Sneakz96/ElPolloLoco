class ThrowableObject extends MoveableObject {

    height = 80;
    width = 60;


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


    constructor(x, y) {
        super().loadImage(this.IMAGE);
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_SALSA_SPLASH);
        this.loadImages(this.IMAGES_ROTATION);
        this.trow();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.stopBottleAndSplash();
            } else {
                this.spinBottle()
            }
        }, 100);
    }

    trow() {
        this.speed_Y = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 11;
        }, 25)

    }

    /**
     * PLAY ANIMATION -> LOAD ALL IMAGES TO ROTATE
     */
    spinBottle() {
        this.playAnimation(this.IMAGES_ROTATION);
    }

    /**
     * STOP ANIMATION -> SPLASH IMAGE
     */
    stopBottleAndSplash() {
        this.energy = 0;
        this.playAnimation(this.IMAGES_SALSA_SPLASH);
    }
}