import styled from 'styled-components';
export const EntirePaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  
  .MuiPaginationItem-page{
    margin:0 10px;
    &:hover{
      text-decoration: underline;
    }
    &.Mui-selected{
      background-color: #000;
      &:hover{
        background-color: #000;
      }
    }
  }

  .desc {
    margin-top: 10px;
    color: #666;
    font-size: 12px;
  }

`;
