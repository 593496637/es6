import styled from 'styled-components';

export const PictureBrowserWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  z-index: 999;
  display: flex;
  flex-direction: column;

  /* 顶部区域 */
  .top-bar {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
    
    .close-btn {
      width: 32px;
      height: 32px;
      cursor: pointer;
      color: #fff;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.2);
      }
    }
  }

  /* 图片区域 - 核心修改区域 */
  .picture-container {
    flex: 1;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .pic-transition-group {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .picture-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 4px;
      user-select: none;
      
      z-index: 1;
      /* 新增：性能优化，明确告知浏览器哪些属性将要动画 */
      will-change: transform, opacity;
    }

    .cover-enter {
      transform: translateX(${props => props.direction === 'right' ? '100%' : '-100%'});
      opacity: 0;
    }
    .cover-enter-active {
      transform: translateX(0);
      opacity: 1;
      /* 修改：使用 all 让写法更稳健，确保所有变化的属性都应用过渡 */
      transition: all 200ms ease;
      z-index: 2;
    }
    /* .cover-exit {
      opacity: 1;
    }
    .cover-exit-active {
      opacity: 0;
      transition: all 200ms ease;
    } */
  }

  /* 左右两侧的切换按钮 */
  .switch-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 48px;
    height: 48px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
    user-select: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }

    &.left {
      left: 20px;
    }
    &.right {
      right: 20px;
    }
  }

  /* 底部区域 */
  .bottom-bar {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    .info-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 90%;
      .info {
        display: flex;
        color: #fff;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .info-btn {
          margin-left: 10px;
          background-color: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
        }
      }
      .list-container {
        width: 100%;
        height: 0;
        overflow: hidden;
        transition: height 0.3s ease;
        &.list-container-show{
          height: 100px;
        }
        .list-item {
          width: 16.67%;
          height: 100px;
          position: relative;
          opacity: 0.5;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 5px;
          &:hover{
            opacity: 1;
          }
          &.active{
            opacity: 1;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
`;