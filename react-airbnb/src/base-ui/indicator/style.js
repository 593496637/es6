import styled from 'styled-components';

export const IndicatorWrapper = styled.div`
  overflow: hidden;

  .indicator {
    display: flex;
    position: relative;
    
    /* 
      为了实现平滑的滚动动画效果。
      只对 transform 属性应用过渡，可以获得比 'all' 更好的性能。
    */
    transition: transform 250ms ease-in-out;

    > * {
      /* 防止子元素被压缩，确保它们保持原始宽度 */
      flex-shrink: 0;
    }
  }
`;
