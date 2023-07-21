interface IIndexType {
  // 两个索引类型的写法
  [index: number]: string;
  [index: string]: any;
}

const names: IIndexType = ['a', 'b', 'c'];


// 当通过number类型的索引去获取值的时候，返回值是string类型
const item1 = names[0];
// 当通过string类型的索引去获取值的时候，返回值是any类型
const forEach = names['forEach'];


export {}
