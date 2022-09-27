let level1;

function initLevel(){
    Level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss(),
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
            new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', -0.999),
            new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/2.png', -0.999),
            new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/2.png', -0.999),
            new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/2.png', -0.999),

            new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
            new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/1.png', 0),
            new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/1.png', 0),
            new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0),
            new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0.999),
            new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/2.png', 0.999),
            new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/2.png', 0.999),
            new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/2.png', 0.999),

            new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', 1.997),
            new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/1.png', 1.997),
            new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/1.png', 1.997),
            new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/1.png', 1.997),
            new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', 2.996),
            new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/2.png', 2.996),
            new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/2.png', 2.996),
            new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/2.png', 2.996),

            new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', 3.995),
            new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/1.png', 3.995),
            new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/1.png', 3.995),
            new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/1.png', 3.995)
        ],
        [
            new CollectableCoins(300, 280),
            new CollectableCoins(500, 280),
            new CollectableCoins(750, 300),
            new CollectableCoins(1000, 300),
            new CollectableCoins(1300, 280),
            new CollectableCoins(1400, 320),
            new CollectableCoins(1500, 280),
            new CollectableCoins(1750, 300),
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