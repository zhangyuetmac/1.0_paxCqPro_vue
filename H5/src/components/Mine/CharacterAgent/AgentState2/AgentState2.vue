<template>
  <div class="AgentState2" >
    <AgentState2Header></AgentState2Header>
    <ul class="main">
      <li class="normalLi"  @click="toSettingPage">
        <div class="left">
          <a>设置</a>
        </div>
        <div class="right">
          <img src="../../image/btn_more2.png"/>
        </div>
      </li>
      <li class="normalLi" style="margin-top:10px" @click="goNewUserGuidePage">
        <div class="left">
          <a>新用户演示</a>
        </div>
        <div class="right">
          <img src="../../image/btn_more2.png"/>
        </div>
      </li>
      <li class="normalLi"  @click="goContactServicePage">
        <div class="left">
          <a>联系客服</a>
        </div>
        <div class="right">
          <img src="../../image/btn_more2.png"/>
        </div>
      </li>
      <!-- <li class="normalLi"  >
        <div class="left">
          <a>员工管理</a>
        </div>
        <div class="right">
          <img src="../../image/btn_more2.png"/>
        </div>
      </li> -->
    </ul>
  </div>
</template>
<script>
import AgentState2Header from "./AgentState2Header";
import { Toast } from "vant";
import axios from "axios";
export default {
  components: {
    AgentState2Header
  },
  data() {
    return {
      mainBackground: {
        backgroundImage: "url(" + require("../../image/bg_merchant.png") + ")",
        backgroundSize: "100% 100%"
      }
    };
  },
  methods: {
    //去用户演示界面
    goNewUserGuidePage(){
      this.$router.push({ path: "/NewUserGuide" });
    },
    //去联系客服界面
    goContactServicePage(){
      this.$router.push({ path: "/ContactService" });
    },
    toSettingPage(){
      this.$router.push({ path: "/Setting" });
    },
    //在线保修
    goToOnlineRepair() {
      this.$router.push({ path: "/OnlineRepair" });
    },
    goMyMerchantPage(){
      this.$router.push({ path: "/MyMerchant" });
    },
    //点击退出登录
    goExitLogin() {
      const loginParam = {
        // Authrorization:this.$store.state.loginMessage.access_token
      };
      const headerParam = {
        Authrorization: this.$store.state.loginMessage.access_token
      };
      const loginUrl = "http://cqdev.paxpay.cn/gateway/stock/user/logout";
      axios({
        url: loginUrl,
        method: "post",
        headers: {
          Authorization: this.$store.state.loginMessage.access_token
        }
      })
        .then(res => {
          console.log(
            "退出登录---post访问公网接口返回的数据===" + JSON.stringify(res)
          );
          if (res.data.status === 200) {
            Toast("退出登录成功");
            setTimeout(() => {
              //把登录信息置为成功
              this.$store.commit("setLoginMessage", {
                isLogin: false,
                uesr_name: "",
                access_token: "",
                refresh_token: ""
              });
              this.$router.push({ path: "/" });
            }, 2000);
          } else if (res.data.status === 401) {
            this._refreshToken();
          } else {
            Toast(res.data.message);
          }
        })
        .catch(e => {
          console.log("登录失败catch  e===" + e);
        });
    },
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
@import '../../../../common/stylus/mixin';

.AgentState2 {
  width: 100%;
  height: 100%;
  // background: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main {
    width: 100%;
    display: flex;
    height 78%
    overflow auto
    flex-direction: column;
    align-items: center;

    .normalLi {
      padding: 0 5% 0 5%;
      background: #FFFFFF;
      width: 80%;
      height: 60px;
      line-height 60px
      // border solid 1px black
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        font-size: 15px;
        color: #333333;
      }

      span {
        font-size: 15px;
        color: #999999;
      }
    }
  }
}
</style>


