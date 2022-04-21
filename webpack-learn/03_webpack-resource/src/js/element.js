import '../css/style.css'
import '../css/title.scss'
import '../css/image.css'
import '../fonts/iconfont.css'

const div = document.createElement('div')
div.className = 'title'
div.innerHTML = 'hello'
div.style.background = '#ccc'
document.body.appendChild(div)


// 设置背景图片
const bgDiv = document.createElement('div')
bgDiv.className = 'bgDiv'
document.body.appendChild(bgDiv)


// 设置img元素的src属性
const img = document.createElement('img')
img.style.width='200px'
img.src = require('../img/img.jpg')
document.body.appendChild(img)

// 字帖图标
const font = document.createElement('i')
font.className = 'iconfont icon-a-maikefengluyinchangge'
document.body.appendChild(font)