"use sctrict";

class Player {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = PLAYER_RADIUS;
        this.radians = 0.75;
        this.openRate = 0.12;
        this.rotation = 0;
    }

    draw() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.translate(-this.position.x, -this.position.y)
        ctx.beginPath();
        ctx.arc(
            this.position.x, 
            this.position.y, 
            this.radius, 
            this.radians, 
            Math.PI * 2 - this.radians
            );
        ctx.lineTo(this.position.x, this.position.y);
        ctx.fillStyle = PLAYER_COLOR;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        
    }

    update() {
        
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.radians < 0 || this.radians > .75) {
            this.openRate = -this.openRate;
        }
        this.radians += this.openRate;
        
    }

    animate() {
        //animationId = requestAnimationFrame(animate);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(KEYS.w.pressed && lastKey == 'w') {
            for (let i = 0; i < boundries.length; i ++)  {
                const boundry = boundries[i];
                if (
                    circleCollidesWithRectangle({
                        circle: {
                            ... player, 
                            velocity: {
                            x: 0,
                            y: -5
                        }
                    },
                        rectangle: boundry
                })
                )  {
                    player.velocity.y = 0;
                    break;
                }  else {
                    player.velocity.y = -5;
                }
            }
        } else if (KEYS.a.pressed && lastKey == 'a') {
            for (let i = 0; i < boundries.length; i ++)  {
                const boundry = boundries[i];
                if (
                    circleCollidesWithRectangle({
                        circle: {
                            ... player, 
                            velocity: {
                            x: -5,
                            y: 0
                        }
                    },
                        rectangle: boundry
                })
                )  {
                    player.velocity.x = 0;
                    break;
                }  else {
                    player.velocity.x = -5;
                }
            }
        } else if (KEYS.s.pressed && lastKey == 's') {
            for (let i = 0; i < boundries.length; i ++)  {
                const boundry = boundries[i];
                if (
                    circleCollidesWithRectangle({
                        circle: {
                            ... player, 
                            velocity: {
                            x: 0,
                            y: 5
                        }
                    },
                    rectangle: boundry
                })
                )  {
                    player.velocity.y = 0;
                    break;
                }  else {
                    player.velocity.y = 5;
                }
            }
        } else if (KEYS.d.pressed && lastKey == 'd') {
            for (let i = 0; i < boundries.length; i ++)  {
                const boundry = boundries[i];
                if (
                    circleCollidesWithRectangle({
                        circle: {
                            ... player, 
                            velocity: {
                            x: 5,
                            y: 0
                        }
                    },
                        rectangle: boundry
                })
                )  {
                    player.velocity.x = 0;
                    break;
                }  else {
                    player.velocity.x = 5;
                }
            }
        }
        if(this.velocity.x > 0) {
            this.rotation = 0;
        } else if(this.velocity.x < 0) {
            this.rotation = Math.PI;
        } else if(this.velocity.y > 0) {
            this.rotation = Math.PI/2;
        } else if(this.velocity.y < 0) {
            this.rotation = Math.PI * 1.5;
        }
    }
}