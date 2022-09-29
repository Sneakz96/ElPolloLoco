class CollectableCoins extends MoveableObject {

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = x; // BETWEEN 200 AND 700
        this.y = y;
        this.width = 70;
        this.height = 70;
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

    pickUp(index) {
        this.level.coins.forEach((coin) => {
            if (this.char.isColliding(coin)) {
                console.log(this.coinBar.percentage);
                this.coinBar.setPercentage(this.coinBar.percentage +20);
                this.level.collectableCoins.splice(index,1);
            }
        });
    }
}