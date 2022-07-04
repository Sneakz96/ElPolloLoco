class ThrowableObject extends MoveableObject {

    height = 80;
    width = 60;

    constructor(x, y) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.x = x;
        this.y = y;
        this.trow();
    }

    trow() {
        this.speed_Y = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25)
    }
}