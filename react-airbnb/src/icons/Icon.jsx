import React from 'react';
import icons from './index';

/**
 * 通用图标组件
 * @param {object} props
 * @param {string} props.name - 图标的名称
 * @param {string} [props.color='currentColor'] - 图标的颜色
 * @param {number} [props.size=16] - 当未指定 width 或 height 时的默认尺寸
 * @param {number} [props.width] - 图标的自定义宽度 (优先级高于 size)
 * @param {number} [props.height] - 图标的自定义高度 (优先级高于 size)
 * @param {string} [props.className] - 自定义的 CSS 类名
 */
const Icon = ({
  name,
  color = 'currentColor',
  size = 16,
  width,
  height,
  className,
  ...rest
}) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon with name "${name}" not found.`);
    return null;
  }

  // 如果 props 中传递了 width，就用它，否则回退到使用 size。
  // height 同理。
  const finalWidth = width || size;
  const finalHeight = height || size;

  const style = {
    width: `${finalWidth}px`,
    height: `${finalHeight}px`,
  };

  return (
    <IconComponent className={className} style={style} fill={color} {...rest} />
  );
};

export default Icon;
