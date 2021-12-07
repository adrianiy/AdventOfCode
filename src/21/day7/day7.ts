import { loadFile } from "src/utils"

const movementDifference = (array: number[], possibilities: number[]): number[] => {
    return possibilities.map(number =>
        array.map(x => Math.abs(x - number)).reduce((acc, curr) => acc + curr, 0)
    );
}

const getMovementGrowth = (diff: number): number => {
    return (Math.pow(diff, 2) + diff) / 2;
}

const movementDifferenceGrowth = (array: number[], possibilities: number[]): number[] => {
    return possibilities.map(number =>
        array.map(x => getMovementGrowth(Math.abs(number - x))).reduce((acc, curr) => acc + curr, 0)
    );
}

export const optimizePosition = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(line => line.split(',').map(Number)).flat();
    const max = Math.max(...file);

    const difference = movementDifference(file, [...Array(max)].map((_, i) => i));

    return Math.min(...difference);
}

export const optimizePositionImproved = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(line => line.split(',').map(Number)).flat();
    const max = Math.max(...file);

    const difference = movementDifferenceGrowth(file, [...Array(max)].map((_, i) => i));

    return Math.min(...difference);
}
