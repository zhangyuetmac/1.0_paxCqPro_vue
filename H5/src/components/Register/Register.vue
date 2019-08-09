<template>
  <div class="registerWrapper" :style="{height:bgHeight}" @touchstart="myTouchStart" @touchend="myTouchEnd">
    <RegisterHeader :welcomeMsg="welcomeMsg"></RegisterHeader>
    <div class="loginWrapper">
      <div  class="user"> 
        <img class="user-img" src="./image/icon_phone.png">
        <input class="myInput" type="number" placeholder="请输入手机号" v-model="userVal">
        <img v-show="this.userVal.length>0" @click="clearUser" src="./image/icon_clear_pre.png">
      </div>
      <div  class="password">
        <img class="user-img" src="./image/icon_identifying-code.png">
        <input  class="shortInput myInput" type="number" placeholder="请输入短信验证码" v-model="codeVal">
        <img :style="this.codeVal.length>0?myOpacity1:myOpacity0" @click="clearCode" src="./image/icon_clear_pre.png">
        <div class="verificationCode">
          <a v-show="showCount" @click="getCode">发送验证码</a>
          <span v-show="!showCount" class="count">{{count}} s</span>
        </div>
      </div>
      <div  class="password">
          <img class="user-img" src="./image/icon_password.png">
          <input class="myInput" style="font-size:15px" :type="isPassword?'password':'text'" placeholder="请设置登陆密码：6-16位字符" v-model="passwordVal">
          <img :style="this.passwordVal.length>0?myOpacity1:myOpacity0" @click="clearPassword" src="./image/icon_clear_pre.png">
          <img v-show="this.passwordVal.length>0" @click="changePasswordType" class="thirdImg"  :src="cannotWatch?passwordImgSrc1:passwordImgSrc2" >
        </div>
      <div :class="this.passwordVal.length>0&&this.userVal.length>0&&this.codeVal.length>0?'regBtnLight':'regBtn'" @click="goToReg">
        <a>立即注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import RegisterHeader from './RegisterHeader'
import {getCodeAxios} from '../../common/js/loginAndRegister/getCodeAxios.js'
import {registerAxios} from '../../common/js/loginAndRegister/registerAxios.js'
import { Toast } from 'vant';
import axios from 'axios'
import md5 from 'js-md5'
import { setTimeout } from 'timers';
export default {
  components:{
    Toast,
    RegisterHeader
  },
  data(){
    return{
      touchmoveData:{
        startX:'',
        startY:'',
        endX:'',
        endX:''
      },
      bgHeight:'',
      welcomeMsg:'欢迎注册翼支付客户端',
      userVal:'',
      passwordVal: '',
      codeVal:'',
      myOpacity0:"opacity:0",
      myOpacity1:"opacity:1",
      isPassword:'true',
      cannotWatch:true,
      passwordImgSrc1: require('./image/icon_eye_nor.png'),
      passwordImgSrc2: require('./image/icon_eye_pre.png'),
      msg:'用户名或密码错误',
      messageMistake:false,
      inputTransType:'user',
      loginType:'短信登录',
      showCount:true,
      count: '',
      timer: null,
      isSuccess:false
    }
  },
  methods:{
    //让文本框失去焦点
    _inputBlur(){
      const inputMe = document.getElementsByClassName('myInput')
      for (var i=0;i<inputMe.length;i++){
        if(inputMe[i] == document.activeElement){
          inputMe[i].blur()
        }
      }
    },
    myTouchStart(e){
      this.touchmoveData.startX = e.changedTouches[0].pageX
      this.touchmoveData.startY = e.changedTouches[0].pageY
    },
    myTouchEnd(e){
      this.touchmoveData.endX = e.changedTouches[0].pageX
      this.touchmoveData.endY = e.changedTouches[0].pageY
      if(Math.abs(this.touchmoveData.endX - this.touchmoveData.startX) > 2 ){
        this._inputBlur()
      }
      if(Math.abs(this.touchmoveData.endY - this.touchmoveData.startY) > 2 ){
        this._inputBlur()
      }
    },
    clearUser(){
      this.userVal = ''
    },
    clearPassword(){
      this.passwordVal = ''
    },
    clearCode(){
      this.codeVal = ''
    },
    changePasswordType(){
      this.isPassword = !this.isPassword
      this.cannotWatch = !this.cannotWatch
    },
    //点击注册接口
    goToReg(){
      if (!this.userVal.length > 0){
        Toast('请输入手机号')
      } else if(!this.codeVal.length > 0){
        Toast('请输入验证码')
      } else if(!this.passwordVal.length > 0){
        Toast('请输入密码')
      } else if(!(/^0?1[3|4|5|6|7|8][0-9]\d{8}$/).test(this.userVal)){
        Toast('手机号格式不正确')
      } else if(!(/^\w{6,20}$/).test(this.passwordVal)){
        Toast('密码格式不正确')
      }else{
        this._getRegister()
      }
    },
    //点击获取验证码  跳出倒计时动画
    getCode(){
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
        }, 1000)
        this._getCodeNet()
      }      
    },
    //获取验证码接口
    _getCodeNet(){
        console.log('手机号++==='+this.userVal)
        const getCodeParam = {
          phoneNo:this.userVal
        } 
        //忘记密码获取验证码的类型type为2
        getCodeAxios(getCodeParam,1)
        // const getCodeUrl = 'http://cqdev.paxpay.cn/cs/stock/sms/'+this.userVal+"?"+'type=1'
        // const getCodeUrl = 'http://175.6.77.175/cs/stock/sms/'+this.userVal+"?"+'type=1'
        // axios.post(getCodeUrl, getCodeParam).then((res) => {
        //   console.log("注册验证码返回的数据==="+JSON.stringify(res));
        //   if (res.data.status === 200){
        //     Toast("验证码获取成功")
        //     console.log('验证码获取成功')
        //   } else {
        //     Toast(res.data.message)
        //   }
        // })
        // .catch((e)=>{
        //   Toast("验证码获取失败")
        //   console.log('获取验证码失败catch  e==='+e)
        // });
    },
    //注册接口
    _getRegister(){
      const registerParam = {
        username:this.userVal,
        smsCode:this.codeVal,
        password: md5(this.passwordVal)
      }
      console.log('注册的param=='+JSON.stringify(registerParam))
      registerAxios(registerParam)
      // const registerUrl = "http://cqdev.paxpay.cn/gateway/stock/user"
      // const registerUrl =this.BASE_URL+ "cs/stock/user"
      // axios.post(registerUrl, registerParam).then((res) => {
      //   console.log("注册返回的res==="+JSON.stringify(res))
      //   console.log("注册返回的res status==="+res.data.status)
      //   if (res.data.status === 200){
      //     Toast('注册成功')
      //     setTimeout(()=>{
      //       this.$router.push({ path:'/'})
      //     },2000)
      //   } else {
      //     Toast(res.data.message)
      //   }
      // })
      // .catch((e)=>{
      //   Toast('注册失败')
      //   console.log('注册失败catch  e==='+e)
      // });
    }
  },
  created(){
    this.bgHeight = document.body.scrollHeight + 'px'
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .registerWrapper
    width 100%
    height 100%
    .loginWrapper
      width 100%
      height 79%
      background #FFFFFF
      display flex
      flex-direction column
      align-items center
      .user
        width 89%
        height 13%
        border-bottom  solid 1px #CCCCCC
        display flex
        align-items center
        // .user-img
        //   width 6.7%
        //   height 60%
        input
          width 80%
          height 80%
          margin-left 6%
          border none
          outline medium
          font-size 17px
        input::-webkit-input-placeholder 
          color #C9C9C9;
      .password
        width 89%
        height 13%
        border-bottom  solid 1px #CCCCCC
        margin-top 5%
        display flex
        align-items center
        // .user-img
        //   width 6.7%
        //   height 60%
        .shortInput
          width 50%
        input
          width 70%
          height 70%
          margin-left 6%
          border none
          outline medium
          font-size 17px
        input::-webkit-input-placeholder 
          color #C9C9C9;
        .thirdImg
          margin-left 3%
        .verificationCode
          width 25%
          height 50%
          border solid 1px #306BE6
          border-radius 15px 
          color #306BE6
          mixinDisplay()
          font-size 12px
          margin-left 5%
      .forgetAndPhone
        width 89%
        height 10%
        display flex
        align-items center
        justify-content space-between
        font-size 14px
      .loginBtn
        width 84%
        height 9.7%
        margin-top 8%
        mixinDisplay()
        color white
        background #DDDDDD
        font-size 17px
        border-radius 20px
      .loginBtnLight
        width 84%
        height 9.7%
        margin-top 8%
        mixinDisplay()
        color white
        background #306BE6
        font-size 17px
        border-radius 20px
      .regBtn
        width 84%
        height 9.7%
        margin-top 20%
        color white 
        mixinDisplay()
        background #DDDDDD
        font-size 17px
        border-radius 20px
      .regBtnLight
        width 84%
        height 9.7%
        margin-top 20%
        color #3F71EA 
        mixinDisplay()
        border solid 1px #3F71EA 
        font-size 17px
        border-radius 20px
    .toastWrapper
      position absolute
      z-index 100
      top: 49%;
      left: 50%;
      transform translateX(-50%)

</style>


