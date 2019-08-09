Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}
/**
 * 所有接口公共参数封装
 * 
 */
let params = {
  "partner_id": "88888948",
  // const format = "JSON"
  "charset": "utf-8",
  "sign_type": "RSA",
  "hash_type": "SHA256",
  "version": "1.0",
}
// const params2 = {

//   "operate_notify_url": "http://example.com/gateway.do",
//   "request_id": "2015123235324534"
// }
export let methodObj = {
  imageUpload: "paxpay.material.image.upload",//1上传图片
  merchantCreate: "paxpay.market.merchant.create",//2商户创建
  merchantQuery: "paxpay.market.merchant.query",//3查询商户信息
  shopCreate: "paxpay.market.shop.create",//4创建门店
  shopQuery: "paxpay.market.shop.query",//5查询门店信息
  productCreate: "paxpay.shop.product.create",//6新增门店产品
  productQuery: "paxpay.shop.product.query",//7查询产品
  shopBackfill: "paxpay.shop.backfill",//8门店信息回填
  merTermCreate: "paxpay.shop.MerTerm.create",//9创建门店商户终端
  checkMidandTid: "paxpay.mer.checkMidandTid",//10查询商户是否进件
}

export function commonParms(url) {
  let data = {
    "method": url,
    'sign': "",
    "timestamp": new Date().format("yyyy-MM-dd hh:mm:ss")//,//格式 "2019-06-04 15:41:43"
  }
  return { ...params, ...data };
}
// //2商户创建
// export function merchantCreate() {
//   let data = {

//     "method": "paxpay.market.merchant.create",
//     // "format": "JSON",//非必传
//     'sign': "",
//     "timestamp": new Date().format("yyyy-MM-dd hh:mm:ss") //"2013-01-01 08:08:08" ,//格式"2016-08-23 03:07:50"


//   }
//   return { ...params1, ...data };
// }