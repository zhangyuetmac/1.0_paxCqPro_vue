<template>
  <div class="newUserGuide transitionWrapper" id="newUserGuide" >
    <div  :class="haveHead?'headFadeIn':'headFadeOut'">
      <img class="headBack" src="../image/btn_back.png" @click="goMinePge">
      <div class="title">
        <a>新手指南</a>
      </div > 
    </div>
    <div class="banner" v-if="haveBanner" :style="headerBackground">
      <img src="../image/btn_back2.png" @click="goMinePge">
    </div>
    <div :class="haveHead?'mainTop':'main'">
      <div class="content">
        <div class="item">
          <div class="top">
            <img src="../image/icon_titleleft.png">
            <a>代理商申请</a>
            <img src="../image/icon_titleright.png">
          </div>
          <img class="itemImg" src="../image/pic_shsq1.png">
          <a class="apply">申请通过后可以进行商户进件</a>
        </div>
        <div class="item">
          <div class="top">
            <img src="../image/icon_titleleft.png">
            <a>商户进件申请</a>
            <img src="../image/icon_titleright.png">
          </div>
          <img class="itemImg" src="../image/pic_shsq2.png">
          <a class="apply">企业商户申请通过后可以添加门店</a>
        </div>
        <div class="item">
          <div class="top">
            <img src="../image/icon_titleleft.png">
            <a>门店申请</a>
            <img src="../image/icon_titleright.png">
          </div>
          <img class="itemImg" src="../image/pic_shsq3.png">
          <a class="apply">申请通过后可以自动关联终端跟账本统计</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      haveHead:false,
      haveBanner:true,
      headerBackground: {
        backgroundImage: "url(" + require("../image/pic_xszn.png") + ")",
        backgroundSize: "100% 100%"
      }
    };
  },
  mounted(){
    // console.log(document.getElementById('newUserGuide'))
    this.$nextTick(()=>{
      // console.log('222')
      window.addEventListener('scroll',()=>{
        // console.log(scroll)
        const distance = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(distance)
        if(distance > 80){
          // console.log('aaa')
          this.haveBanner = false
          this.haveHead = true
        } else {
          // console.log('bbb')
          this.haveBanner = true
          this.haveHead = false
        }
      })
    })
  },
  methods:{
    goMinePge(){
      this.$router.back()
      this.$store.commit("setTransitionName", "slide-left");
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';
.newUserGuide 
  width: 100%;
  // height: 100%;
  // background: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y auto
  .headFadeIn
    width 100%
    height 50px
    display flex 
    align-items center
    // background #4396F1
    position fixed
    background white
    top 0
    left 0
    border-bottom solid 1px #D8D8D8
    transition: all 1s;  
    opacity: 1;
    .headBack
      // width 7%
      margin-left 3%
    .title
      width 85%
      mixinDisplay()
      a
        color #333333 
        font-weight  bold
        font-size 16px
  .headFadeOut
    width 100%
    height 50px
    display flex 
    align-items center
    // background #4396F1
    position fixed
    background white
    top 0
    left 0
    border-bottom solid 1px #D8D8D8
    transition: all 1s;  
    opacity: 0;
    .headBack
      // width 7%
      margin-left 3%
    .title
      width 85%
      mixinDisplay()
      a
        color #333333 
        font-weight  bold
        font-size 16px
  .banner 
    width 100%
    height 200px
    img 
      position absolute
      top 20px
      left 20px
  .mainTop 
    width: 100%;
    // height: 70%;
    background #F8F8FA
    margin-top 130px
    .content 
      width 90%
      // height 100%
      margin-left :5%
      background #FFFFFF 
      .item 
        width 80%
        height 300px
        margin-left :10%
        display flex
        flex-direction column
        align-items center
        justify-content center
        .top
          width 100%
          height 15%
          mixinDisplay()
          a 
            font-size 18px
            color #333333
            margin-left 3px
            margin-right 3px
            font-weight bold
        .itemImg
          // height 18
        .apply
          color #666666
          font-size 15px
          margin-top 10px
  .main 
    width: 100%;
    // height: 70%;
    background #F8F8FA
    .content 
      width 90%
      // height 100%
      margin-left :5%
      background #FFFFFF 
      .item 
        width 80%
        height 300px
        margin-left :10%
        display flex
        flex-direction column
        align-items center
        justify-content center
        .top
          width 100%
          height 15%
          mixinDisplay()
          a 
            font-size 18px
            color #333333
            margin-left 3px
            margin-right 3px
            font-weight bold
        .itemImg
          // height 18
        .apply
          color #666666
          font-size 15px
          margin-top 10px
      
</style>


