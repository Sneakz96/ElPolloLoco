class Chicken extends MoveableObject {

    bottleHitsChicken = false;
    level;

    //IMAGES
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    
    //SOUND
    chicken_walking_sound = new Audio('./audio/chicken.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING, this.IMAGES_DEAD);
        this.y = 360;
        this.x = 200 + Math.random() * 2800;//Zahl zwischen 200 und 700
        this.width = 65;
        this.height = 60;
        this.animate();
        this.speed = 2 + Math.random() * 1;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 15);

        setInterval(() => {
            if (this.isDead()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.speed > 0){
                this.playAnimation(this.IMAGES_WALKING);
            } 
        }, 150);
    }
}