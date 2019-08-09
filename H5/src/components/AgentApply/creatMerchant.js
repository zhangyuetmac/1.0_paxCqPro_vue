import { commonParms, methodObj } from "./../../common/js/commonParams.js";
import { dictOrder, encrypt, decode } from "./../../common/js/signature.js";
import *as axios from './../../common/js/axios.js'
async function creatMerchant(creatMerchantParams) {
  return new Promise((resolve, reject) => {
    console.log('百富111')
      console.log(creatMerchantParams.biz_content)
      let merObj = {
      //   biz_content: {
      //     merchant_name: "东海敏",
      //     fax: "023-47904081",
      //     agent_id: "88888948",
      //     contact_name: "张跃",
      //     mobile: "18502314927",
      //     email: "zhangsan@paxsz.com",
      //     category_id: "2015050700000018",
      //     storeshortname: "万塘路店",
      //     property: "1",
      //     mchdealtype: "1",
      //     mcc: "4011",
      //     province_code: "110000",
      //     city_code: "110100",
      //     district_code: "140521",
      //     address: "万塘路18号黄龙时代广场",
      //     business_time: "09:00-11:00,13:00-15:00",
      //     contact_type: "0",
      //     contact_number: "13612344321",
      //     contact_province: "110000",
      //     contact_city: "140500",
      //     contact_area: "140521",
      //     contact_address: "万塘路18号黄龙时代广场",
      //     main_image: "c5b5f2bd083a4381a62d0373e944dc5b",
      //     shop_place_image: "c5b5f2bd083a4381a62d0373e944dc5b",
      //     shop_product_image: "c5b5f2bd083a4381a62d0373e944dc5b",
      //     shop_cashier_image: "c5b5f2bd083a4381a62d0373e944dc5b",
      //     shop_cas: "c5b5f2bd083a4381a62d0373e944dc5b",
      //     hier_image: "AAAACMAAQEC",
      //     enterprise_type: "0",
      //     org_code: "H001232",
      //     licence_name: "来伊份上海分公司",
      //     busi_address: "XX省XX市XX区XX",
      //     busi_legal_name: "张三",
      //     reg_capital: "100",
      //     busi_province: "110000",
      //     busi_city: "110100",
      //     busi_area: "140521",
      //     busi_start: "2010-03-20",
      //     busi_end: "2020-03-20",
      //     busi_license_image: "c5b5f2bd083a4381a62d0373e944dc5b",
      //     legal_id_type: "2",
      //     legal_id_image1: "c5b5f2bd083a4381a62d0373e944dc5b",
      //     legal_id_image2: "c5b5f2bd083a4381a62d0373e944dc5b",
      //     legal_id_image3:'c5b5f2bd083a4381a62d0373e944dc5b',
      //     legal_id_image4:'c5b5f2bd083a4381a62d0373e944dc5b',
      //     legal_id_image5: "c5b5f2bd083a4381a62d0373e944dc5b",
      //      bankcard_image1:'c5b5f2bd083a4381a62d0373e944dc5b',
      //      bankcard_image2:'c5b5f2bd083a4381a62d0373e944dc5b',
      //     legal_id_start: "2020-10-20",
      //     legal_id_end: "2020-10-20",
      //     legal_name: "张三",
      //     legal_id_no: "500106198606304321",
      //     accounttype: "2",
      //     accountname: "张三",
      //     account_code: "622212345678901234",
      //     bankname: "工商银行",
      //     sub_bank_name: "中国工商银行股份有限公司北京通州支行新华分理处",
      //     open_bank_pro: "北京",
      //     open_bank_city: "北京",
      //     tel: "13312312312"
      //  }
        biz_content:creatMerchantParams.biz_content
      }
      console.log('百富222')
      console.log(merObj)
      // console.log(merObj.image_content);
      // console.log(encodeURIComponent(merObj.image_content));
      //获取上传图片公共参数
      console.log("=====获取上传图片公共参数(含sign,method)========");
      let commonObj = commonParms(methodObj.merchantCreate); //methodObj存储所有接口method值
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
      params.biz_content = JSON.stringify(params.biz_content)
      axios.post("/cms/gateway.do", params)
        .then(res => {
          console.log("post访问公网接口返回的数据===");
          console.log(res);
          console.log("=====验签========");
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
export default creatMerchant;