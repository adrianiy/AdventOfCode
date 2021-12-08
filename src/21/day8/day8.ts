import { loadFile } from "src/utils"

const DIGITS: Record<number, number> = {
    1: 2,
    4: 4,
    7: 3,
    8: 7,
}

export const findDigits = (input: string, digits: number[]): number => {
    const file = loadFile(input).filter(line => line.length);

    const outputs = file.map(row => row.split(' | ')[1].split(' ').map(output => output.length));

    return outputs.map(output =>
        output?.reduce((acc, curr) =>
            acc + +digits.some(d => DIGITS[d] === curr), 0) || 0
    ).reduce((acc, curr) => acc + curr, 0);
}

export const findOutputs = (input: string): number => {
    const file = loadFile(input).filter(line => line.length);
    let sum = 0;

    for (const line of file) {
        const [inputs, outputs] = line.split(' | ').map(x => x.split(' ').map(w => w.split('').sort().join('')));
        const segments: string[] = [...Array(10)];

        for (const segment of [1, 4, 7, 8]) {
            segments[segment] = inputs.find(i => i.length === DIGITS[segment])!;
        }
        segments[3] = inputs.find(i => i.length === 5 && segments[7]?.split('').every(l => i.includes(l)))!;
        segments[9] = inputs.find(i => i.length === 6 && segments[4]?.split('').every(l => i.includes(l)))!;
        segments[5] = inputs.find(i => i.length === 5 && i.split('').every(l => segments[9].includes(l)) && !segments.includes(i))!;
        segments[2] = inputs.find(i => i.length === 5 && !segments.includes(i))!;
        segments[6] = inputs.find(i => i.length === 6 && segments[5]?.split('').every(l => i.includes(l)) && !segments.includes(i))!;
        segments[0] = inputs.find(i => i.length === 6 && !segments.includes(i))!;

        sum += +outputs.map(output => {
            const match = segments.findIndex(segment => segment === output);

            return match;
        }).join('')
    }
    return sum;
}

