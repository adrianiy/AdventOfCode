import fs from 'fs';
import path from 'path';


export const getIncremental = (input: string): number => {
    const file = fs.readFileSync(path.join(__dirname, input), 'utf-8').split(/\r?\n/);

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
    const file = fs.readFileSync(path.join(__dirname, input), 'utf-8').split(/\r?\n/);
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


const increased = getIncremental('./input.txt');
console.log(increased);

const windowIncrease = getIncrementalWindow('./input.txt')
console.log(windowIncrease);
