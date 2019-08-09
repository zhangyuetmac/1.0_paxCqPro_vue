<template>
  <div class="merchantItem">
    <img :src="merchantMessage.img">
    <div class="content">
      <div class="name">
        <a>{{merchantMessage.name}}</a>
      </div>
      <div class="number">
        <div class="left">
          <a>门店</a>
          <span>{{merchantMessage.tel}}</span>
        </div>
        <div class="right">
          <a v-show="merchantMessage.goModify">去修改</a>
        </div>
      </div>
      <div class="address">
        <a>商户：{{merchantMessage.merchantNumber}}</a>
        <span>门店：{{merchantMessage.shopNumber}}</span>
      </div>
    </div>
    <img src="../image/btn_more2.png">
    <div class="type"  :class="this.merchantMessage.type==='企业'?'typeProvince':'typePersonal'">
      <a>{{merchantMessage.type}}</a>
    </div>
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
  position relative
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
      span 
        color #666666
        font-size 12px
        margin-left 10px
  .type 
    width 57px
    height 23px
    mixinDisplay();
    font-size 12px
    position absolute
    top 0 
    right 0  
    &.typePersonal
      background rgba(253,151,69,0.10);
      color #FD9745
    &.typeProvince
      background rgba(91,144,255,0.10);
      color #629EFF 
</style>