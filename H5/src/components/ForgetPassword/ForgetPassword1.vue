<template>
  <div class="forgetPassword1" :style="{height:bgHeight}" @touchstart="myTouchStart" @touchend="myTouchEnd">
    <ForgetPasswordHeader :passwordMsg="passwordMsg"></ForgetPasswordHeader> 
    <div class="loginWrapper">
      <div  class="user"> 
        <img class="user-img" src="./image/icon_phone.png">
        <input class="myInput" type="number" maxlength="11" placeholder="请输入手机号" v-model="userVal" >
        <img v-show="this.userVal.length>0" @click="clearUser" src="./image/icon_clear_pre.png">
      </div>
      <div :class="this.userVal.length>10?'regBtnLight':'regBtn'" @click="nextStep">
        <a>下一步</a>
      </div>  
    </div>   
  </div>
</template>
<script>
import ForgetPasswordHeader from '&/ForgetPassword/ForgetPasswordHeader'
import { Toast } from 'vant';
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
      passwordMsg:'请输入已绑定的手机号',
      userVal:'',
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
    nextStep(){
      if (this.userVal.length < 1) {
        Toast('请输入手机号')
      } else if(!(/^0?1[3|4|5|6|7|8][0-9]\d{8}$/).test(this.userVal)){
        Toast('手机号格式不正确')
      } else {
        this.$store.commit('setMobileNumber',this.userVal)
        this.$router.push({
            path:'./ForgetPassword2'
        })
      }
    }
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
        .user-img
          // width 6.7%
          // height 60%
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


