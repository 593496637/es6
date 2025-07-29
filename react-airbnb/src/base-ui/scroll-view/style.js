import styled from 'styled-components';

export const ScrollViewWrapper = styled.div`
  overflow: hidden;
  .scroll-content {
    display: flex;
    position: relative;
    transition: transform 0.3s ease-in-out;
  }
`;
