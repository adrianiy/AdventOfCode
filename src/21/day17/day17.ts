import { loadFile } from "src/utils";

const sumUntilN = (num: number): number => num * (num + 1) / 2;

const isInRange = (num: number, range: number[], step = 0): boolean => {
    const sum = sumUntilN(num) - sumUntilN(step);

    if (sum > Math.max(...range.map(Math.abs)) && step < num) {
        return isInRange(num, range, step + 1);
    } else {
        return sum >= Math.min(...range.map(Math.abs)) && sum <= Math.max(...range.map(Math.abs));
    }
}

const outOfBounds = (x: number, y: number, maxX: number, maxY: number): boolean => {
    if (x > maxX || y < maxY) {
        return true;
    }
    return false;
}

const inBounds = (x: number, y: number, maxX: number, maxY: number, minX: number, minY: number): boolean => {
    return x <= maxX && x >= minX && y >= maxY && y <= minY;
}

const findPairs = (xTarget: number[], yTarget: number[]): number[][] => {
    const maxX = Math.max(...xTarget);
    const maxY = Math.min(...yTarget);
    const minX = Math.min(...xTarget);
    const minY = Math.max(...yTarget);
    const pairs = [];
    for (let x = 0; x <= maxX; x++) {
        for (let y = maxY; y <= Math.abs(maxY); y++) {
            let currentX = x, currentY = y, stepX = x, stepY = y;

            while (!outOfBounds(currentX, currentY, maxX, maxY)) {
                if (currentX < minX && !stepX) {
                    break;
                }

                if (inBounds(currentX, currentY, maxX, maxY, minX, minY)) {
                    pairs.push([x, y]);
                    break;
                }

                stepY--;
                stepX = Math.max(stepX - 1, 0);
                currentX += stepX;
                currentY += stepY;
            }
        }
    }

    return pairs;
}

export const findBestProbe = (input: string): number => {
    const file = loadFile(input)
        .filter(line => line.length)
        .join('')
        .split(',')
        .map(c => c.split('=')[1].split('..').map(Number));


    const validY = [...Array(Math.max(...file[1].map(Math.abs)))]
        .map((_, i) => i).filter(y => isInRange(y, file[1]));

    return Math.max(...validY.map(sumUntilN));
}

export const findShotCombinations = (input: string): number => {
    const file = loadFile(input)
        .filter(line => line.length)
        .join('')
        .split(',')
        .map(c => c.split('=')[1].split('..').map(Number));


    const pairs = findPairs(file[0], file[1])

    return pairs.length;
}
