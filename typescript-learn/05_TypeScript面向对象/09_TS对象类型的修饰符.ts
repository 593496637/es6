// 使用type定义对象类型
type Person = {
  // 属性?:可选属性
  name?: string;
  // 属性readonly:只读属性
  readonly age: number;
};

// 使用接口定义对象类型
interface IPerson {
  name?: string;
  readonly age: number;
}

export {}