<template>
  <div class="entranceWrapper" :style="{height:bgHeight}" @touchstart="myTouchStart" @touchend="myTouchEnd">
    <RegisterHeader :welcomeMsg="welcomeMsg"></RegisterHeader>
    <div class="loginWrapper">
        <div  class="user"> 
          <img class="user-img" src="./image/icon_user.png">
          <input class="myInput" type="text" placeholder="请输入手机号" v-model="userVal">
          <img v-show="this.userVal.length>0" @click="clearUser" src="./image/icon_clear_pre.png">
        </div>
        <!-- <div v-show="inputTransType==='mobile'" class="user"> 
          <img class="user-img" src="./image/icon_phone.png">
          <input class="myInput" type="number" placeholder="请输入手机号" v-model="userVal">
          <img v-show="this.userVal.length>0" @click="clearUser" src="./image/icon_clear_pre.png">
        </div> -->
        <div  class="password">
          <img class="user-img" src="./image/icon_password.png">
          <input class="myInput" :type="isPassword?'password':'text'" placeholder="请输入密码" v-model="passwordVal">
          <img :style="this.passwordVal.length>0?myOpacity1:myOpacity0" @click="clearPassword" src="./image/icon_clear_pre.png">
          <img v-show="this.passwordVal.length>0" @click="changePasswordType" class="thirdImg"  :src="cannotWatch?passwordImgSrc1:passwordImgSrc2" >
        </div>
        <!-- <div v-show="inputTransType==='mobile'" class="password">
          <img class="user-img" src="./image/icon_identifying-code.png">
          <input class="shortInput myInput" type="number" placeholder="请输入短信验证码" v-model="passwordVal">
          <img :style="this.passwordVal.length>0?myOpacity1:myOpacity0" @click="clearPassword" src="./image/icon_clear_pre.png">
          <div class="verificationCode">
            <a v-show="showCount" @click="getCode">发送验证码</a>
            <span v-show="!showCount" class="count">{{count}} s</span>
          </div>
        </div> -->
        <div class="forgetAndPhone">
          <a @click="goToForgetPasswordPage">忘记密码</a>
          <span @click="changeLoginType">短信登录</span>
        </div>
        <div  :class="this.passwordVal.length>0&&this.userVal.length>0?'loginBtnLight':'loginBtn'" @click="goToIndex">
          <a>登录</a>
        </div>
        <div  class="regBtn" @click="gotoRegister">
          <a>注册</a>
        </div>
    </div>
    <!-- <div class="test">
      <button @click="goToTestApi">去测试api页面</button>
    </div> -->
    <div class="logo" v-show="hidshow">
      <img src="./image/logo.png"/>
    </div>
    <!-- <div v-show="messageMistake" class="toastWrapper">
      <Toast :msg="this.msg" :isSuccess="this.isSuccess"></Toast>
    </div>    -->
  </div>
</template>
<script>
import RegisterHeader from "&/Register/RegisterHeader";
import {loginAxios} from 'common/js/loginAndRegister/loginAxios.js'
import { Toast } from "vant";
import axios from "axios";
import md5 from "js-md5";
// import loginAxios from './loginAxios'
export default {
  components: {
    Toast,
    RegisterHeader
  },
  data() {
    return {
      touchmoveData: {
        startX: "",
        startY: "",
        endX: "",
        endX: ""
      },
      welcomeMsg: "欢迎登陆翼支付客户端",
      userVal: "",
      passwordVal: "",
      myOpacity0: "opacity:0",
      myOpacity1: "opacity:1",
      isPassword: "true",
      cannotWatch: true,
      passwordImgSrc1: require("./image/icon_eye_nor.png"),
      passwordImgSrc2: require("./image/icon_eye_pre.png"),
      msg: "手机号或密码错误",
      messageMistake: false,
      // inputTransType:'user',
      // loginType:'短信登录',
      showCount: true,
      count: "",
      timer: null,
      isSuccess: false,
      bgHeight: "",
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true //显示或者隐藏footer
    };
  },
  watch: {
    passwordVal(curVal, oldVal) {},
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    }
  },
  methods: {
    goTestSjld(){
      this.$router.push({ path: "/TestSjld" });
    },
    //让文本框失去焦点
    _inputBlur() {
      const inputMe = document.getElementsByClassName("myInput");
      for (var i = 0; i < inputMe.length; i++) {
        if (inputMe[i] == document.activeElement) {
          inputMe[i].blur();
        }
      }
    },
    myTouchStart(e) {
      this.touchmoveData.startX = e.changedTouches[0].pageX;
      this.touchmoveData.startY = e.changedTouches[0].pageY;
    },
    myTouchEnd(e) {
      this.touchmoveData.endX = e.changedTouches[0].pageX;
      this.touchmoveData.endY = e.changedTouches[0].pageY;
      if (Math.abs(this.touchmoveData.endX - this.touchmoveData.startX) > 2) {
        this._inputBlur();
      }
      if (Math.abs(this.touchmoveData.endY - this.touchmoveData.startY) > 2) {
        this._inputBlur();
      }
    },
    clearUser() {
      this.userVal = "";
    },
    clearPassword() {
      this.passwordVal = "";
    },
    changePasswordType() {
      this.isPassword = !this.isPassword;
      this.cannotWatch = !this.cannotWatch;
    },
    //判断输入的参数是否正确
    goToIndex() {
      if (!this.userVal.length > 0) {
        Toast("请输入手机号");
      } else if (!this.passwordVal.length > 0) {
        Toast("请输入密码");
      } else if (!/^0?1[3|4|5|6|7|8][0-9]\d{8}$/.test(this.userVal)) {
        Toast("手机号格式不正确");
      } else if (!/^\w{6,20}$/.test(this.passwordVal)) {
        Toast("密码格式不正确");
      } else {
        this._getLogin();
      }
    },
    //访问登录接口
    _getLogin() {
      const loginParam = {
        username: this.userVal,
        password: md5(this.passwordVal)
      };
      console.log('登录接口的公共地址==='+this.BASE_URL)
      const loginUrl = this.BASE_URL+"cs/oauth/token?grant_type=password"
      const formData = new FormData()
      formData.append('username',loginParam.username)
      formData.append('password',loginParam.password)
      loginAxios(loginParam,loginUrl,formData)
    },
    changeLoginType() {
      this.$router.push({ path: "/EntrancePhone" });
    },
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.showCount = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.showCount = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    goToTestApi() {
      this.$router.push({ path: "/TestApi" });
    },
    gotoRegister() {
      this.$router.push({ path: "/Register" });
    },
    goToForgetPasswordPage() {
      this.$router.push({ path: "/ForgetPassword1" });
    }
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  created() {
    console.log("页面的高度===" + document.body.scrollHeight);
    this.bgHeight = document.body.scrollHeight + "px";
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.entranceWrapper {
  width: 100%;
  height: 100%;
  background: #FFFFFF;

  .loginWrapper {
    width: 100%;
    height: 79%;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;

    .user {
      width: 89%;
      height: 13%;
      border-bottom: solid 1px #CCCCCC;
      display: flex;
      align-items: center;
      // .user-img
      // width 6.7%
      // height 60%
    }

    input {
      width: 80%;
      height: 80%;
      margin-left: 6%;
      border: none;
      outline: medium;
      font-size: 18px;
    }

    input::-webkit-input-placeholder {
      color: #C9C9C9;
    }
  }

  .password {
    width: 89%;
    height: 13%;
    border-bottom: solid 1px #CCCCCC;
    margin-top: 5%;
    display: flex;
    align-items: center;

    // .user-img
    // width 6.7%
    // height 60%
    .shortInput {
      width: 50%;
    }

    input {
      width: 70%;
      height: 70%;
      margin-left: 6%;
      border: none;
      outline: medium;
      font-size: 18px;
    }

    input::-webkit-input-placeholder {
      color: #C9C9C9;
    }

    .thirdImg {
      margin-left: 3%;
    }

    .verificationCode {
      width: 25%;
      height: 50%;
      border: solid 1px #306BE6;
      border-radius: 15px;
      color: #306BE6;
      mixinDisplay();
      font-size: 12px;
      margin-left: 5%;
    }
  }

  .forgetAndPhone {
    width: 89%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
  }

  .loginBtn {
    width: 84%;
    height: 9.7%;
    margin-top: 8%;
    mixinDisplay();
    color: white;
    background: #DDDDDD;
    font-size: 17px;
    border-radius: 20px;
  }

  .loginBtnLight {
    width: 84%;
    height: 9.7%;
    margin-top: 8%;
    mixinDisplay();
    color: white;
    background: #306BE6;
    font-size: 17px;
    border-radius: 20px;
  }

  .regBtn {
    width: 84%;
    height: 9.7%;
    margin-top: 2%;
    color: #3F71EA;
    mixinDisplay();
    border: solid 1px #3F71EA;
    font-size: 17px;
    border-radius: 20px;
  }
}

.test {
  position: absolute;
  bottom: 20px;
}

.logo {
  width: 100px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  mixinDisplay();
  transform: translateX(-50%);
}

.toastWrapper {
  position: absolute;
  z-index: 100;
  top: 49%;
  left: 50%;
  transform: translateX(-50%);
}
</style>


