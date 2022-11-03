"use sctrict";
class Map {
    layout;
    constructor(layout) {
        layout.forEach((row, column)=> {
            row.forEach((symbol, value) => {
                switch (symbol) {
                    case '-': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_WIDTH * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/pipeHorizontal.png')
                        })
                    );
                        break
                    case '|': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/pipeVertical.png')
                        })
                    );
                        break
                    case '1': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/pipeCorner1.png')
                        })
                    );
                        break
                    case '2': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/pipeCorner2.png')
                        })
                    );
                        break
                    case '3': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/pipeCorner3.png')
                        })
                    );
                        break
                    case '4': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/pipeCorner4.png')
                        })
                    );
                        break
                    case 'b': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/block.png')
                        })
                    );
                        break
                    case '[': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/capLeft.png')
                        })
                    );
                        break
                    case ']': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/capRight.png')
                        })
                    );
                        break
                    case '_': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/capBottom.png')
                        })
                    );
                        break
                    case '^': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/capTop.png')
                        })
                    );
                        break
                    case '+': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/pipeCross.png')
                        })
                    );
                        break
                    case '5': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/pipeConnectorTop.png')
                        })
                    );
                        break
                    case '6': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/pipeConnectorRight.png')
                        })
                    );
                        break
                    case '7': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/pipeConnectorBottom.png')
                        })
                    );
                        break
                    case '8': 
                    boundries.push(
                        new Boundry({
                            position: {
                                x: BOUNDRY_HEIGHT * value,
                                y: BOUNDRY_HEIGHT * column
                            },
                            image: createImage('./assets/pipeConnectorLeft.png')
                        })
                    );
                        break
                    case '.': 
                    pellets.push(
                        new Pellet({
                            position: {
                                x: BOUNDRY_HEIGHT * value + BOUNDRY_HEIGHT/2,
                                y: BOUNDRY_HEIGHT * column + BOUNDRY_HEIGHT/2
                            }
                        })
                    );
                        break
                    case 'p': 
                    powerUps.push(
                        new PowerUp({
                            position: {
                                x: BOUNDRY_HEIGHT * value + BOUNDRY_HEIGHT/2,
                                y: BOUNDRY_HEIGHT * column + BOUNDRY_HEIGHT/2
                            }
                        })
                    );
                        break
                }
            });
        });
    }
}