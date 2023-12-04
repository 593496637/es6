/**
 * Reflect
 * @param target 目标对象
 * @param key 属性
 * @param value 值
 * @param receiver 代理对象
 * @returns
 */
// 实现一个proxy版的观察者模式
const set: Set<Function> = new Set();
const autoRun = (cb: Function) => {
  if (!set.has(cb)) {
    set.add(cb);
  }
};

const observable = <T extends object>(params: T) => {
  return new Proxy(params, {
    set(params, key, value, receiver) {
      const result = Reflect.set(params, key, value, receiver);
      set.forEach((cb) => cb());
      return result;
    },
  });
};

const person = observable({ name: '小红', age: 12 });

autoRun(() => {
  console.log('监听到了变化');
});

person.name = '小明';
person.age = 18;

export {};
