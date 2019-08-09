<template>
  <div class="toast">
    <img class="toastImg" v-show="isSuccess" src="./image/icon_success.png">
    <a class="toastA">{{msg}}</a>
  </div>
</template>
<script>
export default {
  // data(){
  //   return {
  //     msg:'请输入密码'
  //   }
  // },
  props:{
    msg:{
      default:'请输入密码',
      type: String
    },
    isSuccess:{
      default:false,
      type: Boolean
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .toast
    display flex
    flex-direction column
    align-items center
    background rgba(0,0,0,0.50)
    font-size 15px
    padding  3.5px 11px 8.5px 11px
    border-radius 4px
    .toastImg
      margin-top 10px
    .toastA
      margin-top 10px
    a 
      color white

</style>


