import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'
import store from '@/store'
import Vue from 'vue'
import {getRefreshTokenAxios} from './getRefreshTokenAxios'
export function exitLoginAxios() {
  console.log('调用退出登录接口')
  return new Promise((resolve, reject) => {
    const loginUrl = Vue.prototype.BASE_URL+'cs/oauth/logout';
    axios({
      url: loginUrl,
      method: "post",
      headers: {
        Authorization: store.state.loginMessage.access_token
      }
    })
    // axios.post(
    //   loginUrl,
    //   {
    //     headers: {Authorization: store.state.loginMessage.access_token}
    //   }
    // )
    .then(async (res) => {
        console.log("退出登录---post访问公网接口返回的数据===" + JSON.stringify(res));
        if (res.data.status === 200) {
        // if (false) {
          Toast("退出登录成功");
          setTimeout(() => {
            //把登录信息置为成功
            store.commit("setLoginMessage", {
              isLogin: false,
              uesr_name: "",
              access_token: "",
              refresh_token: ""
            });
            router.push({ path: "/" });
          }, 2000);
        } else if (res.data.status === 401) {
          console.log('退出登录返回401，需要先用refreshToken去请求accessToken')
          const data = await getRefreshTokenAxios();
          console.log("退出登录--返回的refreshToken去请求accessToken的data"+JSON.stringify(data))
          exitLoginAxios()
        } else {
          Toast(res.data.message);
        }
      })
      .catch(e => {
        Toast('退出登录失败')
        console.log("exitLoginAxios退出登录失败catch  e===" + e);
      });
  })
}