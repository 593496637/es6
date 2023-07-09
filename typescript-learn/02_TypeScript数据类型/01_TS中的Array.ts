// 数组类型
// 不要求数组中的元素类型必须一致，但是数组中的元素类型必须是我们指定的，否则会报错
// let names: string[] = ['Tom', 'Jerry', 'Spike', 1]; // 报错

// 1。string[] 表示字符串数组
// 2. Array<string> 表示字符串数组: Array是泛型，泛型是TS中的高级内容，暂时不用管
let names: string[] = ['Tom', 'Jerry', 'Spike'];
let names2: Array<string> = ['Tom', 'Jerry', 'Spike'];
let ages: Array<number> = [18, 19, 20];

names.push('Tyke');

export {};
