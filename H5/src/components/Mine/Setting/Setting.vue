<template>
  <div class="transitionWrapper">
    <SettingHeader :message="message"></SettingHeader>
    <ul class="main">
      <li class="normalLi" @click="goModifyPasswordPage">
        <div class="left">
          <a>修改登录密码</a>
        </div>
        <div class="right">
          <img src="../image/btn_more2.png"/>
        </div>
      </li>     
      <li class="normalLi" @click="goArrivalBroadcastPage">
        <div class="left">
          <a>到账播报</a>
        </div>
        <div class="right">
          <img src="../image/btn_more2.png"/>
        </div>
      </li>
      <li class="normalLi" @click="goAboutPage">
        <div class="left">
          <a>关于</a>
        </div>
        <div class="right">
          <img src="../image/btn_more2.png"/>
        </div>
      </li>
      <div class="bottomBtn" @click="goExitLogin">
        <div class="btn">
          <a>退出登录</a>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
import SettingHeader from "./SettingHeader";
import {exitLoginAxios} from '../../../common/js/loginAndRegister/exitLoginAxios.js'
import { Toast } from "vant";
import axios from "axios";
export default {
  components: {
    SettingHeader
  },
  data() {
    return {
      message:'设置'
    };
  },
  methods: {
    //修改密码
    goModifyPasswordPage(){
      this.$router.push({ path: "/ModifyPassword" });
    },
    //到账播报
    goArrivalBroadcastPage(){
      this.$router.push({ path: "/ArrivalBroadcast" });
    },
    //到账播报
    goAboutPage(){
      this.$router.push({ path: "/About" });
    },
    //在线保修
    goToOnlineRepair() {
      this.$router.push({ path: "/OnlineRepair" });
    },
    //设置账号
    goAccountSetPage(){
      this.$router.push({ path: "/AccountSet" });
    },
    //换绑手机号
    goPhoneChangePage(){
      this.$router.push({ path: "/PhoneChange" });
    },
    //点击退出登录
    async goExitLogin(){
      const data = await exitLoginAxios()
    },
    // goExitLogin() {
    //   const loginParam = {
    //     // Authrorization:this.$store.state.loginMessage.access_token
    //   };
    //   const headerParam = {
    //     Authrorization: this.$store.state.loginMessage.access_token
    //   };
    //   const loginUrl = '/oauth/logout';
    //   axios({
    //     url: loginUrl,
    //     method: "post",
    //     headers: {
    //       Authorization: this.$store.state.loginMessage.access_token
    //     }
    //   })
    //     .then(res => {
    //       console.log(
    //         "退出登录---post访问公网接口返回的数据===" + JSON.stringify(res)
    //       );
    //       if (res.data.status === 200) {
    //         Toast("退出登录成功");
    //         setTimeout(() => {
    //           //把登录信息置为成功
    //           this.$store.commit("setLoginMessage", {
    //             isLogin: false,
    //             uesr_name: "",
    //             access_token: "",
    //             refresh_token: ""
    //           });
    //           this.$router.push({ path: "/" });
    //         }, 2000);
    //       } else if (res.data.status === 401) {
    //         this._refreshToken();
    //       } else {
    //         Toast(res.data.message);
    //       }
    //     })
    //     .catch(e => {
    //       console.log("退出登录失败catch  e===" + e);
    //     });
    // },
    //刷新token
    _refreshToken() {
      const loginUrl =
        "http://cqdev.paxpay.cn/gateway/stock/user/token?refreshToken=" +
        this.$store.state.loginMessage.refresh_token;
      axios({
        url: loginUrl,
        method: "post"
      })
        .then(res => {
          console.log(
            "刷新token---post访问公网接口返回的数据===" + JSON.stringify(res)
          );
          if (res.data.status === 200) {
            Toast("刷新token成功");
            const refreshLoginMessage = this.$store.state.loginMessage;
            refreshLoginMessage.access_token = res.data.result.access_token;
            setTimeout(() => {
              //把登录信息置为成功
              this.$store.commit("setLoginMessage", refreshLoginMessage);
              this.$router.push({ path: "/" });
            }, 2000);
          } else if (res.data.status === 401) {
            // this._refreshToken()
          } else {
            Toast(res.data.message);
          }
        })
        .catch(e => {
          console.log("登录失败catch  e===" + e);
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';

.transitionWrapper {
  width: 100%;
  height: 100%;
  background: #F8F8FA;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main {
    width: 100%;
    height :80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y:auto;

    .normalLi {
      padding: 0 5% 0 5%;
      background: #FFFFFF;
      width: 80%;
      height: 60px;
      line-height: 60px;
      // border solid 1px black
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{

      }
        a {
          font-size: 15px;
          color: #333333;
        }
      .right{
        display flex
        align-items center
      }
        span {
          font-size: 15px;
          color: #999999;
        }
    }
    .bottomBtn {
      width: 100%;
      height: 20%;
      mixinDisplay();

      

      .btn {
        width: 80%;
        height: 50%;
        border-radius: 20px;
        background: #306BE6;
        color: white;
        font-size: 17px;
        mixinDisplay();
      }
    }
  }
}
</style>


