import { findDigits, findOutputs } from './day8';

test('how many times digits appear?', () => {
    const input = './21/day8/input_test.txt';
    const result = findDigits(input, [1, 4, 7, 8]);
    const resultTwo = findOutputs(input);

    expect(result).toEqual(26);
    expect(resultTwo).toEqual(61229);
})

test('how many times digits appear? solution', () => {
    const input = './21/day8/input.txt';
    const result = findDigits(input, [1, 4, 7, 8]);
    const resultTwo = findOutputs(input);

    //console.log(result);
    //console.log(resultTwo);
    expect(result).toBeDefined();
    expect(resultTwo).toBeDefined();
})
