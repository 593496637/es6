function add(a, b) {
return a + b;
}


// 让 TurboFan 热起来
for (let i = 0; i < 1e6; i++) add(1, 2);


// 改变类型触发反优化
add('1', 2);