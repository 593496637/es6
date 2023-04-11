import styled from 'styled-components';

export const AppWrapper = styled.div`
  text-align: center;
  .app-logo {
    animation: App-logo-spin infinite 2s linear;
    width: 80px;
    height: 80px;
    background-color: red;
    display: inline-block;
  }

  @keyframes App-logo-spin {
    from { transform: rotate(0deg);}
    to { transform: rotate(360deg);}
  }

  .app-header {
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
  }
`;

export const AppTitle = styled.h2`
  font-size: 1.5em;
  color: blue;
`;