// any类型：表示的是任意类型，一个变量设置类型为any后，相当于对该变量关闭了TS的类型检测
let id: any = 1;

id = '1';
id = true;

id = undefined;

id = null;

id = {};

export {};
