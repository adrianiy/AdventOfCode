import { loadFile } from "../utils";

const getDirection = (x: number, x2: number): number => {
    return x > x2 ? -1 : 1;
}

const getCoordinates = (lines: string[], includeDiagonal?: boolean): Record<string, number> => {
    const map: Record<string, number> = {};

    lines.map(line => {
        const [x, y, x2, y2] = line.match(/\d+/g)?.map(Number) || [];

        if (x === x2 || y === y2) {
            for (let i = Math.min(x, x2); i <= Math.max(x, x2); i++) {
                for (let j = Math.min(y, y2); j <= Math.max(y, y2); j++) {
                    const key = `${i},${j}`;
                    map[key] = (map[key] || 0) + 1;
                }
            }
        } else if (includeDiagonal) {
            const diagonal = Math.abs(x - x2);
            const xDirection = getDirection(x, x2);
            const yDirection = getDirection(y, y2);
            for (let i = 0; i <= diagonal; i++) {
                const key = `${x + (i * xDirection)},${y + (i * yDirection)}`;
                map[key] = (map[key] || 0) + 1;
            }
        }

    });

    return map;
}

export const parseHydrothermalVents = (input: string, includeDiagonal?: boolean): number => {
    const file = loadFile(input);
    const coord = getCoordinates(file, includeDiagonal);

    const overlaps = Object.values(coord).filter(x => x > 1).length;

    return overlaps;
}

