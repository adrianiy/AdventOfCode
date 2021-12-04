import { getLifeSupport, getPowerConsumption } from './day3';

test('day3 test :smile:', () => {
    const input = './day3/input_test.txt';
    const result = getPowerConsumption(input);
    const life = getLifeSupport(input);

    expect(result).toEqual(198);
    expect(life).toEqual(230);
});

test('day3 results', () => {
    const input = './day3/input.txt';
    const power = getPowerConsumption(input);
    const life = getLifeSupport(input);

    //console.log(power);
    //console.log(life);
    expect(power).toBeDefined();
    expect(life).toBeDefined();
})
