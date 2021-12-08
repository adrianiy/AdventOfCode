import { avoidLoop, searchForLoop } from './day8';

test('valid bags', () => {
    const input = './20/day8/input_test.txt';
    const result = searchForLoop(input);
    const resultTwo = avoidLoop(input);

    expect(result).toEqual(5);
    expect(resultTwo).toEqual(8);
})

test('valid bags result', () => {
    const input = './20/day8/input.txt';
    const result = searchForLoop(input);
    const resultTwo = avoidLoop(input);

    //console.log(result);
    //console.log(resultTwo);
    expect(result).toBeDefined();
    expect(resultTwo).toBeDefined();
})
