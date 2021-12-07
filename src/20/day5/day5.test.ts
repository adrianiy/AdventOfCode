import { getHighestSeatId, getHighestSeatIdPartTwo } from './day5';

test('what is the highest seat id?', () => {
    const input = './20/day5/input_test.txt';
    const result = getHighestSeatId(input);

    expect(result).toEqual(820)
})

test('exercise result', () => {
    const input = './20/day5/input.txt';
    const result = getHighestSeatId(input);
    const resultTwo = getHighestSeatIdPartTwo(input);

    //console.log(resultTwo);
    expect(result).toBeDefined();
    expect(resultTwo).toBeDefined();
})


