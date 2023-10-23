// 1.类装饰器 ClassDecorator 参数是构造函数(target)
// 2.属性装饰器 PropertyDecorator
// 3.参数装饰器 ParameterDecorator
// 4.方法装饰器 MethodDecorator
// 5.装饰器工厂
// 6.import 'reflect-metadata';
// 7.axios

// 1.类装饰器 ClassDecorator
// 5.装饰器工厂 @Base传参
// 优点：可以在不修改类的前提下，动态的扩展类的功能

const Base = (name: string) => {
  // target: 构造函数
  const fn: ClassDecorator = (target) => {
    console.log(target);
    target.prototype.name = name;
    target.prototype.run = () => {
      console.log('run');
    };
  };
  return fn;
};

@Base('小红')
class Http {}

const http = new Http() as any;
console.log(http.name);
http.run();

// 不使用装饰器的写法 polyfill
// Base(Http);
// http.run()

// 2.属性装饰器 PropertyDecorator


export {};