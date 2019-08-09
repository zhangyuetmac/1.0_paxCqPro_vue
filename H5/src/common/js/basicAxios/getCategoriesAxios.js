//获取经营类目
import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'
import store from '@/store'
import Vue from 'vue'
export function getCategoriesAxios(){
  console.log('走到获取经营类目接口')
  const pid = "0000000"
  const url = Vue.prototype.BASE_URL+'cs/stock/basic/categories'
  return new Promise((resolve, reject) => {
    axios.get(
      url,
      {
      params: {
        id: 123
        }
      },
      {
      // headers: {Authorization: store.state.loginMessage.access_token,'Content-Type': 'application/json'}
        headers: {Authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjQ2MzEwOTAsInVzZXJfaWQiOiIyIiwidXNlcl9uYW1lIjoiMTg2MDIzMTkzMzciLCJqdGkiOiJlMTBkMWJjZS1mMmFkLTRjMjQtOTBlMS05YjQ4YTI0ZGFlYzkiLCJjbGllbnRfaWQiOiJjcy1jbXMtc3RvY2stYXBwIiwic2NvcGUiOlsiKiJdfQ.Tq0XTnMDN23M-hhn1UxSJpd0lfFOnjzipzZs3KJQomfUjpUErdDdEWeYiswEZbpeLGliIboi4BosyAV78HjTIQ','Content-Type': 'application/json'}
      }
    ).then(res => {
      console.log('经营类目请求到数据'+JSON.stringify(res))
      if(res.data.status === "200" || res.data.status === 200){
        console.log(res.data.result)
        resolve(res.data.result)
      }else{
        Toast(res.data.message)
      }
    })
    .catch((e)=>{
      console.log("获取经营类目失败"+e)
      reject(e)
    })
  })
}