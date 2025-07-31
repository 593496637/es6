import styled from 'styled-components';

export const EntireRoomsWrapper = styled.div`
  padding: 40px 20px;
  position: relative;
  .title {
    font-size: 20px;
    margin-left: 10px;
  }
  .room-list {
    display: flex;
    flex-wrap: wrap;
  }
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    padding-top: 30%;
  }
`;
