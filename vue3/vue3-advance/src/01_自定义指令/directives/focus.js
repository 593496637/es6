// 获取焦点指令
export default function directiveFocus(app) {
  app.directive('focus', {
    mounted(el) {
      el.focus()
    }
  })
}