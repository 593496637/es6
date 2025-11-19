import { atom } from "jotai";

export const countAtom = atom(0);

// 派生 atom
export const doubleCountAtom = atom((get) => get(countAtom) * 2);

// 异步 atom
export const asyncCountAtom = atom(async () => {
  console.log('模拟异步请求...');
  await new Promise((resolve) => setTimeout(resolve, 5000)); // 等待 5s
  return Math.floor(Math.random() * 100); // 返回 0-99 的随机数
});
