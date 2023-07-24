class Point<Type = number> {
  x: Type;
  y: Type;

  constructor(x: Type, y: Type) {
    this.x = x;
    this.y = y;
  }
}

const p1 = new Point(1, 2);
const p2 = new Point('1', '2');

export {};
