class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    xMulty;
    speed_Y = 0
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    constructor() {
        super();
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;// let i = 7 % 6; => 1 REST 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speed_Y > 0) {
                this.y -= this.speed_Y;
                this.speed_Y -= this.acceleration;
            }
        }, 1000 / 25)
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speed_Y = 30;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 230;
        }
    }
    
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
        }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // DIFFERENCE IN MS
        timepassed = timepassed / 1000; // DIFFERENCE IN S
        return timepassed < 0.75;
    }

    isDead() {
        return this.energy == 0;
    }
}