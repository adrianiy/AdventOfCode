import { loadFile } from "src/utils"

const CLOSERS: Record<string, string> = { ')': '(', ']': '[', '}': '{', '>': '<' };
const VALUES: Record<string, number> = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
const COMPLETE_VALUES: Record<string, number> = { '(': 1, '[': 2, '{': 3, '<': 4 };

const lookForErrors = (rows: string[]): number => {
    return rows.reduce((acc, row) => {
        const found: string[] = [];

        for (const char of row.split('')) {
            if (!CLOSERS[char]) {
                found.push(char);
            } else {
                const opened = found.pop();
                if (CLOSERS[char] !== opened) {
                    return acc + VALUES[char];
                }
            }
        }
        return acc;
    }, 0);
}

const completeLines = (rows: string[]): number[] => {
    return rows.reduce((acc: number[], row) => {
        const found: string[] = [];

        for (const char of row.split('')) {
            if (!CLOSERS[char]) {
                found.push(char);
            } else {
                const opened = found.pop();
                if (CLOSERS[char] !== opened) {
                    return acc;
                }
            }
        }
        if (found.length) {
            return acc.concat(found.reverse().reduce((accum, curr) =>
                (accum * 5) + COMPLETE_VALUES[curr]
                , 0)
            );
        }
        return acc;
    }, []);
}

export const checkSyntax = (input: string): number => {
    const file = loadFile(input).filter(line => line.length);

    return lookForErrors(file);
}

export const completeSyntax = (input: string): number => {
    const file = loadFile(input).filter(line => line.length);

    const scores = completeLines(file);

    return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
}
