class World {
    char = new Character();
    level = Level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    throwableObjects = [new ThrowableObject()];
    coins = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.char.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
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
    
    checkThrowObjects(){
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.char.x, this.char.y);
            this.throwableObjects.push(bottle);
        }
    }

    checkCoins(){
        this.CollectableObject.push(this.coins);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
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

        this.addToMap(this.char);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        
        //this.addObjectsToMap(this.level.coins);
        
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
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
