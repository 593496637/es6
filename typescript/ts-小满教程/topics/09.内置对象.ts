// 内置对象的类型

// 1. ecma Number Date RegExp Error XMLHttpRequest
// 2. dom Document HTMLElement Event NodeList
// 3. bom prompt alert location history localStorage

// 1.ecma
const a: Number = new Number(1);
const date: Date = new Date();
const reg: RegExp = new RegExp(/\w/);
const error: Error = new Error('error');

// 在node环境下，XMLHttpRequest是不存在的,运行ts-node 09.内置对象.ts会报错
const xml: XMLHttpRequest = new XMLHttpRequest();

// 2.dom
// HTML(元素名称)Element HTMLElement Document
const div = document.querySelector('div') as Element; //可以直接断言为Element

const div2: NodeList = document.querySelectorAll('div');

//如果查找的元素是不固定的，可以使用泛型 NodeListOf<HTMLElement | HTMLDivElement>
const div3: NodeListOf<HTMLDivElement | HTMLElement> =
  document.querySelectorAll('div footer');

// 3.bom
const local: Storage = localStorage;
const his: History = history;
// Promise写法: Promise<number>  number是resolve的参数类型, Promise.resolve(1),在then中提示的就是number类型的方法
// 如果是Promise<string>  Promise.resolve('1'),在then中提示的就是string类型的方法
// async await写法: Promise<number>  await 1
const promise: Promise<number> = new Promise((r) => r(1));

promise.then((res) => {
  res.toFixed();
});

const cookie: string = document.cookie;

export {};
