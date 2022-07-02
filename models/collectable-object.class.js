class CollectableObject extends MoveableObject {

    height = 50;
    width = 50;
   

    IMAGES_COINS = [
        'img/8.Coin/Moneda1.png',
        'img/8.Coin/Moneda2.png'
    ]

    constructor(x, y) {
        super().loadImage('img/8.Coin/Moneda1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = x; // BETWEEN 200 AND 700
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.animateCoins();
        
    }

    /**
     * SET INTERVAL FOR ANIMATED COINS -> PULSE
     */
    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);

        }, 220);
    }
}