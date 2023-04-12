import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;

  .title{
    font-size: ${props => props.theme.size};
    color: ${props => props.theme.color};
  }
  .list{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0;
    .item{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100px;
      border: 1px solid #ccc;
      margin: 10px 0;
    }
  }
`

// 定义Button样式
export const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: #61dafb;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ff6a00;
  }
`

// 继承Button样式
export const Button2 = styled(Button)`
  background-color: #bb5500;
`