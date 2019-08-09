//引入npm安装的jsonp
import originJsonp from 'jsonp'
//对外暴露jsonp方法,让外部调用
//原始的jsonp方法 jsonp(url, opts, fn),第二个参数传入的是option,不传data
//自己封装的这个jsop函数,url这个地址包含一些参数,通过第二个参数data里面的数据，拼接到url里面去
export default function jsonp(url, data, option) {
  //判断url里面有没有问号
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  //返回一个promise,promise通常包含两个参数，第一个是resove,第二个是reject
  //resove代表promise成功,reject代表promise失败
  return new Promise((resolve, reject) => {
    //originJsonp(url, option, (err, data))是调用的原始的jsonp方法,传的三个参数需要正确,(err, data) => 表示回调，
    originJsonp(url, option, function(err, data){
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
