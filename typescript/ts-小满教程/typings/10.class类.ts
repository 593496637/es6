// 1.class的基本使用，继承、类型约束、implements接口
// 2.class的修饰符、readonly、static、public、private、protected
//   private: 只能在当前类中使用，不能在子类中使用，也不能在实例中使用
//   protected: 只能在当前类和子类中使用，不能在实例中使用
//   public: 默认的，可以在当前类、子类、实例中使用
// 3.super原理
// 4.静态属性、静态方法
// 5.get、set

// 1.class的基本使用，继承、类型约束、implements接口
interface Options {
  el: string | HTMLElement;
}
interface VueCls {
  options: Options;
  init(): void;
}
interface Vnode {
  tag: string; //div sectoin header
  text?: string;
  children?: Vnode[];
}
// 虚拟dom简单实现:可查看html文件夹下的虚拟dom简单实现
class Dom {
  // 创建节点的方法
  private createELement(el: string) {
    return document.createElement(el);
  }
  // 填充文本的方法
  private setText(el: HTMLElement, text: string | null) {
    el.textContent = text;
  }
  // 渲染函数
  protected render(data: Vnode) {
    const root = this.createELement(data.tag);
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach((item) => {
        const child = this.render(item);
        root.appendChild(child);
      });
    } else {
      this.setText(root, data.text);
    }
    return root;
  }
}

class Vue extends Dom implements VueCls {
  readonly options: Options;
  static version: string = '1.0.0';
  constructor(options: Options) {
    super(); //super原理：父类的prototype.constrctor.call
    this.options = options;
    this.init();
  }
  public init(): void {
    let data: Vnode = {
      tag: 'div',
      text: 'hello',
      children: [
        {
          tag: 'span',
          text: 'world',
        },
        {
          tag: 'section',
          text: 'section',
        },
      ],
    };
    const app =
      typeof this.options.el === 'string'
        ? document.querySelector(this.options.el)
        : this.options.el;
    app.appendChild(this.render(data));
  }
}

new Vue({
  el: '#app',
});

// 静态属性
console.log(Vue.version);


// get set
class Person {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}

export {};
