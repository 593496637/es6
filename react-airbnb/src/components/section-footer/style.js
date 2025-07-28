import styled from 'styled-components';

export const SectionFooterWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    cursor: pointer;
    font-weight: 600;
    color: ${props => props.color};
    .arrow {
      margin-left: 4px;
    }
  }
`;