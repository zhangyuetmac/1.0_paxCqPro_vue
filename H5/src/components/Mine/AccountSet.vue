<template>
  <div class="mineWrapper">
    <BaseInfoHeader :message="accountMessage"></BaseInfoHeader>
    <ul class="main">
      <li class="normalLi">
        <input type="text" v-model="inputVal" placeholder="最大长度50，不支持特殊字符和空格">
      </li> 
      <div class="bottomBtn" @click="goBaseInfoPage">
        <div :class="btnClass">
          <a>确定</a>
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
      accountMessage:'账号',
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
        width 100%
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


