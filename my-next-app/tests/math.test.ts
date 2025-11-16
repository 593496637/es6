// tests/math.test.ts

// 最简单的“被测试函数”
function add(a: number, b: number) {
  return a + b;
}

describe('add 函数', () => {
  it('1 + 2 等于 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('0 + 0 等于 0', () => {
    expect(add(0, 0)).toBe(0);
  });
});
