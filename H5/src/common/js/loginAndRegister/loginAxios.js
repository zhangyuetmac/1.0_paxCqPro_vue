import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'
import store from '@/store'
// import qs from 'qs'
export function loginAxios(loginParam,loginUrl, formData) {
  return new Promise((resolve, reject) => {
    axios.post(loginUrl, formData, 
      {
        headers: {'Content-Type': 'multipart/form-data'}
      }
    ).then(res => {
      console.log("loginAxios密码登录---post访问公网接口返回的数据===" + JSON.stringify(res));
      if (res.data.access_token) {
        Toast("登录成功");
        console.log('登录成功2')
        console.log(store)
        setTimeout(() => {
          //把登录信息置为成功
          store.commit("setLoginMessage", {
            isLogin: true,
            uesr_name: loginParam.username || loginParam.phoneNo,
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token
          });
          router.push({ path: "/Index" });
        }, 2000);
      } else {
        Toast(res.data.message);
      }
    })
    .catch(e => {
      Toast("登录失败")
      console.log("登录失败catch  e===" + e);
    });
  })
}