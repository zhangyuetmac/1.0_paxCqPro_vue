//转换成当前日期
export function dateExchange(dateString) {
  const date = new Date(dateString);
  const date_value = date.getFullYear() + '-' + paddingTen((date.getMonth() + 1)) + '-' + paddingTen(date.getDate())
  // + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  return date_value
}

//转换成当前时间
export function timeExchange() {
  const date = new Date();
  const date_value = date.getFullYear() + '-' + paddingTen((date.getMonth() + 1)) + '-' + paddingTen(date.getDate())
    + ' ' + paddingTen(date.getHours()) + ':' + paddingTen(date.getMinutes()) + ':' + paddingTen(date.getSeconds())
  return date_value
}

function paddingTen(month) {
  if (month < 10) {
    return '0' + month
  } else {
    return month
  }
}