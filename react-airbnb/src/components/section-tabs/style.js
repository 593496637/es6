import styled from "styled-components";

export const SectionTabsWrapper = styled.div`
  .tab-item {
    box-sizing: border-box;
    flex-basis: 120px;
    flex-shrink: 0;
    margin-right: 16px;
    padding: 8px 16px;
    border-radius: 3px;
    border: 0.5px solid #dce0e0;
    color: #717171;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    &.active {
      background-color: ${props => props.theme.color.primaryColor};
      color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    &:hover {
      background-color: ${props => props.theme.color.primaryColor};
      color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
`;