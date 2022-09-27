class ThrowableObject extends MoveableObject {

    height = 80;
    width = 60;
    bottleHitsEnemy = false;
    
    IMAGE = [
        'img/7.Marcadores/Icono/Botella.png'
    ]

    IMAGES_SALSA = [
        'img/6.botella/Rotaciขn/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'
    ]

    IMAGES_SALSA_SPLASH = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png'
    ]


    constructor(x, y) {
        super().loadImage(this.IMAGE);
        this.loadImages(this.IMAGES_SALSA);
        //this.loadImages(this.IMAGES_SALSA_SPLASH);
        this.x = x;
        this.y = y;
        this.trow();
    }

    trow() {
        this.speed_Y = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 11;
        }, 25);
    }

    bottleAnimation() {
        setInterval(() => {
            if (this.bottleHitsEnemy) {
                this.stopBottleAndSplash();
            }
        }, 100 / 60);
        setInterval(() => {
            if (!this.bottleHitsEnemy) {
                this.spinBottle();
            }
        }, 8000 / 60);
        this.bottleHitsEnemy = false;
    }

    /**
     * PLAY ANIMATION -> LOAD ALL IMAGES TO ROTATE
     */
    spinBottle() {
        this.playAnimation(this.IMAGES_SALSA);
    }

    /**
     * STOP ANIMATION -> SPLASH IMAGE
     */
    stopBottleAndSplash() {
        this.playAnimation(this.IMAGES_SALSA_SPLASH);
    }
}