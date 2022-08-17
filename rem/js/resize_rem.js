// html元素
const html = document.getElementsByTagName('html')[0];
// 动态改变font-size
function resize_rem() {
  // 获取屏幕宽度
    var width = html.getBoundingClientRect().width;
    // 设置font-size = 屏幕宽度 / 20
    html.style.fontSize = width / 20 + 'px';
}
// 进入页面时就执行
resize_rem()
// 改变屏幕尺寸时执行
window.addEventListener('resize', resize_rem);