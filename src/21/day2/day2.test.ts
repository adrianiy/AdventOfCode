import { getPosition, getPositionWithAim } from './day2';

test('day2 test', () => {
    const input = './21/day2/input_test.txt';
    const direction = getPosition(input);
    const directionWithAim = getPositionWithAim(input);

    expect(direction).toEqual(150);
    expect(directionWithAim).toEqual(900);
})

test('final result',() => {
    const input = './21/day2/input.txt';
    const direction = getPosition(input);
    const directionWithAim = getPositionWithAim(input);

    //console.log(direction);
    //console.log(directionWithAim);

    // exercise done!!! jus logging the results
    expect(direction).toBeDefined();
    expect(directionWithAim).toBeDefined();
})

