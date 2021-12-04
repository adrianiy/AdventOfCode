import { getIncremental, getIncrementalWindow } from "./day1"

test('day1 test yeah!', () => {
    const incremental = getIncremental('./test_input.txt');

    expect(incremental).toEqual(7);
})

test('day1 part two tururu', () => {
    const result = getIncrementalWindow('./test_input.txt');

    expect(result).toEqual(5);
})
