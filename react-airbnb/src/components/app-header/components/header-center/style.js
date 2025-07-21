import styled from 'styled-components'

export const HeaderCenterWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .search-bar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 320px;
    height: 46px;
    border-radius: 24px;
    border: 1px solid #efefef;
    padding: 0 10px;
    ${props => props.theme.theme.boxShadow}
    .icon{
      background-color: ${props => props.theme.color.primaryColor};
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    input{
      border: none;
      outline: none;
      font-size: 14px;
      width: 100%;
      height: 100%;
      padding: 0 10px;
      border-radius: 24px;
    }
  }
`
