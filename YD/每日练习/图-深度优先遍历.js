/**
    A -- B -- D
    |    |
    C    E
 */

// 深度优先遍历(DFS)

// 用对象标示图,graph["A"]表示A可以去B和C
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A'],
  D: ['B'],
  E: ['B'],
}

// 使用递归
function dfs(graph, start, visited = new Set()) {
  if (visited.has(start)) return; // 如果已经访问过，则返回
  console.log(start);
  visited.add(start); // 将当前节点标记为已访问

  // 访问所有邻居
  for (let neighbor of graph[start]) {
    dfs(graph, neighbor, visited);
  }
}

dfs(graph, 'A') // A → B → D → E → C
