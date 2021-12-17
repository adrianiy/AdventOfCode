import { loadFile } from "src/utils"

const toBinary = (hex: string): string => parseInt(hex, 16).toString(2).padStart(4, '0');
const toInt = (bin: string[]): number => parseInt(bin.join(''), 2);

const processValues = (values: number[], typeId: number): number => {
    switch (typeId) {
        case 0:
            return values.reduce((acc, curr) => acc + curr, 0);
        case 1:
            return values.reduce((acc, curr) => acc * curr, 1);
        case 2:
            return Math.min(...values);
        case 3:
            return Math.max(...values);
        case 5:
            return +(values[0] > values[1]);
        case 6:
            return +(values[0] < values[1]);
        case 7:
            return +(values[0] === values[1])
        default:
            return 0;
    }
}
const processSubpackage = (file: string[], numberOfSubpackets: number): [number, number[]] => {
    let versions = 0;
    const values = [];

    while (file.length) {
        const version = toInt(file.splice(0, 3));
        const typeId = toInt(file.splice(0, 3));
        const isLiteral = typeId === 4;

        versions += version;

        if (!isLiteral) {
            let packetVersions, packetValues;
            const lengthId = toInt(file.splice(0, 1));

            if (lengthId) {
                const subpackets = toInt(file.splice(0, 11));
                [packetVersions, packetValues] = processSubpackage(file, subpackets);
            } else {
                const length = toInt(file.splice(0, 15));
                const subpackets = file.splice(0, length);
                [packetVersions, packetValues] = processSubpackage(subpackets, Infinity);

            }
            versions += packetVersions;
            values.push(processValues(packetValues, typeId));
        } else {
            let last = false;
            const value = [];

            while (!last) {
                const label = file.splice(0, 5);
                value.push(...label.slice(1));
                last = !toInt([label[0]]);
            }
            values.push(toInt(value));

        }

        numberOfSubpackets -= 1;

        if (numberOfSubpackets === 0) {
            break;
        }
    }

    return [versions, values];
}
export const decrypt = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(row => row.split('').map(toBinary)).flat().join('').split('');

    return processSubpackage(file, Infinity)[0];
}

export const decryptValues = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(row => row.split('').map(toBinary)).flat().join('').split('');

    return processSubpackage(file, Infinity)[1][0];
}
