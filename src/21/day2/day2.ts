import { loadFile } from '../utils';

enum Directions {
    forward = 'forward',
    down = 'down',
    up = 'up',
}

export const getPosition = (input: string): number => {
    const  file = loadFile(input);

    const position = { x: 0, y: 0 };

    for (const line of file) {
        const [direction, units] = line.split(' ');

        switch (direction) {
            case Directions.up:
                position.y -= +units;
                break;
            case Directions.down:
                position.y += +units;
                break;
            case Directions.forward:
                position.x += +units;
                break;
            default:
                break;
        }
    }

    return position.y * position.x;
}

export const getPositionWithAim = (input: string): number => {
    const  file = loadFile(input);

    const position = { x: 0, y: 0, aim: 0 };

    for (const line of file) {
        const [direction, units] = line.split(' ');

        switch (direction) {
            case Directions.up:
                position.aim -= +units;
                break;
            case Directions.down:
                position.aim += +units;
                break;
            case Directions.forward:
                position.x += +units;
                position.y += +units * position.aim;
                break;
            default:
                break;
        }
    }

    return position.y * position.x;
}
