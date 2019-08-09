import store from '../../store/index.js'
import axios from 'axios'
function userLogin(url,param){
  return new Promise((resolve, reject) =>{
    axios.post(url,param).then((res)=>{
      console.log("登录接口---post访问公网接口返回的数据===" + JSON.stringify(res));
      console.log(
        "密码登录---post访问公网接口返回的数据===" + JSON.stringify(res)
      );
      if (res.data.status === 200) {
        Toast("登录成功");
        // setTimeout(() => {
          //把登录信息置为成功
          this.$store.commit("setLoginMessage", {
            isLogin: true,
            uesr_name: this.userVal,
            access_token: res.data.result.access_token,
            refresh_token: res.data.result.refresh_token
          });
        //   this.$router.push({ path: "/Index" });
        // }, 2000);
      } else {
        Toast(res.data.message);
      }
      resolve('success')
    })
    .catch((error)=>{
      reject(error)
    })
  }) 
}