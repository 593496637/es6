interface IIndexType {
  // 返回值类型的目的是告知通过索引去获取到的值是什么类型
  // [index: number]: string;
  [index: string]: any;
  // [index: string]: string;
}

// 1.索引签名：[index:number]: string;
// const names: IIndexType = ['a', 'b', 'c'];



// 2.索引签名：[index:string]: any;
// 索引要求是字符串类型，但是值可以是任意类型
// 实际上names[0]会隐式转换成names['0']
const names: IIndexType = ['a', 'b', 'c', 1, true, {name: 'why'}];



// 3.索引签名：[index:string]: string; 报错
// const names: IIndexType = ['a', 'b', 'c'];

// 因为索引names数组里面除了返回值是字符串类型，还有function类型，所以报错
// names['forEach/map/filter']=>function

export {};
