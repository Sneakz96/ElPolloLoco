let level1;

function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
        ],
        [
            new Endboss()
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -0.999),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -0.999),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -0.999),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -0.999),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 0.999),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 0.999),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 0.999),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 0.999),

            new BackgroundObject('img/5_background/layers/air.png', 1.997),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1.997),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1.997),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1.997),
            new BackgroundObject('img/5_background/layers/air.png', 2.996),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2.996),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2.996),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2.996),

            new BackgroundObject('img/5_background/layers/air.png', 3.995),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 3.995),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 3.995),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 3.995)
        ],
        [
            new CollectableCoins(700, 100),
            new CollectableCoins(1000, 180),
            new CollectableCoins(1300, 280),
            new CollectableCoins(1400, 180),
            new CollectableCoins(2000, 300)

        ],
        [
            new CollectableBottles(400),
            new CollectableBottles(700),
            new CollectableBottles(1200),
            new CollectableBottles(1400),
            new CollectableBottles(1800),
            new CollectableBottles(1900),
            new CollectableBottles(2200),
            new CollectableBottles(2400)
        ]
    );
}