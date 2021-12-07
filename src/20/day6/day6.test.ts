import { getAllAnsweredQuestions, getAnsweredQuestions } from './day6';

test('yes answers',() => {
    const input = './20/day6/input_test.txt';
    const result = getAnsweredQuestions(input);
    const resultTwo = getAllAnsweredQuestions(input);

    expect(result).toEqual(11);
    expect(resultTwo).toEqual(6);
})

test('yes solution',() => {
    const input = './20/day6/input.txt';
    const result = getAnsweredQuestions(input);
    const resultTwo = getAllAnsweredQuestions(input);
    //console.log(result);

    //console.log(resultTwo);
    expect(result).toBeDefined();
    expect(resultTwo).toBeDefined();
})
