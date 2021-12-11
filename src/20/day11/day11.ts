import { loadFile } from "src/utils"
const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1]
]

const iterateSeats = (seatRows: string[][]): string[][] => {
    let modified = false;
    do {
        modified = false;
        seatRows = seatRows.map((seats, row: number) =>
            seats.map((seat, column: number) => {
                const isEmpty = seat === 'L';
                const isDot = seat === '.';
                const freeSeats = DIRECTIONS.filter(([dirRow, dirCol]) =>
                    ['L', '.', undefined].includes(seatRows[row + dirRow]?.[column + dirCol])
                ).length;

                if (isEmpty && freeSeats === 8) {
                    modified = true;
                    return '#';
                } else if (!isEmpty && !isDot && freeSeats <= 4) {
                    modified = true;
                    return 'L';
                } else {
                    return seat;
                }
            })
        );
    } while (modified);

    return seatRows;
}

const iterateAdjacents = (seatRows: string[][], direction: number[], i: number, j: number): number => {
    const newRow = i + direction[0];
    const newCol = j + direction[1];
    const element = seatRows[newRow]?.[newCol];

    if (element === '.') {
        return iterateAdjacents(seatRows, direction, newRow, newCol);
    } else {
        return +(element === '#');
    }
}
const iterateSeatsTwo = (seatRows: string[][]): string[][] => {
    let modified = false;
    do {
        modified = false;
        seatRows = seatRows.map((seats, row: number) =>
            seats.map((seat, column: number) => {
                const isEmpty = seat === 'L';
                const isDot = seat === '.';
                const occupied = DIRECTIONS.reduce((acc, curr) => acc + iterateAdjacents(seatRows, curr, row, column), 0);

                if (isEmpty && !occupied) {
                    modified = true;
                    return '#';
                } else if (!isEmpty && !isDot && occupied >= 5) {
                    modified = true;
                    return 'L';
                } else {
                    return seat;
                }
            })
        );
    } while (modified);

    return seatRows;
}
export const ocuppiedSeats = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(row => row.split(''));
    const modifiedSeats = iterateSeats(file);

    return modifiedSeats.flat().filter(x => x === '#').length;
}

export const occupiedTwo = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(row => row.split(''));
    const modifiedSeats = iterateSeatsTwo(file);

    return modifiedSeats.flat().filter(x => x === '#').length;
}
