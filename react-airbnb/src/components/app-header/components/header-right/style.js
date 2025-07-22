import styled from 'styled-components'

export const HeaderRightWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 32px;
  flex-direction: row;
  .btns{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    gap: 5px;
    .btn{
      padding: 6px 6px;
      border-radius: 20px;
      cursor: pointer;
      &:hover{
        background-color: #f2f2f2;
      }
    }
  }
  .icons{
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 16px;
      cursor: pointer;
      margin-right: 4px;
      &:hover{
        background-color: #f2f2f2;
      }
    }
    .icon {
      cursor: pointer;
      color: #717171;
    }
    .icons-right{
      cursor: pointer;
      display: flex;
      align-items: center;
      border: 1px solid #efefef;
      border-radius:20px;
      padding: 0 10px;
      gap: 10px;
      ${props => props.theme.theme.boxShadow}
      position: relative;
      .panel{
        position: absolute;
        top: 40px;
        right: 0;
        width: 200px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        font-size: 13px;
        .panel-item{
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #efefef;
          text-align: left;
          &:last-child{
            border-bottom: none;
          }
          .item{
            padding: 15px 20px;
            width: 100%;
            &:hover{
              background-color: #f2f2f2;
            }
          }
        }
        .panel-top{
         
        }
        .panel-bottom{
          
        }
      }
    }
  }
`;