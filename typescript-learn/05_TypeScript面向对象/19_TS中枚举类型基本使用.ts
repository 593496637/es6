// 枚举类型
enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const d1: Direction = Direction.UP;
console.log(typeof d1, d1); // number 0


// 监听键盘事件
function turnDirection(direction: Direction) {
  switch (direction) {
    case Direction.UP:
      console.log('向上');
      break;
    case Direction.DOWN:
      console.log('向下');
      break;
    case Direction.LEFT:
      console.log('向左');
      break;
    case Direction.RIGHT:
      console.log('向右');
      break;
  }
}

turnDirection(Direction.UP);

export {};