import axios from 'axios'
import { Toast } from 'vant'
import Vue from 'vue'
export function getCodeAxios(param,type){
  console.log('Vue.prototype.BASE_URL=='+Vue.prototype.BASE_URL)
  const url = Vue.prototype.BASE_URL+'cs/stock/sms/'+param.phoneNo+"?"+'type='+type
  axios.post(url, param).then((res) => {
    console.log("注册验证码返回的数据==="+JSON.stringify(res));
    if (res.data.status === 200){
      Toast("验证码获取成功")
      console.log('验证码获取成功')
    } else {
      Toast(res.data.message)
    }
  })
  .catch((e)=>{
    Toast("验证码获取失败")
    console.log('获取验证码失败catch  e==='+e)
  });
}