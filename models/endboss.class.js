class Endboss extends MoveableObject {

    //SET VARIABLES
    width = 200;
    height = 200;

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
        this.y = 220;
        this.x = 3000;
        this.lifepoints = 100;
        this.animateEndboss();
        this.moveEndboss();
    }



    animateEndboss() {
        setInterval(() => {
            if (this.lifepoints == 0) {
                this.endbossDead();
                console.log('dead');

            } else if (this.bottleHitsEndboss) {
                this.hurtEndboss();
                console.log('hurt');

            } else if (this.firstContact) {
                this.playAnimation(this.IMAGES_ATTACK);
                console.log('attack');

            } else if (this.speed > 0) {
                this.walkingEndboss();

            } else if (this.lifepoints == 80) {
                this.playAnimation(this.IMAGES_ALERT);
                console.log('first contact');
                
            }
        }, 60);
    }

    moveEndboss() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
    
    walkingEndboss(){
        this.playAnimation(this.IMAGES_WALKING);
    }

    hurtEndboss() {
        this.playAnimation(this.IMAGES_DAMAGE);
        setTimeout(() => {
            this.bottleHitsEndboss = false;
        }, 1500);
    }

    endbossDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.endbossDead = true;
    }
}