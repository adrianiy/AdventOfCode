import { getValidPasswords, getValidPasswordsSecond } from './day2';

test('test passwords', () => {
    const input = './20/day2/input_test.txt';
    const result = getValidPasswords(input);
    const resultTwo = getValidPasswordsSecond(input);

    expect(result).toEqual(2);
    expect(resultTwo).toEqual(1);
})

test('exercise results', () => {
    const input = './20/day2/input.txt';
    const result = getValidPasswords(input);
    const resultTwo = getValidPasswordsSecond(input);

    //console.log(result);
    //console.log(resultTwo);
    expect(result).toBeDefined();
    expect(resultTwo).toBeDefined();
})
