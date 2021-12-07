import { countBags, countWeightedBags } from './day7';

test('valid bags', () => {
    const input = './20/day7/input_test.txt';
    const result = countBags(input, 'shiny gold');
    const resultTwo = countWeightedBags(input, 'shiny gold');

    expect(result).toEqual(4);
    expect(resultTwo).toEqual(32);
})

test('valid bags result', () => {
    const input = './20/day7/input.txt';
    const result = countBags(input, 'shiny gold');
    const resultTwo = countWeightedBags(input, 'shiny gold');

    //console.log(result);
    //console.log(resultTwo);
    expect(result).toBeDefined();
    expect(resultTwo).toBeDefined();
})
