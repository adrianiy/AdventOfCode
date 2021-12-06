import { loadFile } from "src/utils";

const pivotArray = (array: string[]): number[][] => {
    return [...Array(array[0].length)].map((_, column) => array.map(row => +row[column]));
}

const getStats = (line: number[]): Record<string, number> => {
    const ones = line.filter(Boolean).length;
    const zeros = line.length - ones;
    const stat = ones >= zeros ? 1 : 0;

    return { mostCommon: +stat, leastCommon: +!stat }
}

export const getPowerConsumption = (input: string): number => {
    const file = loadFile(input);

    const pivotTable = pivotArray(file);
    const gamma = [];
    const epsilon = [];

    for (const line of pivotTable) {
        const { mostCommon, leastCommon } = getStats(line)

        gamma.push(mostCommon);
        epsilon.push(leastCommon);
    }

    return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
}

const parseLife = (array: string[], column: number, check: string): string[] => {
    if (array.length === 1) {
        return array;
    }

    const pivot = pivotArray(array);
    const stats = getStats(pivot[column]);

    return parseLife(
        array.filter(row => +row[column] === stats[check]),
        column + 1,
        check
    );
}

export const getLifeSupport = (input: string): number => {
    const file = loadFile(input);

    const oxygen = parseLife(file, 0, 'mostCommon');
    const co2 = parseLife(file, 0, 'leastCommon');

    return parseInt(oxygen.join(''), 2) * parseInt(co2.join(''), 2);
}
