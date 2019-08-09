<template>
  <div class="mineHeader">
    <div class="left">
      <img @click="goBaseInfoPage" src="../../image/icon_merchant_def.png">
    </div>
    <div class="right">
      <div class="name">
        <a>您尚未设置账号，去设置</a>
      </div>
      <div class="phone">
        <a>18257566278</a>
      </div>
      <div class="apply">
        <a>申请成为商户</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    goBaseInfoPage(){
      this.$router.push({
        path:'./BaseInfo'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../../../common/stylus/mixin"
  .mineHeader
    width 100%
    height 22%
    // border solid 1px black
    display flex
    align-items center
    .left 
      margin-left 10%
    .right
      display flex
      // align-items  center
      flex-direction column
      margin-left 3%
      .name
        color #FFFFFF 
        font-size 16px
      .phone
        margin-top 8px
        color #FFFFFF 
        font-size 15px
      .apply
        border solid 1px #FFFFFF 
        color #FFFFFF 
        width 60%
        height 25px
        mixinDisplay()
        border-radius 20px
        font-size 12px
        margin-top 8px
</style>


