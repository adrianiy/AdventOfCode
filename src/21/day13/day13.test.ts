import { foldPaper, fullFoldPaper } from './day13';

const code = `
#####
#...#
#...#
#...#
#####
.....
.....
`;

test('test first fold', () => {
    const input = './21/day13/input_test.txt';
    const fold = foldPaper(input);
    const fullFold = fullFoldPaper(input);

    expect(fold).toEqual(17)
    expect(code.trim()).toEqual(fullFold);
});

test('test first fold result', () => {
    const input = './21/day13/input.txt';
    const fold = foldPaper(input);
    const fullFold = fullFoldPaper(input);

    //console.log(fold);
    //console.log(fullFold);
    expect(fold).toBeDefined();
    expect(fullFold).toBeDefined();
});
