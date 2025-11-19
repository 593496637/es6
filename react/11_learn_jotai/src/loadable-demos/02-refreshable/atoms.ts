import { atom } from "jotai";
import { loadable } from "jotai/utils";

const requestIdAtom = atom(0);

const asyncRandomAtom = atom(async (get) => {
  get(requestIdAtom); // 读取请求 ID，让刷新操作触发依赖更新
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (Math.random() < 0.2) {
    throw new Error('模拟 20% 的网络抖动');
  }

  return Math.floor(Math.random() * 100);
});

export const refreshRequestAtom = atom(null, (_get, set) => {
  set(requestIdAtom, (id) => id + 1);
});

export const refreshableRandomAtom = loadable(asyncRandomAtom);
