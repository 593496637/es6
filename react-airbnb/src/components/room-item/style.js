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
