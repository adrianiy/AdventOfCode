import { loadFile } from "src/utils"

const DIRECTIONS = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0]
]

const isLowest = (map: number[][], i: number) => (point: number, j: number): number => {
    const lowest = DIRECTIONS.every(([y, x]) => (map[i + y]?.[j + x] ?? Infinity) > point);

    return lowest ? point : -1;
}

const getBasinArea = (map: number[][], i: number, j: number): number => {
    if ([undefined, 9].includes(map[i]?.[j])) {
        return 0;
    } else {
        map[i][j] = 9;
    }

    return DIRECTIONS.reduce((acc, dir) => acc + getBasinArea(map, i + dir[1], j + dir[0]), 1);
}

const getBasin = (map: number[][], i: number) => (point: number, j: number): number => {
    const lowest = DIRECTIONS.every(([y, x]) => (map[i + y]?.[j + x] ?? Infinity) > point);

    return lowest ? getBasinArea(map, i, j) : 0;
}

export const getLowestPoints = (input: string): number => {
    const file = loadFile(input).filter(line => line.length);
    const map = file.map(line => line.split('').map(Number));

    const lowestPoints = map.map((row, i) => row.map(isLowest(map, i)));

    return lowestPoints.flat().reduce((acc, curr) => acc + (curr + 1), 0);
}

export const getBasins = (input: string): number => {
    const file = loadFile(input).filter(line => line.length);
    const map = file.map(line => line.split('').map(Number));

    const lowestPoints = map.map((row, i) => row.map(getBasin(map, i)));

    return lowestPoints.flat().sort((a, b) => a - b).slice(-3).reduce((acc, curr) => acc * curr, 1);
}
