// main.js 
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.querySelector('#scoreEl');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundry {
    static width = 40;
    static height = 40;
    constructor({position, image}) {
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image;
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}

class Player {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
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
        ctx.fillStyle = 'yellow';
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
}

class Ghost {
    static speed = 2;
    constructor({position, velocity, color = 'red'}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.color = color;
        this.speed = 2;
        this.prevCollisions = [];
        this.scared = false;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.scared ? 'blue' : this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Pellet {
    constructor({position}) {
        this.position = position;
        this.radius = 3;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
}

class PowerUp {
    constructor({position}) {
        this.position = position;
        this.radius = 8;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
}

const pellets = [];
const powerUps = [];
const boundries = [];
const ghosts = [
    new Ghost({
        position: {
            x: Boundry.width * 6 + Boundry.width / 2,
            y: Boundry.height + Boundry.height / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        }
    }),
    new Ghost({
        position: {
            x: Boundry.width * 6 + Boundry.width / 2,
            y: Boundry.height * 3 + Boundry.height / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        },
        color: 'pink'
    })
];
const player = new Player({
    position: {
        x: Boundry.width + Boundry.width / 2,
        y: Boundry.height + Boundry.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
};

let lastKey = '';
let score = 0;

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3'],
];

function createImage(src) {
    const image = new Image();
    image.src = src;
    return image;
}


map.forEach((row, column)=> {
    row.forEach((symbol, value) => {
        switch (symbol) {
            case '-': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/pipeHorizontal.png')
                })
            );
                break
            case '|': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/pipeVertical.png')
                })
            );
                break
            case '1': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/pipeCorner1.png')
                })
            );
                break
            case '2': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/pipeCorner2.png')
                })
            );
                break
            case '3': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/pipeCorner3.png')
                })
            );
                break
            case '4': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/pipeCorner4.png')
                })
            );
                break
            case 'b': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/block.png')
                })
            );
                break
            case '[': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/capLeft.png')
                })
            );
                break
            case ']': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/capRight.png')
                })
            );
                break
            case '_': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/capBottom.png')
                })
            );
                break
            case '^': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/capTop.png')
                })
            );
                break
            case '+': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/pipeCross.png')
                })
            );
                break
            case '5': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/pipeConnectorTop.png')
                })
            );
                break
            case '6': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/pipeConnectorRight.png')
                })
            );
                break
            case '7': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/pipeConnectorBottom.png')
                })
            );
                break
            case '8': 
            boundries.push(
                new Boundry({
                    position: {
                        x: Boundry.width * value,
                        y: Boundry.height * column
                    },
                    image: createImage('./assets/pipeConnectorLeft.png')
                })
            );
                break
            case '.': 
            pellets.push(
                new Pellet({
                    position: {
                        x: Boundry.width * value + Boundry.width/2,
                        y: Boundry.height * column + Boundry.height/2
                    }
                })
            );
                break
            case 'p': 
            powerUps.push(
                new PowerUp({
                    position: {
                        x: Boundry.width * value + Boundry.width/2,
                        y: Boundry.height * column + Boundry.height/2
                    }
                })
            );
                break
        }
    });
});

function circleCollidesWithRectangle({
    circle,
    rectangle
}) {
    const padding = Boundry.width/2 - circle.radius - 1;

    return ( circle.position.y - circle.radius + circle.velocity.y<= 
        rectangle.position.y + rectangle.height + padding && 
    circle.position.x + circle.radius + circle.velocity.x >= 
        rectangle.position.x - padding &&
    circle.position.y + circle.radius + circle.velocity.y >= 
        rectangle.position.y - padding &&
    circle.position.x - circle.radius + circle.velocity.x <= 
        rectangle.position.x + rectangle.width + padding)

}

let animationId

function animate() {
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(keys.w.pressed && lastKey == 'w') {
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
    } else if (keys.a.pressed && lastKey == 'a') {
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
    } else if (keys.s.pressed && lastKey == 's') {
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
    } else if (keys.d.pressed && lastKey == 'd') {
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

    // Detect collision between ghosts and player
    for(let i = ghosts.length - 1; 0 <= i; i--) {
        const ghost = ghosts[i];
        // Ghost touches player
        if(
            Math.hypot(
                ghost.position.x - player.position.x, 
                ghost.position.y - player.position.y
            ) <
            ghost.radius + player.radius
            ) {
                if(ghost.scared) {
                    ghosts.splice(i, 1);
                } else {
                    cancelAnimationFrame(animationId);
                    console.log('you lose');
                }
                
            }
    }

    // Win condition
    if(pellets.length === 0) {
        console.log('You win!');
        cancelAnimationFrame(animationId);
    }

    for(let i = powerUps.length - 1; 0 <= i; i--) {
        const powerUp = powerUps[i];
        powerUp.draw();
        // Player collides with powerUp
        if(
            Math.hypot(
                powerUp.position.x - player.position.x, 
                powerUp.position.y - player.position.y
            ) <
            powerUp.radius + player.radius
            ) {
                powerUps.splice(i, 1);
            
                // Makes ghost scared
                ghosts.forEach(ghost => {
                ghost.scared = true;
                setTimeout(() => {
                    ghost.scared = false;
                }, 5000);
            });
        };
    }

    // Touch pellets dissapear 
    for(let i = pellets.length - 1; 0 <= i; i--) {
        const pellet = pellets[i];
        pellet.draw();

        if(
            Math.hypot(
                pellet.position.x - player.position.x, 
                pellet.position.y - player.position.y
            ) <
            pellet.radius + player.radius
            ) {
            pellets.splice(i, 1);
            score += 10;
            scoreEl.innerHTML = score;
        }
    }

    boundries.forEach((boundry) => {
        boundry.draw();
        if(
            circleCollidesWithRectangle({
                circle: player,
                rectangle: boundry
            })
        ) {
            player.velocity.x = 0;
            player.velocity.y = 0;
            }
    });

    player.update();

    ghosts.forEach(ghost => {
        ghost.update();

        const collisions = [];
        boundries.forEach(boundry => {
            if(
                !collisions.includes('right') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: ghost.speed,
                            y: 0
                        }
                    },
                    rectangle: boundry
                })
            ) {
                collisions.push('right');
            };
            if(
                !collisions.includes('left') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: -ghost.speed,
                            y: 0
                        }
                    },
                    rectangle: boundry
                })
            ) {
                collisions.push('left');
            };
            if(
                !collisions.includes('up') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: 0,
                            y: -ghost.speed
                        }
                    },
                    rectangle: boundry
                })
            ) {
                collisions.push('up');
            };
            if(
                !collisions.includes('down') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: 0,
                            y: ghost.speed
                        }
                    },
                    rectangle: boundry
                })
            ) {
                collisions.push('down');
            };
        });
        if(collisions.length > ghost.prevCollisions.length) {
            ghost.prevCollisions = collisions;
        }
        
        if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            if(ghost.velocity.x > 0) {
                ghost.prevCollisions.push('right');
            }
            else if(ghost.velocity.x < 0) {
                ghost.prevCollisions.push('left');
            }
            else if(ghost.velocity.y < 0) {
                ghost.prevCollisions.push('up');
            }
            else if(ghost.velocity.y > 0) {
                ghost.prevCollisions.push('down');
            }
            const pathways = ghost.prevCollisions.filter((collision) => {
                return !collisions.includes(collision);
            });

            const direction = pathways[Math.floor(Math.random() * pathways.length)];


            switch (direction) {
                case 'down':
                    ghost.velocity.y = ghost.speed;
                    ghost.velocity.x = 0;
                    break
                    
                case 'up':
                    ghost.velocity.y = -ghost.speed;
                    ghost.velocity.x = 0;
                    break

                case 'right':
                    ghost.velocity.y = 0;
                    ghost.velocity.x = ghost.speed;
                    break

                case 'left':
                    ghost.velocity.y = 0;
                    ghost.velocity.x = -ghost.speed;
                    break
            }
            ghost.prevCollisions = [];
        }
    });

    if(player.velocity.x > 0) {
        player.rotation = 0;
    } else if(player.velocity.x < 0) {
        player.rotation = Math.PI;
    } else if(player.velocity.y > 0) {
        player.rotation = Math.PI/2;
    } else if(player.velocity.y < 0) {
        player.rotation = Math.PI * 1.5;
    }
}

animate();

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    };
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    };
});

