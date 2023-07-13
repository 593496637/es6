// 重载签名
// 重载签名的作用是用来约束函数的调用
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: string | number, y: string | number): string | number;

// 实现签名
function add(x: any, y: any) {
  return x + y;
}

add(1, 2);
add('a', 'b');
add(1, 'b');

export {};
