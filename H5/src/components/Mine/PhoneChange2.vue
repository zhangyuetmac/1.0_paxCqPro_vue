<template>
  <div class="mineWrapper">
    <BaseInfoHeader :message="phoneChange"></BaseInfoHeader>
    <ul class="main">
      <div class="title">
        <a>短信验证码</a>
      </div>
      <li class="normalLi">
        <input type="text" v-model="inputVal" placeholder="请输入短信验证码">
        <img @click="clearPhone" v-show="inputVal" src="./image/icon_clear_nor.png"/>
      </li> 
      <div class="bottomBtn" @click="goBaseInfoPage">
        <div :class="btnClass">
          <a>下一步</a>
        </div>
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
      phoneChange:'换绑手机号',
      inputVal:''
    };
  },
  computed:{
    btnClass(){
      if(this.inputVal){
        return 'btnLight'
      } else {
        return 'btn'
      }
    }
  },
  methods: {
    goBaseInfoPage(){
      this.$router.push({ path: "/BaseInfo" });
    },
    clearPhone(){
      this.inputVal = ''
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.mineWrapper {
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
    .title{
      display :flex;
      align-items :center;
      height:8%;
      // background red
      width 85%
      // margin-left 5%
      a{
        font-size 13px
        color #999999 
      }
    }
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
      input{
        width 90%
      }
    }
    .bottomBtn {
      width: 100%;
      height: 20%;
      mixinDisplay();
      .btn {
        width: 80%;
        height: 50px;
        border-radius: 20px;
        background: #DDDDDD;
        color: white;
        font-size: 17px;
        mixinDisplay();
      }

      .btnLight {
        width: 80%;
        height: 50px;
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


