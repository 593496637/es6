const num: number = 123;
const num2: number = NaN;
const str: string = 'hello';
const bool: boolean = true;
const arr: number[] = [1, 2, 3];
const arr2: Array<number> = [1, 2, 3];
const arr3: Array<string> = ['1', '2', '3'];
const arr4: Array<boolean> = [true, false, true];
const arr5: Array<object> = [{}, {}, {}];
const arr6: Array<null> = [null, null, null];
const arr7: Array<undefined> = [undefined, undefined, undefined];
const arr8: Array<never> = [];

// void: 没有任何类型，一般用于定义方法的时候方法没有返回值
const v1: void = undefined;
const u: undefined = undefined;
const n: null = null;


function fn(): void {
  console.log('fn');
  return undefined; // 可以返回 undefined
}

export {};
