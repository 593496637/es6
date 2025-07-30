import styled from 'styled-components';

export const LongItemWrapper = styled.div`
  width: 20%;
  flex-shrink: 0;
  padding: 4px;
  .longfor-item-cover {
    width: 100%;
    padding-top: 120%;
    position: relative;
    .longfor-item-img-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 4px;
      .longfor-item-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
      }
    }
    .longfor-item-info {
      border-radius: 4px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.8)
      );
      font-size: 12px;
      color: #fff;
      gap: 5px;
      .longfor-item-title {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
`;
