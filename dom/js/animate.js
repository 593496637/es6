function animate(obj, target, callback) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		// 步长写到定时器里
		var step = (target - obj.offsetLeft) / 10;
		// 当步长大于0时向上取整，小于0时向下取整。避免移动位置不准的问题
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		console.log(step);
		if (obj.offsetLeft === target) {
			clearInterval(obj.timer);
			callback && callback();
		}
		// 缓动动画，步长公式（目标值-现在的位置）/10
		obj.style.left = obj.offsetLeft + step + "px";
	}, 15)
}
