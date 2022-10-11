class Chicken extends MoveableObject {

    //CONDITIONS
    bottleHitsChicken = false;
    charHitsChicken = false;

    //TAKEOVER
    level;

    //SOUND
    CHICKEN_WALKING_SOUND = new Audio('./audio/chicken.mp3');
    CHICKEN_DEAD_SOUND = new Audio();

    //IMAGES
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.y = 360;
        this.x = 200 + Math.random() * 2800;//Zahl zwischen 200 und 700
        this.width = 65;
        this.height = 60;
        this.speed = 2 + Math.random() * 1;
        this.animateChicken();
    }

    animateChicken() {
        setInterval(() => {
            if (this.bottleHitsChicken) {
                this.playAnimation(this.IMAGES_DEAD);
                this.CHICKEN_DEAD_SOUND.volume = 0.15;
                this.CHICKEN_DEAD_SOUND.play();
            } else if (!this.bottleHitsChicken && !this.charHitsChicken) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
                //this.CHICKEN_WALKING_SOUND.volume = 0.15;
                //this.CHICKEN_WALKING_SOUND.play();
            }
        }, 100);
    }
}