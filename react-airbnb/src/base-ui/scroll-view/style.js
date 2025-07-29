import styled from 'styled-components';

export const ScrollViewWrapper = styled.div`
  position: relative;
  
  .scroll-content-box {
    overflow: hidden;
    .scroll-content {
      display: flex;
      transition: transform 0.3s ease-in-out;
    }
  }
 
  .scroll-view{
    position: absolute;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .scroll-left {
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .scroll-right {
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
  }
`;
