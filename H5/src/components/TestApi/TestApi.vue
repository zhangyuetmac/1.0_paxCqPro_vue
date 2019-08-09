<template>
  <div id="app">
    <div>
      <button @click="getCamera()">打开相机</button>
      <div style="width:150px;height:150px;border:solid 1px black">
        <img id="myImage" style="width:150px;height:150px;" >
      </div> 
    </div>  
    <div>
      <button @click="getPicture()">打开相册</button>
      <div style="width:150px;height:150px;border:solid 1px black">
        <img id="myImage2" style="width:150px;height:150px;" >
      </div> 
    </div>  
    <div>
      <button @click="getScan()">打开扫码</button>
      <a>扫描到的二维码:</a>
      <div>
        <span>{{scanCode}}</span>
      </div>
    </div>
    <div>
      <button @click="doTrans()">发送公网get请求</button>
      <a>返回的result:</a>
      <div>
        <span>{{scanCode}}</span>
      </div>
    </div>
    <div>
       <button @click="test">测试上传图片</button>
       <button @click="test1">测试商户创建</button>
       <button @click="test2">产品</button>
       <button @click="term">终端报修</button>
        <div>上传签名：{{upload}}</div>
        <div>上传验签：{{uploadflag}}</div>
        <div>上传签名：{{mer}}</div>
        <div>商户验签：{{merflag}}</div>
    </div>
  </div>
</template>

<script>
import {
  cameraTakePicture,
  getLocalPicture
} from "../../../static/cordovaplugin.js";
import axios from "axios";
import { dictOrder, encrypt, decode } from "./../../common/js/signature.js";
import { commonParms, methodObj } from "./../../common/js/commonParams.js";
export default {
  name: "App",
  data() {
    return {
      scanCode: "",
      mer: "",
      merflag: "",
      upload: "",
      uploadflag: ""
    };
  },
  methods: {
    getCamera() {
      console.log("点击打开相机事件走到");
      cameraTakePicture();
    },
    getPicture() {
      console.log("点击打开相册");
      getLocalPicture();
    },
    getScan() {
      const that = this;
      cordova.plugins.barcodeScanner.scan(
        function(result) {
          console.log("调用扫码的返回结果===" + JSON.stringify(result));
          that.scanCode = result.text;
        },
        function(error) {
          console.log("扫码失败");
        }
      );
    },
    doTrans() {
      console.log("准备走交易");
      //  http://cqdev.paxpay.cn/cms/gateway.do    partner_id = 88888948
      axios
        .get("/cms/gateway.do", {
          params: {
            timestamp: "2013-01-01 08:08:08",
            method: "paxpay.material.image.upload",
            partner_id: "88888948",
            sign_type: "RSA",
            hash_type: "SHA256",
            sign:
              "okAfSISiu7koOUd7rqm7YGJlZ6wDWDDmiCBEjT1E8aqXKC6qFs9pT0GvFvk8ZcMJLpDbghgASKo5Qbu2W0NokW4jf4ReyWBM9ellBin6M1Sd7TdfPzlAdQ631Az%252FbHjxbz0cCqIISK58Pf2Icyc0lBQ9gsXtU69Iby6%252BdZc6LpuuZRxTL5wbtTOYuVs%252BXZZnK%252FBfDK1yVipPM%252BeDHPkSctfcdJPvDBPCMlFuMK%252BdFmpjLjUs9qcCn7EAKXiLgyVzO3stz9b3aK%252F%252BReINyApMbbS8doXPRrQDN5KJZiCTucmAeudMrkvhz39d4mXcQwk2PgEyDNnlwNOaBElyk9gbDA%253D%253D",
            version: "1.0",
            image_type: '"jpg"',
            image_name: '"海底捞"',
            image_content:
              "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALCwwMDBENDREYEA4QGBwVEREV…"
          }
        })
        .then(response => {
          console.log("访问公网接口返回的数据===" + response);
        })
        .catch(error => {
          console.log("访问公网接口返回的错误===" + error);
        });
    },
    term() {
      this._Axios
        .commonAxios(
          "post",
          "/stock/termReject",
          { sn: "11111" },
          { commType: "json" }
        )
        .then(res => {
          console.log(res);
        });
    },
    test() {
      //上传图片
      //merObj对象放置公共参数外的所有参数
      let merObj = {
        image_type: "jpg",
        image_name: "海底捞",
        image_content:
          "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALCwwMDBENDREYEA4QGBwVEREVHCEZGRkZGSEgGRwcHBwZICAlJygnJSAwMDQ0MDBAQEBAQEBAQEBAQEBAQED/2wBDAREQEBITEhYSEhYWEhUSFhwWFxcWHCgcHB0cHCgxJSAgICAlMSwvKCgoL/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALCwwMDBENDREYEA4QGBwVEREVHCEZGRkZGSEgGRwcHBwZICAlJygnJSAwMDQ0MDBAQEBAQEBAQEBAQEBAQED/2wBDAREQEBITEhYSEhYWEhUSFhwWFxcWHCgcHB0cHCgxJSAgICAlMSwvKCgoLyw2NjExNjZAQD9AQEBAQEBAQEBAQED/wAARCAAUACwDAREAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAwUAAQIEBv/EACwQAAEDAwIEBQQDAAAAAAAAAAECAwQAESEFEhMiMVEUIzIzYRUkQUNygrH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9hqGoeGKGWkcWU77bY/1XxQK16pKEnwjCTO1EZcQk7I7H81UHY1K1BpAflOsuJLqWi22gpF1KCORZUb2J7UDeglBKBLsVw5D4cSiS+soW6T7LYxbPxQAQ4y2wY2m2ZhozJnLwD3IJ9RNAOEv6g+1KILGjwT9tvwX3fTxCOwvj5oH/i4/NzgbBuVfFh3zQUJkZQSoOCzhsg9yKDTchp0bmzvT0uAbUA3oUR5e91lC19yKALmnR5K/PBW22eRn9Y/qKCtQSC5EY6NqcyBj0jFBkRW3prqVE+VsKc3JJv13XoOCOnjoZhrPkq4i1W6kgm2aBrpTinIaCr8XT2wDag//2Q=="
      };
      console.log(merObj.image_content);
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
      this.upload = params.sign;

      params.image_content = encodeURIComponent(params.image_content);

      this._Axios
        .post("/cms/gateway.do", params, {
          commType: "form"
        })
        .then(res => {
          console.log("post访问公网接口返回的数据===");

          console.log(res);
          console.log("=====验签========");
          let str2 = dictOrder(res.response);
          console.log(str2);
          console.log(decode(str2, res.sign));
          this.uploadflag = decode(str2, res.sign);
        })
        .catch();
    },
    test1() {
      //商户创建
      //merObj对象放置公共参数外的所有参数
      let merObj = {};
      merObj = {
        biz_content: {
          merchant_name: "肯德基",
          fax: "023-47904081",
          agent_id: "88888948",
          contact_name: "张三",
          mobile: "18502314927",
          email: "zhangsan@paxsz.com",
          category_id: "2015050700000018",
          storeshortname: "万塘路店",
          property: "1",
          mchdealtype: "1",
          mcc: "4011",
          province_code: "110000",
          city_code: "110100",
          district_code: "140521",
          address: "万塘路18号黄龙时代广场",
          business_time: "09:00-11:00,13:00-15:00",
          contact_type: "0",
          contact_number: "13612344321",
          contact_province: "110000",
          contact_city: "140500",
          contact_area: "140521",
          contact_address: "万塘路18号黄龙时代广场",
          main_image: "a3d1582530b14ac19e2f2e240c7ccb1d",
          shop_place_image: "a3d1582530b14ac19e2f2e240c7ccb1d",
          shop_product_image: "a3d1582530b14ac19e2f2e240c7ccb1d",
          shop_cashier_image: "a3d1582530b14ac19e2f2e240c7ccb1d",
          shop_cas: "a3d1582530b14ac19e2f2e240c7ccb1d",
          hier_image: "AAAACMAAQEC",
          enterprise_type: "0",
          org_code: "H001232",
          licence_name: "来伊份上海分公司",
          busi_address: "XX省XX市XX区XX",
          busi_legal_name: "张三",
          reg_capital: "100",
          busi_province: "110000",
          busi_city: "110100",
          busi_area: "140521",
          busi_start: "2010-03-20",
          busi_end: "2020-03-20",
          busi_license_image: "a3d1582530b14ac19e2f2e240c7ccb1d",
          legal_id_type: "1",
          legal_id_image1: "a3d1582530b14ac19e2f2e240c7ccb1d",
          legal_id_image2: "a3d1582530b14ac19e2f2e240c7ccb1d",
          legal_id_image5: "a3d1582530b14ac19e2f2e240c7ccb1d",
          legal_id_start: "2020-10-20",
          legal_id_end: "2020-10-20",
          legal_name: "张三",
          legal_id_no: "500106198606304321",
          accounttype: "2",
          accountname: "张三",
          account_code: "622212345678901234",
          bankname: "工商银行",
          sub_bank_name: "中国工商银行股份有限公司北京通州支行新华分理处",
          open_bank_pro: "北京",
          open_bank_city: "北京",
          tel: "13312312312"
        }
      };
      // console.log(merObj.image_content);
      // console.log(encodeURIComponent(merObj.image_content));
      //获取上传图片公共参数
      console.log("请求开始:" + new Date().format("yyyy-MM-dd hh:mm:ss"));
      // console.log("=====获取上传图片公共参数(含sign,method)========");

      let commonObj = commonParms(methodObj.merchantCreate); //methodObj存储所有接口method值
      // console.log(commonObj);
      //合并公共参数和请求参数
      console.log("=====合并公共参数========");
      // console.log(merObj);

      let params = { ...merObj, ...commonObj };
      // console.log(params);

      console.log("=====排序待签名字符串========");
      let str = dictOrder(params);
      // console.log(str);
      console.log("=====签名========");
      console.log("请求开始:" + new Date().format("yyyy-MM-dd hh:mm:ss"));
      // str ="charset=utf-8&format=JSON&hash_type=SHA256&image_name=txc&image_type=jpg&method=paxpay.material.image.upload&image_name=海底捞&partner_id=88888960&sign_type=RSA&timestamp=2013-01-01 08:08:08&version=1.0";
      params.sign = encrypt(str);
      this.mer = encrypt(str);
      // console.log(params);
      // console.log(params.sign);
      // axios.get("/cms/gateway.do", { params: params }).then(res => {
      //   console.log("get访问公网接口返回的数据===");
      //   console.log(res);
      // });
      // axios.get("/cms/gateway.do", { params: params }).then(res => {
      //   console.log("post访问公网接口返回的数据===");
      //   console.log(res);
      // });
      params.biz_content = JSON.stringify(params.biz_content);
      console.log("请求开始:" + new Date().format("yyyy-MM-dd hh:mm:ss"));
      this._Axios
        .post("/cms/gateway.do", params)
        .then(res => {
          console.log("响应结束:" + new Date().format("yyyy-MM-dd hh:mm:ss"));
          console.log("post访问公网接口返回的数据===");

          console.log(res);
          console.log("=====验签========");
          let str2 = dictOrder(res.response);
          console.log(str2);
          console.log(decode(str2, res.sign));
          this.merflag = decode(str2, res.sign);
          if (this.merflag) {
          }
        })
        .catch();
      // axios
      //   .post("/cms/gateway.do", qs.stringify(params), {
      //     headers: {
      //       // "Content-Type": "application/x-www-form-urlencoded"
      //     }
      //   })
      //   .then(response => {
      //     console.log("post访问公网接口返回的数据===");
      //     let res = response.data;
      //     console.log(response.data);
      //     console.log("=====验签========");
      //     let str2 = dictOrder(res.response);
      //     console.log(str2);
      //     console.log(decode(str2, res.sign));
      //     this.merflag = decode(str2, res.sign);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    test2() {
      //商户创建
      //merObj对象放置公共参数外的所有参数
      let merObj = {};
      merObj = {
        operate_notify_url: "http://example.com/gateway.do",
        request_id: "2015123235324534",
        biz_content: {
          merchant_name: "海底捞",
          contact_name: "张三",
          mobile: "13312345678",
          fax: "02367904081",
          contract_num: "12345312",
          outer_contract_num: "121321321",
          customer_manager: "李四",
          //需要使用创建商户时候返回的值，不然表里数据会出现主键冲突(需要在创建商户以后进行解析)
          store_id: "08851906000000010001",
          transtypes: [
            {
              code: "BALANCE"
            },
            {
              code: "PREAUTH"
            },
            {
              code: "SALE"
            }
          ],
          product_info: [
            {
              product_id: "01",
              lbid: "PXMP",
              sttl_type: "T1",
              nor_fee_rate_d: "0.38",
              nor_fee_min_d: "0",
              nor_fee_max_d: "999999"
            }
          ]
        }
      };
      // console.log(merObj.image_content);
      // console.log(encodeURIComponent(merObj.image_content));
      //获取上传图片公共参数
      console.log("请求开始:" + new Date().format("yyyy-MM-dd hh:mm:ss"));
      // console.log("=====获取上传图片公共参数(含sign,method)========");

      let commonObj = commonParms(methodObj.productCreate); //methodObj存储所有接口method值
      // console.log(commonObj);
      //合并公共参数和请求参数
      console.log("=====合并公共参数========");
      // console.log(merObj);

      let params = { ...merObj, ...commonObj };
      // console.log(params);

      console.log("=====排序待签名字符串========");
      let str = dictOrder(params);
      // console.log(str);
      console.log("=====签名========");
      console.log("请求开始:" + new Date().format("yyyy-MM-dd hh:mm:ss"));
      // str ="charset=utf-8&format=JSON&hash_type=SHA256&image_name=txc&image_type=jpg&method=paxpay.material.image.upload&image_name=海底捞&partner_id=88888960&sign_type=RSA&timestamp=2013-01-01 08:08:08&version=1.0";
      params.sign = encrypt(str);
      this.mer = encrypt(str);
      // console.log(params);
      // console.log(params.sign);
      // axios.get("/cms/gateway.do", { params: params }).then(res => {
      //   console.log("get访问公网接口返回的数据===");
      //   console.log(res);
      // });
      // axios.get("/cms/gateway.do", { params: params }).then(res => {
      //   console.log("post访问公网接口返回的数据===");
      //   console.log(res);
      // });
      params.biz_content = JSON.stringify(params.biz_content);
      console.log("请求开始:" + new Date().format("yyyy-MM-dd hh:mm:ss"));
      this._Axios
        .post("/cms/gateway.do", params)
        .then(res => {
          console.log("响应结束:" + new Date().format("yyyy-MM-dd hh:mm:ss"));
          console.log("post访问公网接口返回的数据===");

          console.log(res);
          console.log("=====验签========");
          let str2 = dictOrder(res.response);
          console.log(str2);
          console.log(decode(str2, res.sign));
          this.merflag = decode(str2, res.sign);
          if (this.merflag) {
          }
        })
        .catch();
      // axios
      //   .post("/cms/gateway.do", qs.stringify(params), {
      //     headers: {
      //       // "Content-Type": "application/x-www-form-urlencoded"
      //     }
      //   })
      //   .then(response => {
      //     console.log("post访问公网接口返回的数据===");
      //     let res = response.data;
      //     console.log(response.data);
      //     console.log("=====验签========");
      //     let str2 = dictOrder(res.response);
      //     console.log(str2);
      //     console.log(decode(str2, res.sign));
      //     this.merflag = decode(str2, res.sign);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    }
  }
};

function encrypt3() {
  const params = {
    timestamp: "2013-01-01 08:08:08",
    method: "paxpay.material.image.upload",
    partner_id: "88888948",
    sign_type: "RSA",
    hash_type: "SHA256",
    sign: "ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE",
    version: "1.0",
    image_type: "jpg",
    image_name: "海底捞",
    image_content:
      "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALCwwMDBENDREYEA4QGBwVEREV…"
  };
  const keys = Object.keys(params);
  console.log(keys);
  keys.sort((a, b) => (a > b ? 1 : -1));
  console.log(keys);
  const kv = [];
  keys.forEach((v, i, arr) => {
    kv.push(`${v}=${params[v]}`);
  });
  const toGetSignString = kv.join("&");
  console.log(
    "按照KEY的ASCII字符顺序排序，组成待签名字符串----" + toGetSignString
  );
}

//创建商户
function encrypt1() {
  const params = {
    timestamp: "2013-01-01 08:08:08",
    method: "paxpay.market.merchant.create",
    partner_id: "88888948",
    sign_type: "RSA",
    hash_type: "SHA256",
    version: "1.0",
    biz_content: {
      merchant_name: "海底捞",
      contact_name: "张三",
      mobile: "13312345678",
      email: "zs@mail.com",
      fax: "02367904081",
      merchant_name: "肯德基",
      agent_id: "88802000",
      contact_name: "张三",
      mobile: "18502314927",
      email: "zhangsan@paxsz.com",
      category_id: "2015050700000018",
      storeshortname: "万塘路店",
      property: "1",
      mchdealtype: "1",
      mcc: "4011",
      province_code: "110000",
      city_code: "140500",
      district_code: "140521",
      address: "万塘路18号黄龙时代广场",
      business_time: "09:00-11:00,13:00-15:00",
      contact_type: "0",
      contact_number: "13612344321",
      main_image: "1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC",
      shop_place_image: "1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC",
      shop_product_image: "1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC",
      shop_cas: "1T8Pp00AT7eo9NoAJkMR3",
      hier_image: "AAAACMAAQEC",
      enterprise_type: "0",
      org_code: "H001232",
      licence_name: "来伊份上海分公司",
      busi_address: "XX省XX市XX区XX",
      busi_legal_name: "张三",
      reg_capital: "100",
      busi_province: "110000",
      busi_city: "140500",
      busi_area: "140521",
      busi_start: "2010-03-20",
      busi_end: "2020-03-20",
      busi_license_image: "1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC",
      legal_id_type: "0",
      legal_name: "张三",
      legal_id_no: "500106198606304321",
      accounttype: "2",
      accountname: "张三",
      account_code: "622212345678901234",
      bankname: "工商银行",
      sub_bank_name: "工商银行北京支行",
      open_bank_pro: "北京",
      open_bank_city: "北京",
      tel: "13312312312"
    }
  };
  const keys = Object.keys(params);
  //console.log(keys)
  keys.sort((a, b) => (a > b ? 1 : -1));
  //console.log(keys)
  const kv = [];
  keys.forEach((v, i, arr) => {
    console.log(params[v]);
    kv.push(`${v}=${JSON.stringify(params[v])}`);
  });
  const toGetSignString = kv.join("&");
  //console.log(toGetSignString)
}

//创建商户完整版
function encrypt2() {
  const params = {
    timestamp: "2013-01-01 08:08:08",
    method: "paxpay.market.merchant.create",
    partner_id: "88888948",
    sign_type: "RSA",
    hash_type: "SHA256",
    version: "1.0",
    biz_content: {
      merchant_name: "海底捞",
      contact_name: "张三",
      mobile: "13312345678",
      email: "zs@mail.com",
      fax: "02367904081",
      merchant_name: "肯德基",
      agent_id: "88802000",
      contact_name: "张三",
      mobile: "18502314927",
      email: "zhangsan@paxsz.com",
      category_id: "2015050700000018",
      storeshortname: "万塘路店",
      property: "1",
      mchdealtype: "1",
      mcc: "4011",
      province_code: "110000",
      city_code: "140500",
      district_code: "140521",
      address: "万塘路18号黄龙时代广场",
      business_time: "09:00-11:00,13:00-15:00",
      contact_type: "0",
      contact_number: "13612344321",
      main_image: "1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC",
      shop_place_image: "1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC",
      shop_product_image: "1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC",
      shop_cas: "1T8Pp00AT7eo9NoAJkMR3",
      hier_image: "AAAACMAAQEC",
      enterprise_type: "0",
      org_code: "H001232",
      licence_name: "来伊份上海分公司",
      busi_address: "XX省XX市XX区XX",
      busi_legal_name: "张三",
      reg_capital: "100",
      busi_province: "110000",
      busi_city: "140500",
      busi_area: "140521",
      busi_start: "2010-03-20",
      busi_end: "2020-03-20",
      busi_license_image: "1T8Pp00AT7eo9NoAJkMR3AAAACMAAQEC",
      legal_id_type: "0",
      legal_name: "张三",
      legal_id_no: "500106198606304321",
      accounttype: "2",
      accountname: "张三",
      account_code: "622212345678901234",
      bankname: "工商银行",
      sub_bank_name: "工商银行北京支行",
      open_bank_pro: "北京",
      open_bank_city: "北京",
      tel: "13312312312"
    }
  };

  params.biz_content = attrObjectToString(params.biz_content);
  const toGetSignString = objectTransKeyValue(params, true, false);
  // console.log(toGetSignString);
}
encrypt2();

/**
 *
 * @param obj Object 输入对象
 * @param orderByKeyASC Boolen 是否按照key的ACI值排序
 * @param desc Boolen 是否按降序排列
 */
function objectTransKeyValue(obj, orderByKeyASC, desc) {
  const keys = Object.keys(obj);
  if (orderByKeyASC) {
    if (desc) {
      keys.sort((a, b) => (a < b ? 1 : -1));
    } else {
      keys.sort((a, b) => (a > b ? 1 : -1));
    }
  }
  const r = [];
  keys.forEach(key => {
    r.push(`${key}=${obj[key]}`);
  });
  return r.join("&");
}

function attrObjectToString(attrObject) {
  const keys = Object.keys(attrObject);
  const r = [];
  keys.forEach(key => {
    r.push(`"${key}"="${attrObject[key]}"`);
  });
  return `{${r.join(",")}}`;
}
</script>

<style lang="stylus">
html, body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
