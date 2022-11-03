"use sctrict";

class Pellet {
    constructor({position}) {
        this.position = position;
        this.radius = PELLET_RADIUS;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = PELLET_COLOR;
        ctx.fill();
        ctx.closePath();
    }
}