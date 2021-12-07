import { loadFile } from "src/utils";

export const getHighestSeatId = (input: string): number => {
    const file = loadFile(input).filter(line => line.length);
    const ids = file.reduce((acc: number[], curr) => 
        acc.concat(parseInt(curr.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2))
    , [])

    return Math.max(...ids);
}

export const getHighestSeatIdPartTwo = (input: string): number | undefined => {
    const file = loadFile(input).filter(line => line.length);
    const ids = file.reduce((acc: number[], curr) => 
        acc.concat(parseInt(curr.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2))
    , []).sort()

    const freeSeats = ids.filter(id => ids.indexOf(id -1) === -1).map(seat => seat - 1);
    const mySeat = freeSeats.pop();
    return mySeat;
}
