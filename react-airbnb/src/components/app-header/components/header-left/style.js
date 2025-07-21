import styled from 'styled-components'

export const HeaderLeftWrapper = styled.div`
  flex: 1;
  padding-left: 32px;
  .logo{
    color: ${props => props.theme.color.primaryColor};
    cursor: pointer;
  }
`