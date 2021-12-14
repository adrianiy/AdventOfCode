import { loadFile } from "src/utils";

class Cave {
    public id: string;
    public small: boolean;
    public start: boolean;
    public end: boolean;
    public caves: Cave[] = [];

    constructor(
        id: string,
        small: boolean,
        start: boolean,
        end: boolean,
    ) {
        this.id = id;
        this.small = small;
        this.start = start;
        this.end = end;
    }

    public addCave(cave: Cave) {
        this.caves.push(cave);
    }
}

const composeCaves = (file: string[][]): Record<string, Cave> => {
    const caves: Record<string, Cave> = {};

    for (const [p1, p2] of file) {
        if (!caves[p1]) {
            caves[p1] = new Cave(p1, p1.toLowerCase() === p1, p1 === 'start', p1 === 'end');
        }
        if (!caves[p2]) {
            caves[p2] = new Cave(p2, p2.toLowerCase() === p2, p2 === 'start', p2 === 'end');
        }
        caves[p1].addCave(caves[p2]);
        caves[p2].addCave(caves[p1]);
    }

    return caves;
}

const navigateCaverns = (cave: Cave, path: string[]): string[] => {
    if (cave.end) {
        return path;
    }
    return cave.caves
        .filter(c => (!c.small || !path.includes(c.id)) && !c.start)
        .reduce((acc: string[], curr) => {
            return acc.concat(navigateCaverns(curr, [...path, curr.id]));
        }, []);
}

const advancedNavigation = (cave: Cave, path: string[], foundTwice: boolean): string[] => {
    if (cave.end) {
        return path;
    }
    return cave.caves
        .filter(c => !c.start)
        .reduce((acc: string[], c) => {
            const matches = path.filter(p => c.id === p);
            if (!c.small || !matches.length) {
                return acc.concat(advancedNavigation(c, [...path, c.id], foundTwice));
            } else {
                if (!foundTwice && matches.length) {
                    return acc.concat(advancedNavigation(c, [...path, c.id], true));
                } else {
                    return acc;
                }
            }
        }, []);
}

export const exploreCaves = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(row => row.split('-'));
    const caves = composeCaves(file);

    return navigateCaverns(caves['start'], [caves['start'].id])
        .join('').split('end')
        .filter(path => path.length).length;
}

export const advancedCaveExplore = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(row => row.split('-'));
    const caves = composeCaves(file);

    return advancedNavigation(caves['start'], [caves['start'].id], false)
        .join('').split('end')
        .filter(path => path.length).length;
}
