import { loadFile } from "src/utils"

enum INSTRUCTIONS {
    nop = 0,
    acc = 2,
    jmp = 1,
}

interface Instruction {
    type: INSTRUCTIONS;
    amount: number;
    visited?: boolean;
}

const getInstructionType = (instruction: string): INSTRUCTIONS => {
    switch (instruction) {
        case 'nop':
            return 0;
        case 'jmp':
            return 1;
        default:
            return 2;
    }
}

const getInstructions = (file: string[]): Instruction[] => {
    return file.reduce((acc: Instruction[], curr: string) =>
        acc.concat({
            type: getInstructionType(curr.slice(0, 3)),
            amount: +(curr.match(/[+-]\d+/g)?.[0] || 0),
            visited: false
        }), []);
}
export const getAccum = (instructions: Instruction[]): { loop: boolean, accum: number } => {
    let accum = 0;

    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        if (instruction.visited) {
            return { accum, loop: true };
        }
        instruction.visited = true;
        if (instruction.type === INSTRUCTIONS.acc) {
            accum += instruction.amount;
        } else if (instruction.type === INSTRUCTIONS.jmp) {
            i += instruction.amount - 1;
        }
    }

    return { accum, loop: false };
}

export const searchForLoop = (input: string): number => {
    const file = loadFile(input).filter(line => line.length);

    const instructions = getInstructions(file);

    return getAccum(instructions).accum;
}

export const avoidLoop = (input: string): number => {
    const file = loadFile(input).filter(line => line.length);

    const instructions = getInstructions(file);

    const path = [];
    const visited: number[] = [];

    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        if (visited.includes(i)) {
            break;
        } else {
            visited.push(i);
            if (instruction.type === INSTRUCTIONS.jmp) {
                path.push({ i, instruction });
                i += instruction.amount - 1;
            } else if (instruction.type === INSTRUCTIONS.nop && instruction.amount) {
                path.push({ i, instruction });
            }
        }
    }


    for (const p of path) {
        const modifiedInstructions = JSON.parse(JSON.stringify(instructions));

        modifiedInstructions[p.i].type = +!modifiedInstructions[p.i].type;

        const result = getAccum(modifiedInstructions);

        if (!result.loop) {
            return result.accum;
        }
    }
    

    return 0;
}
