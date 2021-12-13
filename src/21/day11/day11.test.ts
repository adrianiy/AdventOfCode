import { getBigFlashes, getFlashes } from './day11';

test('how many octopuses have flashed', () => {
    const input = './21/day11/input_test.txt';
    const flashes = getFlashes(input);
    const firstBigFlash = getBigFlashes(input);

    expect(flashes).toEqual(1656)
    expect(firstBigFlash).toEqual(195);
})

test('how many octopuses have flashed result', () => {
    const input = './21/day11/input.txt';
    const flashes = getFlashes(input);
    const firstBigFlash = getBigFlashes(input);

    //console.log(firstBigFlash);
    //console.log(flashes);
    expect(flashes).toBeDefined();
    expect(firstBigFlash).toBeDefined();
});
