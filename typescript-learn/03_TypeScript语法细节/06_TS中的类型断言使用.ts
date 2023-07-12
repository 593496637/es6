// 类型断言as

// 获取DOM元素
// <img class='img'/>
const imgEl = document.querySelector('.img') as HTMLImageElement;
imgEl.src = 'http://www.baidu.com';
imgEl.title = '百度一下';

// 类型断言的规则：断言只能断言成更加具体的类型，或者不太具体(any/unknown)的类型



export {};
