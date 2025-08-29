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
 * 二叉树后序遍历
 * 遍历顺序：左子树 -> 右子树 -> 根节点
 * 反向思维：先序遍历的顺序是：根节点 -> 左子树 -> 右子树，整个就是先序遍历的逆序，最后反转结果
 * @param {TreeNode | null} root 根节点
 * @returns {Array<*>} 后序遍历结果
 */

const postorderTraversal = (root) => {
  const result = [];
  const stack = [];

  if (!root) {
    return result;
  }

  stack.push(root);

  // 当栈不为空时，循环
  while (stack.length) {
    // 栈顶元素出栈
    const node = stack.pop();
    result.push(node.val);

    // 如果当前节点有左孩子，则将左孩子入栈
    if (node.left) {
      stack.push(node.left);
    }

    // 如果当前节点有右孩子，则将右孩子入栈
    if (node.right) {
      stack.push(node.right);
    }
  }

  return result.reverse();
};

// --------------测试--------------

// 创建一棵测试树
//       1
//      / \
//     2   3
//    / \   \
//   4   5   6

const result = postorderTraversal(
  new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, null, new TreeNode(6))
  )
);
console.log(result); // [ 4, 5, 2, 6, 3, 1 ]
