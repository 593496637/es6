const pro = new Promise((resolve, reject) => {
  const innerPro = new Promise((r, reject) => {
    setTimeout(() => {
      console.log('我执行了，但是下面的1不会打印');
      r(1);
    });
    console.log(2);
    r(3);
  });
  resolve(4);
  innerPro.then((res) => console.log(res));
  console.log('yideng');
});

pro.then((res) => console.log(res));
console.log('end');

// 2
// yideng
// end
// 3
// 4

// "1没被打印"

/**
 * 
 // 让我们给每一步加上注释来理解
console.log("=== 开始执行 ===");

const pro = new Promise((resolve, reject) => {
  console.log("步骤1: 外层Promise开始执行");
  
  const innerPro = new Promise((r, reject) => {
    console.log("步骤2: 内层Promise开始执行");
    
    setTimeout(() => {
      console.log("步骤7: setTimeout执行了，但是...");
      r(1); // 这里试图把Promise改成1，但已经晚了！
      console.log("r(1)执行了，但Promise状态已经不能改变了");
    });
    
    console.log("步骤3: 打印数字2");
    console.log(2);
    
    console.log("步骤4: 内层Promise被resolve为3");
    r(3); // 内层Promise现在状态变成resolved，值是3
  });
  
  console.log("步骤5: 外层Promise被resolve为4");
  resolve(4); // 外层Promise现在状态变成resolved，值是4
  
  innerPro.then((res) => {
    console.log("步骤6a: 内层Promise的.then执行，res =", res);
  });
  
  console.log("步骤6: 打印yideng");
  console.log('yideng');
});

pro.then((res) => {
  console.log("步骤6b: 外层Promise的.then执行，res =", res);
});

console.log("步骤7: 打印end");
console.log('end');
 */
