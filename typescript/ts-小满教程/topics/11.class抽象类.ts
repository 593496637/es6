// 基类 抽象类
// abstract 定义的类叫做抽象类
// abstract 定义的方法叫做抽象方法
// 抽象类和抽象方法用来定义标准，都只能描述不能进行实现
// 抽象类无法被实例化
abstract class Vue {
  name: string;
  constructor(name?: string) {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
  abstract init(name: string): void;
}

class React extends Vue {
  constructor() {
    super();
  }
  init(name: string) {}
  setName(name: string): void {
    this.name = name;
  }
}

const react = new React();
react.setName('react');
console.log(react.getName());

export {};
