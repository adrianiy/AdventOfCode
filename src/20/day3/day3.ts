import { loadFile } from "src/utils";

interface Slope {
    right: number;
    down: number;
}

interface Point {
    row: number;
    column: number;
}

const lookForTrees = (array: string[][], point: Point, slope: Slope): number => {
    const { row, column } = point;
    const { right, down } = slope;

    if (!array[row]) {
        return 0;
    }
    const isTree = array[row][column] === '#';
    const columns = array[0].length;

    return +isTree + lookForTrees(array, { row: row + down, column: (column + right) % columns }, slope);
}

export const getTrees = (input: string): number => {
    const file = loadFile(input);

    return lookForTrees(file.map(row => row.split('')), { row: 1, column: 3 }, { right: 3, down: 1 });
}

export const getForest = (input: string): number => {
    const file = loadFile(input).map(row => row.split(''));

    return [
        { right: 1, down: 1 },
        { right: 3, down: 1 },
        { right: 5, down: 1 },
        { right: 7, down: 1 },
        { right: 1, down: 2 }
    ].reduce((acc, curr) => acc * lookForTrees(file, { row: curr.down, column: curr.right }, curr), 1);
}
