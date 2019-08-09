<template>
  <div class="registerHeader">
    <div class="headerBack">
      <img v-show="false" src="./image/back.png">
    </div>
    <div class="hello">
      <a>您好！</a>
    </div>
    <div class="welcome">
      <a>{{welcomeMsg}}</a>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    welcomeMsg:{
      default: '欢迎登陆翼支付客户端',
      type: String
    }
  },
  methods:{
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .registerHeader
    width 100%
    height 21%
    // background white
    .headerBack
      width 100%
      height 45%
      display flex
      align-items center  
      img 
        width 2.5%
        height 34.3%
        margin-left 5.3%
    .hello
      width 100%
      height 40%
      // background red
      display flex
      align-items center
      a
        font-size 37px
        margin-left 5.3%
    .welcome
      width 100%
      height 15%
      // background yellow
      display flex
      align-items center
      a
        font-size 14px
        margin-left 5.3%
</style>


