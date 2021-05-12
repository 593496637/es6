const main = document.getElementById('range');
const icon = document.querySelector('.icon');
let mainWidth = 0;
let mainHeight = 0;
let move = false;
let deltaLeft = 0,
	deltaTop = 0;

icon.addEventListener('mousedown', function(e) {
	/** @des deltaLeft 即移动过程中不变的值 */
	deltaLeft = e.clientX - e.target.offsetLeft;
	deltaTop = e.clientY - e.target.offsetTop;
	mainWidth = main.offsetWidth;
	mainHeight = main.offsetHeight;

	move = true;
})

main.addEventListener('mousemove', function(e) {
	if (move) {
		const cx = e.clientX;
		const cy = e.clientY;
		/** 相减即可得到相对于父元素移动的位置 */
		let dx = cx - deltaLeft
		let dy = cy - deltaTop

		/** 防止超出父元素范围 */
		if (dx <= 0) dx = 0
		if (dy <= 0) dy = 0
		if (dx >= mainWidth) dx = mainWidth
		if (dy >= mainHeight) dy = mainHeight
		icon.setAttribute('style', `left:${dx}px;top:${dy}px`)
	}
})

document.addEventListener('mouseup', function(e) {
	move = false;
	console.log('mouseup');
})
