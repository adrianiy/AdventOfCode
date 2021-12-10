import { checkSyntax, completeSyntax } from './day10';

test('error score, what a shame!', () => {
    const input = '/21/day10/input_test.txt';
    const result = checkSyntax(input);
    const completeResult = completeSyntax(input);

    expect(result).toEqual(26397);
    expect(completeResult).toEqual(288957);
});

test('error score results, what a shame!', () => {
    const input = '/21/day10/input.txt';
    const result = checkSyntax(input);
    const completeResult = completeSyntax(input);

    //console.log(result);
    //console.log(completeResult);
    expect(result).toBeDefined();
    expect(completeResult).toBeDefined();
});
