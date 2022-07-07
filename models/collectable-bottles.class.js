class CollectableBottles extends MoveableObject {

    height = 70;
    width = 40;

    IMAGES_BOTTLE = [
        'img/6.botella/2.Botella_enterrada2.png'
    ];

    constructor(x) {
        super().loadImage('img/6.botella/2.Botella_enterrada2.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x; // BETWEEN 200 AND 700
        this.y = 350;
        this.width = 70;
        this.height = 70;
    }
}