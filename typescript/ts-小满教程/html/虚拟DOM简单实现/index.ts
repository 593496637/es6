// 1.class的基本使用，继承、类型约束、implements接口
// 2.class的修饰符、readonly、static、public、private、protected
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
// 虚拟dom简单实现
class Dom {
  // 创建节点的方法
  createELement(el: string) {
    return document.createElement(el);
  }
  // 填充文本的方法
  setText(el: HTMLElement, text: string | null) {
    el.textContent = text;
  }
  // 渲染函数
  render(data: Vnode) {
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
  options: Options;
  constructor(options: Options) {
    super();
    this.options = options;
    this.init();
  }
  init(): void {
    let data: Vnode = {
      tag: 'div',
      children: [
        {
          tag: 'span',
          text: 'world',
        },
        {
          tag: 'section',
          children: [
            {
              tag: 'header',
              text: 'header',
            },
          ],
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
