import { loadFile } from "../utils";

export const getIncremental = (input: string): number => {
    const  file = loadFile(input);

    let increased = 0;
    let prevLine = +file[0];

    for (const line of file) {
        if (+line > prevLine) {
            increased += 1;
        }
        prevLine = +line;
    }

    return increased;
}

export const getIncrementalWindow = (input: string): number => {
    const  file = loadFile(input);
    const accum = [];

    let increased = 0;
    let sum = 0;
    let lastWindow = 0;

    for (const line of file) {
        const number = +line;

        sum += number;
        accum.push(number);

        if (accum.length === 3) {
            const first = accum.shift();

            if (lastWindow && sum > lastWindow) {
                increased += 1;
            } 

            lastWindow = sum;

            sum -= first || 0;
        }
    }

    return increased;
}
