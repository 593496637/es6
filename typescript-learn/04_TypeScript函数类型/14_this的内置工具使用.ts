function foo(this: { name: string }, info: { name: string }) {
  console.log(this, info);
}

foo.call({ name: '小甜甜' }, { name: '嘻嘻嘻' });

type FooType = typeof foo;

// 1. ThisParameterType: 获取函数中this的类型
type FooThisType = ThisParameterType<FooType>;

// 2. OmitThisParameter: 忽略函数中this的类型
type FooOmitThisType = OmitThisParameter<FooType>;

// 3. ThisType: 用于约束对象中函数的this
interface IState {
  name: string;
  age: number;
}

interface IStore {
  state: IState;
  eating: () => void;
  drinking: () => void;
}

// 问题：在对象的函数中使用this，如果不想使用this.state.name，而是直接使用this.name
// 绑定上下文this

// 1.第一种写法：那么可以绑定this的类型为IState
const store1: IStore = {
  state: {
    name: '小甜甜1',
    age: 18,
  },
  eating(this: IState) {
    // 不想使用this.state.name时，就可以把this的类型设置为IState
    console.log(this.name);
  },
  drinking(this: IState) {
    console.log(this.age);
  },
};

store1.eating.call(store1.state);

// 2.第二种写法，使用ThisType
const store2: IStore & ThisType<IState> = {
  state: {
    name: '小甜甜2',
    age: 18,
  },
  eating() {
    console.log(this.name);
  },
  drinking() {
    console.log(this.age);
  },
};

store2.eating.call(store2.state);

export {};
