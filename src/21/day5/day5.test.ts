import { parseHydrothermalVents } from './day5';

test('get overlaping lines', () => {
    const input = './21/day5/input_test.txt';
    const result = parseHydrothermalVents(input);
    const resultWithDiagonal = parseHydrothermalVents(input, true);

    expect(result).toEqual(5);
    expect(resultWithDiagonal).toEqual(12);
})

test('get aoc result', () => {
    const input = './21/day5/input.txt';
    const result = parseHydrothermalVents(input);
    const resultWithDiagonal = parseHydrothermalVents(input, true);

    //console.log(result);
    //console.log(resultWithDiagonal);
    expect(result).toBeDefined();
    expect(resultWithDiagonal).toBeDefined();
})
