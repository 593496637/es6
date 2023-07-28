// declare: 声明
declare module 'lodash' {
  export function join(arr: any[]): string;
}

// 自定义类型声明例子：
// 第二步：类型声明

declare const myName: string;
declare const myAge: number;

declare function fn(a: string, b: string): string;

declare class Person {
  name: string;
  age: number;
  constructor(name: string, age: number);
}

// 声明图片模块
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.ico';

// 声明vue文件模块
declare module '*.vue';

// 声明jQuery命名空间
declare namespace $ {
  export function ajax(config: any): void;
}