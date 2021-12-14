import { polymerize } from './day14';

test('polymerize test', () => {
    const input = './21/day14/input_test.txt';
    const result = polymerize(input, 10);
    const resultStrong = polymerize(input, 40);

    expect(result).toEqual(1588);
    expect(resultStrong).toEqual(2188189693529);
})

test('polymerize result', () => {
    const input = './21/day14/input.txt';
    const result = polymerize(input, 10);
    const resultStrong = polymerize(input, 40);

    //console.log(result)
    //console.log(resultStrong)
    expect(result).toBeDefined();
    expect(resultStrong).toBeDefined();
})
