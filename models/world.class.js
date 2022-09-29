class World {
    ctx;
    canvas;
    keyboard;
    level = Level1;
    camera_x = 0;
    
    isGameOver = false;

    char = new Character();
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();

    throwableObjects = [new ThrowableObject()];
    collectableCoins = [new CollectableCoins()];
    collectableBottles = [new CollectableBottles()];


    throw_bottle_sound = new Audio('./audio/bottle-throwing.mp3');
    smash_bottle_sound = new Audio('./audio/smashing-glass.mp3');
    coin_collect_sound = new Audio('audio/collect-coin.mp3');
    bottle_collect_sound = new Audio('audio/bottle_collect.mp3');
    win_world_sound = new Audio('audio/win.mp3');
    loose_world_sound = new Audio('audio/loose.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * FUNCTIONS FOR START THE NEW LEVEL
     */
    startWorld() {
        this.level.startLevel();
        this.char.start();
        this.draw();
        this.run();
    }

    

    /**
     * FUNCTIONS FOR CHECKING COLLISIONS BY RUNNING
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

    setWorld() {
        this.char.world = this;
    }

    /**
     * FUNCTIONS FOR CHECKING COLLISIONS BY RUNNING - PERMANENTLY - 200MS
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionWithCoins();
            this.checkCollisionWithBottles();
            this.checkThrowObjects();
            this.checkCollisionThrowableObjectToEnemy();
            this.checkGameOver();
        }, 200);
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

    checkCollectableItem() {
        if (this.bottleBar.percentage = 100) {
            // maximum 5 Bottles collectable

        }
    }

    /**
     * FUNCTIONS FOR CHECK COLLISION CHAR AND ENEMIES
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.char.isColliding(enemy)) {
                this.char.hit();
                this.statusBar.setPercentage(this.char.energy);
            }
        });
    }

    /**
     * FUNCTIONS FOR CHECK COLLISION CHAR AND BOTTLE ON GROUND
     */
    checkCollisionWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.char.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottleBar.setPercentage(this.bottleBar.percentage += 20);
                //this.bottle_collect_sound.play();
            }
        });
    }

    /**
     * FUNCTIONS FOR CHECK COLLISION BOTTLE AND ENEMY
     */
    checkCollisionThrowableObjectToEnemy() {
        this.throwableObjects.forEach(throwableObject => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.isColliding(throwableObject)) {
                    this.removeFromWorld(this.level.enemies, index, 3000);
                }
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
                this.coinBar.setPercentage(this.coinBar.percentage += 10);
                //this.coin_collect_sound.play();
            }
        });
    }

    /**
     * FUNCTIONS FOR ADD OBJECTS TO CANVAS
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {//mo = movableObject
        mo.reflectImage(this.ctx);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.reflectImageBack(this.ctx);
    }

    removeFromWorld(array, index, timeout) {
        setTimeout(() => {
            array.splice(index, 1);
        }, timeout);
    }

    /**
     * Function for check if Game Over
     */
    checkGameOver() {
        if (this.char.isDead()) {
            document.getElementById('canvas').classList.add('d-none');
            document.getElementById('controls').classList.add('d-none');
            document.getElementById('lost-screen').classList.remove('d-none');
            this.isGameOver = true;
            this.stopAll();
            //play death sound here
            this.statusBar.setPercentage(this.char.energy, 100);
    }

    }
    stopAll() {
        this.level.enemies.forEach(enemy => {
            enemy.speed = 0;
        });
    }


}