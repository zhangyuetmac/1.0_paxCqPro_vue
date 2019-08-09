import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'
import Vue from 'vue'
export function registerAxios(registerParam) {
  return new Promise((resolve, reject) => {
    const registerUrl =Vue.prototype.BASE_URL+ "cs/stock/user"
    axios.post(registerUrl, registerParam).then((res) => {
      console.log("注册返回的res==="+JSON.stringify(res))
      console.log("注册返回的res status==="+res.data.status)
      if (res.data.status === 200){
        Toast('注册成功')
        setTimeout(()=>{
          router.push({ path:'/'})
        },2000)
      } else {
        Toast(res.data.message)
      }
    })
    .catch((e)=>{
      Toast('注册失败')
      console.log('注册失败catch  e==='+e)
    });
  })
}