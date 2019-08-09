<template>
  <div class="mineHeader">
    <div class="left">
      <img @click="goBaseInfoPage" src="../../image/icon_merchant_nor.png">
    </div>
    <div class="right">
      <div class="name">
        <a>Tester</a>
        <!-- <span>XXXXXXXX</span> -->
      </div>
      <div class="phone">
        <a>18257566278</a>
        <img src="../../image/icon_individual-merchant.png"/>
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
        // font-size 15px
        display flex
        align-items center
        justify-content center
        a 
         font-size 15px
        img 
          margin-left 8px

</style>


