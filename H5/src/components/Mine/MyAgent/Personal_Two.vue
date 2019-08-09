<template>
  <div class="mineWrapper">
    <div class="header" >
    <div class="left">
      <img @click="goBack"  src="../image/btn_back.png" > 
      <a @click="goBack">代理商信息</a>
    </div>
    <div class="right">
      <a @click="goAgentApplyPage">编辑</a>
    </div>
  </div>
    <ul class="main">
      <div class="top">
        <img src="../image/icon_ejdls_def@2x.png">
        <a>二级代理商</a>
      </div>
      <li class="normalLi" >
        <div class="left">
          <a>一级代理商姓名</a>
        </div>
        <div class="right">
          <a>张三</a>
        </div>
      </li>
      <li class="normalLi" >
        <div class="left">
          <a>一级代理商电话</a>
        </div>
        <div class="right">
          <a>135657895478</a>
        </div>
      </li>
      <li class="normalLi" style="margin-top:10px">
        <div class="left">
          <a>姓名</a>
        </div>
        <div class="right">
          <a>张三</a>
        </div>
      </li>     
      <li class="normalLi" >
        <div class="left">
          <a>手机号</a>
        </div>
        <div class="right">
          <a>18257866278</a>
        </div>
      </li>
      
      <li class="normalLi" >
        <div class="left">
          <a>身份证号</a>
        </div>
        <div class="right">
          <a>255156156156156165156</a>
        </div>
      </li>
      <li class="normalLi" >
        <div class="left">
          <a>银行卡号</a>
        </div>
        <div class="right">
          <a>6220212552252522562565</a>
        </div>
      </li>
      <!-- <li class="normalLi" style="margin-top:10px">
        <div class="left">
          <a>企业名称</a>
        </div>
        <div class="right">
          <a>肯德基</a>
        </div>
      </li>
      <li class="normalLi" >
        <div class="left">
          <a>统一社会信用代码</a>
        </div>
        <div class="right">
          <a>H15115565</a>
        </div>
      </li>
      <li class="normalLi" >
        <div class="left">
          <a>开户银行</a>
        </div>
        <div class="right">
          <a>招商银行</a>
        </div>
      </li> -->
    </ul>
  </div>
</template>
<script>
import { Toast } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      message:'设置'
    };
  },
  methods: {
    goBack(){
      this.$router.back()
    },
    goAgentApplyPage(){
      this.$router.push({
        path:'/AgentApply'
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';
.mineWrapper 
  width: 100%;
  height: 100%;
  background: #F8F8FA;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header 
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content space-between
    .left
      display flex
      align-items: center;
      width: 50%;
      height: 100%;
      margin-left 5%
      a 
        margin-left: 3%;
        font-size: 24px;
        color: black;
    .right
      display flex
      align-items: center;
      justify-content center
      width: 30%;
      height: 100%;
      a 
        margin-left: 5%;
        font-size: 16px;
        color: #666666;
  .main 
    width: 100%;
    height :80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y:auto;
    .top
      padding: 5% 5% 5% 5%;
      background: #FFFFFF;
      width: 80%;
      height: 35%;
      // padding :10% 0 10% 0;
      mixinDisplay();
      flex-direction column
      a 
       font-size 18px
       font-weight bold
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
    .bottomBtn 
      width: 100%;
      height: 20%;
      mixinDisplay();

      

      .btn 
        width: 80%;
        height: 50%;
        border-radius: 20px;
        background: #306BE6;
        color: white;
        font-size: 17px;
        mixinDisplay();
     
</style>


