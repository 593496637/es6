const showAnimate = {
  updated(el, binding) {
    // 获取参数和修饰符
    const arg = binding.arg;
    const delay = binding.modifiers.delay;

    // 设置初始样式
    el.style.opacity = 0;
    el.style.transition = "all 0.5s";

    // 根据参数设置不同的动画效果
    switch (arg) {
      case "fade":
        el.style.transform = "scale(0.5)";
        break;
      case "slide":
        el.style.transform = "translateX(-100%)";
        break;
      case "rotate":
        el.style.transform = "rotate(-90deg)";
        break;
      default:
        break;
    }

    // 根据绑定的值显示或隐藏元素
    if (binding.value) {
      // 如果有delay修饰符，则延迟1秒后执行动画
      if (delay) {
        setTimeout(() => {
          el.style.opacity = 1;
          el.style.transform = "none";
        }, 100);
      } else {
        // 否则立即执行动画
        el.style.opacity = 1;
        el.style.transform = "none";
      }
    } else {
      // 隐藏元素
      el.style.opacity = 0;
      el.style.transform = arg ? `scale(0.5)` : `translateX(-100%)`;
    }
  },
};

export default function directiveAnimate(app) {
  return app.directive("showAnimate", showAnimate);
}