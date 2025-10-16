/* 
  反柯里化（Uncurrying）：是把一个只能在特定对象上使用的方法，改造成一个可以在任意对象上使用的普通函数。
  换句话说：把“方法”从对象上“取下来”，让它可以独立使用。
*/



/**
 * 但如果我想让它也能用在“类数组对象”上（比如 arguments 或 { length: 0 }），
 * 那普通的 .push() 就不行了。
 * 这时我们就可以用 反柯里化（uncurrying） 来做到。
 */



function unCurrying(fn) {
  return function (...args) {
    // args[0]是要绑定的对象，后面的才是参数
    const context = args.shift()

    // 用apply把函数的this换成第一个参数
    return fn.apply(context, args)

  }
}


// 使用示例

// 把Array.prototype.push反柯里化
const push = unCurrying(Array.prototype.push)

// 创建一个类数组对象
const fakeArray = { length: 1, 0: 'a' }

// 调用push（现在不用通过数组实例）
push(fakeArray, 'b')
push(fakeArray, 'c')

console.log(fakeArray);