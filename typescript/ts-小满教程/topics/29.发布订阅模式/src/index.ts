interface IEvent {
  on: (name: string, fn: Function) => void;
  emit: (name: string, ...args: Array<any>) => void;
  off: (name: string, fn: Function) => void;
  once: (name: string, fn: Function) => void;
}

interface IList {
  [key: string]: Array<Function>;
}

class Dispatcher implements IEvent {
  list: IList;
  constructor() {
    this.list = {};
  }
  on(name: string, fn: Function) {
    const fnList = this.list[name] || [];
    fnList.push(fn);
    this.list[name] = fnList;
  }
  emit(name: string, ...args: Array<any>) {
    const eventName = this.list[name];
    if (eventName) {
      eventName.forEach((fn) => {
        fn(...args);
      });
    } else {
      console.log('没有该事件');
    }
  }
  off(name: string, fn: Function) {
    const eventName = this.list[name];
    if (eventName) {
      const index = eventName.indexOf(fn);
      if (index !== -1) {
        eventName.splice(index, 1);
      }
    } else {
      console.log('没有该事件');
    }
  }
  once(name: string, fn: Function) {
    const wrapper = (...args: Array<any>) => {
      fn(...args);
      this.off(name, wrapper);
    };
    this.on(name, wrapper);
  }
}

const dispatcher = new Dispatcher();

// 订阅事件
const fn1 = (...args: Array<any>) => {
  console.log(args, 1);
};
dispatcher.on('click', fn1);

// 订阅事件
const fn2 = (...args: Array<any>) => {
  console.log(args, 2);
};
dispatcher.on('click', fn2);

// 取消订阅
// dispatcher.off('click', fn2);

// 触发事件
dispatcher.emit('click', 'hello', 'world');

// once
const fn3 = (...args: Array<any>) => {
  console.log(args);
};
dispatcher.once('handerOnce', fn3);

dispatcher.emit('handerOnce', 'once1', 'world', 'once'); // 只会触发一次
dispatcher.emit('handerOnce', 'noce2', 'world', 'once'); // 不会触发

// private events: Map<string, Array<Function>>;
// constructor() {
//   this.events = new Map();
// }
// on(type: string, fn: Function) {
//   const handlers = this.events.get(type);
//   if (!handlers) {
//     this.events.set(type, [fn]);
//   } else {
//     handlers.push(fn);
//   }
// }
// off(type: string, fn: Function) {
//   const handlers = this.events.get(type);
//   if (!handlers) return;
//   const index = handlers.indexOf(fn);
//   if (index !== -1) {
//     handlers.splice(index, 1);
//   }
// }
// emit(type: string, ...args: any[]) {
//   const handlers = this.events.get(type);
//   if (!handlers) return;
//   handlers.forEach((fn) => {
//     fn(...args);
//   });
// }
// once(type: string, fn: Function) {
//   const wrapper = (...args: any[]) => {
//     fn(...args);
//     this.off(type, wrapper);
//   };
//   this.on(type, wrapper);
// }
