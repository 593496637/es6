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
import 'reflect-metadata';
const sentencesApi = 'https://api.apiopen.top/api/sentences';

// 类装饰器
const Base = (name: string) => {
  // target: 构造函数
  const fn: ClassDecorator = (target) => {
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
  const fn: MethodDecorator = (target, _, descriptor: PropertyDescriptor) => {
    // 获取元数据
    const key = Reflect.getMetadata('key', target);
    axios.get(url).then((res) => {
      // 在这里对result进行获取，不需要用户再去data.result了
      descriptor.value(res.data?.[key] ?? res.data);
    });
  };
  return fn;
};

// 参数装饰器
const Result = () => {
  // target: 原型对象，key: 方法名，index: 参数索引
  const fn: ParameterDecorator = (target, key, index) => {
    // 作用：给原型对象添加元数据
    Reflect.defineMetadata('key', 'result', target);
  };
  return fn;
};

@Base('小红')
class Http {
  @Get(sentencesApi)
  get(@Result() data: any) {
    console.log(data);
  }
  post() {}
}

const http = new Http() as any;
console.log(http.name);
http.run();

export {};
