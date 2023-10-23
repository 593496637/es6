// 1.类装饰器 ClassDecorator 参数是构造函数(target)
// 2.属性装饰器 PropertyDecorator
// 3.参数装饰器 ParameterDecorator
// 4.方法装饰器 MethodDecorator
// 5.装饰器工厂
// 6.import 'reflect-metadata';
// 7.axios

// 优点：可以在不修改类的前提下，动态的扩展类的功能
// 开发接口：https://api.apiopen.top/api/sentences
import axios from 'axios';
const sentencesApi = 'https://api.apiopen.top/api/sentences';

// 类装饰器
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

// 方法装饰器
const Get = (url: string) => {
  // target: 原型对象，key: 方法名，descriptor: 属性描述符
  const fn: MethodDecorator = (target, key, descriptor: PropertyDescriptor) => {
    console.log(target, key, descriptor);
    axios.get(url).then((res) => {
      descriptor.value(res.data);
    });
  };
  return fn;
};

@Base('小红')
class Http {
  @Get(sentencesApi)
  get(data: any) {
    console.log(data);
  }
  post() {}
}

const http = new Http() as any;
console.log(http.name);
http.run();

export {};
