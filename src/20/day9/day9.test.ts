import { getInvalidInput, getWeakness } from './day9';

test('valid bags', () => {
    const input = './20/day9/input_test.txt';
    const result = getInvalidInput(input, 5);
    const weakness = getWeakness(input, 5);

    expect(result).toEqual(127);
    expect(weakness).toEqual(62);
})

test('valid bags solution', () => {
    const input = './20/day9/input.txt';
    const result = getInvalidInput(input, 25);
    const weakness = getWeakness(input, 25);

    //console.log(result)
    //console.log(weakness);
    expect(result).toBeDefined();
    expect(weakness).toBeDefined();
})
