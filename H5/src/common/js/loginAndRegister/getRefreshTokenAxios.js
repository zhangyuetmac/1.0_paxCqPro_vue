import axios from 'axios'
import store from '@/store'
import router from '@/router'
import Vue from 'vue'
import { Toast } from 'vant';
export function getRefreshTokenAxios() {
  const url = Vue.prototype.BASE_URL+'oauth/token?grant_type=refresh_token'
  const formData = new FormData()
  formData.append('refresh_token',store.state.loginMessage.refresh_token)
  return new Promise((resolve, reject) => {
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      console.log('公共的获取refresh_token的返回res='+JSON.stringify(res))
      if(res.data.access_token){
        const loginMessage = store.state.loginMessage
        loginMessage.refresh_token = res.data.access_token
        store.commit("setLoginMessage",loginMessage)
        resolve(res.data.access_token)
      }else if(res.data.status===401){
        //用refresh_token获取access_token的时候返回401，表示登录过期需要重新登录
        Toast('用户过期，请重新登录')
        resolve('用户过期，请重新登录')
        setTimeout(()=>{
          router.push({ path: "/Index" });
        },2000)
      }
    })
    .catch((e)=>{
      Toast("获取token失败")
      console.log('获取token失败'+e)
      reject(e)
    });
  })
}