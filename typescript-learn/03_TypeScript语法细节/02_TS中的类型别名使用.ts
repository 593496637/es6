// 类型别名：type
// 语法：type 类型别名 = 类型
type Id = number | string;
const age: Id = 123;

function printId(id: Id) {
  console.log(id);
}

type PointType = {
  x: number;
  y: number;
  z?: number;
};

function printCoordinate(pt: PointType) {
  console.log(pt.x);
  console.log(pt.y);
}

printCoordinate({ x: 1, y: 2 });

export {};
