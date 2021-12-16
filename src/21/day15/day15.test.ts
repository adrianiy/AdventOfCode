import { pathSearch } from './day15';

test('Astar path search test', () => {
    const input = './21/day15/input_test.txt';
    const bestPath = pathSearch(input);

    expect(bestPath).toEqual(40);
})
