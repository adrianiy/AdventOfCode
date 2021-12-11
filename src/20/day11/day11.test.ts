import { occupiedTwo, ocuppiedSeats } from './day11';

test('test occupied seats', () => {
    const input = './20/day11/input_test.txt';
    const result = ocuppiedSeats(input);
    const resultTwo = occupiedTwo(input);

    expect(result).toEqual(37);
    expect(resultTwo).toEqual(26);
})

test('test occupied seats results', () => {
    const input = './20/day11/input.txt';
    const result = ocuppiedSeats(input);
    const resultTwo = occupiedTwo(input);

    //console.log(result);
    //console.log(resultTwo);
    expect(result).toBeDefined();
    expect(resultTwo).toBeDefined();
})
