class Level {

    level_end_x = 2750;
    
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;

    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.enemies = enemies;
    }

    startLevel() {
        this.enemies.forEach(enemy => {
            enemy.animate();
        });
        this.clouds.forEach(cloud => {
            cloud.animate();
        });
    }
}