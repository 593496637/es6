import styled from 'styled-components';

export const EntireFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dce0e0;
  padding: 4px 10px;
  .item {
    padding: 6px 16px;
    border-radius: 4px;
    background-color: #fff;
    color: #111;
    border: 1px solid #dce0e0;
    margin-right: 10px;
    transition: all 0.3s ease;
    font-size: 12px;
    &:hover {
      background-color: #f2f3f5;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    &.active {
      background-color: ${(props) => props.theme.color.primaryColor};
      color: #fff;
    }
  }
`;
