import { loadFile } from "src/utils"
const DIRECTIONS = [
    [0, 1],
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
    closed?: boolean;
    visited?: boolean;
    parent?: Node;
}

class MinHeap {
    heap: Node[] = [];

    constructor(initElement: Node) {
        this.heap = [initElement];
    }

    getMin() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    swap(left: number, right: number) {
        [this.heap[left], this.heap[right]] = [this.heap[right], this.heap[left]];
    }

    pop() {
        const result = this.heap[0]
        const end = this.heap.pop()!;

        if (this.heap.length) {
            this.heap[0] = end;
            this.bubbleUp(0);
        }

        return result;
    }

    insert(node: Node) {
        this.heap.push(node);

        this.sinkDown(this.heap.length - 1);
    }

    sinkDown(n: number) {
        const element = this.heap[n];

        while (n > 0) {
            const parentN = ((n + 1) >> 1) - 1;
            const parent = this.heap[parentN];

            if (element.f < parent.f) {
                this.swap(parentN, n);
                n = parentN;
            } else {
                break;
            }
        }
    }

    rescoreElement(node: Node) {
        this.sinkDown(this.heap.findIndex(n => n.id === node.id));
    }

    bubbleUp(n: number) {
        let loop = true;
        while (loop) {
            const child2N = (n + 1) << 1;
            const child1N = child2N - 1;
            let swap = null;

            if (child1N < this.heap.length) {
                if (this.heap[child1N].f < this.heap[n].f) {
                    swap = child1N
                }
            }

            if (child2N < this.heap.length) {
                if (this.heap[child2N].f < (swap === null ? this.heap[n].f : this.heap[child1N].f)) {
                    swap = child2N;
                }
            }

            if (swap) {
                this.swap(n, swap);
                n = swap;
            } else {
                loop = false;
            }
        }
    }
}

const heuristic = (node: Node, end: Node): number => {
    return Math.abs(end.x - node.x) + Math.abs(end.y - node.y);
}

const getValue = (node: Node): number => {
    let risk = 0;
    while (node.parent) {
        risk += node.risk;
        node = node.parent;
    }

    return risk;
}

const searchBestPath = (map: Node[][], start: Node, end: Node): number => {
    const openHeap = new MinHeap(start);

    while (openHeap.size()) {
        const currentNode = openHeap.pop();

        if (currentNode.id === end.id) {
            return getValue(currentNode);
        }

        currentNode.closed = true;

        const neighbors = DIRECTIONS.map(dir => map[currentNode.y + dir[0]]?.[currentNode.x + dir[1]]).filter(Boolean);

        for (const neighbor of neighbors) {
            if (neighbor.closed) {
                continue;
            }

            const gScore = currentNode.g + neighbor.risk;
            const beenVisited = neighbor.visited;

            if (!beenVisited || gScore < neighbor.g) {
                neighbor.visited = true;
                neighbor.parent = currentNode;
                neighbor.h = neighbor.h || heuristic(neighbor, end);
                neighbor.g = gScore;
                neighbor.f = neighbor.h + neighbor.g;

                if (!beenVisited) {
                    openHeap.insert(neighbor);
                } else {
                    openHeap.rescoreElement(neighbor);
                }
            }
        }
    }

    return Infinity;
}

export const pathSearch = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(row => row.split('').map(Number));
    const graph: Node[][] = file.map((row, y) => row.map((el, x) => ({ f: 0, g: 0, h: 0, x, y, risk: el, parent: undefined, id: `${x},${y}` })));
    return searchBestPath(graph, graph[0][0], graph[graph.length - 1][graph[0].length - 1]);
}

export const fullPathSearch = (input: string): number => {
    const file = loadFile(input).filter(line => line.length).map(row => row.split('').map(Number));
    let fullCave = file.map(row =>
        [...Array(4)]
            .reduce((acc, _, step) =>
                acc.concat(
                    ...row.map((_, i) =>
                        Math.max(1, (acc[i + (step * row.length)] + 1) % 10)
                    )
                ), row)
    );
    fullCave = [...Array(4)].reduce((acc: number[][], _, i) =>
        acc.concat(
            fullCave.map((row: number[][], y: number) =>
                row.map((_, x) =>
                    Math.max(1, (acc[y + (i * file.length)][x] + 1) % 10)
                )
            )
        ), fullCave);

    const graph: Node[][] = fullCave.map((row, y) => row.map((el: number, x: number) => ({ f: 0, g: 0, h: 0, x, y, risk: el, parent: undefined, id: `${x},${y}` })));
    return searchBestPath(graph, graph[0][0], graph[graph.length - 1][graph[0].length - 1]);

}
