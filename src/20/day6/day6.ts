import { loadFile } from "src/utils"

const getAnswerd = (group: string): number => {
    const answers = new Set(group.replace(/[\r\n]+/g, '').split(''));

    return answers.size;
}

const getAllAnswerd = (group: string): number => {
    const participants = group.split(/[\r\n]+/).filter(x => x.length).length;
    const answers = group.replace(/[\r\n]+/g, '').split('');

    const answerCount = answers.reduce((acc: Record<string, number>, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    return Object.values(answerCount).filter(value => value === participants).length    
}

export const getAnsweredQuestions = (input: string): number => {
    const file = loadFile(input, /\r\n\r\n/g).filter(line => line.length);

    return file.reduce((acc, curr) => acc + getAnswerd(curr), 0);
}

export const getAllAnsweredQuestions = (input: string): number => {
    const file = loadFile(input, /\r\n\r\n/g).filter(line => line.length);

    return file.reduce((acc, curr) => acc + getAllAnswerd(curr), 0);
}
