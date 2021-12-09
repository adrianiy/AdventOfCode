import { getBasins, getLowestPoints } from './day9';

test('lowest numbers', () => {
    const input = './21/day9/input_test.txt';
    const result = getLowestPoints(input);
    const basins = getBasins(input);

    expect(result).toEqual(15);
    expect(basins).toEqual(1134);
})

test('lowest numbers solution', () => {
    const input = './21/day9/input.txt';
    const result = getLowestPoints(input);
    const basins = getBasins(input);

    //console.log(result)
    //console.log(basins)
    expect(result).toBeDefined();
})
