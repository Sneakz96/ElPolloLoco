class World {

    //SET VARIABLES
    level = level1;
    camera_x = 0;

    //TAKEOVER
    ctx;
    canvas;
    keyboard;

    //ARRAYS
    collectedBottles = [];

    //STATIC_BARS
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();

    //OBJECTS
    char = new Character();
    endboss = new Endboss();
    throwableObjects = [new ThrowableObject()];
    collectableCoins = [new CollectableCoins()];
    collectableBottles = [new CollectableBottles()];

    ///CONDITIONS
    isWin = false;
    isGameOver = false;

    //SOUNDS
    COIN_COLLECT_SOUND = new Audio('audio/collect-coin.mp3');
    BOTTLE_COLLECT_SOUND = new Audio('audio/bottle_collect.mp3');
    WIN_WORLD_SOUND = new Audio('audio/win.mp3');
    GAME_OVER_SOUND = new Audio('audio/loose.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    /**
     * FUNCTION FOR DRAWING GIVEN PICTURES IN CANVAS
     */
    draw() {
        //CLEAR CANVAS
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //FIX CAMERA
        this.ctx.translate(this.camera_x, 0);
        //BACKGROUND
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        //LIFEBAR
        this.ctx.translate(-this.camera_x, 0);//BACK
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);//FORWARD
        //BOTTLEBAR
        this.ctx.translate(-this.camera_x, 0);//BACK
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);//FORWARD
        //COINBAR
        this.ctx.translate(-this.camera_x, 0);//BACK
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);//FORWARD
        //CHAR
        this.addToMap(this.char);
        //ENEMIES
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        //COLLECTABLE
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        //THROWABLE
        this.addObjectsToMap(this.throwableObjects);
        //FIX CAMERA BACK
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * FUNCTION TO SET WORLD
     */
    setWorld() {
        this.char.world = this;
        this.throwableObjects.world = this;
    }

    /**
     * FUNCTION FOR CHECKING COLLISIONS BY RUNNING - PERMANENTLY - 200MS
     */
    checkCollisions() {
        setInterval(() => {
            this.checkCollisionCharToChickens();//CHAR AND ENEMY?
            this.checkCollisionCharToEndboss();//CHAR AND ENDBOSS?
            this.checkThrowObjectsOnGround();//CHAR AND BOTTLE ON GROUND?
            this.checkCollisionsBottleToChicken();//BOTTLE AND ENEMY?
            this.checkCollisionsBottleToEndboss();//BOTTLE AND ENDBOSS?
            this.checkCollisionWithCoins();//GRAB COINS?
            this.checkCollisionWithBottles();//GRAB BOTTLES?
            this.checkGameOver();//GAME OVER?
            this.checkWin();//WIN?
        }, 60);
    }

    /**
     * FUNCTION FOR CHECK COLLISION CHAR AND CHICKENS
     */
    checkCollisionCharToChickens() {
        this.level.enemies.forEach((chicken, index) => {
            if (this.char.jumpsOnTop(chicken, index)) {
                console.log('char jump on chicken');
                this.removeFromWorld(this.level.enemies, index, 1);
            } else if (this.char.isColliding(chicken)) {
                this.char.hit(2);
                this.level.enemies.charHitsChicken = true;
                this.statusBar.setPercentage(this.char.energy);
                console.log('char get hit by enemy');
            }
        });
    }

    /**
     * FUNCTION FOR CHECK COLLISION CHAR AND ENDBOSS
     */
    checkCollisionCharToEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.char.isColliding(endboss)) {
                this.char.hit(20);
                this.statusBar.setPercentage(this.char.energy);
                console.log('char get hit by boss');
            }
        });
    }

    /**
     * FUNCTION FOR CHECK COLLISION BOTTLE AND ENEMY
     */
    checkCollisionsBottleToChicken() {
        this.level.enemies.forEach((enemy, index) => {
            this.throwableObjects.forEach((bottle, i) => {
                if (bottle.isColliding(enemy) || bottle.groundPosition < 230) { //2 BEDINGUNG FALSCH
                    bottle.bottleHitsChicken = true;
                    this.removeFromWorld(this.level.enemies, index, 600);//TIME FOR DEAD ANIMATION
                    this.removeFromWorld(this.throwableObjects, i, 60);//REMOVE SPLASHED BOTTLE
                    console.log('enemy hitted by bottle');
                };
            });
        });
    }

    /**
     * FUNCTION TO CHECK COLLISION BOTTLE TO ENDBOSS
     * 
     * 2MAL AUSGEFÜHRT - WHY?
     */
    checkCollisionsBottleToEndboss() {
        this.level.endboss.forEach(endboss => {
            this.throwableObjects.forEach((bottle, i) => {
                if (endboss.isColliding(bottle)) {
                    bottle.bottleHitsChicken = true;
                    endboss.bottleHitsEndboss = true;
                    this.endboss.lifepoints -= 20;//SET LP OF ENDBOSS
                    this.removeFromWorld(this.throwableObjects, i, 60);//REMOVE SPLASHED BOTTLE
                    console.log('boss hitted', this.endboss.lifepoints);
                } else if (this.endboss.lifepoints == 0) {
                    endboss.endbossDead = true;
                    this.removeFromWorld(this.level.endboss, i, 600);//REMOVE ENDBOSS
                    this.removeFromWorld(this.throwableObjects, i, 60);//REMOVE SPLASHED BOTTLE
                }
            });
        });
    }

    /**
    * FUNCTION FOR CHECK COLLISION CHAR AND COINS
    */
    checkCollisionWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.char.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setPercentage(this.coinBar.percentage += 20);
                console.log('coin collected');
                this.COIN_COLLECT_SOUND.play();
            }
        });
    }

    /**
     * FUNCTION FOR CHECK COLLISION CHAR AND BOTTLES ON GROUND TO ADD
     */
    checkCollisionWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.char.isColliding(bottle) && this.bottleBar.percentage < 100) {
                this.level.bottles.splice(index, 1);
                this.collectedBottles.push(this.collectableBottles, index);
                this.bottleBar.setPercentage(this.bottleBar.percentage += 20);
                console.log('bottle collected');
                this.BOTTLE_COLLECT_SOUND.play();
            }
        });
    }

    /**
     * FUNCTION FOR CHECKING THROWING OBJECTS
     */
    checkThrowObjectsOnGround() {
        if (this.bottleBar.percentage > 0 && this.keyboard.D) {
            let bottle = new ThrowableObject(this.char.x, this.char.y);
            this.throwableObjects.push(bottle);
            this.bottleBar.setPercentage(this.bottleBar.percentage -= 20);
            console.log('throw bottle');
        }
    }

    /**
     * FUNCTION TO CHECK WIN
     */
    checkWin() {
        if (this.endboss.lifepoints <= 0) {
            document.getElementById('canvas').classList.add('d-none');
            document.getElementById('controls').classList.add('d-none');
            document.getElementById('lost-screen').classList.remove('d-none');
            this.isWin = true;
            this.WIN_WORLD_SOUND.play();
            this.stopAll();
            this.clearAllIntervals();
            console.log('you won!');
        }
    }

    /**
     * FUNCTION TO CHECK GAME OVER
     */
    checkGameOver() {
        if (this.char.isDead()) {
            document.getElementById('canvas').classList.add('d-none');
            document.getElementById('controls').classList.add('d-none');
            document.getElementById('lost-screen').classList.remove('d-none');
            this.isGameOver = true;
            this.GAME_OVER_SOUND.play();
            this.stopAll();
            this.clearAllIntervals();
            console.log('game over!');
        }
    }

    /**
     * FUNCTION FOR ADD OBJECTS TO CANVAS
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * FUNCTION TO ADD MO TO MAP 
     */
    addToMap(mo) {//mo = movableObject
        mo.reflectImage(this.ctx);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        this.ctx.beginPath();
        this.ctx.lineWidth = '3';
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        this.ctx.stroke();

        mo.reflectImageBack(this.ctx);
    }


    /**
     * FUNCTION TO SET SPEED OF ENEMIES = 0
     */
    stopAll() {
        console.log('stop');
        this.level.enemies.forEach(enemy => {
            enemy.speed = 0;
        });
    }

    /**
     * FUNCTION TO REMOVE ITEM FROM WORLD
     */
    removeFromWorld(array, index, timeout) {
        setTimeout(() => {
            array.splice(index, 1);
        }, timeout);
    }

    /**
     * FUNCTION TO CLEAR ALL ARRAYS AFTER GAME STOP
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}