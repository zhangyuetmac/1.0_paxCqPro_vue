import { commonParms, methodObj } from "./../../common/js/commonParams.js";
import { dictOrder, encrypt, decode } from "./../../common/js/signature.js";
import *as axios from './../../common/js/myaxios.js'
async function upLoadImg(imageType, name, src) {
  return new Promise((resolve, reject) => {
    let merObj = {
      image_type: imageType,
      image_name: name,
      image_content: src
    };
    console.log('upload打印的图片数据===' + merObj.image_content);
    console.log(encodeURIComponent(merObj.image_content));
    //获取上传图片公共参数
    console.log("=====获取上传图片公共参数(含sign,method)========");
    let commonObj = commonParms(methodObj.imageUpload); //methodObj存储所有接口method值
    console.log(commonObj);
    //合并公共参数和请求参数
    console.log("=====合并公共参数========");
    let params = { ...merObj, ...commonObj };
    console.log(params);
    console.log("=====排序待签名字符串========");
    let str = dictOrder(params);
    console.log(str);
    console.log("=====签名========");
    // str ="charset=utf-8&format=JSON&hash_type=SHA256&image_name=txc&image_type=jpg&method=paxpay.material.image.upload&image_name=海底捞&partner_id=88888960&sign_type=RSA&timestamp=2013-01-01 08:08:08&version=1.0";
    params.sign = encrypt(str);
    console.log(params);
    console.log(params.sign);
    // this.upload = params.sign;
    params.image_content = encodeURIComponent(params.image_content);
    console.log('准备发送请求的参数==' + JSON.stringify(params))
    axios.post("/cms/gateway.do", params)
      .then(res => {
        // console.log("post访问公网接口返回的数据===");
        console.log("post访问公网接口返回的数据===" + JSON.stringify(res))
        console.log("=====验签========");
        let str2 = dictOrder(res.response);
        console.log(str2);
        console.log(decode(str2, res.sign));
        // this.uploadflag = decode(str2, res.sign);
        //把返回的图片返回到调用处
        resolve([res.response.msg, res.response.code, res.response.image_id])
      })
      .catch(() => {
        console.log('catch图片上传失败')
        reject('reject返回图片上传失败')
      });
  })
}
export default upLoadImg;