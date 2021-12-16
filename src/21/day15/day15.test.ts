import { fullPathSearch, pathSearch } from './day15';

test('Astar path search test', () => {
    const input = './21/day15/input_test.txt';
    const bestPath = pathSearch(input);
    const fullPath = fullPathSearch(input);

    expect(bestPath).toEqual(40);
    expect(fullPath).toEqual(315);
})

test('Astar path search result', () => {
    const input = './21/day15/input.txt';
    const bestPath = pathSearch(input);
    const fullPath = fullPathSearch(input);

    //console.log(fullPath)
    expect(bestPath).toBeDefined();
    expect(fullPath).toBeDefined();
})
