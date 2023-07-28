// axios自带类型声明文件，不需要安装额外的类型声明文件，直接使用即可
import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance } from 'axios';

// react没有自带类型声明文件，需要安装额外的类型声明文件 @types/react
import react from 'react';

// lodash:假如lodash没有类型声明文件，我们需要自己编写类型声明文件
// types/hello.d.ts
import _ from 'lodash';

// 导入图片
import girl from './img/girl.jpg';

import { sum } from './utils/math';

const message: string = 'Hello World';

console.log(message.length, message);
console.log(sum(1, 2));

// lib.dom.d.ts
const El = document.createElement('h1');
El.innerText = message;

document.body.appendChild(El);

// lib.es2015.promise.d.ts
const promise = new Promise((resolve, reject) => {
  resolve(123);
});

promise.then((res) => {
  console.log(res);
});

// 使用lodash
console.log(_.join(['a', 'b', 'c']));

/**
 * 总结：
 * 1.第三方库中自带类型声明，不需要安装额外的类型声明文件，直接使用即可
 * 2.第三方库中不带类型声明，需要手动安装类型声明文件
 * 3。第三方苦衷不带类型声明，需要手动编写类型声明文件
 */

// 自定义类型声明例子：
// 第三步：使用
console.log(myName, myAge);
const result = fn('hello', 'world');
console.log(result);

const p = new Person('lisa', 18);
console.log(p.name, p.age);

// 使用图片
const imgEl = document.createElement('img');
imgEl.src = girl;
document.body.appendChild(imgEl);


// 使用在index.html中引入的第三方库
$.ajax({
  url: '/api/users',
  method: 'GET',
  dataType: 'json',
});

export {};
