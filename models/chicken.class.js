class Chicken extends MoveableObject {

    IMAGES_WALKING = [
        './img/3.Secuencias_Enemy_b sico/Versi¢n_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        './img/3.Secuencias_Enemy_b sico/Versi¢n_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        './img/3.Secuencias_Enemy_b sico/Versi¢n_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];
    IMAGES_DEAD = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png'
    ];
    bottleHitChicken = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING, this.IMAGES_DEAD);
        this.y = 360;
        this.x = 200 + Math.random() * 2800;//Zahl zwischen 200 und 700

        this.width = 65;
        this.height = 60;

        this.animate();
        this.speed = 1 + Math.random() * 1;
    }

    animate() {
        setInterval(() => {
            if (this.bottleHitChicken) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
}