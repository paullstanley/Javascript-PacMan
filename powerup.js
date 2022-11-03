class PowerUp {
    constructor({position}) {
        this.position = position;
        this.radius = POWER_UP_RADIUS;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = POWER_UP_COLOR;
        ctx.fill();
        ctx.closePath();
    }
}