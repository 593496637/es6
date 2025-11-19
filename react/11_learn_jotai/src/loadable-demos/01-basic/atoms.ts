import { atom } from 'jotai';
import { loadable } from 'jotai/utils';

// 模拟 1 秒后返回一个随机数
const asyncRandomAtom = atom(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Math.floor(Math.random() * 100);
});

// loadable 会把异步 atom 包装成包含 loading/error/data 的结果对象
export const loadableRandomAtom = loadable(asyncRandomAtom);
