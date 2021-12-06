import { loadFile } from "../utils";

const LIFESPAN = 9;

const getChilds = (fishes: number[], days: number): number => {
    const fishesPerCycle = [...Array(LIFESPAN)].map((_, i) => fishes.filter(fish => fish === i).length);
    for (let i = 0; i < days; i++) {
        const doneFishes = fishesPerCycle.shift();
        fishesPerCycle.push(doneFishes);
        fishesPerCycle[6] += doneFishes;
    }

    return fishesPerCycle.reduce((acc, curr) => acc + curr, 0);
}

export const lanternfishAmount = (input: string, days: number): number => {
    const file = loadFile(input);
    const lanternFishes: number[] = file[0].split(',').map(Number);

    const result = getChilds(lanternFishes, days);

    return result;
}

