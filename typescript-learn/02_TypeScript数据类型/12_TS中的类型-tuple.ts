// 元组类型：数组的一种
// 保存个人信息：姓名和年龄

// 1.使用数组保存 any
const info: any[] = ['why', 18];
// 问题：数组中的元素的个数和数据类型都不固定

// 2.使用对象
const info2: { name: string; age: number } = { name: 'why', age: 18 };
// 问题：对象的结构是固定的，如果有其他的信息，需要在类型中添加

// 3.使用元组
const info3: [string, number] = ['why', 18];
// 问题：元组中的元素的个数和数据类型都是固定的

// 元组类型在函数中用的是最多的（函数的返回值）
function useState(initialState: number): [number, (newValue: number) => void] {
  let state = initialState;

  function setState(newValue: number) {
    state = newValue;
  }
  return [state, setState];
}

const [count, setCount] = useState(10);
setCount(1);


export {};