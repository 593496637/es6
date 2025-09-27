/**
    A -- B -- D
    |    |
    C    E
 */

// 广度优先遍历(BFS)

// 用对象标示图,graph["A"]表示A可以去B和C
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A'],
  D: ['B'],
  E: ['B'],
}

// 使用队列
function bfs(graph, start) {
  const visited = new Set()
  const queue = [start] // 队列初始化为起点

  while (queue.length) {
    const node = queue.shift() // 取出队首
    if (!visited.has(node)) {
      console.log(node);
      visited.add(node)

      for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor)
        }
      }
    }
  }
}

bfs(graph, 'A') // A → B → C → D → E