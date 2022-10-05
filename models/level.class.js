class Level {

    //SET VARIABLE
    level_end_x = 2750;
    
    //TAKEOVER
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;

    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.enemies = enemies;
        this.endboss = endboss;
    }
}