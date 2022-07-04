class CollectableBottles extends MoveableObject {

    height = 70;
    width = 40;

    IMAGES_BOTTLE = [
        'img/7.Marcadores/Icono/Botella.png'
    ];

    constructor(x) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x; // BETWEEN 200 AND 700
        this.y = 350;
        this.width = 70;
        this.height = 70;

    }
}