export default function directiveUnit(app) {
  app.directive('unit', {
    mounted(el, binding) {
      console.log(el);
      console.log(binding);
      const unit = binding.value ? binding.value : '￥'
      el.innerText = unit + el.innerText
    }
  })
}