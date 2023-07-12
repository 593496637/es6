// 1.typeof 类型保护
function printID(id: number | string) {
  // 问题：此时id的类型是number | string，不能直接调用toUpperCase方法
  // console.log(id.toUpperCase());
  // 1.使用类型断言
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

// 2.方向的类型 left right top bottom
type Direction = 'left' | 'right' | 'top' | 'bottom';
function getDirection(direction: Direction) {
  // 问题：此时direction的类型是Direction，不能直接调用toUpperCase方法
  // console.log(direction.toUpperCase());
  // 1.使用类型断言
  if (direction === 'left') {
    console.log('go left');
  } else if (direction === 'right') {
    console.log('go right');
  } else if (direction === 'top') {
    console.log('go top');
  } else {
    console.log('go bottom');
  }
}

// 3.传入一个日期，如果是字符串，就转成Date类型，如果是Date类型，就直接使用
function getDate(date: string | Date) {
  if (date instanceof Date) {
    console.log(date.getTime());
  } else {
    console.log(new Date(date).getTime());
  }
}

// 4.in 类型保护
interface Fish {
  swim: () => void;
}
interface Bird {
  fly: () => void;
}

function testAnimal(animal: Fish | Bird) {
  if ('swim' in animal) {
    animal.swim();
  } else if ('fly' in animal) {
    animal.fly();
  } else {
    console.log('animal不是Fish也不是Bird');
  }
}

const fish: Fish = {
  swim: () => {},
};
const bird: Bird = {
  fly: () => {},
};

testAnimal(fish);

export {};
