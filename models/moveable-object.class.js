class MoveableObject extends DrawableObject {

    //SET VARIABLES
    groundPosition = 0;
    speed = 0.15;
    speed_Y = 0
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    //TAKEOVER
    xMulty;
    world;

    /**
     * FUNCTION FOR PLAY ANIMATION 
     */
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
            };
        }, 40);
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
            return this.y < this.groundPosition;
        }
    }

    /**
     * FUNCTION TO CHECK IF MO IS COLLIDING
     */
    isColliding(mo) {
        return this.x + this.width > mo.x && //CHAR RECHTS OBJECT LINKS 
            this.y + this.height > mo.y && //CHAR OBEN OBJECT UNTEN
            this.x < mo.x + mo.width && //CHAR LINKS OBJECT RECHTS 
            this.y < mo.y + mo.height;//CHAR UNTEN OBJECT OBEN
    }


    /**
     *  FUNCTION TO CHECK COLLISION ON TOP OF CHICKEN
     */
    jumpsOnTop(chicken) {
        return this.y + this.height > chicken.y && //CHAR JUMP OVER 360p?
            this.y + this.height < chicken.y + chicken.height &&//CHAR HÖHE
            this.x + this.height > chicken.x && 
            this.x < chicken.x + chicken.height && 
            this.speed_Y<= 0 &&
            this.speed_Y >= -35;
    }

    /**
     * FUNCTION TO CHECK HIT
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
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