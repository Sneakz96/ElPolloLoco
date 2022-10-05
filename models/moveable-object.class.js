class MoveableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    xMulty;
    speed_Y = 0
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    playAnimation(images) {
        let i = this.currentImage % images.length;// let i = 7 % 6; => 1 REST 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * FUNCTION FOR GRAVITY 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speed_Y > 0) {
                this.y -= this.speed_Y;
                this.speed_Y -= this.acceleration;
            }
        }, 1000 / 25)
    }

    /**
     * FUNCTION TO MOVE RIGHT
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * FUNCTION TO MOVE LEFT
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * FUNCTION TO JUMP
     */
    jump() {
        this.speed_Y = 35;
    }

    /**
     * FUNCTION TO CHECK IF ABOVE GROUND
     * IF NOT FALL DOWN
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 220;
        }
    }

    /**
     * FUNCTION TO CHECK IF MO IS COLLIDING
     */
    isColliding(mo) {
        return this.x + this.width > mo.x && //CHAR RECHTS OBJECT LINKS 
            this.y + this.height > mo.y && //CHAR OBEN OBJECT UNTEN
            this.x < mo.x && //CHAR LINKS OBJECT RECHTS 
            this.y < mo.y + mo.height //CHAR UNTEN OBJECT OBEN
    }







    /**
     * FUNCTION TO CHECK IF MO IS COLLIDING WITH CHAR 
     * JUMP ON CHICKEN 
     */
    isTrampling(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height &&
            this.y < 135;
    }
    
    //OR
    jumpsOnTop(jo) {
        return this.y + this.height > jo.y &&
            this.y + this.height < jo.y + jo.height &&
            this.x + this.width > jo.x &&
            this.x + this.width < (jo.x + jo.width + 50);
    }










    
    /**
     * FUNCTION TO CHECK HIT
     */
    hit() {
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.energy -= 2;
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * FUNCTION TO CHECK TIME WHEN LAST HIT WAS 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // DIFFERENCE IN MS
        timepassed = timepassed / 1000; // DIFFERENCE IN S
        return timepassed < 0.75;
    }

    /**
     * FUNCTION TO RETURN ENERGY
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * FUNCTION TO SET PARAMETER TO MO
     */
    isKilled() {
        this.energy = 0;
        this.speed = 0;
    }
}