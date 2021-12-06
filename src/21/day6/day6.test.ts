import { lanternfishAmount } from './day6';

test('how many lanternfishes do we have???', () => {
    const input = './day6/input_test.txt';

    const result = lanternfishAmount(input, 80);

    expect(result).toEqual(5934);
});

test('get exercise results', () => {
    const input = './day6/input.txt';
    //const result = lanternfishAmount(input, 80);
    const invasion = lanternfishAmount(input, 256);

    //console.log(result);
    console.log(invasion);
    //expect(result).toBeDefined();
    expect(invasion).toBeDefined();
})
