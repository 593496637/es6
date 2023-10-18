type Type = {
  x: number;
  y: number;
  z?: number;
};

interface Interface {
  x: number;
  y: number;
  z?: number;
}

function printCoordinate(pt: Interface) {
  console.log(pt.x);
  console.log(pt.y);
}

printCoordinate({ x: 1, y: 2 });

// 接口可以声明this类型
// this类型表示的是某个具体的类型,this必须是函数的第一个参数
interface SetThis {
  name: string;
  setName: (this: SetThis, value: string) => void;
}

const setThis: SetThis = {
  name: 'Tom',
  setName(value: string) {
    this.name = value;
  },
};
setThis.setName('Jerry');
console.log(setThis.name);

export {};
