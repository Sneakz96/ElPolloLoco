class Chicken extends MoveableObject {

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    
    chicken_walking_sound = new Audio('./audio/chicken.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        //this.chicken_walking_sound.volume = 0.055;
        this.loadImages(this.IMAGES_WALKING, this.IMAGES_DEAD);
        this.y = 360;
        this.x = 200 + Math.random() * 2800;//Zahl zwischen 200 und 700
        this.width = 65;
        this.height = 60;
        this.animate();
        this.speed = 1 + Math.random() * 1;
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.speed > 0){
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
                //this.chicken_walking_sound.play();
            } else {
                this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
            }
        }, 150);
    }
}