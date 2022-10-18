class Level {

    //SET VARIABLE
    level_end_x = 2750;
    
    //TAKEOVER
    chickens;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;

    constructor(chickens, endboss, clouds, backgroundObjects, coins, bottles) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.chickens = chickens;
        this.endboss = endboss;
    }
}