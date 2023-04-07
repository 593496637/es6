function loginAuth(Component) {
  return props => {

    const token = localStorage.getItem('token')
    if (token) {
      return <Component {...props} />
    } else {
      return <h2>请登录</h2>
    }
  }
}

export default loginAuth