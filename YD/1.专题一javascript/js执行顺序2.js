const pro = new Promise((resolve, reject) => {
  const innerPro = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve(11)
    })
    console.log(2);
    resolve(3)
  })
  innerPro.then(res => console.log(res))
  resolve(4)
  console.log('😄');
})

pro.then(res => console.log(res))
console.log('end');

// 2
// 😄
// end
// 3
// 4
// 1