async function async1() {
  console.log(1);
  await async2()
  console.log(3);
}

async function async2() {
  console.log(2);
}

async1()
console.log(4);

// 1 2 4 3