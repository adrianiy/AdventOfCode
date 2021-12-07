import { loadFile } from "src/utils"

interface Bags {
    [key: string]: {
        bag: string;
        quantity: number;
    }[];
}

const concatBags = (rules: string[]): Record<string, string[]> => {
    return rules.reduce((acc: Record<string, string[]>, curr) => {
        const [main, ...bags] = curr.replace(/ \d |\.| bag(s?) ?/g, '').split(/contain|,/g);

        acc[main] = bags;

        return acc;
    }, {})
}

const concatWeightedBags = (rules: string[]): Bags => {
    return rules.reduce((acc: Bags, curr) => {
        const [main, ...bags] = curr.replace(/\.| bag(s?) ?/g, '').split(/contain|,/g);
        acc[main] = [];
        bags.forEach(bag => {
            acc[main].push({
                bag: bag.replace(/ ?\d ?/g, ''),
                quantity: +bag.replace(/\D+/g, '').trim()
            });
        });
        return acc;
    }, {})
}

const checkInBags = (bag: string, values: string[], bags: Record<string, string[]>): number => {
    const inBag = values?.includes(bag);

    if (inBag) {
        return 1;
    } else {
        return 0 + +values?.some(v => checkInBags(bag, bags[v], bags));
    }
}
const checkInWeightedBags = (bag: string, bags: Bags): number => {
    return bags[bag]?.reduce((acc, value) => {
        return acc + value.quantity + value.quantity*checkInWeightedBags(value.bag, bags);
    }, 0) || 0;
}
export const countBags = (input: string, bag: string): number => {
    const rules = loadFile(input).filter(line => line.length);
    const bags = concatBags(rules);

    return Object.values(bags).reduce((acc, curr) => acc + checkInBags(bag, curr, bags), 0);
}

export const countWeightedBags = (input: string, bag: string): number => {
    const rules = loadFile(input).filter(line => line.length);
    const bags = concatWeightedBags(rules);

    return checkInWeightedBags(bag, bags);
}
