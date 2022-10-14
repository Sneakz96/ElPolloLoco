class CollectableCoins extends MoveableObject {

    //IMAGES
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = x; // BETWEEN 200 AND 700
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.animate();
    }

    /**
     * SET INTERVAL FOR ANIMATED COINS -> PULSE
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 220);
    }
}