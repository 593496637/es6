import styled from 'styled-components';
import { primaryColor, secondaryColor, tertiaryColor, largeFontSize } from './style/variables'

// 语法：styled.标签名`样式`，标签名可以是任意的html标签
export const AppWrapper = styled.div.attrs(
  props => ({
    // 设置默认值:没有默认值，使用传进来的参数
    primaryColor: props.primaryColor || '#61dafb',
    width: props.width || '50px',
    height: props.height || '50px',
    color: props.color || 'red',
  })
)`
  text-align: center;
  .app-logo {
    animation: App-logo-spin infinite 2s linear;
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: ${props => props.color};
    display: inline-block;
  }

  @keyframes App-logo-spin {
    from { transform: rotate(0deg);}
    to { transform: rotate(360deg);}
  }

  .app-header {
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
  }
`;

export const AppTitle = styled.h2`
  font-size: ${largeFontSize};
  /* 设置默认值:没有默认值，使用传进来的参数 */
  color: ${props => props.color ? props.color : primaryColor}; 
  &:hover {
    color: ${secondaryColor};
    background-color: ${tertiaryColor};
  }
`;