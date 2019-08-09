import { commonParms, methodObj } from "./../../common/js/commonParams.js";
import { dictOrder, encrypt, decode } from "./../../common/js/signature.js";
import *as axios from './../../common/js/myaxios.js'
async function productCreate(productCreateParams) {
  return new Promise((resolve, reject) => {
    console.log('百富111')
      console.log(productCreateParams.biz_content)
      let merObj = {
        operate_notify_url: 'http://example.com/gateway.do',
        request_id: '2015123235324534',
        biz_content:productCreateParams.biz_content
      }
      let commonObj = commonParms(methodObj.productCreate); //methodObj存储所有接口method值
      console.log(commonObj);
      //合并公共参数和请求参数
      let params = { ...merObj, ...commonObj };
      console.log(params);
      let str = dictOrder(params);
      params.sign = encrypt(str);
      console.log('最后去请求创建产品接口的数据==='+JSON.stringify(params));
      console.log(params.sign);
      params.biz_content = JSON.stringify(params.biz_content)
      axios.post("/cms/gateway.do", params)
        .then(res => {
          console.log("post访问公网接口返回的数据===");
          console.log(res);
          let str2 = dictOrder(res.response);
          console.log(str2);
          console.log(decode(str2, res.sign));
          // this.uploadflag = decode(str2, res.sign);
          //返回商户创建是否成功的消息
          resolve(res.response.code)
        })
        .catch(()=>{
          reject('商户创建失败')
        });
  })
}
export default productCreate;