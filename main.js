// main.js 
"use sctrict";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.querySelector('#scoreEl');

canvas.width = innerWidth;
canvas.height = innerHeight;

let pellets = [];
let powerUps = [];
let boundries = [];
let ghosts = [
    new Ghost({
        position: {
            x: BOUNDRY_HEIGHT * 6 + BOUNDRY_HEIGHT / 2,
            y: BOUNDRY_HEIGHT + BOUNDRY_HEIGHT / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        }
    }),
    new Ghost({
        position: {
            x: BOUNDRY_HEIGHT * 6 + BOUNDRY_HEIGHT / 2,
            y: BOUNDRY_HEIGHT * 3 + BOUNDRY_HEIGHT / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        },
        color: 'pink'
    })
];
const player = new Player({
    position: PLAYER_START_POS,
    velocity: PLAYER_START_VELOCITY
});

let lastKey = '';
let score = 0;

function createImage(src) {
    const image = new Image();
    image.src = src;
    return image;
}

let map = new Map(MAP);

function circleCollidesWithRectangle({
    circle,
    rectangle
}) {
    const padding = BOUNDRY_HEIGHT/2 - circle.radius - 1;

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
    player.animate();

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
                }, POWER_UP_TIME);
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

    
}

animate();

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            KEYS.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            KEYS.a.pressed = true;
            lastKey = 'a';
            break;
        case 's':
            KEYS.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            KEYS.d.pressed = true;
            lastKey = 'd';
            break;
    };
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            KEYS.w.pressed = false;
            break;
        case 'a':
            KEYS.a.pressed = false;
            break;
        case 's':
            KEYS.s.pressed = false;
            break;
        case 'd':
            KEYS.d.pressed = false;
            break;
    };
});

