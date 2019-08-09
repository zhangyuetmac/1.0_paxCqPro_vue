<template>
  <div class="merchantItem" @click="toMyMerchantDetailPage">
    <img :src="merchantMessage.img">
    <div class="content">
      <div class="name">
        <a>{{merchantMessage.name}}</a>
      </div>
      <div class="number">
        <div class="left">
          <a>门店</a>
          <span>{{merchantMessage.number}}</span>
        </div>
        <div class="right">
          <a v-show="merchantMessage.goModify">去修改</a>
        </div>
      </div>
      <div class="address">
        <a>{{merchantMessage.address}}</a>
      </div>
    </div>
    <img src="../image/btn_more2.png">
  </div>
</template>
<script>
export default {
  props:{
    merchantMessage:{
      default:{},
      type:Object     
    }
  },
  data(){
    return{

    }
  },
  mounted(){
    console.log(this.merchantMessage)
  },
  methods:{
    toMyMerchantDetailPage(){
      this.$router.push({ path: "/MyMerchantDetail" })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';
.merchantItem
  margin-top 10px
  margin-left 5%
  width 84%
  padding 3%
  height 90px
  background white
  display flex
  align-items: center;
  justify-content space-between
  .content
    width 65%
    height 100%
    display flex
    flex-direction column
    .name
      height 33%
      width 100%
      display flex
      align-items: center;
      a 
        color #333333 
        font-size 15px
    .number
      height 33%
      width 100%
      display flex
      align-items: center;
      justify-content space-between
      .left
        a 
        color #999999
        font-size 12px
        span 
        color #FD9745
        font-size 12px
      .right
        a 
         color #999999
        font-size 14px
    .address
      height 33%
      width 100%
      display flex
      align-items: center;
      a 
       color #666666
       font-size 12px
</style>