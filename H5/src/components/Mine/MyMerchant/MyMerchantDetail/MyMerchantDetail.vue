<template>
  <div class="mineWrapper transitionWrapper">
    <div class="header" >
      <div class="left">
        <img @click="goBack"  src="../../image/btn_back.png" > 
        <a @click="goBack">商户信息</a>
      </div>
      <div class="right">
        <a @click="goMerchantApplyPage">编辑</a>
      </div>
    </div>
    <ul class="main">
      <li class="normalLi" >
        <div class="left">
          <a>商户名称</a>
        </div>
        <div class="right">
          <a>AAAA</a>
        </div>
      </li>  
      <li class="normalLi" >
        <div class="left">
          <a>联系人</a>
        </div>
        <div class="right">
          <a>张三</a>
        </div>
      </li>    
      <li class="normalLi" >
        <div class="left">
          <a>联系人电话</a>
        </div>
        <div class="right">
          <a>18257866278</a>
        </div>
      </li>
      <li class="normalLi" >
        <div class="left">
          <a>门店</a>
        </div>
        <div class="right">
          <a>3</a>
        </div>
      </li>
      <li class="normalLi" style="margin-top:10px">
        <div class="left">
          <a>企业类型</a>
        </div>
        <div class="right">
          <a>企业</a>
        </div>
      </li>
      <li class="normalLi" >
        <div class="left">
          <a>企业类目</a>
        </div>
        <div class="right">
          <a>中式快餐</a>
        </div>
      </li>
      <li class="normalLi" >
        <div class="left">
          <a>同意企业信用代码</a>
        </div>
        <div class="right">
          <a>H3054288</a>
        </div>
      </li>
      <li class="normalLi" >
        <div class="left">
          <a>法定代表人</a>
        </div>
        <div class="right">
          <a>张飒</a>
        </div>
      </li>
      <li class="normalLi" >
        <div class="left">
          <a>详细地址</a>
        </div>
        <div class="right">
          <a>浙江省杭州市西湖区</a>
        </div>
      </li>
      <li class="normalLi" >
        <div class="left">
          <a>成立日期</a>
        </div>
        <div class="right">
          <a>2013.05.09</a>
        </div>
      </li>
      <li class="normalLi" >
        <div class="left">
          <a>截止日期</a>
        </div>
        <div class="right">
          <a>2015.06.09</a>
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
      <li class="businessLicense">
          <div class="businessLicenseA">
            <a>营业执照</a>
          </div>
          <div class="businessLicenseImgWrapper">
            <img src="../../image/pic_yyzz1@2x.png"  id="businessLicenseImg">
          </div>          
        </li>
    </ul>
  </div>
</template>
<script>
import {getMerchantDetailAxios} from 'common/js/merchantAxios/getMerchantDetailAxios'
export default {
  methods:{
    goMerchantApplyPage(){
      this.$router.push({path:'/MerchantApply1'});
    },
    goBack(){
      this.$store.commit("setTransitionName", "slide-left");
      this.$router.push({path:'/MyMerchant'});
    },
    getMerchantDetailData(){
      getMerchantDetailAxios()
    }
  },
  mounted(){
    this.getMerchantDetailData()
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../common/stylus/mixin';
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
      padding: 0 5% 0 5%;
      background: #FFFFFF;
      width: 80%;
      height: 35%
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
    .businessLicense 
          padding: 0 5% 0 5%;
          background: #FFFFFF;
          width: 80%;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: start;

          .businessLicenseA 
            height: 50px;
            display: flex;
            align-items: center;

            a 
              font-size: 15px;
              font-weight: bold;
            
          

          .businessLicenseImgWrapper 
            position: relative;
            width: 146px;
            height: 109px;
            mixinDisplay();
            background: #F7F8F9;

            #businessLicenseImg 
              width: 146px;
              height: 109px;
            
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
