let arr = ['aa', 'bb'];
for (let s of arr) {
	console.log(s);
}


function square() {
	let numbers = [];
	for (let number of arguments) {
		numbers.push(number * number);
	}
	return numbers;
}

square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]


(function(value) {
	return function() {
		console.log(value);
	}
}(i))


var funcs = [],
	object = {
		a: true,
		b: true,
		c: true
	}; // 不会导致错误
for (const key in object) {
	funcs.push(function() {
		console.log(key);
	});
}
funcs.forEach(function(func) {
	func(); // 依次输出 "a"、 "b"、 "c"
});


let aa = '我是剩';
let b = aa.startsWith('我', 0);
let a = aa.includes('是', 0);
let c = aa.endsWith('剩', 3);
console.log(a, b, c);


// repeat

'x'.repeat(3); //xxx


function mixArgs(first, second){
	"use strict";
	console.log(first === arguments[0]);
	console.log(second === arguments[1]);
	first = "c";
	second = "d"
	console.log(first === arguments[0]);
	console.log(second === arguments[1]);
}
mixArgs("a", "b");
