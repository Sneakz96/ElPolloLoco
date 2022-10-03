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

    setWorld() {
        this.char.world = this;
        this.throwableObjects.world = this;
    }

    /**
     * FUNCTIONS FOR START THE NEW LEVEL
     */
    startWorld() {
        this.char.start();
        this.level.startLevel();
        this.draw();
        this.checkCollisions();
    }

    /**
     * FUNCTIONS FOR CHECKING COLLISIONS BY RUNNING - PERMANENTLY - 200MS
     */
    checkCollisions() {
        setInterval(() => {
            this.checkCollisionsWhithEnemys();//FOR CHAR AND ENEMY
            this.checkThrowObjects();//CHAR AND BOTTLE ON GROUND
            this.checkCollisionThrowableObjectToEnemy();//BOTTLE AND ENEMY
            this.checkCollisionWithCoins();//FOR GRABBING
            this.checkCollisionWithBottles();//FOR GRABBING
            this.checkGameOver();//IF LP=0 -> GAME OVER 
        }, 60);
    }

    /**
     * FUNCTIONS FOR CHECK COLLISION CHAR AND ENEMIES
     */
    checkCollisionsWhithEnemys() {
        this.level.enemies.forEach((enemy) => {
            if (this.char.isColliding(enemy)) {
                this.char.hit();
                this.statusBar.setPercentage(this.char.energy);
            }
        });
    }

    /**
     * FUNCTIONS FOR CHECK COLLISION BOTTLE AND ENEMY
     */
    checkCollisionThrowableObjectToEnemy() {
        this.throwableObjects.forEach((bottle, i) => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.isColliding(bottle)) {
                    this.removeFromWorld(this.level.enemies, index, 1);
                    //this.removeFromWorld(this.throwableObjects[i], i, 10);
                };
            });
        });
    }

    /**
    * FUNCTIONS FOR CHECK COLLISION CHAR AND COINS
    */
    checkCollisionWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.char.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setPercentage(this.coinBar.percentage += 20);
                //this.coin_collect_sound.play();
            }
        });
    }

    /**
     * FUNCTIONS FOR CHECK COLLISION CHAR AND BOTTLES ON GROUND TO ADD
     */
    checkCollisionWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.char.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.collectedBottles.push(this.level.CollectableBottles);
                this.bottleBar.setPercentage(this.bottleBar.percentage += 20);
                //this.bottle_collect_sound.play();
            }
        });
    }

    /**
     * FUNCTIONS FOR CHECKING THROWING OBJECTS
     */
    checkThrowObjects() {
        if (this.bottleBar.percentage > 0 && this.keyboard.D) {
            let bottle = new ThrowableObject(this.char.x, this.char.y);
            this.throwableObjects.push(bottle);
            this.bottleBar.setPercentage(this.bottleBar.percentage -= 20);
            //this.throw_bottle_sound.play();
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
        }
    }

    /**
     * FUNCTIONS TO SET SPEED OF ENEMIES = 0
     */
    stopAll() {
        this.level.enemies.forEach(enemy => {
            enemy.speed = 0;
        });
    }

    checkCollectableItem() {
        if (this.bottleBar.percentage = 100) {
            // maximum 5 Bottles collectable
            // not able to collect
        }
    }

    /**
     * FUNCTIONS FOR ADD OBJECTS TO CANVAS
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * FUNCTIONS TO ADD MO TO MAP 
     */
    addToMap(mo) {//mo = movableObject
        mo.reflectImage(this.ctx);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.reflectImageBack(this.ctx);
    }

    /**
     * FUNCTIONS TO REMOVE ITEM FROM WORLD
     */
    removeFromWorld(array, index, timeout) {
        setTimeout(() => {
            array.splice(index, 1);
        }, timeout);
    }

    /**
     * FUNCTIONS TO CLEAR ALL ARRAYS AFTER GAME STOP
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}