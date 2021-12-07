import { loadFile } from "src/utils"

const fields = [
    /byr:\S+/,
    /iyr:\S+/,
    /eyr:\S+/,
    /hgt:\S+/,
    /hcl:\S+/,
    /ecl:\S+/,
    /pid:\S+/,
    /(cid:\S+)?/
];
const fieldsWithSecurity = [
    /byr:(19[2-9]\d|200[0-2])/,
    /iyr:(201\d|2020)/,
    /eyr:(202\d|2030)/,
    /hgt:((1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)/,
    /hcl:#[0-9a-f]{6}/,
    /ecl:(amb|blu|brn|gry|grn|hzl|oth)/,
    /pid:(\d{9,9})\b/,
    /(cid:\S+)?/
];

export const getValidPassports = (input: string): number => {
    const passports = loadFile(input, /\r\n\r\n/);

    return passports.filter(passport => fields.every(regex => RegExp(regex).test(passport))).length;
}

export const getExtraSecurizedPassports = (input: string): number => {
    const passports = loadFile(input, /\r\n\r\n/).filter(line => line.length).map(line => line.replace(/\r\n/, ' '));

    return passports.filter(passport => fieldsWithSecurity.every(regex => RegExp(regex).test(passport))).length;
}
