class CollectableBottles extends MoveableObject {

    height = 70;
    width = 40;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x) {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        
        this.x = x; // BETWEEN 200 AND 700
        this.y = 350;
        this.width = 70;
        this.height = 70;
    }
}