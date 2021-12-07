import { optimizePosition, optimizePositionImproved } from './day7';

test('get optimal crab position', () => {
    const input = './21/day7/input_test.txt';
    const optimal = optimizePosition(input);
    const optimalTwo = optimizePositionImproved(input);

    expect(optimal).toEqual(37);
    expect(optimalTwo).toEqual(168);
})

test('exercise results', () => {
    const input = './21/day7/input.txt';
    const optimal = optimizePosition(input);
    const optimalTwo = optimizePositionImproved(input);

    //console.log(optimal);
    //console.log(optimalTwo);
    expect(optimal).toBeDefined();
    expect(optimalTwo).toBeDefined();
})
