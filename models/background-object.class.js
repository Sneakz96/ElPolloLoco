class BackgroundObject extends MoveableObject {

    width = 480;
    height = 720;

    constructor(imagePath, xMulty) {
        super().loadImage(imagePath);
        this.x = 720 * xMulty;
        this.y = 0;
    }

}