const BOUNDRY_WIDTH = 40;
const BOUNDRY_HEIGHT = 40;

const PLAYER_RADIUS = 15;
const PLAYER_COLOR = 'yellow';
const PLAYER_START_POS =  {
    x: BOUNDRY_HEIGHT + BOUNDRY_HEIGHT / 2,
    y: BOUNDRY_HEIGHT + BOUNDRY_HEIGHT / 2
};
const PLAYER_START_VELOCITY = {
    x: 0,
    y: 0
};

const GHOST_RADIUS = 15;
GHOST_SPEED = 2;

const PELLET_RADIUS = 3;
PELLET_COLOR = 'white';

const POWER_UP_RADIUS = 8;
POWER_UP_COLOR = 'white'

const POWER_UP_TIME = 5000;

KEYS = {
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
}

const MAP = [
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
