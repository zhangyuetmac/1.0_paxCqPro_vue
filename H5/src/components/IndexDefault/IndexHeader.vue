<template>
  <div class="IndexHeader">
    <!-- 游客 -->
    <div v-show="$store.state.userCharacter==1" :style="myBackgroundImage" class="indexTopState1">
      <div class="top">
        <a>成为商户体验精准管理</a>
      </div>
      <div class="title">
        <a>快联系你的代理商加入我们吧</a>
      </div>
      <div class="introduce" @click="goMerchantApplyPage">
        <a>立即联系</a>
      </div>
      <div class="want">
        <div class="left">
          <a>想直接成为代理商</a>
        </div>
        <div class="right" @click="goAgentApplyPage">
          <a>去申请>></a>
        </div>
      </div>
      <img class="clock" src="./image/icon_warning2@2x.png"/> 
    </div>
    <!-- 代理商 -->
    <div v-show="$store.state.userCharacter==2&&$store.state.indexState==2" :style="myBackgroundImage" class="indexTopState2">
      <div class="tupian">
        <img src="./image/icon_waiting.png">
      </div>
      <div class="top">
        <a>您的申请正在审核中</a>
      </div>
      <div class="title">
        <a>工作人员将在24小时内与您联系</a>
      </div>
      <img class="clock" src="./image/icon_warning2@2x.png"/> 
    </div>
    <div v-show="$store.state.userCharacter==2&&$store.state.indexState==3" :style="myBackgroundImage" class="indexTopState3">
      <div class="top">
        <a>由于网络原因申请尚未完成</a>
      </div>
      <div class="title">
        <a>您可以再次提交确认</a>
      </div>
      <div class="introduce" @click="goMerchantApplyPage">
        <a>去确认</a>
      </div>
      <img class="clock" src="./image/icon_warning2@2x.png"/> 
    </div>
    <div v-show="$store.state.userCharacter==2&&$store.state.indexState==4" :style="myBackgroundImage" class="indexTopState3">
      <div class="top">
        <a>由于部分信息未审核通过</a>
      </div>
      <div class="title">
        <a>请尽快修改并提交</a>
      </div>
      <div class="introduce" @click="goMerchantApplyPage">
        <a>去修改</a>
      </div>
      <img class="clock" src="./image/icon_warning2@2x.png"/> 
    </div>
    <div v-show="$store.state.userCharacter==2&&$store.state.indexState==5" :style="myBackgroundImage" class="indexTopState5">
      <div class="top">
        <a>今日总交易额(元)</a>
      </div>
      <div class="title">
        <a>10066.00</a>
      </div>
      <div class="want">
        <div class="left">
          <span>总笔数(笔)</span>
          <a>1000</a>
        </div>
        <div class="right">
          <span>分润总收益(元)</span>
          <a>1000.24</a>
        </div>
      </div>
      <img class="clock" src="./image/icon_warning2@2x.png"/> 
    </div>
    <!-- 商户 -->
    <div v-show="$store.state.userCharacter==3&&$store.state.indexState==2" :style="myBackgroundImage" class="indexTopState2">
      <div class="tupian">
        <img src="./image/icon_waiting.png">
      </div>
      <div class="top">
        <a>您的商户进件正在审核中</a>
      </div>
      <div class="title">
        <a>工作人员将在24小时内与您联系</a>
      </div>
      <img class="clock" src="./image/icon_warning2@2x.png"/> 
    </div>
    <div v-show="$store.state.userCharacter==3&&$store.state.indexState==3" :style="myBackgroundImage" class="indexTopState3">
      <div class="top">
        <a>由于网络等原因商户进件尚未完成</a>
      </div>
      <div class="title">
        <a>您可以再次提交确认</a>
      </div>
      <div class="introduce" @click="goMerchantApplyPage">
        <a>去确认</a>
      </div>
      <img class="clock" src="./image/icon_warning2@2x.png"/> 
    </div>
    <div v-show="$store.state.userCharacter==3&&$store.state.indexState==4" :style="myBackgroundImage" class="indexTopState3">
      <div class="top">
        <a>由于商户进件部分信息未通过审核</a>
      </div>
      <div class="title">
        <a>请尽快修改并提交</a>
      </div>
      <div class="introduce" @click="goMerchantApplyPage">
        <a>去修改</a>
      </div>
      <img class="clock" src="./image/icon_warning2@2x.png"/> 
    </div>
    <div v-show="$store.state.userCharacter==3&&$store.state.indexState==5" :style="myBackgroundImage" class="indexTopState5">
      <div class="top">
        <a>今日总交易额(元)</a>
      </div>
      <div class="title">
        <a>10066.00</a>
      </div>
      <div class="want">
        <div class="left">
          <span>总笔数(笔)</span>
          <a>1000</a>
        </div>
        <div class="right">
          <span>分润总收益(元)</span>
          <a>1000.24</a>
        </div>
      </div>
      <img class="clock" src="./image/icon_warning2@2x.png"/> 
    </div>
    <!-- 机构    的状态只有交易总额 -->
    <div v-show="$store.state.userCharacter==4" :style="myBackgroundImage" class="indexTopState5">
      <div class="top">
        <a>今日总交易额(元)</a>
      </div>
      <div class="title">
        <a>10066.00</a>
      </div>
      <div class="want">
        <div class="allAmount">
          <span>待审核</span>
          <a>900</a>
        </div>
        <div class="allAmount">
          <span>审核中</span>
          <a>900</a>
        </div>
        <div class="allAmount">
          <span>审核通过</span>
          <a>900</a>
        </div>
        <div class="allAmount">
          <span>审核失败</span>
          <a>900</a>
        </div>
      </div>
      <img class="clock" src="./image/icon_warning2@2x.png"/> 
    </div>
    <!-- <div v-show="$store.state.userCharacter==2&&$store.state.merchantState==6" :style="myBackgroundImage" class="indexTop">
      <div class="logo" :style="mylogo">
      </div>
      <div class="title">
        <a>商户的好帮手，您身边的支付专家</a>
      </div>
      <div class="introduce">
        <div class="tab-item">
          <img src='./image/icon_aqwd.png' class="item-img1"/>
          <a>安全稳定</a>
        </div>
        <div class="tab-item">
          <img src='./image/icon_gxbj.png' class="item-img2"/>
          <a>便捷高效</a>
        </div>
        <div class="tab-item">
          <img src='./image/icon_zyfz.png' class="item-img3"/>
          <a>专业负责</a>
        </div>
      </div>
    </div>  -->
    
  </div>
</template>
<script>
export default {
  data(){
    return {
      myBackgroundImage:{
        backgroundImage: "url("+require('./image/pic_homepage.png')+")",
        backgroundSize: "100% 100%"
      },
      mylogo:{
        backgroundImage: "url("+require('./image/logo1.png')+")",
        backgroundSize: "100% 100%"
      }
    }
  },
  methods: {
    goMerchantApplyPage(){
      this.$router.push({path:'./MerchantApply1'})
    },
    goAgentApplyPage(){
      this.$router.push({path:'./AgentApply'})
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';
.IndexHeader {
  height: 40%;
  width: 100%;
  .indexTopState1 {
    width: 100%;
    height: 100%;
    // background-image: url('./image/pic_homepage.png');
    // background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position relative
    .top {
      width: 100%;
      height: 14.3%;
      margin-top: 9.3%;
      mixinDisplay();

      @media screen and (min-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 18px;
      }

      @media screen and (max-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 18px;
      }
    }

    .title {
      mixinDisplay();
      width: 83.6%;
      height: 8.5%;
      margin-top: 4%;

      @media screen and (min-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 18px;
      }

      @media screen and (max-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 18px;
      }
    }

    .introduce {
      width: 38%;
      height: 18%;
      margin-top: 8%;
      background: #FFFFFF;
      border-radius: 50px;
      mixinDisplay();

      a {
        font-size: 18px;
        color: #306BE6;
      }
    }
    .want{
      width 90%
      height 15%
      display flex
      align-items center
      justify-content space-between
      padding 0 5%
      background:rgba(24,75,167,0.48)
      position absolute
      bottom 0
      a {
        color #FFFFFF
        font-size 14px
      }
    }
    .clock{
      position absolute
      right 10px
      top 10px
    }
  }
  .indexTopState2 {
    width: 100%;
    height: 100%;
    // background-image: url('./image/pic_homepage.png');
    // background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position relative
    .tupian{
      width 100%
      height 50%
      mixinDisplay();
    }
    .top {
      width: 100%;
      height: 14.3%;
      mixinDisplay();
      color: #FFFFFF;
      font-size: 18px;
    }

    .title {
      mixinDisplay();
      width: 100%;
      height: 8.5%;
      margin-top: 4%;
      color: #FFFFFF;
      font-size: 18px;
    }
    .clock{
      position absolute
      right 10px
      top 10px
    }
  }
   .indexTopState3 {
    width: 100%;
    height: 100%;
    // background-image: url('./image/pic_homepage.png');
    // background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position relative
    .top {
      width: 100%;
      height: 14%;
      margin-top: 13%;
      mixinDisplay();

      @media screen and (min-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 18px;
      }

      @media screen and (max-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 18px;
      }
    }

    .title {
      mixinDisplay();
      width: 100%;
      height: 10%;
      margin-top 3%

      @media screen and (min-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 18px;
      }

      @media screen and (max-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 18px;
      }
    }

    .introduce {
      width: 35%;
      height: 20%;
      margin-top: 5%;
      background: #FFFFFF;
      border-radius: 50px;
      mixinDisplay();

      a {
        font-size: 18px;
        color: #306BE6;
      }
    }
    .want{
      width 90%
      height 15%
      display flex
      align-items center
      justify-content space-between
      padding 0 5%
      background:rgba(24,75,167,0.48)
      position absolute
      bottom 0
      a {
        color #FFFFFF
        font-size 14px
      }
    }
    .clock{
      position absolute
      right 10px
      top 10px
    }
  }
  .indexTopState5 {
    width: 100%;
    height: 100%;
    // background-image: url('./image/pic_homepage.png');
    // background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position relative
    .top {
      width: 53.5%;
      height: 14.3%;
      margin-top: 9.3%;
      mixinDisplay();

      @media screen and (min-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 18px;
      }

      @media screen and (max-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 18px;
      }
    }

    .title {
      mixinDisplay();
      width: 83.6%;
      height: 20%;
      margin-top: 4%;
      a{
        color: #FFFFFF;
        font-size: 45px;
      }
    }
    .want{
      width 100%
      height 25%
      display flex
      align-items center
      justify-content space-between
      background:rgba(24,75,167,0.48)
      position absolute
      bottom 0
      .left{
        height 100%
        width 50%
        display flex
        flex-direction column
        align-items center
        justify-content center
        span{
          font-size 12px
          color #FFFFFF
          opacity 0.7
        }
        a{
          font-size 14px
          color #FFFFFF
          margin-top 3px
        }
      }
      .right{
        height 100%
        width 50%
        display flex
        flex-direction column
        align-items center
        justify-content center
        span{
          font-size 12px
          color #FFFFFF
          opacity 0.7
        }
        a{
          font-size 14px
          color #FFFFFF
          margin-top 3px
        }
      }
      .allAmount{
        height 100%
        width 25%
        display flex
        flex-direction column
        align-items center
        justify-content center
        span{
          font-size 12px
          color #FFFFFF
          opacity 0.7
        }
        a{
          font-size 14px
          color #FFFFFF
          margin-top 3px
        }
      }
    }
    .clock{
      position absolute
      right 10px
      top 10px
    }
  }
  .indexTop {
    width: 100%;
    height: 100%;
    // background-image: url('./image/pic_homepage.png');
    // background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      width: 37.5%;
      height: 14.3%;
      margin-top: 9.3%;
      // background-image: url('./image/logo1.png');
      // background-size: 100% 100%;
    }

    .title {
      mixinDisplay();
      width: 76.5%;
      height: 9.1%;
      margin-top: 4%;

      @media screen and (min-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 18px;
      }

      @media screen and (max-width: 370px) {
        a;
        color: #FFFFFF;
        font-size: 14px;
      }
    }

    .introduce {
      width: 60%;
      height: 30%;
      margin-top: 3%;
      mixinDisplay();

      .tab-item {
        height: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;

        // .item-img1 {
        //   width: 30%;
        //   height: 35%;
        // }

        a {
          margin-top: 15%;
          font-size: 12px;
          color: white;
        }

        // .item-img2 {
        //   width: 30%;
        //   height: 35%;
        // }

        // .item-img3 {
        //   width: 30%;
        //   height: 35%;
        // }
      }
    }
  }

  
}
</style>


