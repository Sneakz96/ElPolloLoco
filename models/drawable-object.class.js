class DrawableObject {

    //SET VARIABLES
    x = 20;
    y = 230;
    height = 190;
    width = 120;
    currentImage = 0;

    //ARRAY
    imageCache = {};

    //TAKEOVER
    img;


    loadImage(path) {
        this.img = new Image();// this.img = document.getElementedByID('image')
        this.img.src = path;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('error loading image', error);    
        }
    }
    
    /**
     * 
     * @param {array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CollectableCoins || this instanceof CollectableBottles) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    reflectImage(ctx) {
        if (this.otherDirection) {
            ctx.save();
            ctx.translate(this.width / 2, 0);
            ctx.scale(-1, 1);
            this.x = this.x * -1;
        }
    }

    reflectImageBack(ctx) {
        if (this.otherDirection) {
            this.x = this.x * -1;
            ctx.restore();//LOAD NONREFLECTED PICTURE
        }
    }
}