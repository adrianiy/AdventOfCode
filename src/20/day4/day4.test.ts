import { getExtraSecurizedPassports, getValidPassports } from './day4';

test('who will pass', () => {
    const input = './20/day4/input_test.txt';
    const inputFail = './20/day4/input_fail.txt';
    const inputOk = './20/day4/input_ok.txt';
    const result = getValidPassports(input);
    const resultTwo = getExtraSecurizedPassports(input);
    const resultFail = getExtraSecurizedPassports(inputFail);
    const resultOk = getExtraSecurizedPassports(inputOk);

    expect(result).toEqual(2);
    expect(resultTwo).toEqual(2);
    expect(resultFail).toEqual(0);
    expect(resultOk).toEqual(4);
})

test('these shall pass', () => {
    const input = './20/day4/input.txt';
    const result = getValidPassports(input);
    const resultTwo = getExtraSecurizedPassports(input);

    //console.log(resultTwo);
    expect(result).toBeDefined();
    expect(resultTwo).toBeDefined();
})
