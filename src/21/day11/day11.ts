import { loadFile } from "src/utils"

const DIRECTIONS = [-11, -10, -9, -1, 1, 9, 10, 11];
const DIRECTIONS_ROW_START = [-10, -9, 1, 10, 11];
const DIRECTIONS_ROW_END = [-11, -10, -1, 9, 10];
Object.defineProperty(Array.prototype, 'chunk', {
    value: function(chunkSize: number) {
        const R = [];
        for (let i = 0; i < this.length; i += chunkSize)
            R.push(this.slice(i, i + chunkSize));
        return R;
    }
});

const getDirections = (index: number): number[] => {
    switch (index % 10) {
        case 0:
            return DIRECTIONS_ROW_START;
        case 9:
            return DIRECTIONS_ROW_END;
        default:
            return DIRECTIONS;
    }
}

const flashOctopus = (octopuses: number[], index: number, used: number[]): number[] => {
    const directions = getDirections(index);

    for (const direction of directions) {
        if (octopuses[index + direction] >= 0 && !used.includes(index + direction)) {
            if ((octopuses[index + direction] += 1) >= 10) {
                octopuses[index + direction] = 0;
                used = flashOctopus(octopuses, index + direction, [...used, index + direction]);
            }
        }
    }
    return used;
}

const iterateCavern = (octopuses: number[], flashes: number, steps: number): number => {
    let used: number[] = [];
    for (const [index] of octopuses.entries()) {
        if (!used.includes(index) && !(octopuses[index] = (octopuses[index] + 1) % 10)) {
            used = flashOctopus(octopuses, index, [...used, index]);
        }
    }
    if (steps === 0) {
        return flashes + used.length;
    } else {
        return iterateCavern(octopuses, flashes + used.length, steps - 1);
    }
}

const searchSimulteneousFlash = (octopuses: number[], step: number): number => {
    let used: number[] = [];
    for (const [index] of octopuses.entries()) {
        if (!used.includes(index) && !(octopuses[index] = (octopuses[index] + 1) % 10)) {
            used = flashOctopus(octopuses, index, [...used, index]);
        }
    }

    if (used.length === octopuses.length) {
        return step;
    }
        
    return searchSimulteneousFlash(octopuses, step + 1);
}

export const getFlashes = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(row => row.split('').map(Number)).flat();

    return iterateCavern(file, 0, 99);
}

export const getBigFlashes = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(row => row.split('').map(Number)).flat();

    return searchSimulteneousFlash(file, 1);
}
