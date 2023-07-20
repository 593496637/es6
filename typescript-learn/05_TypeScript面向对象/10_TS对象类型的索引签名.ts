interface ICollections {
  // 索引签名
  // 格式描述：[index: number]: string，index表示索引的类型，string表示索引值的类型
  [index: number]: string;
  length: number;
}

const names: string[] = ['why', 'kobe', 'james'];

function iteratorCollections(collections: ICollections) {
  console.log(collections.length);
  console.log(collections[0]);
  console.log(collections[1]);
}

iteratorCollections(names);

// 索引是数字类型，值是字符串类型，包含length属性
const tuple: [string, string] = ['why', 'kobe'];
iteratorCollections(tuple);


// 索引是数字类型，值是字符串类型，包含length属性
const obj = { 0: 'why', 1: 'abc', length: 2 };
iteratorCollections(obj);



export {};