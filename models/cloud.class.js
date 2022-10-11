class Cloud extends MoveableObject {

    //SET VARIABLES
    width = 310;
    height = 250;
    x = 200;
    y = 40;

    //IMAGES
    IMAGES_CLOUDS = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES_CLOUDS);
        this.x = this.x + Math.random() * 2800;//Zahl zwischen 200 und 700
        this.y = this.y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 30);
    }
}