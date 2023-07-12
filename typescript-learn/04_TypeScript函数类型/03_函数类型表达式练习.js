function calc(fn) {
  const x = 100;
  const y = 200;

  const result = fn(x, y)
  console.log(result);

}

function add(x, y) {
  return x + y;
}

function minus(x, y) {
  return x - y;
}

calc(add);
calc(minus);