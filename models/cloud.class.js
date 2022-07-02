class Cloud extends MoveableObject {
    width = 310;
    height = 250;

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.y = 40;
        this.x = 200 + Math.random() * 500;//Zahl zwischen 200 und 700
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}