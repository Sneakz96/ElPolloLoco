class Chicken extends MoveableObject {

    //CONDITIONS
    bottleHitsChicken = false;
    charJumpOnChicken = false;

    //TAKEOVER
    level;

    //IMAGES
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.y = 360;
        this.x = 200 + Math.random() * 2800;//Zahl zwischen 200 und 700
        this.width = 65;
        this.height = 60;
        this.speed = 2 + Math.random() * 1;
        this.animateChicken();
    }

    animateChicken() {
        setInterval(() => {
            if (this.bottleHitsChicken || this.charJumpOnChicken) {
                this.playAnimation(this.IMAGE_DEAD);
                this.charJumpOnChicken = false;
                this.bottleHitsChicken = false;
            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 60);
    }
}