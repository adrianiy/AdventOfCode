import { loadFile } from "src/utils"

const getDifferences = (array: number[]): number => {
    const groups = array.map((element, index) => array[index + 1] - element).slice(0, -1)
        .join('');
    const threes = groups.split(/1/g).length;
    const ones = groups.split(/3/g).length;

    return threes * ones;
}

const getPermutations = (array: number[]): number => {
    const groups = array.map((element, index) => array[index + 1] - element).slice(0, -1)
        .join('').split(/3/g);
    const five = groups.filter(c => c.length === 5).length;
    const four = groups.filter(c => c.length === 4).length;
    const three = groups.filter(c => c.length === 3).length;
    const two = groups.filter(c => c.length === 2).length;

    return Math.pow(13, five) * Math.pow(7, four + 1) * Math.pow(4, three - 1) * Math.pow(2, two);
}

export const getJoltDifference = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(Number);

    return getDifferences(file.sort((a, b) => a - b));
}

export const getAllPermutations = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(Number);

    const permutations = getPermutations(file.sort((a, b) => a - b));

    return permutations;
}
