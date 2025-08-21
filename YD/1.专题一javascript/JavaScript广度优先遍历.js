/**
 * 广度优先遍历
 */

const tree = {
  value: 1,
  children: [
    {
      value: 2,
    },
    {
      value: 3,
      children: [
        {
          value: 5,
        },
        {
          value: 6,
        },
      ],
    },
    {
      value: 4,
    },
  ],
};

// 使用队列 first in first out 先进先出
const bfs = (tree) => {
  const queue = [tree];

  while (queue.length) {
    const node = queue.shift();
    console.log(node.value);
    if (node.children) {
      for (const children of node.children) {
        queue.push(children);
      }
    }
  }
};

bfs(tree); // 1 2 3 4 5 6
