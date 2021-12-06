import { getIncremental, getIncrementalWindow } from "./day1"

test('day1 test yeah!', () => {
    const input = './21/day1/input_test.txt';
    const incremental = getIncremental(input);
    const result = getIncrementalWindow(input);

    expect(incremental).toEqual(7);
    expect(result).toEqual(5)
});

test('day1 results yeah!', () => {
    const input = './21/day1/input.txt';
    const incremental = getIncremental(input);
    const result = getIncrementalWindow(input);


    expect(incremental).toBeDefined();
    expect(result).toBeDefined();
});
