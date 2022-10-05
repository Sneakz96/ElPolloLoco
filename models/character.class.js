class Character extends MoveableObject {

    //SET VARIABLE
    speed = 3;

    //TAKEOVER
    world;

    //SOUNDS
    walking_sound = new Audio('./audio/walking.mp3');
    jumping_sound = new Audio('./audio/jump.mp3');
    hurt_sound = new Audio('./audio/hurt.mp3');
    dead_sound = new Audio('./audio/dead.mp3');


    //IMAGES
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_WALK = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    start() {
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                //this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > -100) {
                this.moveLeft();
                this.otherDirection = true;
                //this.walking_sound.play();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                //this.jumping_sound.play(); 
            }

            this.world.camera_x = - this.x + 20;
        }, 20);

        setInterval(() => {
            //this.walking_sound.pause();
            //this.hurt_sound.pause();
            //this.dead_sound.pause();
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                //this.dead_sound.play(); //<--in a timeout  and after ->
                //setTimeout(this.dead_sound.play(), 1000)
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                //this.hurt_sound.play();
            } else if (this.isAboveGround()) {
                //JUMP_ANIMATION
                this.playAnimation(this.IMAGES_JUMP);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    //WALK_ANIMATION    
                    this.playAnimation(this.IMAGES_WALK);
                    //this.walking_sound.play();
                } else if (!this.world.keyboard.LEFT || !this.world.keyboard.RIGHT || !this.world.keyboard.SPACE || !this.world.keyboard.D) {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 100);
    }
}