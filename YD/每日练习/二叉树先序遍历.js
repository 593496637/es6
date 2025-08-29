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
 * 二叉树先序遍历
 * 遍历顺序：根节点 -> 左子树 -> 右子树
 * @param {TreeNode | null} root 根节点
 * @returns {Array<*>} 先序遍历结果
 */

const preorderTraversal = (root) => {
  // 结果
  const result = [];

  if (!root) {
    return result;
  }

  // 栈
  const stack = [root];

  // 栈不为空时，循环
  while (stack.length) {
    // 栈顶元素出栈
    const node = stack.pop();
    result.push(node.val);

    // 1. 如果当前节点有有孩子
    if (node.right) {
      stack.push(node.right);
    }

    // 2.如果当前节点有左孩子
    if (node.left) {
      stack.push(node.left);
    }
  }

  return result;
};

// --------------------测试---------------------

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

const result = preorderTraversal(rootNode);
console.log(result); // [ 1, 2, 4, 5, 3, 6 ]
