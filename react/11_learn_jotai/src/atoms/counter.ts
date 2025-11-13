import { atom } from 'jotai';

export const countAtom = atom(0);

// 派生atom
export const doubleCountAtom = atom((get) => get(countAtom) * 2);

// 异步atom
export const asyncCountAtom = atom(async () => {
  console.log('模拟异步请求中');
  await new Promise((resolve) => setTimeout(resolve, 5000)); //等待1秒
  return Math.floor(Math.random() * 100); //返回0-99的随机数
});
