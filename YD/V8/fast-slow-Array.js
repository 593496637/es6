const arr = [1, 2, 3];
arr[20] = 10; // 快数组
// arr[2000] = 10; // 慢数组
// %DebugPrint(arr);

/* 
    如果要测试的话，把上方注释取消，在终端运行以下命令：
    node --allow-natives-syntax fast-slow-Array.js
*/
