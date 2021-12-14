import { loadFile } from "src/utils"

interface Rule {
    from: string[];
    to: string;
}

const count = (polymer: Record<string, number>, rules: Record<string, Rule>): number => {
    const letters = Object.keys(polymer).reduce((acc: Record<string, number>, curr) => {
        const rule = rules[curr];
        if (rule) {
            acc[rule.from[0]] = (acc[rule.from[0]] || 0) + polymer[curr];
            acc[rule.to] = (acc[rule.to] || 0) + polymer[curr];
        } else {
            acc[curr] = (acc[curr] || 0) + polymer[curr];
        }

        return acc;
    }, {});

    const max = Math.max(...Object.values(letters));
    const min = Math.min(...Object.values(letters));

    return max - min;
};

export const polymerize = (input: string, steps: number): number => {
    const file = loadFile(input).filter(line => line.length);
    const rules: Record<string, Rule> = {};
    let pairs: Record<string, number> = {};

    file.slice(1).map(r => {
        const [pair, add] = r.split(' -> ');

        rules[pair] = {
            from: pair.split(''),
            to: add
        };
    });
    const start = file[0].split('');
    const last = start.slice(-1)[0];

    for (let i = 1; i < start.length; i++) {
        const pair = `${start[i - 1]}${start[i]}`;
        pairs[pair] = 1;
    }

    for (let i = 1; i < steps; i++) {
        const activeRules = Object.keys(pairs);
        const newPairs: Record<string, number> = {};

        for (const ruleKey of activeRules) {
            const count = pairs[ruleKey];
            const rule = rules[ruleKey];

            const pairOne = `${rule.from[0]}${rule.to}`;
            const pairTwo = `${rule.to}${rule.from[1]}`;

            newPairs[pairOne] = (newPairs[pairOne] || 0) + count;
            newPairs[pairTwo] = (newPairs[pairTwo] || 0) + count;
        }
        pairs = newPairs;
    }

    return count({ ...pairs, [last]: 1 }, rules);
}
