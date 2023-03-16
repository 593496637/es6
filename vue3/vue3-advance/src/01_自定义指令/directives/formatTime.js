import dayjs from 'dayjs'
export default function directiveFormatTime(app) {
  app.directive('formatTime', {
    mounted(el, binding) {
      let timestamp = el.textContent
      timestamp.length === 10 && (timestamp *= 1000)
      const format = binding.value || 'YYYY-MM-DD HH:mm:ss'
      el.textContent = dayjs(+timestamp).format(format)
    }
  })
}