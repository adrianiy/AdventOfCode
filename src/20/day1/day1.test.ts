import { findCorrectSum, findCorrectSumOfThree } from './day1';

test('que dise la hente!', () => {
    const input = './20/day1/input_test.txt';
    const result = findCorrectSum(input);
    const three = findCorrectSumOfThree(input);

    expect(result).toEqual(514579);
    expect(three).toEqual(241861950);
})

test('exercise results', () => {
    const input = './20/day1/input.txt';
    const result = findCorrectSum(input);
    const three = findCorrectSumOfThree(input);

    //console.log(result);
    //console.log(three);
    expect(result).toBeDefined();
    expect(three).toBeDefined();
})
