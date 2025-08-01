import styled from 'styled-components';

export const DetailPicturesWrapper = styled.div`
  position: relative;
  .pictures-container {
    box-sizing: border-box;
    /* 使用固定尺寸容器确保比例稳定 */
    width: 100%;
    height: 600px;
    display: flex;
    background-color: #fff;
    overflow: hidden;

    /* 图片加载后切换缝隙颜色为深色 */
    &:has(img[src]) {
      background-color: #333;
    }

    /* 基础样式 - 所有图片默认高亮 */
    .pictures-left,
    .pictures-right-item {
      transition: filter 0.3s ease;
      filter: brightness(1) contrast(1);
      background-color: #efefef;
    }

    /* 鼠标悬停效果 */
    &:hover {
      .pictures-left:not(:hover),
      .pictures-right-item:not(:hover) {
        filter: brightness(0.7) contrast(0.9);
      }
    }

    .pictures-left {
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      position: relative;
      margin-right: 1px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* 保持比例并填充容器 */
        display: block;
      }
    }

    .pictures-right {
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 1fr 1fr;
      /* 关键：固定两行高度各占50% */
      grid-template-rows: 1fr 1fr;
      width: calc(50% - 1px);
      /* 强制固定高度，不受内容影响 */
      height: 100%;
      gap: 1px;
      background-color: inherit;

      .pictures-right-item {
        position: relative;
        /* 确保每个项目高度严格为父容器的一半 */
        min-height: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* 保持图片比例，避免拉伸 */
          display: block;
        }
      }
    }
  }

  .picture-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 120px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 15px;
    cursor: pointer;
    z-index: 998;
  }
`;
