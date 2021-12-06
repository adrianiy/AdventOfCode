import { bingo, bingoForLosers } from './day4';

test('day4 test bingo!', () => {
    const input = './21/day4/input_test.txt';
    const result = bingo(input);
    const loser = bingoForLosers(input);

    expect(result).toEqual(4512);
    expect(loser).toEqual(1924);
})

test('day3 results', () => {
    const input = './21/day4/input.txt';
    const result = bingo(input);
    const loser = bingoForLosers(input);

    //console.log(result);
    //console.log(loser);
    expect(result).toBeDefined();
    expect(loser).toBeDefined();
})
