import { loadFile } from "src/utils"

const loadNumbers = (input: string): number[] => {
    const file = loadFile(input);
    const numbers = file.map(Number);

    return numbers;
}

export const findCorrectSum = (input: string) => {
    const numbers = loadNumbers(input);

    for (const [index, number] of numbers.entries()) {
        const found = numbers.slice(index).find(n => number + n === 2020);

        if (found) {
            return number * found;
        }
    }
}

const searchSum = (array: number[], used: number[], left: number): number[] => {
    const sum = left - array[0];

    if (sum < 0) {
        return [];
    } else if (sum === 0 && used.length === 3) {
        return used;
    } else {
        return array.map((_, i) => searchSum(array.slice(1 + i), [...used, array[0]], sum)).flat();
    }
}

export const findCorrectSumOfThree = (input: string): number => {
    const numbers = loadNumbers(input);

    for (const index  of numbers.keys()) {
        const found = searchSum(numbers.slice(index), [], 2020);

        if (found.length === 3) {
            return found.reduce((acc, curr) => acc * curr, 1);
        }
    }

    return 0;
}
