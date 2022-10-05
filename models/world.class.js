class World {

    ctx;
    canvas;
    keyboard;
    level = level1;
    camera_x = 0;

    isGameOver = false;

    //ARRAYS
    collectedBottles = [];

    //STATIC_BARS
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();

    //OBJECTS
    char = new Character();
    throwableObjects = [new ThrowableObject()];
    collectableCoins = [new CollectableCoins()];
    collectableBottles = [new CollectableBottles()];

    //SOUNDS
    coin_collect_sound = new Audio('audio/collect-coin.mp3');
    bottle_collect_sound = new Audio();
    win_world_sound = new Audio('audio/win.mp3');
    loose_world_sound = new Audio('audio/loose.mp3');


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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
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

        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.char);
        this.addObjectsToMap(this.throwableObjects);


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
            this.checkCollisionCharToEnemys();//FOR CHAR AND ENEMY
            this.checkThrowObjectsOnGround();//CHAR AND BOTTLE ON GROUND
            this.checkCollisionBottleToEnemy();//BOTTLE AND ENEMY
            this.checkCollisionWithCoins();//FOR GRABBING
            this.checkCollisionWithBottles();//FOR GRABBING
            this.checkGameOver();//IF LP=0 -> GAME OVER 
        }, 60);
    }

    /**
     * FUNCTION FOR CHECK COLLISION CHAR AND ENEMIES
     */
    checkCollisionCharToEnemys() {
        this.level.enemies.forEach((enemy) => {
            if (this.char.isColliding(enemy)) {
                this.char.hit();
                this.statusBar.setPercentage(this.char.energy);
                console.log('char get hit by enemy');
            }
        });
    }

    /**
     * FUNCTION FOR CHECK COLLISION BOTTLE AND ENEMY
     */
    checkCollisionBottleToEnemy() {

        this.level.enemies.forEach((enemy, index) => {
            this.throwableObjects.forEach((bottle, i) => {
                if (bottle.isColliding(enemy) && !bottle.bottleHitsChicken) { //2 BEDINGUNG FALSCH
                    bottle.bottleHitsChicken = true;
                    this.removeFromWorld(this.level.enemies, index, 600);//TIME !!!!! LOOK ON STAMP FUNCTION !!!!!!
                    this.removeFromWorld(this.throwableObjects, i, 60);
                    console.log('enemy hitted by bottle');
                };
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
            }
        });
    }

    /**
     * FUNCTION FOR CHECK COLLISION CHAR AND BOTTLES ON GROUND TO ADD
     */
    checkCollisionWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.char.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.collectedBottles.push(this.collectableBottles, index);
                this.bottleBar.setPercentage(this.bottleBar.percentage += 20);
                console.log('bottle collected');
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
     * FUNCTION TO CHECK GAME OVER
     */
    checkGameOver() {
        if (this.char.isDead()) {
            document.getElementById('canvas').classList.add('d-none');
            document.getElementById('controls').classList.add('d-none');
            document.getElementById('lost-screen').classList.remove('d-none');
            this.isGameOver = true;
            this.stopAll();
            this.clearAllIntervals();
            console.log('game over?');
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
        mo.reflectImageBack(this.ctx);
    }





    /**
     * FUNCTION TO SET SPEED OF ENEMIES = 0
     */
    stopAll() {
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