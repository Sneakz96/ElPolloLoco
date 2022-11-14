class CollectableBottles extends MoveableObject {

    //SET VARIABLES
    height = 80;
    width = 60;
    y = 350;

    //SOUND
    BOTTLE_COLLECT_SOUND = new Audio('audio/bottle_collect.mp3');

    //IMAGE
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x) {
        super().loadImage(this.IMAGES_BOTTLE);
        this.x = x; // BETWEEN 200 AND 700
        this.y = this.y;
        this.width = this.width;
        this.height = this.height;
    }
}