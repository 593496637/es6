import styled from 'styled-components';

export const AppContainer = styled.div`
  /* 设置为flex容器，垂直方向布局 */
  display: flex;
  flex-direction: column;
  
  /* 确保占满整个视口高度，实现三段式布局 */
  min-height: 100vh;
  
  /* 页面主内容区域样式 */
  .page {
    /* 自动填充header和footer之间的剩余空间 */
    flex: 1;
    
    /* 防止内容区域收缩过小 */
    min-height: 0;
    
    /* 移除独立滚动设置，使用浏览器默认滚动避免冲突 */
  }
`; 