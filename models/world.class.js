class World {
    ctx;
    canvas;
    keyboard;
    level = Level1;
    camera_x = 0;

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
    this.play_sound.volume = 0.25;
}

startWorld() {
    this.character.start();
    //this.level.startLevel();
    this.draw(); 
    this.run(); 
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
}

run() {
    setInterval(() => {
        this.checkCollisions();
        this.checkCollisionWithCoins();
        this.checkCollisionWithBottles();
        this.checkThrowObjects();
    }, 200);
}

checkCollisions() {
    this.level.enemies.forEach((enemy) => {
        if (this.char.isColliding(enemy)) {
            this.char.hit();
            this.statusBar.setPercentage(this.char.energy);
        }
    });
}

checkThrowObjects() {
    if (this.keyboard.D) {
        let bottle = new ThrowableObject(this.char.x, this.char.y);
        this.throwableObjects.push(bottle);
        this.bottleBar.setPercentage(this.bottleBar.percentage -= 20);
        //this.throw_bottle_sound.play();
    }
}

checkCollisionWithBottles() {
    this.level.bottles.forEach((bottle, index) => {
        if (this.char.isColliding(bottle)) {
            this.level.bottles.splice(index, 1);
            this.bottleBar.setPercentage(this.bottleBar.percentage += 20);
            //this.bottle_collect_sound.play();
        }
    });
}

checkCollisionWithCoins() {
    this.level.coins.forEach((coin, index) => {
        if (this.char.isColliding(coin)) {
            this.level.coins.splice(index, 1);
            this.coinBar.setPercentage(this.coinBar.percentage += 10);
            //this.coin_collect_sound.play();
        }
    });
}

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
}