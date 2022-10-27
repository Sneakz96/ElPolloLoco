class World {

    //SET VARIABLES
    level = level1;
    camera_x = 0;
    direction = 1;

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
    chickens = new Chicken();
    endboss = new Endboss();
    throwableObjects = [new ThrowableObject()];
    collectableCoins = [new CollectableCoins()];
    collectableBottles = [new CollectableBottles()];

    ///CONDITIONS
    isWin = false;
    isGameOver = false;
    throwable = true;
    isHitting = false;

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
        this.addObjectsToMap(this.level.chickens);
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
            this.checkThrowingABottle();//CHAR AND BOTTLE ON GROUND?
            this.checkCollisionsBottleToGround();//BOTTLE AND GROUND?
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
        this.level.chickens.forEach((chicken, index) => {
            if (this.char.jumpsOnTop(chicken, index)) {
                chicken.charJumpOnChicken = true;
                this.removeDeadChicken(index);
                console.log('you jump on', this.level.chickens[index]);
            } else if (this.char.isColliding(chicken) && !this.isHitting) {
                this.isHitting = true;
                this.checkHit();
                console.log(this.isHitting);
                this.char.hit(10);
                this.statusBar.setPercentage(this.char.energy);
            };
        });
    }

    /**
     * FUNCTION FOR CHECK COLLISION CHAR AND ENDBOSS
     */
    checkCollisionCharToEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.char.isColliding(endboss)) {
                this.char.hit(40);
                this.statusBar.setPercentage(this.char.energy);
            };
        });
    }

    /**
     * FUNCTION FOR CHECK COLLISION BOTTLE AND GROUND
     */
    checkCollisionsBottleToGround() {
        this.throwableObjects.forEach((bottle, i) => {
            if (bottle.y >= 340 && !bottle.isBroken && !bottle.bottleHitted) {
                bottle.THROW_BOTTLE_SOUND.pause();
                bottle.bottleHitted = true;
                bottle.isBroken = true;
                bottle.acceleration = 0;
                bottle.speed = 0;
                bottle.speed_Y = 0;
                this.removeSplashedBottle(i);
            };
        });
    }

    /**
     * FUNCTION FOR CHECK COLLISION BOTTLE AND ENEMY
     */
    checkCollisionsBottleToChicken() {
        this.level.chickens.forEach((chicken, index) => {
            this.throwableObjects.forEach((bottle, i) => {
                if (bottle.isColliding(chicken) && !bottle.bottleHitted) {
                    bottle.THROW_BOTTLE_SOUND.pause();
                    bottle.bottleHitted = true;
                    chicken.bottleHitsChicken = true;
                    bottle.bottleHitsChicken = true;
                    this.removeDeadChicken(index);
                    this.removeSplashedBottle(i);
                    console.log('bottle hit chicken');
                };
            });
        });
    }

    /**
     * FUNCTION TO CHECK COLLISION BOTTLE TO ENDBOSS
     */
    checkCollisionsBottleToEndboss() {
        this.level.endboss.forEach(endboss => {
            this.throwableObjects.forEach((bottle, i) => {
                if (endboss.isColliding(bottle) && !bottle.bottleHitted) {
                    bottle.THROW_BOTTLE_SOUND.pause();
                    bottle.bottleHitted = true;
                    bottle.bottleHitsChicken = true;
                    endboss.bottleHitsEndboss = true;
                    this.endboss.lifepoints -= 30;
                    this.removeSplashedBottle(i);
                    console.log(bottle);
                    if (this.endboss.lifepoints <= 0) {
                        bottle.bottleHitted = true;
                        this.endboss.bossDead = true;
                    };
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
                this.COIN_COLLECT_SOUND.play();
            };
        });
    }

    /**
     * FUNCTION FOR CHECK COLLISION CHAR AND BOTTLES ON GROUND TO ADD
     */
    checkCollisionWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.char.isColliding(bottle) && this.bottleBar.percentage < 100) {
                this.level.bottles.splice(index, 1);
                this.collectedBottles.push(this.collectableBottles);
                this.bottleBar.setPercentage(this.bottleBar.percentage += 20);
                this.BOTTLE_COLLECT_SOUND.play();
            };
        });
    }

    /**
     * FUNCTION FOR CHECK IF A BOTTLE IS THROWED
     */
    checkThrowingABottle() {
        if (this.bottleBar.percentage > 0 && this.keyboard.D && this.throwable) {//BEDINGUNG = VARIABLE TRUE = WERFBAR
            let bottle = new ThrowableObject(this.char.x, this.char.y, this.direction);
            //VARIABLEN TRUE GEBEN BIS BROKE
            this.throwable = false;
            this.checkThrowable();
            console.log(this.throwable);
            this.collectedBottles.splice(bottle, 1);
            this.throwableObjects.push(bottle);
            this.bottleBar.setPercentage(this.bottleBar.percentage -= 20);
            bottle.THROW_BOTTLE_SOUND.play();
        };
    }

    checkHit() {
        setTimeout(() => {
            this.isHitting = false;
        }, 1000);
    }

    /**
     * FUNCTION TO SET TIMEOUT AT THROWING
     */
    checkThrowable() {
        setTimeout(() => {
            this.throwable = true;
        }, 1000);
    }

    /**
     * FUNCTION TO CHECK WIN
     */
    checkWin() {
        if (this.endboss.lifepoints <= 0) {
            this.changeMenu();
            document.getElementById('win-screen').classList.remove('d-none');
            this.isWin = true;
            this.WIN_WORLD_SOUND.play();
            this.stopAll();
            this.clearAllIntervals();
            console.log('you won!');
        };
    }

    /**
     * FUNCTION TO CHECK GAME OVER
     */
    checkGameOver() {
        if (this.char.isDead()) {
            this.changeMenu();
            document.getElementById('lost-screen').classList.remove('d-none');
            this.isGameOver = true;
            this.GAME_OVER_SOUND.play();
            this.stopAll();
            this.clearAllIntervals();
            console.log('game over!');
        };
    }

    /**
     * FUNCTION TO CHANGE END PIC TO MENU
     */
    changeMenu() {
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('mb-canvas').classList.add('d-none');
        document.getElementById('mb-btn').classList.add('d-none');
        document.getElementById('controls').classList.add('d-none');
        document.getElementById('mb-hud').classList.add('d-none');
    }

    /**
    * FUNCTION FOR REMOVING SPLASHED BOTTLE
    */
    removeDeadChicken(index) {
        setTimeout(() => {
            this.level.chickens.splice(index, 1);
        }, 200);//TIME FOR ANIMATION
    }

    /**
    * FUNCTION FOR REMOVING SPLASHED BOTTLE
    */
    removeSplashedBottle(i) {
        setTimeout(() => {
            this.throwableObjects.splice(i, 1);//REMOVE SPLASHED BOTTLE
        }, 200);
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
        this.level.chickens.forEach(enemy => {
            enemy.speed = 0;
        });
    }

    /**
     * FUNCTION TO CLEAR ALL ARRAYS AFTER GAME STOP
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}