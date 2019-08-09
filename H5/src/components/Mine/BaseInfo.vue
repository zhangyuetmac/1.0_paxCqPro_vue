<template>
  <div class="mineWrapper">
    <BaseInfoHeader :message="baseInfoMessage"></BaseInfoHeader>
    <ul class="main">
      <div class="base">
        <li class="normalLi">
          <div class="left">
            <a>头像</a>
          </div>
          <div class="right">
            <img src="./image/icon_merchant2.png"/>
            <img src="./image/btn_more2.png"/>
          </div>
        </li>     
        <li class="normalLi">
          <div class="left" >
            <a>账号</a>
          </div>
          <div v-if="$store.state.accountState === '1'||$store.state.accountState === '3'" class="right" @click="goAccountSetPage">
            <span>您还未设置账号哦</span>
            <img src="./image/btn_more2.png"/>
          </div>
          <div v-if="$store.state.accountState === '2'||$store.state.accountState === '4'||$store.state.accountState === '5'||$store.state.accountState === '6'||$store.state.accountState === '7'" class="right" @click="goAccountSetPage">
            <span>Tester</span>
            <img src="./image/btn_more2.png"/>
          </div>
        </li>
        <li class="normalLi" @click="goPhoneChangePage">
          <div class="left">
            <a>手机号</a>
          </div>
          <div class="right">
            <span>18257566278</span>
            <img src="./image/btn_more2.png"/>
          </div>
        </li>
      </div>
      <div v-if="$store.state.accountState === '6'" class="angent">
        <li class="normalLi"  style="margin-top:10px">
          <div class="left">
            <a>代理商等级</a>
          </div>
          <div class="right">
            <span>一级</span>
          </div>
        </li>
        <li class="normalLi">
          <div class="left">
            <a>姓名</a>
          </div>
          <div class="right">
            <span>张三</span>
          </div>
        </li>
        <li class="normalLi">
          <div class="left">
            <a>身份证</a>
          </div>
          <div class="right">
            <span>330903199210210010</span>
          </div>
        </li>
        <li class="normalLi">
          <div class="left">
            <a>银行卡号</a>
          </div>
          <div class="right">
            <span>6223199210210010</span>
          </div>
        </li>
        <li class="normalLi">
          <div class="left">
            <a>企业名称</a>
          </div>
          <div class="right">
            <span>肯德基</span>
          </div>
        </li>
        <li class="normalLi">
          <div class="left">
            <a>统一社会信用代码</a>
          </div>
          <div class="right">
            <span>H0531687</span>
          </div>
        </li>
        <li class="normalLi">
          <div class="left">
            <a>开户银行</a>
          </div>
          <div class="right">
            <span>招商银行</span>
          </div>
        </li>
      </div>
      <div v-if="$store.state.accountState === '7'" class="angent">
        <li class="normalLi"  style="margin-top:10px">
          <div class="left">
            <a>代理商等级</a>
          </div>
          <div class="right">
            <span>二级</span>
          </div>
        </li>
        <li class="normalLi">
          <div class="left">
            <a>姓名</a>
          </div>
          <div class="right">
            <span>张三</span>
          </div>
        </li>
        <li class="normalLi">
          <div class="left">
            <a>身份证</a>
          </div>
          <div class="right">
            <span>330903199210210010</span>
          </div>
        </li>
        <li class="normalLi">
          <div class="left">
            <a>银行卡号</a>
          </div>
          <div class="right">
            <span>6223199210210010</span>
          </div>
        </li>
        <li class="normalLi" style="margin-top:10px">
          <div class="left">
            <a>一级代理商</a>
          </div>
          <div class="right">
            <span>李四</span>
          </div>
        </li>
        <li class="normalLi">
          <div class="left">
            <a>联系电话</a>
          </div>
          <div class="right">
            <span>18868804555</span>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>
<script>
import BaseInfoHeader from "./BaseInfoHeader";
import { Toast } from "vant";
import axios from "axios";
export default {
  components: {
    BaseInfoHeader
  },
  data() {
    return {
      baseInfoMessage:'基本资料'
    };
  },
  methods: {
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
@import '../../common/stylus/mixin';

.mineWrapper 
  width: 100%;
  height: 100%;
  background: #F8F8FA;
  display: flex;
  flex-direction: column;
  align-items: center;
  .main 
    width: 100%;
    height :80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y:auto;
    .base
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .normalLi 
        padding: 0 5% 0 5%;
        background: #FFFFFF;
        width: 80%;
        height: 60px;
        line-height: 60px;
        // border solid 1px black
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left
          a 
            font-size: 15px;
            color: #333333;
        .right
          display flex
          align-items center
          span 
            font-size: 15px;
            color: #999999;
    .angent
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .normalLi 
        padding: 0 5% 0 5%;
        background: #FFFFFF;
        width: 80%;
        height: 60px;
        line-height: 60px;
        // border solid 1px black
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left
          a 
            font-size: 15px;
            color: #333333;
        .right
          display flex
          align-items center
          span 
            font-size: 15px;
            color: #999999;
</style>


