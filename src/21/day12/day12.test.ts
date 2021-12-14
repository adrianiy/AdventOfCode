import { advancedCaveExplore, exploreCaves } from './day12';

test('go through caves', () => {
    const input = './21/day12/input_test.txt';
    const caves = exploreCaves(input);
    const cavesWithRepeat = advancedCaveExplore(input);

    expect(caves).toEqual(226);
    expect(cavesWithRepeat).toEqual(3509);
})

test('result of go through caves', () => {
    const input = './21/day12/input.txt';
    const caves = exploreCaves(input);
    const cavesWithRepeat = advancedCaveExplore(input);

    //console.log(caves)
    //console.log(cavesWithRepeat);
    expect(caves).toBeDefined();
    expect(cavesWithRepeat).toBeDefined();
})
