import { loadFile } from "src/utils"

const findValidPairs = (number: number, preamble: number[]): boolean => {
    const sum = preamble[0] + preamble.slice(-1)?.[0];

    if (!sum) {
        return false
    } else if (sum === number) {
        return true;
    } else if (sum > number) {
        return findValidPairs(number, preamble.slice(0, -1));
    } else {
        return findValidPairs(number, preamble.slice(1));
    }
}

const findCountiguous = (number: number, array: number[], min = 0, max = 2): number[] => {
    const sum = array.slice(min, max).reduce((acc, curr) => acc + curr, 0);

    if (sum === number) {
        return array.slice(min, max);
    } else if (sum < number) {
        return findCountiguous(number, array, min, max + 1);
    } else {
        return findCountiguous(number, array, min + 1, max);
    }
}

export const getInvalidInput = (input: string, threshold: number): number => {
    const file = loadFile(input).filter(line => line.length).map(Number);

    const preamble = file.slice(0, threshold);
    
    for(const number of file.slice(threshold)) {
        if (!findValidPairs(number, [...preamble].sort((a, b) => a - b))) {
            return number;
        }

        preamble.shift();
        preamble.push(number);
    }

    return -1;
}

export const getWeakness = (input: string, threshold: number): number => {
    const file = loadFile(input).filter(line => line.length).map(Number);
    const fail = getInvalidInput(input, threshold);
    const index = file.indexOf(fail);
    const sum = findCountiguous(fail, file.slice(0, index));

    return Math.min(...sum) + Math.max(...sum);
}
