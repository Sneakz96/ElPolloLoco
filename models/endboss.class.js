class Endboss extends MoveableObject {

    //SET VARIABLES
    width = 200;
    height = 200;
    groundPosition = 240;

    //TAKEOVER
    lifepoints;

    //CONDITIONS
    firstContact = false;
    bottleHitsEndboss = false;
    bossDead = false;

    //IMAGES
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G24.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[2]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.y = this.groundPosition;
        this.x = 3000;
        this.lifepoints = 100;
        this.world = world;
        this.moveEndboss();
        this.animateEndboss();
    }



    animateEndboss() {
        let i = 0;
        setInterval(() => {
            if (i <= 7) {
                this.alertEndboss();
            } else if (i > 7 && i <= 15) {
                this.attackingEndboss();
            } else if (i > 15) {
                this.walkingEndboss();
            }
            i++;
            if (world.char.x > 2200 && !this.firstContact) {
                i = 0;
                this.firstContact = true;
            } else if (this.bottleHitsEndboss) {
                this.hurtEndboss();
                this.speed += this.speed * 1.2;
            } else if (this.bossDead) {
                this.endbossDead();
            }
        }, 80);
    }

    moveEndboss() {
        setInterval(() => {
            this.moveLeft();
        }, 10);
    }

    alertEndboss() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    attackingEndboss() {
        this.playAnimation(this.IMAGES_ATTACK);
    }

    walkingEndboss() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    hurtEndboss() {
        this.playAnimation(this.IMAGES_HURT);
        this.bottleHitsEndboss = false;
    }

    endbossDead() {
        this.playAnimation(this.IMAGES_DEAD);
    }
}