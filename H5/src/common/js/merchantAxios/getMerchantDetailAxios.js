import axios from 'axios'
import { Toast } from 'vant'
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
// import qs from 'qs'
export function getMerchantDetailAxios() {
  console.log('准备请求商户信息axios')
  const url = Vue.prototype.BASE_URL+'cs/stock/merchant'
  return new Promise((resolve, reject) => {
    axios.get(url,
      {
        headers: {Authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjQ2MzEwOTAsInVzZXJfaWQiOiIyIiwidXNlcl9uYW1lIjoiMTg2MDIzMTkzMzciLCJqdGkiOiJlMTBkMWJjZS1mMmFkLTRjMjQtOTBlMS05YjQ4YTI0ZGFlYzkiLCJjbGllbnRfaWQiOiJjcy1jbXMtc3RvY2stYXBwIiwic2NvcGUiOlsiKiJdfQ.Tq0XTnMDN23M-hhn1UxSJpd0lfFOnjzipzZs3KJQomfUjpUErdDdEWeYiswEZbpeLGliIboi4BosyAV78HjTIQ','Content-Type': 'application/json'}
      }
    ).then(res => {
      console.log("请求商户信息返回的数据===" + JSON.stringify(res));
      // if (res.data.access_token) {
      //   Toast("登录成功");
      //   console.log('登录成功2')
      //   console.log(store)
      //   setTimeout(() => {
      //     //把登录信息置为成功
      //     store.commit("setLoginMessage", {
      //       isLogin: true,
      //       uesr_name: loginParam.username || loginParam.phoneNo,
      //       access_token: res.data.access_token,
      //       refresh_token: res.data.refresh_token
      //     });
      //     router.push({ path: "/Index" });
      //   }, 2000);
      // } else {
      //   Toast(res.data.message);
      // }
    })
    .catch(e => {
      Toast("请求商户信息失败")
      console.log("请求商户信息catch  e===" + e);
    });
  })
}