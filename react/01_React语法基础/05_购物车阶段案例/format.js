// 拼接货币符号,可传入别的货币符号,默认为￥，保留两位小数，如果传入的是字符串，转换为数字
function formatMoney(money, symbol = '￥', fixed = 2) {
  return symbol + parseFloat(money).toFixed(fixed);
}
