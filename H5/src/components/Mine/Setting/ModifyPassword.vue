<template>
  <div class="forgetPassword1" :style="{height:bgHeight}" @touchstart="myTouchStart" @touchend="myTouchEnd">
    <ForgetPasswordHeader :passwordMsg="passwordMsg"></ForgetPasswordHeader> 
    <div class="loginWrapper">
      <div  class="password">
        <img class="user-img" src="../image/icon_password.png">
        <input type="password" placeholder="请输入新密码" v-model="passwordValOne">
        <img :style="this.passwordValOne.length>0?myOpacity1:myOpacity0" @click="clearPassword1" src="../image/icon_clear_pre.png">
      </div>
      <div  class="password">
        <img class="user-img" src="../image/icon_password.png">
        <input  class="myInput" type="password" placeholder="请确认密码" v-model="passwordValTwo">
        <img :style="this.passwordValTwo.length>0?myOpacity1:myOpacity0" @click="clearPassword2" src="../image/icon_clear_pre.png">
      </div>
      <div :class="this.passwordValOne.length>0&this.passwordValTwo.length>0?'regBtnLight':'regBtn'" @click="confirm">
        <a>确认</a>
      </div>
      <div v-show="messageMistake" class="toastWrapper">
        <MyToast :msg="this.msg" :isSuccess="this.isSuccess"></MyToast>
      </div>  
    </div>   
  </div>
</template>
<script>
import {getRefreshTokenAxios} from '../../../common/js/loginAndRegister/getRefreshTokenAxios'
// import ForgetPasswordHeader from "../../ForgetPasswordHeader/ForgetPasswordHeader";
import ForgetPasswordHeader from "&/ForgetPassword/ForgetPasswordHeader";
import { Toast } from 'vant';
import MyToast from '../../Toast/Toast.vue'
import axios from 'axios'
import md5 from 'js-md5'
export default {
  components:{
    ForgetPasswordHeader,
    MyToast
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
      passwordMsg:'请设置新密码：6-16个字符',
      userVal:'',
      passwordValOne:'',
      passwordValTwo:'',
      myOpacity0:"opacity:0",
      myOpacity1:"opacity:1",
      isPassword:'true',
      cannotWatch:true,
      passwordImgSrc1: require('../image/icon_eye_nor.png'),
      passwordImgSrc2: require('../image/icon_eye_pre.png'),
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
    clearPassword1(){
      this.passwordValOne = ''
    },
    clearPassword2(){
      this.passwordValTwo = ''
    },
    confirm(){
      if(this.passwordValOne !== this.passwordValTwo){
        Toast('两次输入的密码不同')
      } else if(!(/^\w{6,20}$/).test(this.passwordValOne) || !(/^\w{6,20}$/).test(this.passwordValTwo)){
        Toast('密码格式不正确')
      } else {
        this._getPassweord()
      }
    },
    _getPassweord(){
      console.log('手机号++==='+this.$store.state.mobileNumber  )
      const getPasswordParam = {
        newPassword:md5(this.passwordValOne),       
        newPasswordRepeat:md5(this.passwordValTwo)      
      } 
      const getPasswordUrl = this.BASE_URL+'cs/stock/user'
      // axios({
      //   url: getPasswordUrl,
      //   method: "patch",
      //   body:getPasswordParam,
      //   headers: {
      //     Authorization: this.$store.state.loginMessage.access_token
      //   }
      // })
      axios.patch(
        getPasswordUrl,
        getPasswordParam,
        {
          headers: {Authorization: this.$store.state.loginMessage.access_token,'Content-Type': 'application/json'}
        }
      ).then(async (res) => {
        console.log("修改密码获取验证码返回的数据==="+JSON.stringify(res));
        if (res.data.status === 200){
          this.messageMistake = true
          this.msg = '密码修改成功'
          this.isSuccess = true
          setTimeout(()=>{
            this.messageMistake = false
            //密码修改成功跳转到首页，把所有的登录信息置空
            this.$store.commit("setLoginMessage", {
              isLogin: false,
              uesr_name: "",
              access_token: "",
              refresh_token: ""
            });
            this.$router.push({path:'./'})
          },1000)
        }else if (res.data.status === 401) {
          console.log('修改密码返回401，需要先用refreshToken去请求accessToken')
          const data = await getRefreshTokenAxios()
          console.log("修改密码--返回的refreshToken去请求accessToken的data"+JSON.stringify(data))
          this._getPassweord()
          
        } else {
          Toast(res.data.message)
        }
      })
      .catch((e)=>{
        Toast("密码修改失败")
        console.log('密码修改失败atch  e==='+e)
      });
    }
  },
  created(){
    this.bgHeight = document.body.scrollHeight + 'px'
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../../common/stylus/mixin"
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
        .user-img
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
          width 80%
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
      top: 40%;
      left: 50%;
      transform translateX(-50%)
</style>


