import styled from 'styled-components';

export const RoomItemWrapper = styled.div`
  width: ${(props) => props.$itemWidth};
  flex-shrink: 0;
  .inner {
    width: 100%;
    padding: 8px;
    .cover {
      position: relative;
      width: 100%;
      border-radius: 6px;
      padding-top: 75%; // 4:3比例
      cursor: pointer;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 3px;
      }
    }
    .swiper {
      position: relative;
      &:hover {
        .swiper-nav {
          opacity: 1;
        }
        // 鼠标移入时按钮变小
        .swiper-nav-left,
        .swiper-nav-right {
          width: 40px; /* 变小的宽度 */
          background: linear-gradient(
            to left,
            transparent 0%,
            rgba(0, 0, 0, 0.5) 100%
          );
        }
        .swiper-nav-right {
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.5) 100%
          );
        }
      }
      .swiper-nav {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: all 0.3s ease;
        cursor: pointer;
        .swiper-nav-item {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease; /* 平滑过渡大小变化 */
        }
        &-left {
          left: 0;
          width: 60px; /* 初始大一点的宽度 */
          background: linear-gradient(
            to left,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 100%
          );
        }
        &-right {
          right: 0;
          width: 60px; /* 初始大一点的宽度 */
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 100%
          );
        }
        .icon {
          transition: transform 0.2s ease;
        }
        .swiper-nav-item:hover .icon {
          transform: scale(1.2);
        }
      }

      /* indicator */
      .swiper-indicator {
        position: absolute;
        z-index: 2;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        height: 10px;
        width: 30%;
        .swiper-indicator-item {
          width: 14.27%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .dot {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #fff;
            &.active {
              width: 6px;
              height: 6px;
              background-color: red;
            }
          }
        }
      }
    }

    .desc {
      margin: 8px 0 4px;
      font-size: 12px;
      font-weight: 600;
      color: ${(props) => props.color};
    }
    .name {
      font-size: 14px;
      color: #333;
      font-weight: 600;
      /* 多行省略 */
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* 限制显示2行 */
    }
    .price-info {
      display: flex;
      align-items: center;
      margin-top: 8px;
      .price-info-price {
        font-size: 12px;
        color: var(--text-color-quaternary);
      }
      .price-info-unit {
        font-size: 12px;
        color: var(--text-color-quaternary);
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      margin-top: 8px;
      .bottom-number {
        font-size: 12px;
        color: var(--text-color-quaternary);
      }
      .bottom-divider {
        font-size: 12px;
        margin: 0 2px;
        color: var(--text-color-quaternary);
      }
      .bottom-text {
        font-size: 12px;
        color: var(--text-color-quaternary);
      }
    }
  }
`;
