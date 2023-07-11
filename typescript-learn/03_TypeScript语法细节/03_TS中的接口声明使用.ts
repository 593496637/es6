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

export {};
