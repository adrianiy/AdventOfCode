import { loadFile } from "src/utils";

const getBoards = (boardsRaw: string[]): string[][][] => {
    const boards = [];
    while (boardsRaw.length) {
        boards.push(
            boardsRaw.splice(0, 5)
                .map(row =>
                    row
                        .split(' ')
                        .filter(el => el.length)
                )
        );
    }

    return boards;
}

const checkWinner = (board: string[][], row: number, column: number): boolean => {
    const matches: number[] = Array(5).fill(0).reduce((acc, _, index) => {
        acc[0] += board[row][index].includes('_');
        acc[1] += board[index][column].includes('_');

        return acc;
    }, [0, 0]);

    return matches.some(direction => direction === 5);
}

const parseBoard = (board: string[][], number: number): boolean => {
    return board.some((row, index) => {
        return row.some((element, column) => {
            if (+element === number) {
                board[index][column] = `_${element}`;

                return checkWinner(board, index, column);
            }
        })
    });
}

const getPrize = (board: string[][], number: number): number => {
    const nonMatching = board
        .flat()
        .reduce((acc, curr) => acc + (+curr || 0), 0);
    return nonMatching * +number;
}

export const bingo = (input: string): number => {
    const file = loadFile(input);
    const numbers = file[0].split(',');
    const boards = getBoards(file.slice(1).filter(row => row.length));


    for (const number of numbers) {
        for (const board of boards) {
            if (parseBoard(board, +number)) {
                return getPrize(board, +number);
            }
        }
    }

    return 0;
}

export const bingoForLosers = (input: string): number => {
    const file = loadFile(input);
    const numbers = file[0].split(',');
    const boards = getBoards(file.slice(1).filter(row => row.length));

    let winnerValue = 0;

    for (const number of numbers) {
        boards.forEach((board, index: number) => {
            if (parseBoard(board, +number)) {
                winnerValue = getPrize(board, +number);
                boards[index] = [];
            }
        })
    }

    return winnerValue;
}
