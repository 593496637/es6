import '../css/style.css'
import '../css/title.scss'
import '../css/image.css'

const div = document.createElement('div')
div.className = 'title'
div.innerHTML = 'hello'
div.style.background = '#ccc'
document.body.appendChild(div)


// 设置背景图片
const bgDiv = document.createElement('div')
bgDiv.className = 'bgDiv'
document.body.appendChild(bgDiv)