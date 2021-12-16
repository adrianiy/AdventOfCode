import { loadFile } from "src/utils"
const DIRECTIONS = [
    [0,1],
    [0, -1],
    [1, 0], 
    [-1, 0],
];
interface Node {
    f: number;
    g: number;
    h: number;
    x: number;
    y: number;
    id: string;
    risk: number;
    parent?: Node;
}

const findLowestIdx = (list: Node[]): number => {
    const lower = list.sort((a, b) => a.risk - b.risk)[0].id;

    return list.findIndex(l => l.id === lower);
}

const heuristic = (node: Node, end: Node): number => {
    return Math.abs(end.x - node.x) + Math.abs(end.y - node.y);
}

const getValue = (node: Node): number => {
    let risk = 0;
    while (node.parent) {
        console.log(node);
        risk += node.risk;
        node = node.parent;
    }

    return risk;
}

const searchBestPath = (map: Node[][], start: Node, end: Node): number => {
    const openList = [ start ];
    const closedList = [];

    while(openList.length) {
        const lowerIdx = findLowestIdx(openList);
        const currentNode = openList[lowerIdx];

        if (currentNode.id === end.id) {
            return getValue(currentNode);
        }

        closedList.push(currentNode);
        openList.splice(lowerIdx, 1);
        const neighbors = DIRECTIONS.map(dir => map[currentNode.y + dir[0]]?.[currentNode.x + dir[1]]).filter(Boolean);

        for (const neighbor of neighbors) {
            if (closedList.find(node => node.id === neighbor.id)) {
                continue;
            }

            const gScore = currentNode.g + neighbor.risk;
            let gScoreIsBest = false;

            if (!openList.find(node => node.id === neighbor.id)) {
                gScoreIsBest = true;
                openList.push(neighbor);
            } else if (gScore < neighbor.g) {
                gScoreIsBest = true;
            }

            if (gScoreIsBest) {
                neighbor.parent = currentNode;
                neighbor.g = gScore;
            }
        }
    }

    return Infinity;
}

export const pathSearch = (input: string): number => {
    const file: number[][] = loadFile(input).filter(line => line.length).map(row => row.split('').map(Number));
    const graph: Node[][] = file.map((row, y) => row.map((el, x) => ({ f: 0, g: 0, h: 0, x, y, risk: el, parent: undefined, id: `${x},${y}` })));

    return searchBestPath(graph, graph[0][0], graph[graph.length - 1][graph[0].length - 1]);
}
