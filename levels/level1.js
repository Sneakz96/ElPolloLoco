const Level1 = new Level(
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
        new Cloud()
    ],
    [
        new CollectableObject(300, 220),
        new CollectableObject(300, 280),
        new CollectableObject(400, 280),
        new CollectableObject(500, 280),
        new CollectableObject(750, 280),
        new CollectableObject(1000, 280),
    ],
    [

    ],
    [
        new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', -0.999),
        new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/2.png', -0.999),
        new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/2.png', -0.999),
        new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/2.png', -0.999),

        new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0), //Soll 0=x  --->ABER y=0
        new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/1.png', 0),
        new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/1.png', 0),
        new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0),
        new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0.999),
        new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/2.png', 0.999),
        new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/2.png', 0.999),
        new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/2.png', 0.999),

        new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', 1.997), //Soll 0=x  --->ABER y=0
        new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/1.png', 1.997),
        new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/1.png', 1.997),
        new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/1.png', 1.997),
        new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', 2.996),
        new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/2.png', 2.996),
        new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/2.png', 2.996),
        new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/2.png', 2.996),

        new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', 3.995), //Soll 0=x  --->ABER y=0
        new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/1.png', 3.995),
        new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/1.png', 3.995),
        new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/1.png', 3.995)
    ]
);