/**
 * 深度优先遍历
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

// 递归实现
const dfs = (tree) => {
  console.log(tree.value);

  if (tree.children) {
    for (const children of tree.children) {
      dfs(children);
    }
  }
};

dfs(tree); // 1 2 3 5 6 4

// 栈实现last in first out 后进先出
const dfsStack = (tree) => {
  const stack = [tree];

  while (stack.length > 0) {
    const node = stack.pop();
    console.log(node.value);
    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push(node.children[i]);
      }
    }
  }
};

dfsStack(tree); // 1 2 3 5 6 4
