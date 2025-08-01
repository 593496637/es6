import styled from 'styled-components';

export const PictureBrowserWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 5px 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 15px;
    cursor: pointer;
    z-index: 1000;
  }
`;
