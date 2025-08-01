import { useEffect } from 'react';

/**
 * @description 一个自定义 Hook，用于将容器内指定索引的子元素滚动到视图中央。
 * @param {React.RefObject} elementRef - 指向容器元素的 ref。
 * @param {*} dependency - useEffect 的依赖项，当它变化时会触发滚动逻辑。
 */
export function useScrollToCenter(elementRef, dependency) {
  useEffect(() => {
    /**
     * @description 核心逻辑：当依赖项变化时，自动滚动容器，
     *              使当前选中的项目居中显示。
     */

    // 1. 获取 DOM 元素
    const containerEl = elementRef.current;
    // ?. 可选链操作符确保 containerEl 存在时才继续访问 children
    const currentItemEl = containerEl?.children[dependency];

    // 2. 健壮性检查：如果容器或当前项目不存在，则直接返回
    if (!containerEl || !currentItemEl) return;

    // 3. 计算滚动的距离
    // 目标：将 currentItemEl 移动到 containerEl 的中心
    // 公式: 目标滚动距离 = 元素左侧偏移 + 元素宽度的一半 - 容器宽度的一半
    const itemOffsetLeft = currentItemEl.offsetLeft;
    const itemWidth = currentItemEl.clientWidth;
    const containerWidth = containerEl.clientWidth;
    let scrollDistance = itemOffsetLeft + itemWidth * 0.5 - containerWidth * 0.5;

    // 4. 处理边界情况，防止过度滚动
    // 最小滚动距离不能小于 0
    if (scrollDistance < 0) {
      scrollDistance = 0;
    }

    // 最大滚动距离 = 总可滚动宽度 - 可见宽度
    const containerScrollWidth = containerEl.scrollWidth;
    const maxScrollDistance = containerScrollWidth - containerWidth;
    if (scrollDistance > maxScrollDistance) {
      scrollDistance = maxScrollDistance;
    }

    // 5. 应用 transform 实现平滑滚动
    containerEl.style.transform = `translateX(${-scrollDistance}px)`;
  }, [elementRef, dependency]); // 当依赖项或 ref 变化时，effect 会重新执行
}
