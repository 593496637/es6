/**
 * 定义二叉树的节点构造函数
 * @param {*} val 节点的值
 * @param {TreeNode | null} left 左子树
 * @param {TreeNode | null} right 右子树
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * 对二叉树进行中序遍历
 * 遍历顺序：左子树 -> 根节点 -> 右子树
 * @param {TreeNode | null} root 根节点
 * @returns {Array<*>} 中序遍历结果
 */

const inorderTraversal = (root) => {
  // 结果
  const result = [];
  // 存放访问的节点
  const stack = [];
  // 探路先锋，从根节点开始
  let currentNode = root;

  // 栈不为空时，循环
  while (currentNode || stack.length) {
    // 阶段一：一路向左，把沿途的节点压入栈
    while (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    }

    // 阶段二：左边节点访问完了，回头处理栈中的节点
    const node = stack.pop();

    // 访问栈顶节点
    result.push(node.val);

    // 阶段三：处理右子树
    currentNode = node.right;
  }

  return result;
};

// --------------测试--------------

// --- 创建一棵测试树 ---
//       1
//      / \
//     2   3
//    / \   \
//   4   5   6

const rootNode = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, null, new TreeNode(6))
);

const result = inorderTraversal(rootNode);
console.log(result); // [ 4, 2, 5, 1, 3, 6 ]
