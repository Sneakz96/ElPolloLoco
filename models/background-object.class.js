class BackgroundObject extends DrawableObject {

    //SET VARIABLE
    width = 720;
    height = 480;

    constructor(imagePath, xMulty) {
        super().loadImage(imagePath);
        this.x = 720 * xMulty;
        this.y = 0;
    }

}