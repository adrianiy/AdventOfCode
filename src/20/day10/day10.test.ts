import { getAllPermutations, getJoltDifference } from './day10';

test('get differences', () => {
    const input = './20/day10/input_test.txt';
    const result = getJoltDifference(input);
    const perms = getAllPermutations(input);

    //expect(result).toEqual(220);
    expect(perms).toEqual(19208);
})

test('get differences results', () => {
    const input = './20/day10/input.txt';
    const result = getJoltDifference(input);
    const perms = getAllPermutations(input);

    //console.log(result);
    //console.log(perms);
    expect(result).toBeDefined();
})
