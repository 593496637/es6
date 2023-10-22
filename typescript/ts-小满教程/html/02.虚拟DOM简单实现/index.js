// 1.class的基本使用，继承、类型约束、implements接口
// 2.class的修饰符、readonly、static、public、private、protected
// 3.super原理
// 4.静态属性、静态方法
// 5.get、set
// 虚拟dom简单实现
class Dom {
    // 创建节点的方法
    createELement(el) {
        return document.createElement(el);
    }
    // 填充文本的方法
    setText(el, text) {
        el.textContent = text;
    }
    // 渲染函数
    render(data) {
        const root = this.createELement(data.tag);
        if (data.children && Array.isArray(data.children)) {
            data.children.forEach((item) => {
                const child = this.render(item);
                root.appendChild(child);
            });
        }
        else {
            this.setText(root, data.text);
        }
        return root;
    }
}
class Vue extends Dom {
    constructor(options) {
        super();
        this.options = options;
        this.init();
    }
    init() {
        let data = {
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
        const app = typeof this.options.el === 'string'
            ? document.querySelector(this.options.el)
            : this.options.el;
        app.appendChild(this.render(data));
    }
}
new Vue({
    el: '#app',
});
