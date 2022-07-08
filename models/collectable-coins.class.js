class CollectableCoins extends MoveableObject {

    IMAGES_COINS = [
        'img/8.Coin/Moneda1.png',
        'img/8.Coin/Moneda2.png'
    ]

    constructor(x, y) {
        super().loadImage('img/8.Coin/Moneda1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = x; // BETWEEN 200 AND 700
        this.y = y;
        this.width = 70;
        this.height = 70;
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

    pickUp() {
        this.level.coins.forEach((coin) => {
            if (this.char.isColliding(coin)) {
                this.coinBar.setPercentage(this.coinBar.percentage +20);
                this.level.collectableCoins.splice(1);
            }
        });
    }
}