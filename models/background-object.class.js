class BackgroundObject extends DrawableObject {

    //SET VARIABLES
    width = 720;
    height = 480;
    y = 0;

    constructor(imagePath, xMulty) {
        super().loadImage(imagePath);
        this.x = this.width * xMulty;
        this.y = this.y;
    }

}