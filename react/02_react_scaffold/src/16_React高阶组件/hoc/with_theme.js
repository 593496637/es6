import ThemeContext from "../context/theme_context";
function withTheme(OriginComponent) {
  return (props) => {
    return (
      <ThemeContext.Consumer>
        {
          (theme) => {
            return <OriginComponent {...props} theme={theme} />
          }
        }
      </ThemeContext.Consumer>
    )
  }
}

export default withTheme;