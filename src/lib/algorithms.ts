export type Algorithm = 'BFS' | 'Dijkstra';
export const nodes = [{ id: 'A', x: 85, y: 180 }, { id: 'B', x: 240, y: 85 }, { id: 'C', x: 240, y: 275 }, { id: 'D', x: 420, y: 85 }, { id: 'E', x: 420, y: 275 }, { id: 'F', x: 575, y: 180 }];
export const edges: [
    string,
    string,
    number
][] = [['A', 'B', 4], ['A', 'C', 2], ['B', 'C', 1], ['B', 'D', 5], ['C', 'D', 8], ['C', 'E', 10], ['D', 'E', 2], ['D', 'F', 6], ['E', 'F', 3]];
export type Frame = {
    current: string | null;
    visited: string[];
    frontier: string[];
    distances: Record<string, number>;
    parents: Record<string, string>;
    message: string;
};
export function createFrames(algorithm: Algorithm): Frame[] {
    const distances: Record<string, number> = Object.fromEntries(nodes.map(n => [n.id, Infinity]));
    distances.A = 0;
    const parents: Record<string, string> = {};
    const adjacency: Record<string, {
        id: string;
        weight: number;
    }[]> = Object.fromEntries(nodes.map(n => [n.id, []]));
    for (const [a, b, weight] of edges) {
        adjacency[a].push({ id: b, weight });
        adjacency[b].push({ id: a, weight });
    }
    const visited: string[] = [];
    const frontier = ['A'];
    const frames: Frame[] = [];
    const push = (current: string | null, message: string) => frames.push({ current, visited: [...visited], frontier: [...frontier], distances: { ...distances }, parents: { ...parents }, message });
    push(null, 'Bắt đầu tại A. Chọn thuật toán rồi chạy hoặc duyệt từng bước.');
    while (frontier.length) {
        if (algorithm === 'Dijkstra')
            frontier.sort((a, b) => distances[a] - distances[b] || a.localeCompare(b));
        const current = frontier.shift()!;
        visited.push(current);
        for (const { id, weight } of adjacency[current]) {
            if (visited.includes(id))
                continue;
            const distance = distances[current] + (algorithm === 'BFS' ? 1 : weight);
            if (distance < distances[id]) {
                distances[id] = distance;
                parents[id] = current;
                if (!frontier.includes(id))
                    frontier.push(id);
            }
        }
        if (algorithm === 'Dijkstra')
            frontier.sort((a, b) => distances[a] - distances[b] || a.localeCompare(b));
        push(current, algorithm === 'BFS' ? `Duyệt ${current}. Thêm các đỉnh chưa khám phá vào cuối hàng đợi.` : `Chốt khoảng cách đến ${current} = ${distances[current]}. Cập nhật khoảng cách các đỉnh kề.`);
    }
    push(null, algorithm === 'BFS' ? 'Hoàn tất BFS. Tất cả 6 đỉnh đã được duyệt theo chiều rộng.' : 'Hoàn tất Dijkstra. Khoảng cách ngắn nhất từ A đến F là 13: A → C → B → D → E → F.');
    return frames;
}
