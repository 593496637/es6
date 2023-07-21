// 1.索引签名的理解
interface IPerson {
  // 索引签名：可以通过字符串索引，取获取到一个值，也是字符串
  [key: string]: string;
}

function getInfo(): IPerson {
  const abc: any = 'abc';
  return abc;
}

const info = getInfo();
const name = info['name'];
console.log(name, info.age, info.address);

// 2.索引签名的案例
interface ICollections {
  [index: number]: string;
  length: number;
}

function printCollections(collections: ICollections) {
  for (let index = 0; index < collections.length; index++) {
    const element = collections[index];
    console.log(element.length);
  }
}

const array: string[] = ['hello', '你好', 'xyz'];
const tuple: [string, string] = ['哈哈', '呵呵'];

printCollections(array);
printCollections(tuple);

export {};
