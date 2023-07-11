// 类型断言as

// 获取DOM元素
// <img class='img'/>
const imgEl = document.querySelector('.img') as HTMLImageElement;
imgEl.src = 'http://www.baidu.com';
imgEl.title = '百度一下';

export {};
