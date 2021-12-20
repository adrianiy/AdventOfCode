import { findBestProbe, findShotCombinations } from './day17';

test('check better shot test', () => {
    const input = './21/day17/input_test.txt';
    const shot = findBestProbe(input);
    const combinations = findShotCombinations(input);

    expect(shot).toEqual(45);
    expect(combinations).toEqual(112);
})

test('check better shot result', () => {
    const input = './21/day17/input.txt';
    const shot = findBestProbe(input);
    const combinations = findShotCombinations(input);

    //console.log(shot);
    console.log(combinations)
    expect(shot).toBeDefined();
    expect(combinations).toBeDefined();
})
