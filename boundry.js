class Boundry {
    static width = BOUNDRY_WIDTH;
    static height = BOUNDRY_HEIGHT;
    constructor({position, image}) {
        this.position = position;
        this.width = BOUNDRY_WIDTH;
        this.height = BOUNDRY_HEIGHT;
        this.image = image;
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
    
}