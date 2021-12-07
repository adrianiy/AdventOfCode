import { getForest, getTrees } from './day3';

test('tree tree tree', () => {
    const input = './20/day3/input_test.txt';
    const result = getTrees(input);
    const resultTwo = getForest(input);

    expect(result).toEqual(7);
    expect(resultTwo).toEqual(336);
})

test('what a forest!', () => {
    const input = './20/day3/input.txt';
    const result = getTrees(input);
    const resultTwo = getForest(input);

    //console.log(result);
    //console.log(resultTwo);
    expect(result).toBeDefined();
    expect(resultTwo).toBeDefined();
})
