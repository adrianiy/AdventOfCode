import { loadFile } from "src/utils"

const constructPaper = (config: number[][]): string[][] => {
    const max = Math.max(...config.map(r => r[0])) + 1;
    const maxY = Math.max(...config.map(r => r[1])) + 1;

    return config.reduce((acc: string[][], [x, y]) => {
        if (!acc[y]) {
            acc[y] = [...Array(max)].fill('.');
        }
        acc[y][x] = '#';

        return acc;
    }, [...Array(maxY)].map(() => [...Array(max)].fill('.')));
}

const verticalFold = (foldLine: number, paper: string[][]): string[][] => {
    const gap = foldLine * 2;

    for (let i = foldLine+1; i < paper.length; i++) {
        for (let j = 0; j < paper[i]?.length || 0; j++) {
            if (paper[i][j] === '#') {
                if (!paper[gap - i]) {
                    paper[gap - i] = [];
                }
                paper[gap - i][j] = paper[i][j];
            }
        }
    }

    return paper.slice(0, foldLine);

}

const horizontalFold = (foldLine: number, paper: string[][]): string[][] => {
    const max = Math.max(...paper.filter(Boolean).map(r => r?.length || 0));
    const gap = foldLine * 2;

    for (let i = 0; i < paper.length; i++) {
        for (let j = foldLine+1; j < max; j++) {
            if (paper[i]?.[j] === '#') {
                paper[i][gap - j] = paper[i][j];
            }
        }
        if (paper[i]) {
            paper[i] = paper[i].slice(0, foldLine);
        }
    }

    return paper;
}

export const foldPaper = (input: string): number => {
    const file = loadFile(input).filter(line => line.length);
    const instructions = file.filter(line => !line.startsWith('fold')).map(row => row.split(',').map(Number));
    const folds = file.filter(line => line.startsWith('fold')).map(row => row.split(' ')[2].split('='));
    const paper = constructPaper(instructions);
    const fold = folds[0][0] === 'y' ? verticalFold(+folds[0][1], paper) : horizontalFold(+folds[0][1], paper);
    return fold.flat().filter(c => c === '#').length;
}

export const fullFoldPaper = (input: string): string => {
    const file = loadFile(input).filter(line => line.length);
    const instructions = file.filter(line => !line.startsWith('fold')).map(row => row.split(',').map(Number));
    const folds = file.filter(line => line.startsWith('fold')).map(row => row.split(' ')[2].split('='));
    let paper = constructPaper(instructions);
    for (const fold of folds) {
        paper = fold[0] === 'y' ? verticalFold(+fold[1], paper) : horizontalFold(+fold[1], paper);
    }
    return paper.map(row => row.join('')).join('\n');
}
