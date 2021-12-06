import { loadFile } from "src/utils"

export const getValidPasswords = (input: string): number => {
    const file = loadFile(input);

    return file.filter(line => line.length).reduce((acc, curr) => {
        const [,min, max, letter, password] = curr.match(/(\d+)-(\d+) (\w): (\w+)/) || [];

        const matches = password.split('').filter((l: string) => letter === l).length;

        return acc + +(matches >= +min && matches <= +max);
    }, 0);
}

export const getValidPasswordsSecond = (input: string): number => {
    const file = loadFile(input);

    return file.filter(line => line.length).reduce((acc, curr) => {
        const [, first, second, letter, password] = curr.match(/(\d+)-(\d+) (\w): (\w+)/) || [];

        const containsFirst = password.split('')[+first - 1] === letter;
        const containsSecond = password.split('')[+second - 1] === letter;
        const justOneMatch = containsFirst && !containsSecond || !containsFirst && containsSecond;

        return acc + +justOneMatch;
    }, 0);
}
