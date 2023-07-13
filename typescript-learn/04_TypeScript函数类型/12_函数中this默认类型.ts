let obj = {
  name: '小甜甜',
  getName() {
    return this.name;
  },
};

obj.getName();

// this编译选项
//tsconfig.json中打开 "noImplicitThis": true,this就会是模糊类型any

// 这里注释打开后会提示报错
// function fn(){
// //  默认情况下，this是any类型
//   console.log(this);
// }

export {}