// 泛型接口

// 可以使用泛型来定义接口的形状

// 可以写默认值
interface GenericIdentityFn<Type = number> {
  arg1: Type;
  arg2: number;
  arg3: Type;
}

// 使用
const myIdentity: GenericIdentityFn<string> = {
  arg1: 'hello',
  arg2: 123,
  arg3: 'world',
};

export {};
