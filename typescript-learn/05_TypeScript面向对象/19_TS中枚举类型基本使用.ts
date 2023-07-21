// 枚举类型
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const d1: Direction = Direction.Up;
console.log(typeof d1, d1); // number 0


// 监听键盘事件
function turnDirection(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      console.log('向上');
      break;
    case Direction.Down:
      console.log('向下');
      break;
    case Direction.Left:
      console.log('向左');
      break;
    case Direction.Right:
      console.log('向右');
      break;
    default:
      const foo: never = direction;
  }
}

turnDirection(Direction.Up);