<template>
  <div class="forgetPassword1" :style="{height:bgHeight}" @touchstart="myTouchStart" @touchend="myTouchEnd">
    <ForgetPasswordHeader :passwordMsg="passwordMsg"></ForgetPasswordHeader> 
    <div class="loginWrapper">
      <div  class="password">
        <img class="user-img" src="./image/icon_identifying-code.png">
        <input class="shortInput myInput" type="number" placeholder="请输入短信验证码" v-model="passwordVal">
        <img :style="this.passwordVal.length>0?myOpacity1:myOpacity0" @click="clearPassword" src="./image/icon_clear_pre.png">
        <div class="verificationCode">
          <a v-show="showCount" @click="getCode">发送验证码</a>
          <span v-show="!showCount" class="count">{{count}} s</span>
        </div>
      </div>
      <div :class="this.passwordVal.length>0?'regBtnLight':'regBtn'" @click="nextStep">
        <a>下一步</a>
      </div>
    </div>   
  </div>
</template>
<script>
// import ForgetPasswordHeader from '../ForgetPasswordHeader/ForgetPasswordHeader'
import ForgetPasswordHeader from '&/ForgetPassword/ForgetPasswordHeader'
import {getCodeAxios} from '../../common/js/loginAndRegister/getCodeAxios.js'
import { Toast } from 'vant';
import axios from 'axios'
export default {
  components:{
    ForgetPasswordHeader,
    Toast
  },
  data(){
    return {
      touchmoveData:{
        startX:'',
        startY:'',
        endX:'',
        endX:''
      },
      bgHeight:'',
      passwordMsg:'',
      userVal:'',
      passwordVal:'',
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
    getCode(){
      this._getCodeNet()
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
      }
    },
    //获取验证码接口
    _getCodeNet(){
        console.log('手机号++==='+this.$store.state.mobileNumber  )
        const getCodeParam = {
          phoneNo:this.$store.state.mobileNumber       
        } 
        //忘记密码获取验证码的类型type为3
        getCodeAxios(getCodeParam,3)
    },
    nextStep(){
      if (this.passwordVal.length<1){
        Toast('请输入验证码')
      } else {
        // this._checkCode()
        this.$store.commit("setSmsCode",this.passwordVal)
        this.$router.push({path:'./ForgetPassword3'})
      }
    },
    //校验验证码是否正确
    _checkCode(){
      console.log('输入的验证码=='+this.passwordVal)
       const checkCodeParam = {
          smsCode:this.passwordVal    
        } 
        const checkCodeUrl = 'http://cqdev.paxpay.cn/gateway/stock/sms/'+this.$store.state.mobileNumber+'?'+ 'smsCode='+this.passwordVal
        axios.get(checkCodeUrl).then((res) => {
          console.log("校验验证码返回的数据==="+JSON.stringify(res));
          if (res.data.status === 200){
            // Toast('验证码正确')
            this.$router.push({path:'./ForgetPassword3'})
          } else {
            Toast(res.data.message)
          }
        })
        .catch((e)=>{
          console.log('获取验证码失败catch  e==='+e)
        });
    }
  },
  mounted(){
    const mobileNumber = this.$store.state.mobileNumber
    const mobileNumberLast = mobileNumber.substr(0,3)+"****"+mobileNumber.substr(7);
    this.passwordMsg = '验证码将发送到您绑定的手机 '+mobileNumberLast
  },
  created(){
    this.bgHeight = document.body.scrollHeight + 'px'
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .forgetPassword1
    width 100%
    height 100%
    // background yellow
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
        margin-top 10%
        //.user-img
          // width 6.7%
          // height 60%
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
        margin-top 15%
        width 84%
        height 9.7%
        margin-top 20%
        color white 
        mixinDisplay()
        background #DDDDDD
        font-size 17px
        border-radius 20px
      .regBtnLight
        margin-top 15%
        width 84%
        height 9.7%
        margin-top 20%
        color white 
        background #306BE6
        mixinDisplay()
        font-size 17px
        border-radius 20px
    .toastWrapper
      position absolute
      z-index 100
      top: 49%;
      left: 50%;
      transform translateX(-50%)
</style>


